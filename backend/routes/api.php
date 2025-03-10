
<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

$auth = 'auth:sanctum';

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);