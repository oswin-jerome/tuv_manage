<?php

use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/validate', function (Request $request) {

    $request->validate([
        "ref_no" => "required|string"
    ]);


    $certificate = Certificate::where("ref_no", $request->get("ref_no"))->first();

    if ($certificate == null) {
        return response()->json([
            "status" => "INVALID",
            "message" => "Provided ref # is not found"
        ]);
    }

    if ($certificate->isExpired) {
        return response()->json([
            "status" => "INVALID",
            "message" => "Certificate Expired",
            "certificate" => $certificate
        ]);
    }

    return response()->json([
        "status" => "Valid",
        "message" => "Certificate is valid",
        "certificate" => $certificate
    ]);
});
