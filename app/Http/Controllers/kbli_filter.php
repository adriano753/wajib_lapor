<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KbliFilterController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('report_detil_wlkp_binwas');

        // Filter periode bulan dari tgl_pendaftaran
        if ($request->filled('bulan')) {
            $query->whereMonth('tgl_pendaftaran', $request->bulan);
        }

        // Filter periode tahun dari tgl_pendaftaran
        if ($request->filled('tahun')) {
            $query->whereYear('tgl_pendaftaran', $request->tahun);
        }

        // Filter KBLI / per lapangan usaha
        if ($request->filled('kbli')) {
            $query->where('nama_5_digit', $request->kbli);
        }

        // Filter provinsi
        if ($request->filled('provinsi')) {
            $query->where('provinsi', $request->provinsi);
        }

        // Filter kabupaten / kota
        if ($request->filled('kabupaten')) {
            $query->where('kabupaten_kota', $request->kabupaten);
        }

        $data = $query->get();

        // Data dropdown
        $bulanList = DB::table('report_detil_wlkp_binwas')
            ->selectRaw('DISTINCT EXTRACT(MONTH FROM tgl_pendaftaran) as bulan')
            ->orderBy('bulan')
            ->pluck('bulan');

        $tahunList = DB::table('report_detil_wlkp_binwas')
            ->selectRaw('DISTINCT EXTRACT(YEAR FROM tgl_pendaftaran) as tahun')
            ->orderBy('tahun')
            ->pluck('tahun');

        $kbliList = DB::table('report_detil_wlkp_binwas')
            ->select('nama_5_digit')
            ->distinct()
            ->orderBy('nama_5_digit')
            ->pluck('nama_5_digit');

        $provinsiList = DB::table('report_detil_wlkp_binwas')
            ->select('provinsi')
            ->distinct()
            ->orderBy('provinsi')
            ->pluck('provinsi');

        $kabupatenList = DB::table('report_detil_wlkp_binwas')
            ->select('kabupaten_kota')
            ->distinct()
            ->orderBy('kabupaten_kota')
            ->pluck('kabupaten_kota');

        return view('kbli', compact(
            'data',
            'bulanList',
            'tahunList',
            'kbliList',
            'provinsiList',
            'kabupatenList'
        ));
    }
}
