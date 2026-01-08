<!-- Data -->
<div class="metrics-grid">
    <div class="metric-item">
        <div class="metric-value">{{ $totalTk ?? 0 }}</div>
        <div class="metric-label">total tenaga kerja</div>
    </div>

    <div class="metric-item">
        <div class="metric-value">{{ $totalLlmb ?? 0 }}</div>
        <div class="metric-label">Total Laki - laki Masih Bekerja</div>
    </div>

    <div class="metric-item">
        <div class="metric-value">{{ $totalPmb ?? 0 }}</div>
        <div class="metric-label">Total Perempuan Masih Bekerja</div>
    </div>

    <div class="metric-item">
        <div class="metric-value">{{ $totalJaksel ?? 0 }}</div>
        <div class="metric-label">Jakarta Selatan</div>
    </div>

    <div class="metric-item">
        <div class="metric-value">{{ $besar ?? 0 }}</div>
        <div class="metric-label">Besar</div>
    </div>

    <div class="metric-item">
        <div class="metric-value">{{ $tidak_terident ?? 0 }}</div>
        <div class="metric-label">Tidak Teridentifikasi</div>
    </div>
</div>

<section>
    <div style="width:100%; height:400px;">
        <h2>DATA TENAGA KERJA</h2>
        <canvas id="tenagaKerjaChart">chart</canvas>
    </div>
    <select id="kabupatenSelect" class="form-select mb-3">
        <option value="">-- Pilih Kab/Kota --</option>
        @foreach ($kota as $k)
            <option value="{{ $k }}">{{ $k }}</option>
        @endforeach
    </select>
    <div class="tk-wrapper">

        <!-- KIRI -->
        <div class="tk-box">
            <h4>Tenaga Kerja<br>Kab/Kota Tertentu</h4>
            <canvas id="tenagaKerjaKabChart"></canvas>
        </div>

        <!-- KANAN -->
        <div class="tk-box">
            <h4>Tenaga Kerja<br>Semua Kab/Kota</h4>
            <canvas id="tenagaKerjaFullChart"></canvas>
        </div>

    </div>

    {{-- <div class="chart-container-tk">
        <!-- KIRI: FILTER 1 KABUPATEN -->
        <div class="chart-box-tk">
            <h4>Tenaga Kerja<br>Kab/Kota Tertentu</h4>
            <canvas id="tenagaKerjaKabChart"></canvas>
        </div>

        <!-- KANAN: DATA FULL -->
        <div class="chart-box">
            <h4>Tenaga Kerja<br>Semua Kab/Kota</h4>
            <canvas id="tenagaKerjaFullChart"></canvas>
        </div>
    </div> --}}

</section>
