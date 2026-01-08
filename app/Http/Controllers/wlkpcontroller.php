<?php

namespace App\Http\Controllers;


use App\Services\WlkpService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WlkpController extends Controller
{

    protected $service;

    // Inject Service
    public function __construct(WlkpService $service)
    {
        $this->service = $service;
    }

    private function formatDetail($n)
    {
        return number_format((int) $n, 0, ',', '.');
    }

// ===============================
    // HALAMAN UTAMA (INDEX)
    // ===============================
    public function index(Request $request)
    {
        // $filters = $request->all();

        $listTahun = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->selectRaw('EXTRACT(YEAR FROM tanggal_laporan) as tahun')
            ->whereNotNull('tanggal_laporan')
            ->distinct()
            ->orderByDesc('tahun')
            ->pluck('tahun');

        $totalSemua = $this->formatDetail(
            DB::table('wajiblapor.report_detil_wlkp_binwas')->count()
        );

        if ($request->filled('kota') && empty($request->provinsi)) {
        
        $cekProvinsi = \Illuminate\Support\Facades\DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->where('kota', $request->kota)
            ->value('provinsi'); 
            

        if ($cekProvinsi) {
            $request->merge(['provinsi' => $cekProvinsi]);
        }
    }

        // $optTahun = $this->service->getYearOptions();
        // $optProvinsi = $this->service->getDistinctColumn('provinsi');
        // $optKlasifikasi = $this->service->getDistinctColumn('skala_objek_pengawasan');
        // // Dropdown Kota pintar (berubah sesuai provinsi)
        // $optKota = $this->service->getCityOptions($request->provinsi);

        /* ===============================
           TOTAL KESELURUHAN
        =============================== */
        $totalRaw = DB::table('wajiblapor.report_detil_wlkp_binwas')->count();
        $totalSemua = $this->formatDetail($totalRaw);
        $dropdowns = $this->service->getDropdowns($request->provinsi);
        $chartProvinsi    = $this->service->getChartProvinsi($request->all());
        $chartKota        = $this->service->getChartKota($request->all());
        $chartKlasifikasi = $this->service->getChartKlasifikasi($request->all());


        /* ===============================
           TOTAL TENAGAKERJA
        =============================== */
        $totalTkRaw = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->selectRaw('SUM(CAST(jumlah_karyawan_masih_bekerja AS INTEGER)) as total')
            ->value('total');

        $totalTk = $this->formatDetail($totalTkRaw ?? 0);

        // TOTAL LAKI-LAKI MASIH BEKERJA
        $totalLlmb = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->selectRaw('SUM(CAST(laki_laki_masih_bekerja AS INTEGER)) as total')
            ->value('total');

        $totalLlmb = $this->formatDetail($totalLlmb ?? 0);

        // TOTAL PEREMPUAN MASIH BEKERJA
        $totalPmb = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->selectRaw('SUM(CAST(perempuan_masih_bekerja AS INTEGER)) as total')
            ->value('total');

        $totalPmb = $this->formatDetail($totalPmb ?? 0);

        $totalJaksel = $this->formatDetail(
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->where('kota', 'ILIKE', 'KOTA ADM. JAKARTA SELATAN')
                ->where('skala_objek_pengawasan', 'Besar')
                ->sum(DB::raw('CAST(jumlah_karyawan_masih_bekerja AS INTEGER)'))
        );


        /* ===============================
           DATA GRAFIK TENAGA KERJA PER KABUPATEN
        =============================== */
        $rows = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select(
                'kota',
                'skala_objek_pengawasan',
                DB::raw('SUM(CAST(jumlah_karyawan_masih_bekerja AS INTEGER)) as total')
            )
            ->whereNotNull('kota')
            ->groupBy('kota', 'skala_objek_pengawasan')
            ->orderBy('kota')
            ->get();


        // Label X (kota)
        $kota = $rows->pluck('kota')->unique()->values();

        // Helper mapping data chart
        $mapData = function ($skala) use ($rows, $kota) {
            return $kota->map(function ($kot) use ($rows, $skala) {
                return (int) ($rows
                    ->where('kota', $kot)
                    ->where('skala_objek_pengawasan', $skala)
                    ->first()->total ?? 0);
            });
        };

        $mikroChart     = $mapData('Mikro');
        $kecilChart     = $mapData('Kecil');
        $menengahChart  = $mapData('Menengah');
        $besarChart     = $mapData('Besar');

        /* ===============================
           END TOTAL TENAGA KERJA
        =============================== */


        /* ===============================
           TOTAL TENAGAKERJA
        =============================== */
        $totalTkRaw = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->selectRaw('SUM(CAST(jumlah_karyawan_masih_bekerja AS INTEGER)) as total')
            ->value('total');

        $totalTk = $this->formatDetail($totalTkRaw ?? 0);

        // TOTAL LAKI-LAKI MASIH BEKERJA
        $totalLlmb = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->selectRaw('SUM(CAST(laki_laki_masih_bekerja AS INTEGER)) as total')
            ->value('total');

        $totalLlmb = $this->formatDetail($totalLlmb ?? 0);

        // TOTAL PEREMPUAN MASIH BEKERJA
        $totalPmb = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->selectRaw('SUM(CAST(perempuan_masih_bekerja AS INTEGER)) as total')
            ->value('total');

        $totalPmb = $this->formatDetail($totalPmb ?? 0);

        $totalJaksel = $this->formatDetail(
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->where('kota', 'ILIKE', 'KOTA ADM. JAKARTA SELATAN')
                ->where('skala_objek_pengawasan', 'Besar')
                ->sum(DB::raw('CAST(jumlah_karyawan_masih_bekerja AS INTEGER)'))
        );


        /* ===============================
           DATA GRAFIK TENAGA KERJA PER KABUPATEN
        =============================== */
        $rows = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select(
                'kota',
                'skala_objek_pengawasan',
                DB::raw('SUM(CAST(jumlah_karyawan_masih_bekerja AS INTEGER)) as total')
            )
            ->whereNotNull('kota')
            ->groupBy('kota', 'skala_objek_pengawasan')
            ->orderBy('kota')
            ->get();


        // Label X (kota)
        $kota = $rows->pluck('kota')->unique()->values();

        // Helper mapping data chart
        $mapData = function ($skala) use ($rows, $kota) {
            return $kota->map(function ($kot) use ($rows, $skala) {
                return (int) ($rows
                    ->where('kota', $kot)
                    ->where('skala_objek_pengawasan', $skala)
                    ->first()->total ?? 0);
            });
        };

        $mikroChart     = $mapData('Mikro');
        $kecilChart     = $mapData('Kecil');
        $menengahChart  = $mapData('Menengah');
        $besarChart     = $mapData('Besar');

        /* ===============================
           END TOTAL TENAGA KERJA
        =============================== */

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
           DATA PROVINSI (GRAFIK STATIS)
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
        $maxProvinsi   = $chartProvinsi->max('total');
        $maxKlasifikasi   = $chartKlasifikasi->max('total');
        $maxKota   = $chartKota->max('total');

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
            'maxVal',
            'maxProvinsi',
            'maxKlasifikasi',
            'maxKota',
            'chartProvinsi',
            'chartKota',
            'chartKlasifikasi',
            'totalTk',
            'totalLlmb',
            'totalPmb',
            'totalJaksel',
            'rows',
            // tenaga kerja chart
            'kota',
            'mikroChart',
            'kecilChart',
            'menengahChart',
            'besarChart',
        ), [
            'optTahun' => $dropdowns['tahun'], 
            'optProvinsi'=> $dropdowns['provinsi'],
            'optKota' => $dropdowns ['kota'],
            'optKlasifikasi' => $dropdowns ['klasifikasi'],
        ]);
    }
}
