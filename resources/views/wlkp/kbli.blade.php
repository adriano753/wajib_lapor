<link rel="stylesheet" href="{{ asset('css/dropdown.css') }}">

<section class="card p-3 mb-4">
    <h2 class="mb-3">Rekap Lapangan Usaha (KBLI)</h2>
<form method="GET" id="filterForm" class="filter-container">
    
    <div class="dropdown-wrapper">
        <select name="tahun" onchange="this.form.submit()">
            <option value="">-- Periode Tahun --</option>
            @foreach ($optTahun as $t)
                <option value="{{ $t }}" @selected(request('tahun')==$t)>{{ $t }}</option>
            @endforeach
        </select>
    </div>

    <div class="dropdown-wrapper">
        <select name="bulan" onchange="this.form.submit()">
            <option value="">-- Periode Bulan --</option>
            @foreach ($optBulan as $b)
                <option value="{{ $b }}" @selected(request('bulan')==$b)>{{ $b }}</option>
            @endforeach
        </select>
    </div>

    <div class="dropdown-wrapper">
        <select name="provinsi" onchange="this.form.submit()">
            <option value="">-- Provinsi --</option>
            @foreach ($optProvinsi as $p)
                <option value="{{ $p }}" @selected(request('provinsi')==$p)>{{ $p }}</option>
            @endforeach
        </select>
    </div>

    <div class="dropdown-wrapper">
        <select name="kota" onchange="this.form.submit()">
            <option value="">-- Kab / Kota --</option>
            @foreach ($optKota as $k)
                <option value="{{ $k }}" @selected(request('kota')==$k)>{{ $k }}</option>
            @endforeach
        </select>
    </div>

    <div class="dropdown-wrapper" style="width: 100%; margin-top: 5px;">
        <select name="kbli" onchange="this.form.submit()" style="width: 100%;">
            <option value="">Lapangan Usaha</option>
            @foreach ($optKBLI as $k)
                <option value="{{ $k }}" @selected(request('kbli')==$k)>{{ $k }}</option>
            @endforeach
        </select>
        <div class="dropdown-info">
            Pilih klasifikasi lapangan usaha sesuai data terbaru.
        </div>
    </div>
</form>

<div class="chart-scroll-wrapper" style="width: 100%; overflow-x: auto; margin-top: 20px; border-radius: 10px;">
    <div id="chartStage" style="height: 450px; min-width: 100%;">
        <canvas id="kbliList"></canvas>
    </div>
</div>
</section>
