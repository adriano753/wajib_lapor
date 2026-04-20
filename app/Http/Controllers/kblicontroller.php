<?php

namespace App\Http\Controllers;
<<<<<<< HEAD


=======
dd($kbliChart);
>>>>>>> eae76cc (codingan jamsos dan upah minimum)
use App\Services\WlkpService;
use Illuminate\Http\Request;

class KbliController extends Controller
{
    protected $service;

    public function __construct(WlkpService $service)
    {
        $this->service = $service;
    }

<<<<<<< HEAD
    // Halaman view
    public function index()
    {
        // HANYA dropdown, tidak ambil data grafik
        $dropdowns = $this->service->getDropdownsKBLI();

        return view('wlkp.kbli', [
            'optTahun'    => $dropdowns['tahun'],
            'optBulan'    => $dropdowns['bulan'],
            'optProvinsi' => $dropdowns['provinsi'],
            'optKota'     => $dropdowns['kota'],
        ]);
    }

    // AJAX filter data
    public function filter(Request $request)
    {
        $data = $this->service->getRekapKBLI($request);

        return response()->json($data);
    }
}
=======
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
}
>>>>>>> eae76cc (codingan jamsos dan upah minimum)
