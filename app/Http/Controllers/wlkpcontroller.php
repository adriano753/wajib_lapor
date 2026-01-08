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
            'listTahun'
        ), [
            'optTahun' => $dropdowns['tahun'], 
            'optProvinsi'=> $dropdowns['provinsi'],
            'optKota' => $dropdowns ['kota'],
            'optKlasifikasi' => $dropdowns ['klasifikasi'],
        ]);
    }
    // ===============================
    // FILTER CHART (KHUSUS PERUSAHAANKLASIFIKASI)
    // ===============================
    public function filterProvinsi(Request $request)
    {
        $query = DB::table('wajiblapor.report_detil_wlkp_binwas');

        if ($request->tahun) {
            $query->whereYear('tanggal_laporan', $request->tahun);
        }

        if ($request->bulan) {
            $query->whereMonth('tanggal_laporan', $request->bulan);
        }

        if ($request->provinsi) {
            $query->where('provinsi', $request->provinsi);
        }

        if ($request->klasifikasi) {
            $query->where('skala_objek_pengawasan', $request->klasifikasi);
        }

        return $query
            ->select('provinsi', DB::raw('COUNT(*) as total'))
            ->groupBy('provinsi')
            ->orderByDesc('total')
            ->get();
    }

    // ===============================
    // DROPDOWN KABUPATEN
    // ===============================
    public function getKabupaten(Request $request)
    {
        return DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->where('provinsi', $request->provinsi)
            ->whereNotNull('kabupaten_kota')
            ->distinct()
            ->orderBy('kabupaten_kota')
            ->pluck('kabupaten_kota');
    }
}
