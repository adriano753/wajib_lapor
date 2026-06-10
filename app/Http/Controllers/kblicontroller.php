<?php

namespace App\Http\Controllers;
<<<<<<< HEAD
dd($kbliChart);
use App\Services\WlkpService;
use Illuminate\Http\Request;

class KbliController extends Controller
{
    protected $service;

    public function __construct(WlkpService $service)
    {
        $this->service = $service;
    }

    /**
     * HALAMAN KBLI
     * Filter:
     * - tahun
     * - bulan
     * - provinsi
     * - kabupaten / kota
     * - nama_2_digit (KBLI)
     */
    public function index(Request $request)
    {
        $filters = [
            'tahun'    => $request->tahun,
            'bulan'    => $request->bulan,
            'provinsi' => $request->provinsi,
            'kota'     => $request->kota,
            'kbli'     => $request->nama_2_digit,
        ];

        $kbliChart = $this->service->getRekapKBLI($filters);
        $dropdowns = $this->service->getDropdownsKBLI();

        return view('wlkp.kbli', [
            'kbliChart'  => $kbliChart,
            'optTahun'   => $dropdowns['tahun'],
            'optBulan'   => $dropdowns['bulan'],
            'optProvinsi'=> $dropdowns['provinsi'],
            'optKota'    => $dropdowns['kota'],
            'optKBLI'    => $dropdowns['kbli'],
        ]);
    }
=======

use Illuminate\Http\Request;

class kblicontroller extends Controller
{
    //
>>>>>>> rayhan
}
