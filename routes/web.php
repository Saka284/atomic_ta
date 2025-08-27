<?php

use App\Http\Controllers\PageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/monitoring', [PageController::class, 'monitoring'])->name('monitoring');
    Route::get('/table', [PageController::class, 'table'])->name('table');
    Route::get('/camera', [PageController::class, 'camera'])->name('camera');
    Route::get('/controlling', [PageController::class, 'controlling'])->name('controlling');
});

require __DIR__ . '/auth.php';
