<?php

namespace App\Http\Controllers;

use App\Services\WlkpService;
use Illuminate\Http\Request;

class KbliController extends Controller
{
    protected $service;

    public function __construct(WlkpService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $filters = [
            'tahun'    => $request->tahun,
            'bulan'    => $request->bulan,
            'provinsi' => $request->provinsi,
            'kota'     => $request->kota,
            'kbli'     => $request->kbli,
        ];

        $kbliChart = $this->service->getRekapKBLI($filters);

        // ✅ Jika request AJAX → kirim JSON saja
        if ($request->ajax()) {
            return response()->json($kbliChart);
        }

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