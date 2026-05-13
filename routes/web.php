<?php

use App\Http\Controllers\UpahMinimumFilterController;
use App\Http\Controllers\WlkpDetailController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WlkpController;
use App\Http\Controllers\KbliController;
use App\Http\Controllers\BpjsFilterController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
    // use App\Http\Controllers\UpahMinimumFilterController;;

Route::get('/', function () {
    return redirect('/wlkp');
});


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

Route::get('/wlkp/kbli', [KbliController::class, 'index'])
    ->name('wlkp.kbli');
Route::get('/kbli', [KbliController::class, 'index'])->name('kbli.index');
Route::post('/export-pppkb-pdf', [WlkpController::class, 'exportPPPKB'])
    ->name('export.pppkb.pdf');


Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/dashboard-ketenagakerjaan', [DashboardController::class, 'ketenagakerjaan']);
Route::get('/chart-ketenagakerjaan', [DashboardController::class, 'chartKetenagakerjaan']);
Route::get('/get-kabupaten', function(Request $request){

    return DB::table('wajiblapor.report_detil_wlkp_binwas')
        ->where('provinsi', $request->provinsi)
        ->select('kota')
        ->distinct()
        ->pluck('kota');

});
Route::get('/wlkp/kbli', [KbliController::class, 'index'])
    ->name('wlkp.kbli');
Route::get('/kbli/filter', [KbliController::class, 'filter']);
Route::get('/get-kabupaten', [KbliController::class, 'getKabupaten']);
Route::get('/kbli/top-provinsi', [KbliController::class, 'filterTopProvinsi']);
Route::get('/kbli/tenaga-kerja', [WlkpController::class, 'getKbliTenagaKerja']);
Route::get('/kbli/perusahaan', [WlkpController::class, 'getKbliPerusahaan']);