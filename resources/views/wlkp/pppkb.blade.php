<section class="container-provinsi-fluid py-4">
    <br>
<<<<<<< HEAD
    <h2 class="mb-3">DATA PROVINSI MEMILIKI PERJANJIAN PERUSAHAAN/PERJANJIAN KERJA BERSAMA</h2>

    <!-- <div class="filter-panel mb-4">
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
                        1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
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
        </div> -->



    <div class="card-body">
        <div style="overflow-x: auto; width: 100%; border: 1px solid #ddd;">
            <div class="chart-container" style="position: relative; height: 650px; min-width: 2000px;">
                <canvas id="chartPPPKB"></canvas>
            </div>
        </div>
    </div>
    

</section>
=======

    <div class="filter-panel mb-4">
        <div class="filter-group">
            <label>Download Data</label>
            <button type="button" id="downloadPdf" class="form-select filter-select">
                Download
            </button>
        </div>
        <div class="filter-group">
            <label>Buka Tabel</label>
            <button type="button" id="toggleTableBtn" class="form-select filter-select">
                Buka Tabel
            </button>
        </div>
    </div>
    <br>
    <h2 class="mb-3">DATA PROVINSI MEMILIKI PERJANJIAN PERUSAHAAN/PERJANJIAN KERJA BERSAMA</h2>

    {{-- TABEL PP-PKB --}}
    <div class="card-body">
        <div style="overflow-x: auto; width: 100%; border: 1px solid #ddd;">
            <div id="pdfContent" style="position: relative; min-width: 2000px;">

                <!-- CHART -->
                <div style="height: 400px;">
                    <canvas id="chartPPPKB"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body">

        <div class="table-responsive" id="tableProvinsiPPPKBWrapper" style="display: none;">
            <h5 class="mb-3">Tabel Data Berdasarkan Kabupaten / Kota</h5>
            <table class="table table-bordered table-striped table-sm text-center">
                <thead class="table-dark">
                    <tr id="headerPPPKB"></tr>
                </thead>
                <tbody id="tablePPPKBBody"></tbody>
            </table>
        </div>
    </div>

</section>
>>>>>>> rayhan
