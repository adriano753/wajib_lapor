{{-- <!-- Data -->
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
</div> --}}

<section class="container-provinsi-fluid py-4">
    <br>
    <h2 class="mb-3">DATA TENAGA KERJA</h2>



    <!-- Filter Provinsi -->
    <div class="filter-panel mb-4">
        <div class="filter-group">
            <label>Jenis Tenaga Kerja</label>
            <select id="jenisTenagaKerja" class="form-select filter-select">
                <option value="all">Semua Tenaga Kerja</option>
                <option value="wni">Tenaga Kerja Indonesia</option>
                <option value="wna">Tenaga Kerja Asing</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Provinsi</label>
            <select id="provinsiSelect" class="form-select filter-select">
                <option value="">Semua Provinsi</option>
                @foreach ($provinsi as $p)
                    <option value="{{ $p }}">{{ $p }}</option>
                @endforeach
            </select>
        </div>
        <div class="filter-group">
            <label>Jenis Kelamin</label>
            <select id="jenisKelamin" class="form-select filter-select">
                <option value="all">Semua Jenis Kelamin</option>
                <option value="l">Laki-laki</option>
                <option value="p">Perempuan</option>
            </select>
        </div>
        <div class="filter-group">
            <label>Perjanjian Kerja</label>
            <select id="perjanjianKerja" class="form-select filter-select">
                <option value="all">Semua Perjanjian Kerja</option>
                <option value="pkwtt">Perjanjian Kerja Waktu Tidak Tertentu</option>
                <option value="pkwt">Perjanjian Kerja Waktu Tertentu</option>
            </select>
        </div>
        <div class="filter-group">
            <label >Tabel</label>
            <select id="tableFilter" class="form-select filter-select">
                <option value="none">-- Tutup Semua Tabel --</option>
                <option value="provinsi">Tabel Provinsi</option>
                <option value="kabupaten">Tabel Kabupaten</option>
            </select>
        </div>
    </div>




    <!-- Chart Provinsi -->
    <div class="card-chart-provinsi shadow-sm mb-5">
        <div class="card-body">
            <h5 class="mb-3">Total Tenaga Kerja Provinsi</h5>

            <div class="chart-scroll-provinsi">
                <div class="chart-container-wide-provinsi">
                    <canvas id="tenagaKerjaProvChart"></canvas>
                </div>
            </div>

        </div>
    </div>

    <!-- TABEL PROVINSI -->
    <div id="tableProvinsiWrapper" style="display:none">
        <h6>Tabel Total Tenaga Kerja Provinsi</h6>
        <table class="table table-bordered table-sm text-white">
            <thead>
                <tr>
                    <th>Nama Provinsi</th>
                    <th>Total Tenaga Kerja</th>
                </tr>
            </thead>
            <tbody id="tableProvinsiBody"></tbody>
        </table>
    </div>

    <!-- TABEL KABUPATEN -->
    <div id="tableKabupatenWrapper" style="display:none">
        <h6>Tabel Total Tenaga Kerja Kabupaten</h6>
        <table class="table table-bordered table-sm text-white">
            <thead>
                <tr>
                    <th>Nama Kabupaten</th>
                    <th>Total</th>
                    <th>Tidak Teridentifikasi</th>
                    <th>Mikro</th>
                    <th>Kecil</th>
                    <th>Menengah</th>
                    <th>Besar</th>
                </tr>
            </thead>
            <tbody id="tableKabupatenBody"></tbody>
        </table>
    </div>

    <!-- Filter Kabupaten -->
    <br>
    <div class="filter-panel mb-4">
        <div class="filter-group">
            <label>KABUPATEN / KOTA</label>
            <select id="kabupatenSelect" class="form-select filter-select">
                <option value="">-- Pilih Kab/Kota --</option>
                @foreach ($kota as $k)
                    <option value="{{ $k }}">{{ $k }}</option>
                @endforeach
            </select>
        </div>
    </div>

    <!-- Chart Kabupaten -->
    <div class="card shadow-sm">
        <div class="card-body">
            <h5 class="mb-3">Tenaga Kerja Kab/Kota Tertentu</h5>
            <div class="chart-data-summary" style="flex: 1; font-size: 0.9rem;">
                {{-- <h6>Rincian Tenaga Kerja</h6> --}}
                <div id="dataSummary">
                    <!-- Data akan diisi JS -->
                </div>
            </div>

            <div class="chart-container">
                <canvas id="tenagaKerjaKabChart"></canvas>
            </div>
            <!-- Data Ringkas -->
        </div>
    </div>

</section>




{{-- <section>
    <div style="width:100%; height:400px;">

        <h2>DATA TENAGA KERJA</h2>
        <select id="provinsiSelect" class="form-select mb-3">
            <option value="">-- Pilih Provinsi --</option>
            @foreach ($provinsi as $p)
                <option value="{{ $p }}">{{ $p }}</option>
            @endforeach
        </select>
        <canvas id="tenagaKerjaProvChart">chart</canvas>
    </div>
</section>
<div style="width:100%; height:400px;">
    <select id="kabupatenSelect" class="form-select mb-3">
        <option value="">-- Pilih Kab/Kota --</option>
        @foreach ($kota as $k)
            <option value="{{ $k }}">{{ $k }}</option>
        @endforeach
    </select>
    <h4>Tenaga Kerja<br>Kab/Kota Tertentu</h4>
    <canvas id="tenagaKerjaKabChart"></canvas>
</div>


<section>
    <div class="tk-wrapper">
        <div class="tk-box">
            <select id="provinsiSelect" class="form-select mb-3">
                <option value="">-- Pilih Provinsi --</option>
                @foreach ($provinsi as $p)
                    <option value="{{ $p }}">{{ $p }}</option>
                @endforeach
            </select>
            <h4>Tenaga Kerja<br>Semua Kab/Kota</h4>
            <canvas id="tenagaKerjaProvChart"></canvas>
        </div>

    </div>
</section> --}}





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
