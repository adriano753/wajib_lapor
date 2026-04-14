<section class="container-provinsi-fluid py-4">
    <br>
    <div class="d-flex justify-content-end mb-3">

    </div>
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
            <label>Tabel</label>
            <select id="tableFilter" class="form-select filter-select">
                <option value="none">-- Tutup Semua Tabel --</option>
                <option value="provinsi">Tabel Provinsi</option>
                <option value="kabupaten">Tabel Kabupaten</option>
            </select>
        </div>
        <div class="filter-group">
            <label>Download Data</label>
            <button type="button" id="downloadPdfTenagaKerja" class="form-select filter-select">
                Download
            </button>
        </div>
    </div>



    <div id="pdfContentTenagaKerja">
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
        <div id="tableProvinsiWrapper">
            <h6>Tabel Total Tenaga Kerja Provinsi</h6>

            <table class="table table-bordered table-sm table-hover">
                <thead>
                    <tr id="headerProvinsi"></tr>
                </thead>
                <tbody id="tableProvinsiBody"></tbody>
            </table>
        </div>


        <!-- TABEL KABUPATEN -->
        <div id="tableKabupatenWrapper">
            <h6>Tabel Total Tenaga Kerja Kabupaten</h6>
            <table class="table table-bordered table-sm table-hover">
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

                <div class="kab-chart-wrapper">
                    <!-- TABEL SUMMARY (1/4) -->
                    <div class="kab-summary">
                        <div id="dataSummary"></div>
                    </div>

                    <!-- CHART (3/4) -->
                    <div class="kab-chart">
                        <canvas id="tenagaKerjaKabChart"></canvas>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>
    <br>

</section>
<br>
