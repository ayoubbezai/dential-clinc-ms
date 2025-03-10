
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
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
});

Route::middleware([$auth, 'role:dentist'])->group(function () {
    Route::post('users/receptionist', [UserController::class, 'createReceptionist']);
    Route::apiResources(['/users' => UserController::class,]);
});