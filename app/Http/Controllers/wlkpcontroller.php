<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class WlkpController extends Controller
{
    private function formatDetail($n)
    {
        return number_format((int) $n, 0, ',', '.');
    }

    public function index()
    {
        /* ===============================
           TOTAL KESELURUHAN
        =============================== */
        $totalRaw = DB::table('wajiblapor.report_detil_wlkp_binwas')->count();
        $totalSemua = $this->formatDetail($totalRaw);

        /* ===============================
           SKALA OBJEK PENGAWASAN
        =============================== */
        $mikro = $this->formatDetail(
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->where('skala_objek_pengawasan', 'ILIKE', 'Mikro')
                ->count()
        );

        $kecil = $this->formatDetail(
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->where('skala_objek_pengawasan', 'ILIKE', 'Kecil')
                ->count()
        );

        $menengah = $this->formatDetail(
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->where('skala_objek_pengawasan', 'ILIKE', 'Menengah')
                ->count()
        );

        $besar = $this->formatDetail(
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->where('skala_objek_pengawasan', 'ILIKE', 'Besar')
                ->count()
        );

        $tidak_terident = $this->formatDetail(
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->whereNull('skala_objek_pengawasan')
                ->count()
        );

        /* ===============================
           DATA PROVINSI (GRAFIK)
        =============================== */
        $dataProvinsi = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select(
                'provinsi',
                DB::raw('COUNT(*) as total')
            )
            ->whereNotNull('provinsi')
            ->where('provinsi', '!=', '')
            ->groupBy('provinsi')
            ->orderByDesc('total')
            ->get();

        $maxVal = $dataProvinsi->max('total');

        /* ===============================
           KIRIM KE BLADE
        =============================== */
        return view('wlkp.index', compact(
            'totalSemua',
            'mikro',
            'kecil',
            'menengah',
            'besar',
            'tidak_terident',
            'dataProvinsi',
            'maxVal'
        ));
    }
}
