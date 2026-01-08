<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WlkpController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/wlkp', [WlkpController::class, 'index'])->name('wlkp.index');
