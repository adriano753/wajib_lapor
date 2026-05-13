<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function chartKetenagakerjaan(Request $request)
    {
        $query = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->when($request->provinsi, function ($q) use ($request) {
                $q->whereRaw("TRIM(LOWER(provinsi)) = TRIM(LOWER(?))", [$request->provinsi]);
            })
            ->when($request->kabupaten, function ($q) use ($request) {
                $q->whereRaw("TRIM(LOWER(kota)) = TRIM(LOWER(?))", [$request->kabupaten]);
            });

        if ($request->kabupaten) {
            $groupField = 'kota';
        } elseif ($request->provinsi) {
            $groupField = 'kota';
        } else {
            $groupField = 'provinsi';
        }

        $data = $query->whereNotNull($groupField)->selectRaw("
    $groupField as wilayah,
    COUNT(*) AS total_perusahaan,

    COUNT(CASE WHEN lembaga_p2k3 = 'Ada' AND jumlah_karyawan_masih_bekerja > 100 THEN 1 END) AS p2k3_sudah,
    COUNT(CASE WHEN lembaga_p2k3 = 'Tidak Ada' AND jumlah_karyawan_masih_bekerja > 100 THEN 1 END) AS p2k3_belum,

    COUNT(CASE WHEN personil_k3 = 'Ada' AND jumlah_karyawan_masih_bekerja > 100 THEN 1 END) AS ahli_sudah,
    COUNT(CASE WHEN COALESCE(personil_k3,'Tidak Ada') = 'Tidak Ada' AND jumlah_karyawan_masih_bekerja > 100 THEN 1 END) AS ahli_belum,
    SUM(CASE WHEN personil_k3 = 'Ada' AND jumlah_karyawan_masih_bekerja > 100 THEN COALESCE(jumlah_personil_k3, 0) ELSE 0 END) AS total_ahli_k3,

    COUNT(CASE WHEN disabilitas_masih_bekerja > 0 THEN 1 END) AS disabilitas_sudah,
    COUNT(CASE WHEN COALESCE(disabilitas_masih_bekerja, 0) = 0 THEN 1 END) AS disabilitas_belum,
    SUM(COALESCE(disabilitas_masih_bekerja, 0)) AS total_disabilitas,

    COUNT(CASE WHEN melapor_memiliki_susu = 'Ada' THEN 1 END) AS susu_sudah,
    COUNT(CASE WHEN COALESCE(melapor_memiliki_susu,'Tidak Ada') = 'Tidak Ada' THEN 1 END) AS susu_belum,

    COUNT(CASE WHEN serikat_pekerja = 'Ada' THEN 1 END) AS serikat_sudah,
    COUNT(CASE WHEN serikat_pekerja = 'Tidak Ada' THEN 1 END) AS serikat_belum,

    COUNT(CASE WHEN lks_bipartit = 'Ada' AND jumlah_karyawan_masih_bekerja > 50 THEN 1 END) AS lks_bipartit_sudah,
    COUNT(CASE WHEN lks_bipartit = 'Tidak Ada' AND jumlah_karyawan_masih_bekerja > 50 THEN 1 END) AS lks_bipartit_belum,

    COUNT(CASE WHEN waktu_kerja_waktu_istirahat = 'Ada' THEN 1 END) AS wk_sudah,
    COUNT(CASE WHEN waktu_kerja_waktu_istirahat = 'Tidak Ada' THEN 1 END) AS wk_belum,
    COUNT(CASE WHEN LOWER(kategori_jam_kerja) LIKE '%umum%' THEN 1 END) AS wk_umum,
    COUNT(CASE WHEN LOWER(kategori_jam_kerja) LIKE '%sektor%' THEN 1 END) AS wk_sektor,

    COUNT(CASE WHEN rencana_tk = 'Ada' THEN 1 END) AS rtk_sudah,
    COUNT(CASE WHEN rencana_tk = 'Tidak Ada' THEN 1 END) AS rtk_belum
")
            ->groupBy($groupField)
            ->orderBy($groupField)
            ->get();
        return response()->json([
            'p2k3' => [
                'labels' => $data->pluck('wilayah')->values()->toArray(),
                'sudah'  => $data->pluck('p2k3_sudah')->values()->toArray(),
                'belum'  => $data->pluck('p2k3_belum')->values()->toArray(),
                'perusahaan' => $data->pluck('total_perusahaan')->values()->toArray()
            ],
            'ahli_k3' => [
                'labels' => $data->pluck('wilayah')->values()->toArray(),
                'sudah'  => $data->pluck('ahli_sudah')->values()->toArray(),
                'belum'  => $data->pluck('ahli_belum')->values()->toArray(),
                'total'  => $data->pluck('total_ahli_k3')->values()->toArray(),
                'perusahaan' => $data->pluck('total_perusahaan')->values()->toArray()

            ],
            'disabilitas' => [
                'labels' => $data->pluck('wilayah')->values()->toArray(),
                'sudah'  => $data->pluck('disabilitas_sudah')->values()->toArray(),
                'belum'  => $data->pluck('disabilitas_belum')->values()->toArray(),
                'total'  => $data->pluck('total_disabilitas')->values()->toArray(),
                'perusahaan' => $data->pluck('total_perusahaan')->values()->toArray() // 🔥 BARU
            ],
            'susu' => [
                'labels' => $data->pluck('wilayah')->values()->toArray(),
                'sudah'  => $data->pluck('susu_sudah')->values()->toArray(),
                'belum'  => $data->pluck('susu_belum')->values()->toArray(),
                'perusahaan' => $data->pluck('total_perusahaan')->values()->toArray()
            ],
            'serikat' => [
                'labels' => $data->pluck('wilayah')->values()->toArray(),
                'sudah'  => $data->pluck('serikat_sudah')->values()->toArray(),
                'belum'  => $data->pluck('serikat_belum')->values()->toArray(),
                'perusahaan' => $data->pluck('total_perusahaan')->values()->toArray()
            ],
            'bipartit' => [
                'labels' => $data->pluck('wilayah')->values()->toArray(),
                'sudah'  => $data->pluck('lks_bipartit_sudah')->values()->toArray(),
                'belum'  => $data->pluck('lks_bipartit_belum')->values()->toArray(),
                'perusahaan' => $data->pluck('total_perusahaan')->values()->toArray()
            ],
            'waktu_kerja' => [
                'labels' => $data->pluck('wilayah')->values()->toArray(),
                'umum'   => $data->pluck('wk_umum')->values()->toArray(),
                'sektor' => $data->pluck('wk_sektor')->values()->toArray(),
                'perusahaan' => $data->pluck('total_perusahaan')->values()->toArray()
            ],
            'rencana_tk' => [
                'labels' => $data->pluck('wilayah')->values()->toArray(),
                'sudah'  => $data->pluck('rtk_sudah')->values()->toArray(),
                'belum'  => $data->pluck('rtk_belum')->values()->toArray(),
                'perusahaan' => $data->pluck('total_perusahaan')->values()->toArray()
            ],
        ]);
    }
}
