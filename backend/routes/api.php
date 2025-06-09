<?php

use App\Http\Controllers\AgentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClincController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StockUnitController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\statController;
use App\Models\Appointment;
use App\Models\Conversation;
use Illuminate\Container\Attributes\Log;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

// Add broadcasting authentication route

$auth = 'auth:sanctum';

// Public authentication routes (No authentication required)

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');
    Route::post('mobile/login', [AuthController::class, 'loginMobile'])->middleware('throttle:login');
    Route::post('/register-clinic', [ClincController::class, 'registerClinic'])->middleware('throttle:login');



});
Route::middleware($auth)->prefix('auth/mobile')->group(function () {
    Route::get("/me", [AuthController::class, 'currentUserMobile']);

});
// Protected authentication routes (Require authentication)

Route::middleware($auth)->prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'currentUser']);
    
});

Route::middleware([$auth, 'role:patient'])->group(function () {
    Route::get('mobile/appointments', [AppointmentController::class, 'getAppointmentsOfPatient']);
    Route::get('profile', [UserController::class, 'userProfile']);
    Route::get('getConversation', [MessageController::class, 'getConversationPatient']);

});
Route::middleware([$auth, 'role:dentist,receptionist'])->group(function () {
    Route::post('users/receptionist', [UserController::class, 'createReceptionist']);
    Route::post('patients/{id}/createUser', [PatientController::class, 'createUser']);
    Route::get('patients/{id}/folders', [FolderController::class, 'getFoldersOfPatient']);
    Route::get('folders/{id}/appointments', [AppointmentController::class, 'getAppointmentsOfFolder']);
    Route::get('folders/{id}/notes', [NoteController::class, 'getNotesOfFolder']);
    Route::get('schedule', [EventController::class, 'getEvents']);
    Route::apiResources(['/users' => UserController::class,]);
    Route::apiResources(['/patients' => PatientController::class,]);
    Route::apiResources(['/folders' => FolderController::class,]);
    Route::apiResources(['/appointments' => AppointmentController::class,]);
    Route::apiResources(['/notes' => NoteController::class,]);
    Route::apiResources(['/payments' => PaymentController::class,]);
    Route::apiResources(['/events' => EventController::class,]);
    Route::apiResources(['/stock_units' => StockUnitController::class,]);
    Route::apiResources(['/medicines' => MedicineController::class,]);
    Route::apiResources(['/suppliers' => SupplierController::class,]);
    Route::apiResources(['/stocks' => StockController::class,]);
    Route::post('/folders/{folder}/attachments', [AttachmentController::class, 'store']);
    Route::get('/folders/{folder}/attachments', [AttachmentController::class, 'getAttachments']);
    Route::get('/folder_details/{id}', [FolderController::class, 'getAllFolderDetails']);
    Route::delete('/attachments/{id}', [AttachmentController::class, 'destroy']);
    Route::get('/payments_stat', [PaymentController::class, 'paymentStat']);
    Route::post('/startConversation', [ConversationController::class, 'startConversation']);
    Route::get('/getAllConversation', [ConversationController::class, 'getAllConversation']);
    Route::post('/ask', [AgentController::class, 'ask']);


});

Route::middleware($auth)->group(function () {
    Route::post('/sendMessage', [MessageController::class, 'sendMessage']);
    Route::get('/getConversation/{id}', [MessageController::class, 'getConversation']);

});
Route::get('/dashboard_stat', [StatController::class, 'dashboardStat']);
Route::get('/statistic_stat', [StatController::class, 'statisticStat']);
Route::get('/attachments/{id}/download', [AttachmentController::class, 'download']);



Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});


