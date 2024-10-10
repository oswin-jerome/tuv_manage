<?php

namespace App\Http\Controllers;

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
use Inertia\Inertia;
use Knp\Snappy\Pdf as SnappyPdf;
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

        if (!$isAdmin) {
            $certificates = $certificates->where("creator_id", "=", $user->id);
        }

        if ($request->has("ref_no") && $request->get("ref_no") != "") {
            $certificates = $certificates->where("ref_no", "like", "%" . $request->get("ref_no") . "%");
        }
        if ($request->has("certificate_type_id") && $request->get("certificate_type_id") != "0") {
            $certificates = $certificates->where("certificate_type_id", $request->get("certificate_type_id"));
        }
        if ($request->has("company_id") && $request->get("company_id") != "0") {
            $certificates = $certificates->where("company_id", $request->get("company_id"));
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

        /** @var User */
        $user = Auth::user();
        // dd($request->validated());
        $certificate =  $user->myCertificates()->create($request->except(["customFields", "image"]));

        $certificate->addMedia($request->file("image"))->toMediaCollection('image');


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

        return redirect(route("certificates.show", $certificate));
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

        $duplicate = $certificate->replicate();
        $duplicate->ref_no = null;
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
        // dd($certificate->approval_status);
        if ($certificate->approval_status != "pending") {
            // dd(0);
            return back()->withErrors([
                "*" => "Certificate is already approved/rejected"
            ]);
        }

        $certificate->update($request->except("customFields"));

        if ($request->has("customFields")) {

            foreach ($request->get("customFields") as $value) {
                $cf = CertificateCustomField::find($value['id']);
                $cf->update($value);
            }
        }

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
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

        $certificate['image'] = $certificate->getFirstMediaPath('image', 'thumb');
        // return $certificate->certificateType;

        if ($certificate->certificateType->layout == "letter") {
            $pdf = Pdf::loadView('pdf.wh', [
                "certificate" => $certificate,
                "customFields" => $data
            ]);
            return $pdf->stream();
        }


        $pdf = Pdf::loadView('pdf.operator', [
            "certificate" => $certificate,
            "customFields" => $data

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

        $certificates = Certificate::with("certificateType")->where("approval_status", "=", "pending")->get();

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
