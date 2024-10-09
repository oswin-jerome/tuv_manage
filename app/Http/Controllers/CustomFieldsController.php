<?php

namespace App\Http\Controllers;

use App\Models\CertificateType;
use App\Models\CustomField;
use Illuminate\Http\Request;

class CustomFieldsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CertificateType $certificateType, Request $request)
    {
        $data =  $request->validate([
            "label" => "required|string",
            "type" => "required|string",
            "default_value" => "nullable|string",
        ]);

        $certificateType->customFields()->create($data);

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomField $customField)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CustomField $customField)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CustomField $customField)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CertificateType $certificateType, CustomField $customField)
    {
        $customField->delete();

        return back();
    }
}
