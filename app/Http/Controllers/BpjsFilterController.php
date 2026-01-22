<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BpjsFilterController extends Controller
{
    public function filter(Request $request)
    {
        $provinsi = $request->provinsi;
        $satuan   = $request->satuan;

        $query = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select(
                'provinsi',
                DB::raw("SUM(CASE WHEN jkk = 'Ada' THEN 1 ELSE 0 END) as jkk"),
                DB::raw("SUM(CASE WHEN jht = 'Ada' THEN 1 ELSE 0 END) as jht"),
                DB::raw("SUM(CASE WHEN jkm = 'Ada' THEN 1 ELSE 0 END) as jkm"),
                DB::raw("SUM(CASE WHEN jp  = 'Ada' THEN 1 ELSE 0 END) as jp")
            )
            ->groupBy('provinsi')
            ->orderBy('provinsi');

        if ($provinsi && $provinsi !== 'all') {
            $query->where('provinsi', $provinsi);
        }

        return response()->json($query->get());
    }
}
