<section class="dashboard-section">

    <h2 class="dashboard-title">Data Perusahaan</h2>

    <!-- ================= FILTER ================= -->
    <div class="filter-bar">
        <select>
            <option>Periode Tahun</option>
            @foreach ($listTahun as $tahun)
                <option value="{{ $tahun }}">{{ $tahun }}</option>
            @endforeach
        </select>

        <select>
            <option>Periode Bulan</option>
            @for ($i = 1; $i <= 12; $i++)
                <option value="{{ $i }}">{{ $i }}</option>
            @endfor
        </select>

        <select>
            <option>Provinsi</option>
            @foreach ($dataProvinsi as $row)
                <option value="{{ $row->provinsi }}">{{ $row->provinsi }}</option>
            @endforeach
        </select>

        <select>
            <option>Kabupaten / Kota</option>
        </select>

        <select>
            <option>Klasifikasi</option>
            <option>Mikro</option>
            <option>Kecil</option>
            <option>Menengah</option>
            <option>Besar</option>
        </select>
    </div>

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
                        @forelse ($dataProvinsi as $row)
                            @php
                                $height = $maxVal > 0
                                    ? ($row->total / $maxVal * 100)
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

            <!-- 🔵 CHART MODEL SAMA (NANTI DATA KABUPATEN) -->
            <div class="chart-card full-width">
                <div class="chart-header">
                    <h3 class="chart-title">Laporan Kabupaten / Kota</h3>
                </div>

                <div class="chart-container">
                    <div class="bar-chart">
                        {{-- placeholder --}}
                        <div class="bar" style="height:70%">
                            <span class="bar-value">170.000</span>
                            <span class="bar-label">KOTA ADM</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</section>
