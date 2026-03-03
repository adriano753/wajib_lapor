<link rel="stylesheet" href="{{ asset('css/dropdown.css') }}">

<section class="card p-3 mb-4">
    <h2 class="mb-3">Rekap Lapangan Usaha (KBLI)</h2>

    <div id="filterForm" class="filter-container">
        
        <div class="dropdown-wrapper">
            <select id="filterTahun">
                <option value="">-- Periode Tahun --</option>
                @foreach ($optTahun as $t)
                    <option value="{{ $t }}">{{ $t }}</option>
                @endforeach
            </select>
        </div>

        <div class="dropdown-wrapper">
            <select id="filterBulan">
                <option value="">-- Periode Bulan --</option>
                @foreach ($optBulan as $b)
                    <option value="{{ $b }}">{{ $b }}</option>
                @endforeach
            </select>
        </div>

        <div class="dropdown-wrapper">
            <select id="filterProvinsi">
                <option value="">-- Provinsi --</option>
                @foreach ($optProvinsi as $p)
                    <option value="{{ $p }}">{{ $p }}</option>
                @endforeach
            </select>
        </div>

        <div class="dropdown-wrapper">
            <select id="filterKota">
                <option value="">-- Kab / Kota --</option>
                @foreach ($optKota as $k)
                    <option value="{{ $k }}">{{ $k }}</option>
                @endforeach
            </select>
        </div>

        <div class="dropdown-wrapper" style="width: 100%; margin-top: 5px;">
            <select id="filterKbli" style="width: 100%;">
                <option value="">Lapangan Usaha</option>
                @foreach ($optKBLI as $k)
                    <option value="{{ $k }}">{{ $k }}</option>
                @endforeach
            </select>
            <div class="dropdown-info">
                Pilih klasifikasi lapangan usaha sesuai data terbaru.
            </div>
        </div>

    </div>

    <div class="chart-scroll-wrapper" style="width: 100%; overflow-x: auto; margin-top: 20px; border-radius: 10px;">
        <div id="chartStage" style="height: 450px; min-width: 100%;">
            <canvas id="kbliList"></canvas>
        </div>
    </div>
</section>
