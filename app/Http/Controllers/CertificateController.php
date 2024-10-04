<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Models\Certificate;
use App\Models\CertificateCustomField;
use App\Models\CertificateType;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\Snappy\Facades\SnappyPdf as FacadesSnappyPdf;
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
    public function index()
    {
        /** @var User */
        $user = Auth::user();

        $isAdmin = $user->hasRole("admin");
        $certificates = Certificate::with("certificateType");

        if (!$isAdmin) {
            $certificates = $certificates->where("creator_id", "=", $user->id);
        }


        $certificates = $certificates->orderBy("created_at", "DESC");
        $certificates = $certificates->get();

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
        /** @var User */
        $user = Auth::user();

        $certificate =  $user->myCertificates()->create($request->except("customFields"));

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
            "certificate" =>  $certificate->where("id", $certificate->id)->with(["certificateType", "customFields"])->first()
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


        if ($certificate->certificateType->name == "Work At Height") {
            $pdf = Pdf::loadView('pdf.wh', [
                "certificate" => $certificate,
                "customFields" => $data
            ]);
            // ->setOption('no-stop-slow-scripts', true)
            //     ->setOption('enable-local-file-access', true)
            //     ->setOption('enable-local-file-access', true)
            //     ->setOption('disable-smart-shrinking', true);
            return $pdf->stream();
        }

        // $pdf = FacadesPdf::view('pdf.tw', [
        //     "certificate" => $certificate
        // ])->landscape();
        // return $pdf;

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

        $certificate->save();

        return back();
    }
}
