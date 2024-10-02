<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCertificateTypeRequest;
use App\Http\Requests\UpdateCertificateTypeRequest;
use App\Models\CertificateType;
use Inertia\Inertia;

class CertificateTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificateTypes = CertificateType::all();
        return Inertia::render("CertificateType/Index", [
            "certificateTypes" => $certificateTypes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("CertificateType/Create", []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCertificateTypeRequest $request)
    {
        CertificateType::create($request->validated());

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(CertificateType $certificateType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CertificateType $certificateType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificateTypeRequest $request, CertificateType $certificateType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CertificateType $certificateType)
    {
        //
    }
}
