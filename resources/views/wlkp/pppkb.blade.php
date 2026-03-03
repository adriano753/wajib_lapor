<section class="container-provinsi-fluid py-4">


    <div class="filter-panel mb-4">
        <div class="filter-group">
            <button type="button" id="downloadPdf" class="form-select filter-select">
                Download PDF
            </button>

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
            <div id="pdfContent" class="chart-container" style="position: relative; height: 650px; min-width: 2000px;">
                <canvas id="chartPPPKB"></canvas>
            </div>
        </div>
    </div>

    <div style="margin-top: 20px;">
        <div id="tableProvinsiPPPKBWrapper"></div>
    </div>

</section>
