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


    $certificate = Certificate::with(["company:name,id", "QrCustomFields"])->where("ref_no", $request->get("ref_no"))
        ->first();


    if ($certificate == null) {
        return response()->json([
            "status" => "INVALID",
            "message" => "Provided ref # is not found"
        ])->header("Access-Control-Allow-Origin",  "*");
    }

    if ($certificate->isExpired) {
        return response()->json([
            "status" => "EXPIRED",
            "message" => "Certificate Expired",
            "certificate" => $certificate
        ])->header("Access-Control-Allow-Origin",  "*");
    }

    return response()->json([
        "status" => "VALID",
        "message" => "Certificate is valid",
        "certificate" => $certificate
    ])->header("Access-Control-Allow-Origin",  "*");
});
