<section class="container-provinsi-fluid py-4">
    <br>

    <h2 class="mb-3">DATA KLASIFIKASI PERUSAHAAN</h2>

    <div class="filter-panel mb-4">
        <div class="filter-group">
            <label>Tahun</label>
            <select id="tahunSelect" class="form-select filter-select">
                <option value="">-- Periode Tahun --</option>
                @foreach ($optTahun as $k)
                    <option value="{{ $k }}">{{ $k }}</option>
                @endforeach
            </select>
        </div>

        <div class="filter-group">
            <label>Bulan</label>
            <select id="bulanSelect" class="form-select filter-select">
                <option value="">-- Periode Bulan --</option>

                @php
                    $bulanIndo = [
                        1 => 'Januari',
                        'Februari',
                        'Maret',
                        'April',
                        'Mei',
                        'Juni',
                        'Juli',
                        'Agustus',
                        'September',
                        'Oktober',
                        'November',
                        'Desember',
                    ];
                @endphp

                @foreach ($bulanIndo as $key => $namaBulan)
                    <option value="{{ $key }}">{{ $namaBulan }}</option>
                @endforeach
            </select>
        </div>

        <div class="filter-group">
            <label>Provinsi</label>
            <select id="provinsiSelectKlasif" class="form-select filter-select">
                <option value="">-- Pilih Provinsi --</option>
                @foreach ($optProvinsi as $k)
                    <option value="{{ $k }}">{{ $k }}</option>
                @endforeach
            </select>
        </div>

        <div class="filter-group">
            <label>Kabupaten / Kota </label>
            <select id="kabupatenSelectKlasif" class="form-select filter-select">
                <option value="">-- Pilih Kab/Kota --</option>
                @foreach ($optKota as $k)
                    <option value="{{ $k }}">{{ $k }}</option>
                @endforeach
            </select>
        </div>

        <div class="filter-group">
            <label>Klasifikasi</label>
            <select id="klasifikasiSelect" class="form-select filter-select">
                <option value="">-- Pilih Klasifikasi --</option>
                @foreach ($optKlasifikasi as $k)
                    <option value="{{ $k }}">{{ $k }}</option>
                @endforeach
            </select>
        </div>

        <div class="filter-group">
            <label>Tabel</label>
            <button id="toggleTableBtnKlasifikasi" class="form-select filter-select">
                Buka Tabel
            </button>
        </div>
        <div class="filter-group">
            <label>Download Data</label>
            <button type="button" id="downloadPdfKlasifikasi" class="form-select filter-select">
                Download
            </button>
        </div>
    </div>

    <h3 class="dashboard-title">Provinsi</h3>

    <div style="display: flex; flex-wrap: wrap; gap: 20px;">

        <div style="flex: 1; min-width: 0; overflow-x: auto; padding-bottom: 10px;">
            <div id="provinsiChartContainer" style="width: 2000px; height: 400px;"> <canvas id="provinsiChart"></canvas>
            </div>
        </div>

        <div style="flex: 1; min-width: 300px; height: 400px;">
            <h3 style="text-align:center; margin-bottom:10px;">Klasifikasi</h3>
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
    <div class="row mt-4">
        <div class="col-12">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">


            </div>

            <div id="tableWrapper" style="overflow-x:auto; display:none;">
                <h3 class="mb-0">Tabel Data Klasifikasi</h3>
                <table class="table table-bordered table-striped" id="tableKlasifikasi">
                    <thead id="theadKlasifikasi">
                        <tr id="headerRow"></tr>
                    </thead>
                    <tbody id="tbodyKlasifikasi">
                        <tr>
                            <td colspan="11" style="text-align:center;">Memuat data...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</section>
