<section class="container-provinsi-fluid py-4">
    <br>

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
