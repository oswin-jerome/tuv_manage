<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreCertificateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "certifier_name" => "required|string",
            "certificate_name" => "required|string",
            "iqama" => "required|string",
            "company_id" => "required|exists:companies,id",
            "project" => "required|string",
            "witness" => "required|string",
            "issuedAt" => "required|date",
            "expireAt" => "required|date",
            "certificate_type_id" => "required|exists:certificate_types,id",
            "customFields" => "nullable|array",
            "image" => "required|file|image"
        ];
    }
}
