<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateCertificateRequest extends FormRequest
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
        $certificate = $this->route('certificate');

        return [
            "certifier_name" => "required|string",
            "certificate_name" => "required|string",
            "iqama" => "required|string",
            "company_id" => "required|exists:companies,id",
            "project" => "required|string",
            "witness" => "required|string",
            "issuedAt" => "required|date",
            "expireAt" => "nullable|date",
            "certificate_type_id" => "required|exists:certificate_types,id",
            "customFields" => "nullable|array",
            "image" => "nullable|image|mimes:jpg,jpeg,png|max:2048"

        ];
    }
}
