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

    /**
     * Helper untuk format angka
     */
    private function formatDetail($n)
    {
        return number_format((int) $n, 0, ',', '.');
    }

    // ===============================
    // HALAMAN UTAMA (INDEX)
    // ===============================
    public function index(Request $request)
    {
        // 1. Definisikan Filters
        $filters = $request->only(['tahun', 'bulan', 'kota', 'provinsi', 'kbli']);

        // 2. Ambil Data dari Service
        $masterData   = $this->service->getMasterData();
        $dropdowns    = $this->service->getDropdowns();
        $dropdownKBLI = $this->service->getDropdownsKBLI();
        $kbliChart = $this->service->getRekapKBLI($filters);
        $kbliLabels = $kbliChart->pluck('nama_2_digit')->values();
        $kbliValues = $kbliChart->pluck('total')->values();


        /* ===============================
   DROPDOWN KAB/KOTA DINAMIS
=============================== */
        $optKota = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->when($request->provinsi, function ($q) use ($request) {
                $q->where('provinsi', $request->provinsi);
            })
            ->select('kota')
            ->whereNotNull('kota')
            ->distinct()
            ->orderBy('kota')
            ->pluck('kota');

        /* ===============================
           TOTAL KESELURUHAN
        =============================== */
        $totalRaw = DB::table('wajiblapor.report_detil_wlkp_binwas')->count();
        $totalSemua = $this->formatDetail($totalRaw);

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
            ->select('provinsi', DB::raw('COUNT(*) as total'))
            ->orderByDesc('total')
            ->groupBy('provinsi')
            ->get();

        // 1. Ambil data mentah klasifikasi
        $rawKlasifikasi = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select('skala_objek_pengawasan', DB::raw('COUNT(*) as total'))
            ->groupBy('skala_objek_pengawasan')
            ->get();

        // 2. Mapping agar urutan SESUAI LABEL CHART
        $mapped = $rawKlasifikasi->mapWithKeys(function ($item) {
            return [strtolower($item->skala_objek_pengawasan) => $item->total];
        });

        // 3. Susun Array Final
        $dataKlasifikasi = [
            $mapped['mikro'] ?? 0,
            $mapped['kecil'] ?? 0,
            $mapped['menengah'] ?? 0,
            $mapped['besar'] ?? 0,
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->whereNull('skala_objek_pengawasan')
                ->orWhere('skala_objek_pengawasan', '')
                ->count()
        ];

        $listProvinsi = $dataProvinsi->pluck('provinsi');
        $maxVal = $dataProvinsi->max('total');

        $dataProvinsi = $dataProvinsi->map(function ($row) use ($maxVal) {
            $row->height = $maxVal > 0 ? ($row->total / $maxVal * 100) : 0;
            return $row;
        });

        /* ===============================
           KIRIM KE BLADE (Return Final)
        =============================== */
        return view('wlkp.index', compact(
            'masterData',
            'kbliChart',
            'totalSemua',
            'mikro',
            'kecil',
            'menengah',
            'besar',
            'tidak_terident',
            'dataProvinsi',
            'dataKlasifikasi',
            'listProvinsi',
            'maxVal',
            'totalTk',
            'totalLlmb',
            'totalPmb',
            'totalJaksel',
            'rows',
            'kota',
            'mikroChart',
            'kecilChart',
            'menengahChart',
            'kbliChart',
            'kbliLabels',
            'kbliValues',
            'besarChart'
        ), [
            'optTahun'       => $dropdowns['tahun'],
            'optProvinsi'    => $dropdowns['provinsi'],
            'optKota'        => $dropdowns['kota'],
            'optKlasifikasi' => $dropdowns['klasifikasi'],
            'optBulan'       => $dropdownKBLI['bulan'],
            'optKBLI'     => $dropdownKBLI['kbli'],
        ]);
    }
}
