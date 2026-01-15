<?php
namespace App\Services;
ini_set('memory_limit', '512M');

use App\Models\Wlkp;
use Illuminate\Support\Facades\DB;

class WlkpService {

    /**
     * FUNGSI UTAMA: Get Master Data Rekapan
     * Mengambil data jumlah perusahaan yang dikelompokkan berdasarkan:
     * Waktu (Tahun, Bulan) + Lokasi (Prov, Kota) + Klasifikasi (Skala).
     * * Data ini nanti dikirim ke JavaScript untuk dijadikan sumber:
     * 1. Grafik Provinsi
     * 2. Grafik Kab/Kota
     * 3. Grafik Klasifikasi
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
            
            // Kota & Klasifikasi bisa diambil semua dulu
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
}