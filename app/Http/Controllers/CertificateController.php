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
        if ($request->has("company_id") && $request->get("company_id") != "0" && $request->get("company_id") != "") {
            $certificates = $certificates->where("company_id", $request->get("company_id"));
        }

        if ($request->has("issuedAt") && $request->get("issuedAt") != "0" && $request->get("issuedAt") != "") {
            $certificates = $certificates->where("issuedAt", $request->get("issuedAt"));
        }

        $certificates = $certificates->orderBy("created_at", "DESC");
        $certificates
            = $certificates->paginate(10);

        // return $certificates;

        return Inertia::render("Certificates/Index", [
            "paginate" => $certificates,
            "certificateTypes" => CertificateType::all(["id", "name"]),
            "companies" => Company::all(["id", "name"]),
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
        if ($request->has("company_id") && $request->get("company_id") != "0" && $request->get("company_id") != "") {
            $certificates = $certificates->where("company_id", $request->get("company_id"));
        }

        if ($request->has("issuedAt") && $request->get("issuedAt") != "0" && $request->get("issuedAt") != "") {
            $certificates = $certificates->where("issuedAt", $request->get("issuedAt"));
        }


        $certificates = $certificates->orderBy("created_at", "DESC");
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
            "companies" => Company::all()
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
        $certificate =  $user->myCertificates()->create($request->except(["customFields", "image"]));

        if ($request->hasFile("image")) {

            $certificate->addMedia($request->file("image"))->preservingOriginal()->toMediaCollection('image');
        }


        if ($request->has("customFields")) {

            foreach (($request->get("customFields")) as $key => $value) {
                CertificateCustomField::create([
                    "label" => $value['label'],
                    "value" => $value['default_value'],
                    "type" => $value['type'],
                    "custom_field_id" => $value['id'],
                    "certificate_id" => $certificate->id
                ]);
            }
        }

        DB::commit();

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificate $certificate)
    {

        $res =  $certificate->where("id", $certificate->id)->with(["certificateType", "customFields", "company"])->first();

        $res['image'] = $res->getFirstMedia('image');

        return Inertia::render("Certificates/Show", [
            "certificate" => $res
        ]);
    }

    /**
     * Display the specified resource.
     */
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

        return redirect()->route("certificates.edit", $duplicate);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificate $certificate)
    {
        // return CertificateResource::make($certificate);
        return Inertia::render("Certificates/Edit", [
            "certificateTypes" => CertificateType::with("customFields")->get(),
            "certificate" => CertificateResource::make($certificate),
            "companies" => Company::all()
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
        if ($certificate->approval_status != "pending" && Carbon::parse($certificate->issuedAt)->diffInDays(Carbon::now()) > 15) {

            return back()->withErrors([
                "*" => "Certificate is already approved/rejected"
            ]);
        }


        if ($certificate->approval_status != "pending" && !$isAdmin) {
            return back()->withErrors([
                "*" => "Only Admin can edit certificates after approving"
            ]);
        }
        DB::beginTransaction();

        $certificate->update($request->except(["customFields", "image"]));

        if ($request->has("customFields")) {

            foreach ($request->get("customFields") as $value) {
                $cf = CertificateCustomField::find($value['id']);
                $cf->update($value);
            }
        }

        if ($request->hasFile("image")) {

            $certificate->addMedia($request->file("image"))->preservingOriginal()->toMediaCollection('image');
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
        $data = [];
        foreach ($certificate->customFields as $key => $value) {
            $data[$value->key] = $value->value;
        }
        $qr = "";
        if ($certificate->ref_no != null) {
            $qr  = base64_encode(QrCode::format('svg')->size(200)->errorCorrection('H')->generate(env("VERIFY_URL", "") . "&ref_no=" . $certificate->ref_no));
        }

        $certificate['image'] = $certificate->getFirstMediaPath('image', 'thumb');
        // return $certificate->certificateType;

        if ($certificate->certificateType->layout == "letter") {
            $pdf = Pdf::loadView('pdf.letter', [
                "certificate" => $certificate,
                "customFields" => $data,
                "qr" => $qr
            ])->setPaper("A4");
            return $pdf->stream();
        }

        if ($certificate->certificateType->layout == "letter_WAH") {
            $pdf = Pdf::loadView('pdf.letter2', [
                "certificate" => $certificate,
                "customFields" => $data,
                "qr" => $qr
            ])->setPaper("A4");
            return $pdf->stream();
        }

        if ($certificate->certificateType->layout == "card_noback") {
            $pdf = Pdf::loadView('pdf.card_noback', [
                "certificate" => $certificate,
                "customFields" => $data,
                "qr" => $qr

            ])->setPaper([0, 0, 830, 521], "portrait");
            return $pdf->stream();
        }

        $pdf = Pdf::loadView('pdf.operator', [
            "certificate" => $certificate,
            "customFields" => $data,
            "qr" => $qr


        ])->setPaper([0, 0, 830, 521], "portrait");
        return $pdf->stream();
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
            $certificate->ref_no = $this->createRefNo($certificate->company);
        }

        $certificate->save();

        return back();
    }

    public function createRefNo(Company $company)
    {
        $string = "";
        $string = $string . Carbon::now()->format("Y") . "-";
        $string = $string . $company->short_code . "-";
        $string = $string . $company->sequence;
        $company->sequence = $company->sequence + 1;
        $company->save();
        return $string;
    }
}
