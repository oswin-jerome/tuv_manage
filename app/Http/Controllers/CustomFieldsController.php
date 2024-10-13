<?php

namespace App\Http\Controllers;

use App\Models\CertificateType;
use App\Models\CustomField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function show(CertificateType $certificateType, CustomField $customField, Request $request)
    {

        return $certificateType;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CustomField $customField) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(CertificateType $certificateType, CustomField $customField, Request $request)
    {

        /**@var User */
        $user = Auth::user();
        $isAdmin = $user->hasRole("admin");

        if (!$isAdmin) {
            return back()->withErrors([
                "error" => "You are not an admin"
            ]);
        }

        $data =  $request->validate([
            "default_value" => "nullable|string",
        ]);

        $customField->update($data);
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
