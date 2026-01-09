<section class="dashboard-section chart-card full-width chart-container">

    <select id="tahunSelect" class="form-select mb-3">
        <option value="">-- Periode Tahun --</option>
        @foreach ($optTahun as $k)
            <option value="{{ $k }}">{{ $k }}</option>
        @endforeach
    </select>
    <select id="bulanSelect" class="form-select mb-3">
        <option value="">-- Periode Bulan --</option>
        @for ($i = 1; $i <= 12; $i++)
            <option value="{{ $i }}">{{ date('F', mktime(0, 0, 0, $i, 10)) }}</option>
        @endfor
    </select>
    <select id="provinsiSelect" class="form-select mb-3">
        <option value="">-- Pilih Provinsi --</option>
        @foreach ($optProvinsi as $k)
            <option value="{{ $k }}">{{ $k }}</option>
        @endforeach
    </select>
    <select id="kabupatenSelect" class="form-select mb-3">
        <option value="">-- Pilih Kab/Kota --</option>
        @foreach ($optKota as $k)
            <option value="{{ $k }}">{{ $k }}</option>
        @endforeach
    </select>
    <select id="klasifikasiSelect" class="form-select mb-3">
        <option value="">-- Pilih Klasifikasi --</option>
        @foreach ($optKlasifikasi as $k)
            <option value="{{ $k }}">{{ $k }}</option>
        @endforeach
    </select>
    <h2 class="dashboard-title">Data Provinsi</h2>

    <div style="display: flex; flex-wrap: wrap; gap: 20px;">

        <div style="flex: 1; min-width: 0; overflow-x: auto; padding-bottom: 10px;">
            <div id="provinsiChartContainer" style="width: 2000px; height: 400px;"> <canvas id="provinsiChart"></canvas>
            </div>
        </div>

        <div style="flex: 1; min-width: 300px; height: 400px;">
            <h3 style="color:white; text-align:center; margin-bottom:10px;">Klasifikasi Perusahaan</h3>
            <canvas id="klasifikasiChart"></canvas>
        </div>
    </div>
    </div> 
    <div id="kotaChartSection" class="row mt-4" style="display: none;"> 
        <div class="col-12">
            <h3 class="text-white text-center mb-3">Data Per Kabupaten/Kota</h3>
            
            <div style="width: 100%; overflow-x: auto; padding-bottom: 20px;">
                <div id="kotaChartContainer" style="width: 100%; height: 400px;">
                    <canvas id="kotaChart"></canvas>
                </div>
            </div>
        </div>
    </div>

</section>
    {{--
    <!-- ================= FILTER ================= -->
     <form action="{{ route('wlkp.index') }}#section-klasifikasi" method="GET">
        <input type="hidden" name="filter_source" value="klasifikasi">
        <div class="filter-bar">
            <select name="tahun" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Tahun</option>
                @foreach ($optTahun as $thn)
                    <option value="{{ $thn }}" {{ request('tahun') == $thn ? 'selected' : '' }}>{{ $thn }}</option>
                @endforeach
            </select>

            <select name="bulan" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Bulan</option>
                @for ($i = 1; $i <= 12; $i++)
                    <option value="{{ $i }}" {{ request('bulan') == $i ? 'selected' : '' }}>
                        {{ date("F", mktime(0, 0, 0, $i, 10)) }}
                    </option>
                @endfor
            </select>

            <select name="provinsi" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Provinsi</option>
                @foreach ($optProvinsi as $prov)
                    <option value="{{ $prov }}" {{ request('provinsi') == $prov ? 'selected' : '' }}>{{ $prov }}</option>
                @endforeach
            </select>

            <select name="kota" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Kota</option>
                @foreach($optKota as $k)
                    <option value="{{ $k }}" {{ request('kota') == $k ? 'selected' : '' }}>{{ $k }}</option>
                @endforeach
            </select>

            <select name="klasifikasi" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Klasifikasi</option>
                @foreach($optKlasifikasi as $kls)
                    <option value="{{ $kls }}" {{ request('klasifikasi') == $kls ? 'selected' : '' }}>{{ $kls }}</option>
                @endforeach
            </select>
        </div>
    </form>

    <!-- ================= GRID 2 KOLOM ================= -->
    <div class="chart-grid">

        <!-- ================= KIRI : PROVINSI ================= -->
        <div class="chart-wrapper">

            <!-- 🔵 CHART LAMA KAMU (TIDAK DIUBAH) -->
            <div class="chart-card full-width">
                <div class="chart-header">
                    <h3 class="chart-title">Laporan Provinsi</h3>
                </div>

                <div class="chart-container">
                    <div class="bar-chart">
                        @forelse ($chartProvinsi as $row)
                            @php
                                $height = $maxProvinsi > 0
                                    ? ($row->total / $maxProvinsi * 100)
                                    : 0;
                            @endphp
                            <div class="bar" style="height: {{ $height }}%" title="{{ $row->provinsi }}">
                                <span class="bar-value">
                                    {{ number_format($row->total, 0, ',', '.') }}
                                </span>
                                <span class="bar-label">
                                    {{ $row->provinsi }}
                                </span>
                            </div>
                        @empty
                            <p>Tidak ada data</p>
                        @endforelse
                    </div>
                </div>
            </div>

        </div>

        <!-- ================= KANAN : KABUPATEN ================= -->
        <div class="chart-wrapper">

            <div class="chart-card">
        <div class="chart-header">
            <h3 class="chart-title">Klasifikasi</h3>
        </div>

        <div class="chart-container">
            <div class="bar-chart" id="barChartKlasifikasi">
                @forelse ($chartKlasifikasi as $row)
                        @php
                            $height = $maxKlasifikasi > 0
                                ? ($row->total / $maxKlasifikasi * 100)
                                : 0;
                        @endphp

                        <div class="bar" style="height: {{ $height }}%" title="{{ $row->klasifikasi }}">
                            <span class="bar-value">
                                {{ number_format($row->total, 0, ',', '.') }}
                            </span>
                            <span class="bar-label">
                                {{ $row->klasifikasi }}
                            </span>
                        </div>
                    @empty
                        <p class="text-center text-muted">Tidak ada data</p>
                    @endforelse
            </div>
        </div>
    </div>
    </div>
    <div class="chart-card full-width">
                <div class="chart-header">
                    <h3 class="chart-title">Kabupaten/Kota</h3>
                </div>

                <div class="chart-container">
                    <div class="bar-chart" id="barChart">
                        @forelse ($chartKota as $row)
                        @php
                        $height = $maxKota > 0
                        ? ($row->total / $maxKota * 100)
                        : 0;
                        @endphp

                        <div class="bar" style="height: {{ $height }}%" title="{{ $row->ota }}">
                            <span class="bar-value">
                                {{ number_format($row->total, 0, ',', '.') }}
                            </span>
                            <span class="bar-label">
                                {{ $row->kota }}
                            </span>
                        </div>
                        @empty
                        <p>Tidak ada data</p>
                        @endforelse
                    </div>
                </div>
            </div>

        </div>

    </div> --}}


