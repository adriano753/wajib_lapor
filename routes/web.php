<?php

use App\Http\Controllers\UpahMinimumFilterController;
use App\Http\Controllers\WlkpDetailController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WlkpController;
use App\Http\Controllers\KbliController;
use App\Http\Controllers\BpjsFilterController;
    // use App\Http\Controllers\UpahMinimumFilterController;;

Route::get('/', function () {
    return redirect('/wlkp');
});
// Route::get('/', function () {
//     return view('welcome');
// });


/*
|--------------------------------------------------------------------------
| WLKP DASHBOARD
|--------------------------------------------------------------------------
*/
Route::get('/wlkp', [WlkpController::class, 'index'])
    ->name('wlkp.index');
Route::get('/wlkp/detail', [WlkpDetailController::class, 'index'])->name('wlkp.detail');

Route::get('/wlkp/perusahaan-klasifikasi', [WlkpController::class, 'perusahaanKlasifikasi'])
    ->name('wlkp.klasifikasi');

Route::get('/wlkp/chart-provinsi', [WlkpController::class, 'chartProvinsi']);
Route::get('/wlkp/chart-kabupaten', [WlkpController::class, 'chartKabupaten']);
Route::get('/filter/bpjs', [BpjsFilterController::class, 'filter'])->name('filter.bpjs');
Route::get('/filter/upah-minimum', [UpahMinimumFilterController::class, 'filter'])->name('filter.upah-minimum');


/*
|--------------------------------------------------------------------------
| KBLI (CONTROLLER TERPISAH)
|--------------------------------------------------------------------------
*/
Route::get('/wlkp/kbli', [KbliController::class, 'index'])
    ->name('wlkp.kbli');
Route::get('/kbli', [KbliController::class, 'index'])->name('kbli.index');
Route::post('/export-pppkb-pdf', [WlkpController::class, 'exportPPPKB'])
    ->name('export.pppkb.pdf');