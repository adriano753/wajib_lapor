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