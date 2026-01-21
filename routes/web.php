<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WlkpController;
use App\Http\Controllers\KbliController;

Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| WLKP DASHBOARD
|--------------------------------------------------------------------------
*/
Route::get('/wlkp', [WlkpController::class, 'index'])
    ->name('wlkp.index');

Route::get('/wlkp/perusahaan-klasifikasi', [WlkpController::class, 'perusahaanKlasifikasi'])
    ->name('wlkp.klasifikasi');

Route::get('/wlkp/chart-provinsi', [WlkpController::class, 'chartProvinsi']);
Route::get('/wlkp/chart-kabupaten', [WlkpController::class, 'chartKabupaten']);

/*
|--------------------------------------------------------------------------
| KBLI (CONTROLLER TERPISAH)
|--------------------------------------------------------------------------
*/
Route::get('/wlkp/kbli', [KbliController::class, 'index'])
    ->name('wlkp.kbli');
