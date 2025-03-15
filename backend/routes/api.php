
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\AppointmentController;
use App\Models\Appointment;
use Illuminate\Support\Facades\Route;

$auth = 'auth:sanctum';

// Public authentication routes (No authentication required)

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');
});

// Protected authentication routes (Require authentication)

Route::middleware($auth)->prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'currentUser']);
});

Route::middleware([$auth, 'role:dentist'])->group(function () {
    Route::post('users/receptionist', [UserController::class, 'createReceptionist']);
    Route::post('patients/{id}/createUser', [PatientController::class, 'createUser']);
    Route::get('patients/{id}/folders', [FolderController::class, 'getFoldersOfPatient']);
    Route::get('folders/{id}/appointments', [AppointmentController::class, 'getAppointmentsOfFolder']);
    Route::apiResources(['/users' => UserController::class,]);
    Route::apiResources(['/patients' => PatientController::class,]);
    Route::apiResources(['/folders' => FolderController::class,]);
    Route::apiResources(['/appointments' => AppointmentController::class,]);
});



Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});