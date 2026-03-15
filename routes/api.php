<?php

use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OtaController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\ExportController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'login']);

// Route Public (Read-Only & Hardware Data Upload)
Route::get('chart-data', [ApiController::class, 'fetchChart']);
Route::get('table', [ApiController::class, 'tablePerGH']);
Route::get('table-per-gh', [ApiController::class, 'tablePerGH']); // Alias untuk kompatibilitas frontend
Route::get('camera-per-gh', [ApiController::class, 'cameraPerGH']);
Route::get('gauge-data', [ApiController::class, 'get_average_sensor_data']);

Route::post('export-sensor', [ExportController::class, 'sensor']);
Route::post('export-camera', [ExportController::class, 'camera']);

// Route untuk Hardware (Tanpa Auth jika diizinkan oleh sistem pengirim)
Route::post('sensor', [ApiController::class, 'saveSensorData']);
Route::post('camera', [ApiController::class, 'saveCameraData']);
Route::get('gateway/schedule', [ScheduleController::class, 'getSchedule']);

Route::middleware('auth:sanctum')->group(function () {
    // Route untuk Kontrol & Monitoring Web
    Route::get('thd', [ApiController::class, 'thd']);
    Route::get('camera_status', [ApiController::class, 'camera_status']);
    Route::get('get-device-status', [ApiController::class, 'getDeviceStatus']);
    Route::post('device_status', [ApiController::class, 'postDeviceStatus']);
    Route::get('get-controlling', [ApiController::class, 'getControlling']);
    Route::post('update-thresholds', [ApiController::class, 'updateThresholds']);

    Route::get('schedules', [ScheduleController::class, 'getSchedulesForWeb']);
    Route::post('schedules', [ScheduleController::class, 'saveSchedules']);

    // OTA Firmware update management
    Route::post('files', [OtaController::class, 'uploadFirmware']);
    Route::get('get-file/{nodeId?}', [OtaController::class, 'getFirmwareInfo']);
});

