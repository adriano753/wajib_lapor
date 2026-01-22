<?php

namespace App\Services;

// Meningkatkan batas memori untuk pemrosesan data besar
ini_set('memory_limit', '512M');

use App\Models\Wlkp;
use Illuminate\Support\Facades\DB;

class WlkpService
{
    /**
     * FUNGSI UTAMA: Get Master Data Rekapan
     * Mengambil data jumlah perusahaan yang dikelompokkan berdasarkan:
     * Waktu (Tahun, Bulan) + Lokasi (Prov, Kota) + Klasifikasi (Skala).
     */
    public function getMasterData()
    {
        return Wlkp::select(
            // 1. Dimensi Waktu (Untuk Filter)
            DB::raw('EXTRACT(YEAR FROM tgl_pendaftaran) as tahun'),
            DB::raw('EXTRACT(MONTH FROM tgl_pendaftaran) as bulan'),

            // 2. Dimensi Data (Untuk Chart & Filter)
            DB::raw("CASE 
            WHEN provinsi IS NULL OR provinsi = '' THEN 'TIDAK TERINDENTIFIKASI' 
                ELSE provinsi 
                END as provinsi"),
            'kota',
            'skala_objek_pengawasan',

            // 3. Metrik (Hanya Jumlah Perusahaan)
            DB::raw('COUNT(*) as total')
        )
        // Filter Data Kotor
        ->whereNotNull('tgl_pendaftaran')
        
        // GROUP BY (Peringkasan Data)
        ->groupBy('tahun', 'bulan', DB::raw("CASE 
            WHEN provinsi IS NULL OR provinsi = '' THEN 'TIDAK TERINDENTIFIKASI' 
            ELSE provinsi END"), 'kota', 'skala_objek_pengawasan')
        ->get();
    }

    /**
     * Helper untuk opsi dropdown awal
     */
    public function getDropdowns()
    {
        return [
            'tahun' => Wlkp::selectRaw('EXTRACT(YEAR FROM tgl_pendaftaran) as tahun')
                ->whereNotNull('tgl_pendaftaran')
                ->distinct()
                ->orderByDesc('tahun')
                ->pluck('tahun')
                ->map(fn($i) => (int)$i),

            'provinsi' => Wlkp::select('provinsi')
                ->whereNotNull('provinsi')
                ->where('provinsi', '!=', '')
                ->distinct()
                ->orderBy('provinsi')
                ->pluck('provinsi'),

            'kota' => Wlkp::select('kota')
                ->whereNotNull('kota')
                ->distinct()
                ->orderBy('kota')
                ->pluck('kota'),

            'klasifikasi' => Wlkp::selectRaw("COALESCE(skala_objek_pengawasan, 'Tidak Teridentifikasi') as skala")
                ->distinct()
                ->orderBy('skala')
                ->pluck('skala'),
        ];
    }

// ================ DROPDOWN FILTER KBLI =============
    public function getDropdownsKBLI()
    {
        return [
            'tahun' => \App\Models\Wlkp::selectRaw('EXTRACT(YEAR FROM tgl_pendaftaran) as tahun')
                ->whereNotNull('tgl_pendaftaran')
                ->distinct()
                ->orderByDesc('tahun')
                ->pluck('tahun'),

            'bulan' => collect(range(1, 12)),

            'provinsi' => \App\Models\Wlkp::select('provinsi')
                ->whereNotNull('provinsi')
                ->distinct()
                ->orderBy('provinsi')
                ->pluck('provinsi'),

            'kota' => \App\Models\Wlkp::select('kota')
                ->whereNotNull('kota')
                ->distinct()
                ->orderBy('kota')
                ->pluck('kota'),

            'kbli' => \App\Models\Wlkp::select('nama_2_digit')
                ->whereNotNull('nama_2_digit')
                ->distinct()
                ->orderBy('nama_2_digit')
                ->pluck('nama_2_digit'),
        ];
    }

public function getRekapKBLI(array $filters = [])
{
    return DB::table('wajiblapor.report_detil_wlkp_binwas as w')
        ->select(
            'w.nama_2_digit',
            DB::raw('COUNT(*) as total')
        )
        ->whereNotNull('w.nama_2_digit')
        ->where('w.nama_2_digit', '<>', '')

        // ===== FILTER TAHUN =====
        ->when(!empty($filters['tahun']), function ($q) use ($filters) {
            $q->whereRaw(
                'EXTRACT(YEAR FROM w.tgl_pendaftaran) = ?',
                [(int)$filters['tahun']]
            );
        })

        // ===== FILTER BULAN =====
        ->when(!empty($filters['bulan']), function ($q) use ($filters) {
            $q->whereRaw(
                'EXTRACT(MONTH FROM w.tgl_pendaftaran) = ?',
                [(int)$filters['bulan']]
            );
        })

        // ===== FILTER KBLI =====
        ->when(!empty($filters['kbli']), function ($q) use ($filters) {
            $q->where('w.nama_2_digit', $filters['kbli']);
        })

        // ===== PRIORITAS KOTA =====
        ->when(!empty($filters['kota']), function ($q) use ($filters) {
            $q->where('w.kota', $filters['kota']);
        })

        // ===== PROVINSI JIKA KOTA KOSONG =====
        ->when(
            empty($filters['kota']) && !empty($filters['provinsi']),
            function ($q) use ($filters) {
                $q->where('w.provinsi', $filters['provinsi']);
            }
        )

        ->groupBy('w.nama_2_digit')
        ->orderByDesc('total')
        ->get();
}

}