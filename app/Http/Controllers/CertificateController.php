<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Models\Certificate;
use App\Models\CertificateCustomField;
use App\Models\CertificateType;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use Spatie\LaravelPdf\Facades\Pdf as FacadesPdf;

class CertificateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificates = Certificate::with("certificateType")->get();

        // return $certificates;

        return Inertia::render("Certificates/Index", [
            "certificates" => $certificates
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Certificates/Create", [
            "certificateTypes" => CertificateType::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateRequest $request)
    {

        $certificate =  Certificate::create($request->except("customFields"));

        if ($request->has("customFields")) {

            foreach (json_decode($request->get("customFields")) as $key => $value) {
                CertificateCustomField::create([
                    "key" => $key,
                    "value" => $value,
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
        return Inertia::render("Certificates/Show", [
            "certificate" => $certificate
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificate $certificate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateRequest $request, Certificate $certificate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificate $certificate)
    {
        //
    }

    public function pdf(Certificate $certificate)
    {

        if ($certificate->certificateType->name == "Work At Height") {
            $pdf = FacadesPdf::view('pdf.wh', [
                "certificate" => $certificate
            ]);
            return $pdf;
        }

        $pdf = FacadesPdf::view('pdf.tw', [
            "certificate" => $certificate
        ])->landscape();
        return $pdf;

        // $pdf = Pdf::loadView('pdf.test', [
        //     "certificate" => $certificate
        // ])->setPaper("A4", "landscape");
        // return $pdf->stream();
    }
}
