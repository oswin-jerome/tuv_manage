<?php

use App\Http\Controllers\CertificateController;
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
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

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
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource("users", UserController::class);
    Route::resource("certificate-types", CertificateTypeController::class);
    Route::resource("certificate-types/{certificateType}/customFields", CustomFieldsController::class);
    Route::get("certificates/pending", [CertificateController::class, "pending"])->name("certificates.pending");
    Route::post("certificates/{certificate}/duplicate", [CertificateController::class, "duplicate"])->name("certificates.duplicate");
    Route::resource("certificates", CertificateController::class);
    Route::get("certificates/{certificate}/pdf", [CertificateController::class, "pdf"])->name("certificates.pdf");
    Route::post("certificates/{certificate}/takeAction", [CertificateController::class, "takeAction"])->name("certificates.action");
    Route::resource("companies", CompanyController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
