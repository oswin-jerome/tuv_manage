<?php

use App\Http\Controllers\CertificateController;
use App\Http\Controllers\JobOrderController;
use App\Http\Controllers\VerifyController;
use App\Http\Controllers\CertificateTypeController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CustomFieldsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Certificate;
use App\Models\Company;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/verify', [VerifyController::class, 'show'])->name('verify');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

    /** @var User */
    $user = Auth::user();
    $isAdmin = $user->hasRole("admin");
    if ($isAdmin) {

        $users = User::count();
        $companies = Company::count();
        $certificates = Certificate::where("approval_status", "approved")->count();
        $pending = Certificate::where("approval_status", "pending")->count();
        $certificatesThisMonth = Certificate::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();

        return Inertia::render('Dashboard', [
            "users" => $users,
            "companies" => $companies,
            "certificates" => $certificates,
            "pending" => $pending,
            "certificatesThisMonth" => $certificatesThisMonth,
        ]);
    }

    $certificates = Certificate::where("approval_status", "approved")->where("creator_id", "=", $user->id)->count();
    $pending = Certificate::where("approval_status", "pending")->where("creator_id", "=", $user->id)->count();
    $certificatesThisMonth = Certificate::whereMonth('created_at', Carbon::now()->month)
        ->whereYear('created_at', Carbon::now()->year)
        ->where("creator_id", "=", $user->id)
        ->count();

    return Inertia::render('UserDashboard', [
        "certificates" => $certificates,
        "pending" => $pending,
        "certificatesThisMonth" => $certificatesThisMonth,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource("users", UserController::class);
    Route::resource("certificate-types", CertificateTypeController::class);
    Route::resource("certificate-types/{certificateType}/customFields", CustomFieldsController::class);
    Route::get("certificates/pending", [CertificateController::class, "pending"])->name("certificates.pending");
    Route::get("certificates/export", [CertificateController::class, "export"])->name("certificates.export");
    Route::post("certificates/{certificate}/duplicate", [CertificateController::class, "duplicate"])->name("certificates.duplicate");
    Route::resource("certificates", CertificateController::class);
    Route::get("certificates/{certificate}/pdf", [CertificateController::class, "pdf"])->name("certificates.pdf");
    Route::get("certificates/{certificate}/image", [CertificateController::class, "serveImage"])->name("certificates.image");
    Route::post("certificates/{certificate}/takeAction", [CertificateController::class, "takeAction"])->name("certificates.action");
    Route::post("certificates/{certificate}/qr-fields", [CertificateController::class, "saveQrFields"])->name("certificates.qr-fields");
    Route::resource("companies", CompanyController::class);
    Route::post("job-orders/{jobOrder}/attach-certificate", [JobOrderController::class, "attachCertificate"])->name("job-orders.attach-certificate");
    Route::post("job-orders/{jobOrder}/clone", [JobOrderController::class, "clone"])->name("job-orders.clone");
    Route::resource("job-orders", JobOrderController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
