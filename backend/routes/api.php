<?php
use Illuminate\Http\Request;    
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\doctorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerificationController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\EnsureDoctorEmailIsVerified;
use App\Http\Controllers\admin\countController;

// Login public route
Route::post('/login', [AuthController::class, 'login']);


// Admin protected routes
Route::middleware(['auth:sanctum', EnsureUserIsAdmin::class])->group(function () {
    Route::post('/admin/doctor/register', [doctorController::class, 'store']);
    Route::put('/admin/doctor/update/{id}', [doctorController::class, 'update']);
    Route::delete('/admin/doctor/delete/{id}', [doctorController::class, 'destroy']);
    Route::get('/admin/doctor/{id}', [doctorController::class, 'show']);
    Route::get('/admin/doctors', [doctorController::class, 'index']);
    // Count route
    Route::get('/admin/doctor/count', [countController::class, 'index']);
    Route::post('/logout', [AuthController::class, 'logout']);

});

