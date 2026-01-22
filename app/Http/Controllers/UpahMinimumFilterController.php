<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpahMinimumFilterController extends Controller
{
    public function filter(Request $request)
    {
        $provinsi = $request->provinsi;

        $query = DB::table('wajiblapor.report_detil_wlkp_binwas')
            ->select(
                'provinsi',
                DB::raw("SUM(CASE WHEN upah_minimum = 'Ada' THEN 1 ELSE 0 END) as total")
            )
            ->groupBy('provinsi')
            ->orderBy('provinsi');

        if ($provinsi && $provinsi !== 'all') {
            $query->where('provinsi', $provinsi);
        }

        return response()->json($query->get());
    }
}
