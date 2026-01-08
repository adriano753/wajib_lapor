<?php

namespace App\Services;

use App\Models\Wlkp;
use DB;

class WlkpService {

    // public function getFilteredData(array $filters) {
    //     return Wlkp::filter($filters)->get();
    // }

    public function getDropdowns($requestProvinsi = null)
    {
        return [
            'tahun'       => Wlkp::selectRaw('EXTRACT(YEAR FROM tgl_pendaftaran) as tahun')
                                ->distinct()->orderByDesc('tahun')->pluck('tahun')->map(fn($i)=>(int)$i),
                                
            'provinsi'    => Wlkp::select('provinsi')->distinct()->orderBy('provinsi')->pluck('provinsi'),
            
            'klasifikasi' => Wlkp::select('skala_objek_pengawasan')->distinct()->pluck('skala_objek_pengawasan'),
            
            // Kota menyesuaikan provinsi yang dipilih
            'kota'        => Wlkp::select('kota')->distinct()
                                ->when($requestProvinsi, fn($q) => $q->where('provinsi', $requestProvinsi))
                                ->orderBy('kota')->pluck('kota'),
        ];
    }

    public function getChartProvinsi(array $filters)
    {
        return Wlkp::filter($filters) 
            ->select('provinsi', DB::raw('count(*) as total'))
            ->whereNotNull('provinsi')
            ->groupBy('provinsi')
            ->orderByDesc('total')
            ->get();
    }

    public function getChartKota(array $filters){
        return Wlkp::filter($filters)
            ->select('kota', DB::raw('count(*) as total'))
            ->whereNotNull('kota')
            ->groupBy('kota')
            ->orderByDesc('total')
            ->get();
    }

    public function getChartKlasifikasi(array $filters){
        return Wlkp::filter($filters)
            ->select('skala_objek_pengawasan', DB::raw('count(*) as total'))
            ->whereNotNull('skala_objek_pengawasan')
            ->groupBy('skala_objek_pengawasan')
            ->orderByDesc('total')
            ->get();
    }

    // Function untuk get Filter Tahun
    // public function getYearOptions()
    // {
    //     return Wlkp::selectRaw('EXTRACT(YEAR FROM tgl_pendaftaran) as tahun')
    //     ->distinct()
    //     ->orderByDesc('tahun')
    //     ->pluck('tahun')
    //     // Karena EXTRACT mengembalikan float/decimal di pgsql, kita integer-kan biar rapi
    //     ->map(fn($item) => (int) $item);
    // }

    /**
     * Ambil Opsi Kota (Smart Dropdown)
     * Jika Provinsi dipilih, hanya tampilkan kota di provinsi tersebut
     */
    // public function getCityOptions($selectedProvinsi = null)
    // {
    //     $query = Wlkp::select('kota')->distinct();

    //     if ($selectedProvinsi) {
    //         $query->where('provinsi', $selectedProvinsi);
    //     }

    //     return $query->orderBy('kota')->pluck('kota');
    // }

    /**
     * Helper simpel untuk ambil kolom unik lain
     */
    // public function getDistinctColumn($column)
    // {
    //     return Wlkp::select($column)->distinct()->orderBy($column)->pluck($column);
    // }
}