<?php

namespace App\Http\Controllers;

use App\Exports\CertificatesExport;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Http\Resources\CertificateResource;
use App\Models\Certificate;
use App\Models\CertificateCustomField;
use App\Models\CertificateType;
use App\Models\Company;
use App\Models\JobOrder;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\Snappy\Facades\SnappyPdf as FacadesSnappyPdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Knp\Snappy\Pdf as SnappyPdf;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Spatie\LaravelPdf\Facades\Pdf as FacadesPdf;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        /** @var User */
        $user = Auth::user();

        $isAdmin = $user->hasRole("admin");
        $certificates = Certificate::with("certificateType", "company");

        // if (!$isAdmin) {
        //     $certificates = $certificates->where("creator_id", "=", $user->id);
        // }

        if ($request->has("ref_no") && $request->get("ref_no") != "") {
            $certificates = $certificates->where("ref_no", "like", "%" . $request->get("ref_no") . "%");
        }
        if ($request->has("certificate_type_id") && $request->get("certificate_type_id") != "0" && $request->get("certificate_type_id") != "") {
            $certificates = $certificates->where("certificate_type_id", $request->get("certificate_type_id"));
        }
        if ($request->has("company_name") && $request->get("company_name") != "") {
            $certificates = $certificates->whereHas("company", function ($query) use ($request) {
                $query->where("name", "like", "%" . $request->get("company_name") . "%");
            });
        }

        if ($request->has("issuedAt") && $request->get("issuedAt") != "0" && $request->get("issuedAt") != "") {
            $certificates = $certificates->where("issuedAt", $request->get("issuedAt"));
        }

        $certificates = $certificates->join("companies", "companies.id", "=", "certificates.company_id")
            ->orderBy("certificates.id", "DESC")
            ->select("certificates.*");
        $certificates = $certificates->paginate(10)->withQueryString();

        // return $certificates;

        return Inertia::render("Certificates/Index", [
            "paginate" => $certificates,
            "certificateTypes" => CertificateType::all(["id", "name"]),
            "companies" => Company::orderBy("name", "ASC")->get(["id", "name"]),
            "request" => $request
        ]);
    }

    /**
     * Export a listing of the resource.
     */
    public function export(Request $request)
    {


        /** @var User */
        $user = Auth::user();

        $isAdmin = $user->hasRole("admin");
        $certificates = Certificate::with("certificateType", "company");

        if ($request->has("ref_no") && $request->get("ref_no") != "") {
            $certificates = $certificates->where("ref_no", "like", "%" . $request->get("ref_no") . "%");
        }
        if ($request->has("certificate_type_id") && $request->get("certificate_type_id") != "0" && $request->get("certificate_type_id") != "") {
            $certificates = $certificates->where("certificate_type_id", $request->get("certificate_type_id"));
        }
        if ($request->has("company_name") && $request->get("company_name") != "") {
            $certificates = $certificates->whereHas("company", function ($query) use ($request) {
                $query->where("name", "like", "%" . $request->get("company_name") . "%");
            });
        }

        if ($request->has("issuedAt") && $request->get("issuedAt") != "0" && $request->get("issuedAt") != "") {
            $certificates = $certificates->where("issuedAt", $request->get("issuedAt"));
        }


        $certificates = $certificates->join("companies", "companies.id", "=", "certificates.company_id")
            ->orderBy("companies.name", "ASC")
            ->select("certificates.*");
        $export = new CertificatesExport($certificates->get());


        return Excel::download($export, 'Export.xlsx', null);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Certificates/Create", [
            "certificateTypes" => CertificateType::with("customFields")->get(),
            "companies" => Company::orderBy('name')->get(['id', 'name']),
            "jobOrders" => JobOrder::with('company')->orderBy('id')->get()->map(fn($j) => ['id' => $j->id, 'job_order_code' => $j->job_order_code]),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateRequest $request)
    {

        DB::beginTransaction();

        /** @var User */
        $user = Auth::user();
        // dd($request->validated());
        $certificate =  $user->myCertificates()->create($request->except(["customFields", "image", "pdf_file", "qrFields"]));

        if ($request->hasFile("image")) {

            $certificate->addMedia($request->file("image"))->preservingOriginal()->toMediaCollection('image');
        }

        if ($request->hasFile("pdf_file")) {
            $certificate->addMedia($request->file("pdf_file"))->preservingOriginal()->toMediaCollection('pdf_file');
        }


        if ($request->has("customFields")) {

            foreach (($request->get("customFields")) as $key => $value) {
                CertificateCustomField::create([
                    "label" => $value['label'],
                    "value" => $value['default_value'] ?? '',
                    "type" => $value['type'],
                    "custom_field_id" => $value['id'],
                    "certificate_id" => $certificate->id
                ]);
            }
        }

        $this->saveQrFieldsFromRequest($request, $certificate);

        DB::commit();

        return back();
    }

    private function saveQrFieldsFromRequest($request, Certificate $certificate): void
    {
        $qrFieldKeys = [
            'QR_Equipment_Description',
            'QR_Serial_Number',
            'QR_Asset_Number',
            'QR_Capacity_SWL',
            'QR_Inspection_Standard',
            'QR_Inspection_Date',
            'QR_Next_Due_Date',
        ];
        $qrData = $request->get('qrFields', []);
        foreach ($qrFieldKeys as $key) {
            $value = $qrData[$key] ?? null;
            if ($value === null) continue;
            CertificateCustomField::updateOrCreate(
                ['certificate_id' => $certificate->id, 'label' => $key],
                ['value' => $value, 'type' => 'text', 'custom_field_id' => null]
            );
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificate $certificate)
    {
        $res = $certificate->where("id", $certificate->id)->with(["certificateType", "customFields", "company"])->first();
        $res['image'] = $res->getFirstMedia('image');

        $qrFieldKeys = [
            'QR_Equipment_Description',
            'QR_Serial_Number',
            'QR_Asset_Number',
            'QR_Capacity_SWL',
            'QR_Inspection_Standard',
            'QR_Inspection_Date',
            'QR_Next_Due_Date',
        ];

        $existingQrFields = $res->customFields->keyBy('label');
        $qrFields = [];
        foreach ($qrFieldKeys as $key) {
            $qrFields[$key] = $existingQrFields[$key]->value ?? '';
        }

        return Inertia::render("Certificates/Show", [
            "certificate" => $res,
            "qrFields" => $qrFields,
        ]);
    }

    public function saveQrFields(Certificate $certificate, Request $request)
    {
        $qrFieldKeys = [
            'QR_Equipment_Description',
            'QR_Serial_Number',
            'QR_Asset_Number',
            'QR_Capacity_SWL',
            'QR_Inspection_Standard',
            'QR_Inspection_Date',
            'QR_Next_Due_Date',
        ];

        foreach ($qrFieldKeys as $key) {
            $value = $request->get($key) ?? '';
            CertificateCustomField::updateOrCreate(
                ['certificate_id' => $certificate->id, 'label' => $key],
                ['value' => $value, 'type' => 'text', 'custom_field_id' => null]
            );
        }

        return back()->with('success', 'QR fields saved.');
    }

    /**
     * Display the specified resource.
     */
    public function serveImage(Certificate $certificate)
    {
        $media = $certificate->getFirstMedia('image');
        if (!$media || !file_exists($media->getPath())) {
            return response('Not found', 404);
        }
        return response()->file($media->getPath(), [
            'Content-Type' => $media->mime_type,
        ]);
    }

    public function duplicate(Certificate $certificate)
    {
        /** @var User */
        $user = Auth::user();

        $isAdmin = $user->hasRole("admin");

        $duplicate = $certificate->replicate();
        $duplicate->ref_no = null;
        $duplicate->creator_id = $user->id;
        $duplicate->approval_status = "pending";
        $duplicate->push();

        foreach ($certificate->customFields as $field) {
            $df = $field->replicate();
            $df->certificate_id = $duplicate->id;
            $df->save();
        }

        if ($certificate->certificateType->layout === 'file_based') {
            $pdfMedia = $certificate->getFirstMedia('pdf_file');
            if ($pdfMedia) {
                $pdfMedia->copy($duplicate, 'pdf_file');
            }
        } else {
            $imageMedia = $certificate->getFirstMedia('image');
            if ($imageMedia) {
                $imageMedia->copy($duplicate, 'image');
            }
        }

        return redirect()->route("certificates.edit", $duplicate);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificate $certificate)
    {
        $qrFieldKeys = [
            'QR_Equipment_Description',
            'QR_Serial_Number',
            'QR_Asset_Number',
            'QR_Capacity_SWL',
            'QR_Inspection_Standard',
            'QR_Inspection_Date',
            'QR_Next_Due_Date',
        ];
        $existingQrFields = $certificate->customFields->keyBy('label');
        $qrFields = [];
        foreach ($qrFieldKeys as $key) {
            $qrFields[$key] = $existingQrFields[$key]->value ?? '';
        }

        return Inertia::render("Certificates/Edit", [
            "certificateTypes" => CertificateType::with("customFields")->get(),
            "certificate" => CertificateResource::make($certificate),
            "companies" => Company::orderBy('name')->get(['id', 'name']),
            "jobOrders" => JobOrder::with('company')->orderBy('id')->get()->map(fn($j) => ['id' => $j->id, 'job_order_code' => $j->job_order_code]),
            "qrFields" => $qrFields,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {

        /** @var User */
        $user = Auth::user();

        $isAdmin = $user->hasRole("admin");

        if ($certificate->creator_id != $user->id && !$isAdmin) {

            return back()->withErrors([
                "*" => "Certificate don't belong to you"
            ]);
        }
        // if ($certificate->approval_status != "pending" && Carbon::parse($certificate->issuedAt)->diffInDays(Carbon::now()) > 15) {

        //     return back()->withErrors([
        //         "*" => "Certificate is already approved/rejected"
        //     ]);
        // }


        // if ($certificate->approval_status != "pending" && !$isAdmin) {
        //     return back()->withErrors([
        //         "*" => "Only Admin can edit certificates after approving"
        //     ]);
        // }
        DB::beginTransaction();

        $certificate->update($request->except(["customFields", "image", "pdf_file", "qrFields"]));

        if ($request->has("customFields")) {

            foreach ($request->get("customFields") as $value) {
                if (!empty($value['id'])) {
                    $cf = CertificateCustomField::find($value['id']);
                    if ($cf) {
                        $cf->update([
                            'value' => $value['value'] ?? $value['default_value'] ?? '',
                            'label' => $value['label'] ?? $cf->label,
                        ]);
                    }
                } else {
                    // New field not yet saved for this certificate (e.g. QR_ fields on old certs)
                    CertificateCustomField::create([
                        'label'           => $value['label'],
                        'value'           => $value['value'] ?? $value['default_value'] ?? '',
                        'type'            => $value['type'] ?? 'text',
                        'custom_field_id' => $value['custom_field_id'] ?? null,
                        'certificate_id'  => $certificate->id,
                    ]);
                }
            }
        }

        $this->saveQrFieldsFromRequest($request, $certificate);

        if ($request->hasFile("image")) {

            $certificate->addMedia($request->file("image"))->preservingOriginal()->toMediaCollection('image');
        }

        if ($request->hasFile("pdf_file")) {
            $certificate->clearMediaCollection('pdf_file');
            $certificate->addMedia($request->file("pdf_file"))->preservingOriginal()->toMediaCollection('pdf_file');
        }

        DB::commit();

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        /**@var User */
        $user = Auth::user();
        $isAdmin = $user->hasRole("admin");

        if ($certificate->approval_status != "pending" && !$isAdmin) {
            return response('Unauthorized.', 401);
        }

        if ($certificate->creator_id != $user->id && !$isAdmin) {
            return response('Unauthorized.', 401);
        }

        $certificate->customFields()->delete();
        $certificate->delete();

        return back();
    }

    public function pdf(Certificate $certificate)
    {
        /**@var User */
        $user = Auth::user();
        $isAdmin = $user->hasRole("admin");

        if (!$isAdmin) {
            return response('Unauthorized.', 401);
        }

        if ($certificate->certificateType->layout === 'file_based') {
            $media = $certificate->getFirstMedia('pdf_file');
            if (!$media) {
                return response('No PDF file uploaded for this certificate.', 404);
            }
            return $this->wrapPdfWithHeaderFooter($certificate);
        }

        $data = [];
        $filteredCustom = [];
        foreach ($certificate->customFields as $key => $value) {
            if (!str_starts_with($value->label, "QR_")) {
                $data[$value->key] = $value->value;
                $filteredCustom[$key] = $value;
            }
        }

        $qr = "";
        if ($certificate->ref_no != null) {
            $qr  = base64_encode(QrCode::format('svg')->size(200)->errorCorrection('H')->generate(route("verify") . "?ref_no=" . $certificate->ref_no));
        }

        $imgMedia = $certificate->getFirstMedia('image');
        $certificate['image'] = $imgMedia ? $imgMedia->getPath() : '';
        // return $certificate->certificateType;

        if ($certificate->certificateType->layout == "letter") {
            $pdf = Pdf::loadView('pdf.letter', [
                "certificate" => $certificate,
                "customFields" => $filteredCustom,
                "qr" => $qr
            ])->setPaper("A4");
            return $pdf->stream();
        }

        if ($certificate->certificateType->layout == "letter_WAH") {
            $pdf = Pdf::loadView('pdf.letter2', [
                "certificate" => $certificate,
                "customFields" => $filteredCustom,
                "qr" => $qr
            ])->setPaper("A4");
            return $pdf->stream();
        }

        if ($certificate->certificateType->layout == "card_noback") {
            $pdf = Pdf::loadView('pdf.card_noback', [
                "certificate" => $certificate,
                "customFields" => $filteredCustom,
                "qr" => $qr

            ])->setPaper([0, 0, 830, 521], "portrait");
            return $pdf->stream();
        }
        $pdf = Pdf::loadView('pdf.operator', [
            "certificate" => $certificate,
            "customFields" => $filteredCustom,
            "qr" => $qr


        ])->setPaper([0, 0, 830, 521], "portrait");
        return $pdf->stream();
    }

    private function wrapPdfWithHeaderFooter(Certificate $certificate): \Illuminate\Http\Response
    {
        $media = $certificate->getFirstMedia('pdf_file');
        $pdfBase64 = base64_encode(file_get_contents($media->getPath()));

        // QR as PNG (needs GD or Imagick)
        $qrBase64 = '';
        if ($certificate->ref_no) {
            try {
                $qrPng = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('png')
                    ->size(120)->errorCorrection('H')
                    ->generate(route('verify') . '?ref_no=' . $certificate->ref_no);
                $qrBase64 = base64_encode($qrPng);
            } catch (\Throwable $e) {}
        }

        $logoBase64 = '';
        $logoPath = public_path('logo.png');
        if (file_exists($logoPath)) {
            $logoBase64 = base64_encode(file_get_contents($logoPath));
        }

        $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Certificate PDF</title>
<script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
<style>
  * { margin:0; padding:0; }
  body { background:#525659; }
  iframe { display:block; width:100%; height:100vh; border:none; }
  #loading { color:#fff; font-family:Arial,sans-serif; text-align:center; padding:40px; font-size:16px; }
</style>
</head>
<body>
<div id="loading">Loading PDF...</div>
<script>
(async function() {
  const { PDFDocument, rgb, StandardFonts, degrees } = PDFLib;

  const pdfBytes = Uint8Array.from(atob('{$pdfBase64}'), c => c.charCodeAt(0));
  const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });

  const logoBytes = '{$logoBase64}' ? Uint8Array.from(atob('{$logoBase64}'), c => c.charCodeAt(0)) : null;
  const qrBytes  = '{$qrBase64}'   ? Uint8Array.from(atob('{$qrBase64}'),   c => c.charCodeAt(0)) : null;

  let logoImg = null, qrImg = null;
  if (logoBytes) logoImg = await pdfDoc.embedPng(logoBytes).catch(() => null);
  if (qrBytes)   qrImg  = await pdfDoc.embedPng(qrBytes).catch(() => null);

  const font     = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontReg  = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const red      = rgb(0.914, 0.027, 0.118);
  const darkBlue = rgb(0.024, 0.267, 0.388);
  const gray     = rgb(0.267, 0.267, 0.267);
  const white    = rgb(1, 1, 1);

  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    const headerH = height * 0.10;
    const footerH = height * 0.08;
    const margin  = width * 0.03;

    // White header band
    page.drawRectangle({ x: 0, y: height - headerH, width, height: headerH, color: white });

    // Logo top-left
    if (logoImg) {
      const lh = headerH * 0.70;
      const lw = logoImg.width * lh / logoImg.height;
      page.drawImage(logoImg, { x: margin, y: height - headerH + (headerH - lh) / 2, width: lw, height: lh });
    }

    // QR top-right
    if (qrImg) {
      const qs = headerH * 0.85;
      page.drawImage(qrImg, { x: width - qs - margin, y: height - headerH + (headerH - qs) / 2, width: qs, height: qs });
    }

    // Red line below header
    page.drawLine({ start: { x: 0, y: height - headerH }, end: { x: width, y: height - headerH }, thickness: 3, color: red });

    // White footer band
    page.drawRectangle({ x: 0, y: 0, width, height: footerH, color: white });

    // Red line above footer
    page.drawLine({ start: { x: 0, y: footerH }, end: { x: width, y: footerH }, thickness: 3, color: red });

    // Footer logo right
    if (logoImg) {
      const lh2 = footerH * 0.65;
      const lw2 = logoImg.width * lh2 / logoImg.height;
      page.drawImage(logoImg, { x: width - lw2 - margin, y: (footerH - lh2) / 2, width: lw2, height: lh2 });
    }

    // Footer text
    const fs = Math.max(8, footerH * 0.22);
    page.drawText('TUV Experts', { x: margin, y: footerH * 0.6, size: fs + 1, font, color: darkBlue });
    page.drawText('CR #: 1009060888  |  operations@tuv-experts.com  |  www.tuv-experts.com', { x: margin, y: footerH * 0.25, size: fs - 1, font: fontReg, color: gray });
  }

  const modifiedBytes = await pdfDoc.save();
  const blob = new Blob([modifiedBytes], { type: 'application/pdf' });
  const url  = URL.createObjectURL(blob);

  document.getElementById('loading').remove();
  const iframe = document.createElement('iframe');
  iframe.src = url;
  document.body.appendChild(iframe);
})();
</script>
</body>
</html>
HTML;

        return response($html, 200, ['Content-Type' => 'text/html; charset=utf-8']);
    }

    private function overlayHeaderFooterQr(Certificate $certificate, string $uploadedPdfPath): \Illuminate\Http\Response
    {
        // Imagick not available — serve raw PDF
        if (!class_exists('\Imagick')) {
            return response()->file($uploadedPdfPath, [
                'Content-Type'        => 'application/pdf',
                'Content-Disposition' => 'inline; filename="certificate.pdf"',
            ]);
        }

        set_time_limit(180);
        @ini_set('memory_limit', '512M');
        $certificate->load(['certificateType', 'company']);

        $qrBlob = '';
        if ($certificate->ref_no) {
            $qrBlob = \SimpleSoftwareIO\QrCode\Facades\QrCode::format('png')
                ->size(150)->errorCorrection('H')
                ->generate(route('verify') . '?ref_no=' . $certificate->ref_no);
        }

        $logoPath = public_path('logo.png');

        // Find a usable TTF font (works on Mac + Linux)
        $fontCandidates = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
            '/usr/share/fonts/truetype/freefont/FreeSans.ttf',
            '/System/Library/Fonts/Supplemental/Arial.ttf',
            '/Library/Fonts/Arial.ttf',
        ];
        $fontPath = null;
        foreach ($fontCandidates as $f) {
            if (file_exists($f)) { $fontPath = $f; break; }
        }

        // Convert each PDF page to image, add header/footer/QR overlay, combine back to PDF
        $source = new \Imagick();
        $source->setResolution(72, 72);
        $source->readImage($uploadedPdfPath);

        $output = new \Imagick();

        foreach ($source as $page) {
            $page = $page->flattenImages();
            $page->setImageFormat('png');

            $w = $page->getImageWidth();
            $h = $page->getImageHeight();

            $headerH = (int)($h * 0.10);
            $footerH = (int)($h * 0.09);
            $margin  = (int)($w * 0.02);

            // White header band
            $d = new \ImagickDraw();
            $d->setFillColor('white');
            $d->rectangle(0, 0, $w, $headerH);
            $page->drawImage($d);

            // Red line
            $d2 = new \ImagickDraw();
            $d2->setStrokeColor('#e9071e');
            $d2->setStrokeWidth(3);
            $d2->line(0, $headerH, $w, $headerH);
            $page->drawImage($d2);

            // Logo (header left)
            if (file_exists($logoPath)) {
                $logo = new \Imagick($logoPath);
                $logoH = (int)($headerH * 0.70);
                $logo->resizeImage(0, $logoH, \Imagick::FILTER_LANCZOS, 1);
                $page->compositeImage($logo, \Imagick::COMPOSITE_OVER, $margin, (int)(($headerH - $logoH) / 2));
                $logo->destroy();
            }

            // QR (header right)
            if ($qrBlob) {
                $qr = new \Imagick();
                $qr->readImageBlob($qrBlob);
                $qrSize = (int)($headerH * 0.85);
                $qr->resizeImage($qrSize, $qrSize, \Imagick::FILTER_LANCZOS, 1);
                $page->compositeImage($qr, \Imagick::COMPOSITE_OVER, $w - $qrSize - $margin, (int)(($headerH - $qrSize) / 2));
                $qr->destroy();
            }

            // White footer band
            $d3 = new \ImagickDraw();
            $d3->setFillColor('white');
            $d3->rectangle(0, $h - $footerH, $w, $h);
            $page->drawImage($d3);

            // Red line above footer
            $d4 = new \ImagickDraw();
            $d4->setStrokeColor('#e9071e');
            $d4->setStrokeWidth(3);
            $d4->line(0, $h - $footerH, $w, $h - $footerH);
            $page->drawImage($d4);

            // Footer text (only if a font is available)
            if ($fontPath) {
                $fs = max(14, (int)($footerH * 0.22));
                $t1 = new \ImagickDraw();
                $t1->setFont($fontPath);
                $t1->setFillColor('#064463');
                $t1->setFontSize($fs + 2);
                $t1->setFontWeight(700);
                $page->annotateImage($t1, $margin, $h - $footerH + $fs + 6, 0, 'TUV Experts');

                $t2 = new \ImagickDraw();
                $t2->setFont($fontPath);
                $t2->setFillColor('#444444');
                $t2->setFontSize($fs - 1);
                $page->annotateImage($t2, $margin, $h - $footerH + $fs * 2 + 10, 0, 'CR #: 1009060888  |  operations@tuv-experts.com  |  www.tuv-experts.com');
            }

            // Logo (footer right)
            if (file_exists($logoPath)) {
                $logo2 = new \Imagick($logoPath);
                $logo2H = (int)($footerH * 0.65);
                $logo2->resizeImage(0, $logo2H, \Imagick::FILTER_LANCZOS, 1);
                $page->compositeImage($logo2, \Imagick::COMPOSITE_OVER, $w - $logo2->getImageWidth() - $margin, $h - $footerH + (int)(($footerH - $logo2H) / 2));
                $logo2->destroy();
            }

            $page->setImageFormat('pdf');
            $output->addImage($page);
            $page->destroy();
        }

        $source->destroy();
        $output->resetIterator();
        $blob = $output->getImagesBlob();
        $output->destroy();

        return response($blob, 200, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'inline; filename="certificate.pdf"',
        ]);
    }

    public function pending()
    {

        /**@var User */
        $user = Auth::user();
        $isAdmin = $user->hasRole("admin");

        if (!$isAdmin) {
            return response('Unauthorized.', 401);
        }

        $certificates = Certificate::with(["certificateType", "company"])->where("approval_status", "=", "pending")->get();

        return Inertia::render("Certificates/Pending", [
            "certificates" => $certificates
        ]);
    }

    public function takeAction(Certificate $certificate, Request $request)
    {
        /**@var User */
        $user = Auth::user();
        $isAdmin = $user->hasRole("admin");

        if (!$isAdmin) {
            return response('Unauthorized.', 401);
        }
        $request->validate([
            "status" => "required"
        ]);

        $certificate->approval_status = $request->get("status");
        if ($certificate->approval_status == "approved") {
            $certificate->ref_no = $this->createRefNo($certificate);
        }

        $certificate->save();

        return back();
    }

    public function createRefNo(Certificate $certificate)
    {
        $company = $certificate->company;
        if ($certificate->job_order_number) {
            $count = Certificate::where("job_order_number", $certificate->job_order_number)
                ->whereNotNull("ref_no")
                ->count();
            return $certificate->job_order_number . "-" . str_pad($count + 1, 2, "0", STR_PAD_LEFT);
        }
        $string = Carbon::now()->format("Y") . "-" . $company->short_code . "-" . $company->sequence;
        $company->sequence = $company->sequence + 1;
        $company->save();
        return $string;
    }
}
