<?php

use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OtaController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('sensor', [ApiController::class, 'sensor']);
    Route::post('camera', [ApiController::class, 'camera']);
    Route::get('thd', [ApiController::class, 'thd']);
    Route::get('camera_status', [ApiController::class, 'camera_status']);
    Route::get('average-sensor-data', [ApiController::class, 'get_average_sensor_data']);

    Route::get('/chart-data', [ApiController::class, 'fetchChart']);
    Route::get('/table-per-gh', [ApiController::class, 'tablePerGH']);
    Route::get('/camera-per-gh', [ApiController::class, 'cameraPerGH']);
    Route::get('/get-controlling', [ApiController::class, 'getControlling']);
    Route::post('/update-thresholds', [ApiController::class, 'updateThreshold']);

    Route::post('/export-sensor', [ExportController::class, 'sensor']);
    Route::post('/export-camera', [ExportController::class, 'camera']);
    
    // OTA Firmware update check endpoint
    Route::get('/get-file/{nodeId}', [OtaController::class, 'getFirmwareInfo']);
    
    // OTA Firmware upload endpoint
    Route::post('/files', [OtaController::class, 'uploadFirmware']);
});
