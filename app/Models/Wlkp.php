<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Wlkp extends Model
{
    protected $table = 'wajiblapor.report_detil_wlkp_binwas';

    public function scopeFilter(Builder $query, array $filters){
        //1. Filter Tahun
        $query->when($filters['tahun'] ?? null, function ($q, $tahun) {
            $q->whereYear('tgl_pendaftaran', $tahun);
        });

        //2. Filter Bulan
        $query->when($filters['bulan'] ?? null, function ($q, $bulan) {
           $q->whereMonth('tgl_pendaftaran', $bulan);
        });
        
        //3. Filter Provinsi
        $query->when($filters['provinsi'] ?? null, function($q, $provinsi) {
            $q->where('provinsi', $provinsi);
        });

        //4. Filter Provinsi
        $query->when($filters['kota'] ?? null, function($q, $kota) {
            $q->where('kota', $kota);
        });

        //5. Filter Klasifikasi
        $query->when($filters['klasifikasi'] ?? null, function($q, $klasifikasi) {
            $q->where('skala_objek_pengawasan', $klasifikasi);
        });
    }
}
