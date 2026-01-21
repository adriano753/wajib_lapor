<form method="GET" id="filterForm">
    <select name="tahun" onchange="this.form.submit()">
        <option value="">-- Periode Tahun --</option>
        @foreach ($optTahun as $t)
            <option value="{{ $t }}" @selected(request('tahun')==$t)>{{ $t }}</option>
        @endforeach
    </select>

    <select name="bulan" onchange="this.form.submit()">
        <option value="">-- Periode Bulan --</option>
        @foreach ($optBulan as $b)
            <option value="{{ $b }}" @selected(request('bulan')==$b)>{{ $b }}</option>
        @endforeach
    </select>

    <select name="provinsi" onchange="this.form.submit()">
        <option value="">-- Provinsi --</option>
        @foreach ($optProvinsi as $p)
            <option value="{{ $p }}" @selected(request('provinsi')==$p)>{{ $p }}</option>
        @endforeach
    </select>

    <select name="kota" onchange="this.form.submit()">
        <option value="">-- Kab / Kota --</option>
        @foreach ($optKota as $k)
            <option value="{{ $k }}" @selected(request('kota')==$k)>{{ $k }}</option>
        @endforeach
    </select>

    <select name="kbli" onchange="this.form.submit()">
        <option value="">Lapangan Usaha</option>
        @foreach ($optKBLI as $k)
            <option value="{{ $k }}" @selected(request('kbli')==$k)>{{ $k }}</option>
        @endforeach
    </select>
</form>

{{-- 🔥 INI YANG WAJIB --}}
<div style="height:400px;margin-top:20px">
    <canvas id="kbliList"></canvas>
</div>
