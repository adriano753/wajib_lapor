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

        $masterData = $this->service->getMasterData();

        $dropdowns = $this->service->getDropdowns();
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
            ->selectRaw("
        COALESCE(NULLIF(TRIM(provinsi), ''), 'Tidak Diketahui') AS provinsi,
        COALESCE(NULLIF(TRIM(kota), ''), 'Tidak Diketahui') AS kota,
        skala_objek_pengawasan,
        SUM(CAST(jumlah_karyawan_masih_bekerja AS INTEGER)) AS total_wni,
        SUM(CAST(tka_masih_bekerja AS INTEGER)) AS total_wna,
        SUM(CAST(laki_laki_masih_bekerja AS INTEGER)) AS total_laki,
        SUM(CAST(perempuan_masih_bekerja AS INTEGER)) AS total_perempuan,
        SUM(CAST(laki_laki_tka_masih_bekerja AS INTEGER)) AS total_tka_laki,
        SUM(CAST(perempuan_tka_masih_bekerja AS INTEGER)) AS total_tka_perempuan,
        SUM(CAST(pkwtt_masih_bekerja AS INTEGER)) AS total_pkwtt,
        SUM(CAST(pkwt_masih_bekerja AS INTEGER)) total_pkwt
    ")
            ->groupBy('provinsi', 'kota', 'skala_objek_pengawasan')
            ->orderBy('provinsi')
            ->orderBy('kota')
            ->get();


        // Label X (kota)
        $kota = $rows->pluck('kota')->unique()->values();


        /* ===============================
        DATA GRAFIK TENAGA KERJA PER PROVINSI
        =============================== */
        $rowsProvinsi = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->selectRaw("
        COALESCE(NULLIF(TRIM(provinsi), ''), 'Tidak Diketahui') AS provinsi,
        skala_objek_pengawasan,
        SUM(CAST(jumlah_karyawan_masih_bekerja AS INTEGER)) AS total_wni,
        SUM(CAST(tka_masih_bekerja AS INTEGER)) AS total_wna,
        SUM(CAST(jumlah_karyawan_masih_bekerja AS INTEGER)) +
        SUM(CAST(tka_masih_bekerja AS INTEGER)) AS total_all,
        SUM(CAST(laki_laki_masih_bekerja AS INTEGER)) AS total_laki,
        SUM(CAST(perempuan_masih_bekerja AS INTEGER)) AS total_perempuan,
        SUM(CAST(laki_laki_tka_masih_bekerja AS INTEGER)) AS total_tka_laki,
        SUM(CAST(perempuan_tka_masih_bekerja AS INTEGER)) AS total_tka_perempuan,
        SUM(CAST(pkwtt_masih_bekerja AS INTEGER)) AS total_pkwtt,
        SUM(CAST(pkwt_masih_bekerja AS INTEGER)) total_pkwt
    ")
            ->groupBy('provinsi', 'skala_objek_pengawasan')
            ->orderBy('provinsi')
            ->get();


        // Label X (kota)
        $provinsi = $rowsProvinsi->pluck('provinsi')->unique()->values();

        $mikroProv = [];
        $kecilProv = [];
        $menengahProv = [];
        $besarProv = [];

        foreach ($provinsi as $p) {
            $mikroProv[] = $rowsProvinsi
                ->where('provinsi', $p)
                ->where('skala_objek_pengawasan', 'Mikro')
                ->sum('total_wni');

            $kecilProv[] = $rowsProvinsi
                ->where('provinsi', $p)
                ->where('skala_objek_pengawasan', 'Kecil')
                ->sum('total_wni');

            $menengahProv[] = $rowsProvinsi
                ->where('provinsi', $p)
                ->where('skala_objek_pengawasan', 'Menengah')
                ->sum('total_wni');

            $besarProv[] = $rowsProvinsi
                ->where('provinsi', $p)
                ->where('skala_objek_pengawasan', 'Besar')
                ->sum('total_wni');
        }



        // Helper mapping data chart
        $mapData = function ($skala) use ($rows, $kota) {
            return $kota->map(function ($kot) use ($rows, $skala) {
                return (int) ($rows
                    ->where('kota', $kot)
                    ->where('skala_objek_pengawasan', $skala)
                    ->first()->total_wni ?? 0);
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
                DB::raw("COALESCE(provinsi, 'TIDAK TERINDENTIFIKASI') as provinsi"), 
                DB::raw('COUNT(*) as total')
            )
            ->groupBy(DB::raw("COALESCE(provinsi, 'TIDAK TERINDENTIFIKASI')")) 
            ->orderByDesc('total')
            ->get();



        // 1. Ambil data mentah (Group By boleh, tapi JANGAN langsung dikirim ke view)
        $rawKlasifikasi = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select('skala_objek_pengawasan', DB::raw('COUNT(*) as total'))
            ->groupBy('skala_objek_pengawasan')
            ->get();

        // 2. Mapping agar urutan SESUAI LABEL CHART
        // Kita ubah jadi key-value pair dulu: ['mikro' => 100, 'besar' => 500]
        $mapped = $rawKlasifikasi->mapWithKeys(function ($item) {
            return [strtolower($item->skala_objek_pengawasan) => $item->total];
        });

        // 3. Susun Array Final (Urutan Wajib: Mikro -> Kecil -> Menengah -> Besar -> Lainnya)
        $dataKlasifikasi = [
            $mapped['mikro'] ?? 0,
            $mapped['kecil'] ?? 0,
            $mapped['menengah'] ?? 0,
            $mapped['besar'] ?? 0,
            $mapped['tidak terindentifikasi'] ?? 0,
            // Hitung yang null/tidak teridentifikasi manual atau ambil dari sisa
            DB::table('wajiblapor.report_detil_wlkp_binwas')
                ->whereNull('skala_objek_pengawasan')
                ->orWhere('skala_objek_pengawasan', '')
                ->count()
        ];

        $listProvinsi = $dataProvinsi->pluck('provinsi');
        $maxVal = $dataProvinsi->max('total');

        // DATA JAMINAN SOSIAL PER PROVINSI

        $rowsBpjs = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select(
                'provinsi',
                DB::raw("SUM(CASE WHEN jkk = 'Ada' THEN 1 ELSE 0 END) as jkk"),
                DB::raw("SUM(CASE WHEN jht = 'Ada' THEN 1 ELSE 0 END) as jht"),
                DB::raw("SUM(CASE WHEN jkm = 'Ada' THEN 1 ELSE 0 END) as jkm"),
                DB::raw("SUM(CASE WHEN jp  = 'Ada' THEN 1 ELSE 0 END) as jp")
            )
            ->groupBy('provinsi')
            ->orderBy('provinsi')
            ->get();


        $dataProvinsi = $dataProvinsi->map(function ($row) use ($maxVal) {
            $row->height = $maxVal > 0 ? ($row->total / $maxVal * 100) : 0;
            return $row;
        });

        /* ===============================
            END DATA PROVINSI (GRAFIK)
        =============================== */

        /* ========================================================
           START DATA SEBARAN TK BERDASARKAN KBLI 2 DIGIT (GRAFIK)
        =========================================================== */
        $rowsKodeTk = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select(
                'kode_2_digit',
                'nama_2_digit',
                'provinsi',
                DB::raw('SUM(COALESCE(jumlah_karyawan_masih_bekerja,0)) as total')
            )
            ->groupBy('kode_2_digit', 'nama_2_digit', 'provinsi')
            ->orderBy('kode_2_digit')
            ->get();

        $maxValTk = $rowsKodeTk->max('total');



        /* ========================================================
           END DATA SEBARAN TK BERDASARKAN KBLI 2 DIGIT (GRAFIK)
        =========================================================== */

        /* ===============================
           KIRIM KE BLADE
        =============================== */
        return view('wlkp.index', compact(
            'masterData',
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
            'maxValTk',
            'rowsKodeTk',
            'totalTk',
            'totalLlmb',
            'totalPmb',
            'totalJaksel',
            'rows',
            'rowsBpjs',
            'rowsProvinsi',
            'provinsi',
            // tenaga kerja chart
            'kota',
            'mikroChart',
            'kecilChart',
            'menengahChart',
            'besarChart',
            'mikroProv',
            'kecilProv',
            'menengahProv',
            'besarProv'
        ), [
            'optTahun' => $dropdowns['tahun'], 
            'optProvinsi'=> $dropdowns['provinsi'],
            'optKota' => $dropdowns ['kota'],
            'optKlasifikasi' => $dropdowns ['klasifikasi'],
        ]);
    }
}
