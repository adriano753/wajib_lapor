<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WlkpController;



Route::get('/', function () {
    return redirect('/wlkp');
});
// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/wlkp', [WlkpController::class, 'index']);
// Route::get('/dashboard', [WlkpController::class, 'index']);
Route::get('/wlkp/tenagakerja', [WlkpController::class, 'tenagaKerja']);

Route::get('/ajax/grafik-kode-tk', [WlkpController::class, 'grafikKodeTk']);
Route::get('/api/chart/kbli', [WlkpController::class, 'chartKBLI']);

