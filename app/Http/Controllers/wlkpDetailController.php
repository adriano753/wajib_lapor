<?php
namespace App\Http\Controllers;

use Request;


class WlkpDetailController extends Controller {
    
    public function index(Request $request) {
        return view('wlkp.detail');
    }
}