    <?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\WlkpController;

    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/wlkp', [WlkpController::class, 'index'])->name('wlkp.index');
    // perusahaanklasifikasi
    Route::get('/wlkp/perusahaan-klasifikasi', [WlkpController::class, 'perusahaanKlasifikasi'])->name('wlkp.klasifikasi');
    Route::get('/wlkp/chart-provinsi', [WlkpController::class, 'chartProvinsi']);
    Route::get('/wlkp/chart-kabupaten', [WlkpController::class, 'chartKabupaten']);
    // Route::get('/filter/bpjs', [BpjsFilterController::class, 'filter'])->name('filter.bpjs');

    