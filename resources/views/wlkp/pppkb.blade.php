<section class="container-provinsi-fluid py-4">
    <br>
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