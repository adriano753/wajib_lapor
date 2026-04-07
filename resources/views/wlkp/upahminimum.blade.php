{{-- Filter Provinsi Upah Minimum --}}
<div class="filter-panel mb-4">
    <div class="filter-group">
        <label>Provinsi</label>
        <select id="provinsiUpahSelect" class="form-select filter-select">
            <option value="all">-- Semua Provinsi --</option>
            @foreach ($listProvinsi as $prov)
                <option value="{{ $prov }}">{{ $prov }}</option>
            @endforeach
        </select>
    </div>
    <div class="filter-group">
        <label>Buka / Tutup Tabel</label>
        <button id="toggleTableUpah" class="form-select filter-select">
            Buka Tabel
        </button>
    </div>
    <div class="filter-group">
        <label>Download Data</label>
        <button id="downloadPdfUpah" class="form-select filter-select">
            Download
        </button>
    </div>
</div>
<br>


{{-- CHARD CHART --}}
<div class="chart-card full-width mt-4">
    <div class="chart-header">
        <h3 class="chart-title">
            Jumlah Perusahaan yang Melaporkan Besaran Upah Minimum
        </h3>
    </div>

    <div class="chart-wrapper chart-provinsi">
        <div class="chart-inner">
            <canvas id="upahMinimumChart"></canvas>
            <div id="totalUpah" style="margin-top:10px; font-weight:bold;"></div>
        </div>
    </div>
</div>

<div id="tableWrapperUpah" style="display: none;">
    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>No</th>
                <th>Provinsi</th>
                <th>Jumlah</th>
            </tr>
        </thead>
        <tbody id="tbodyUpah"></tbody>
    </table>
</div>
