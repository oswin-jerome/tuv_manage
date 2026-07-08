<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifyController extends Controller
{
    public function show(Request $request)
    {
        $refNo = $request->get('ref_no');

        if (!$refNo) {
            return Inertia::render('Verify', ['certificate' => null, 'error' => 'No reference number provided.']);
        }

        $certificate = Certificate::with(['certificateType', 'company', 'customFields'])
            ->where('ref_no', $refNo)
            ->where('approval_status', 'approved')
            ->first();

        if (!$certificate) {
            return Inertia::render('Verify', ['certificate' => null, 'error' => 'Certificate not found or not approved.']);
        }

        return Inertia::render('Verify', [
            'certificate' => $certificate,
            'error' => null,
        ]);
    }
}
