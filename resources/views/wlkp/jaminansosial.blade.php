<<<<<<< HEAD
<select id="provinsiBpjsSelect" class="form-select mb-3">
    <option value="all">-- Semua Provinsi --</option>
    @foreach ($listProvinsi as $prov)
        <option value="{{ $prov }}">{{ $prov }}</option>
    @endforeach
</select>
=======
<div class="d-flex justify-content-end mb-3">

</div>

<div class="filter-panel mb-4">
    <div class="filter-group">
        <label>Provinsi</label>
        <select id="provinsiBpjsSelect" class="form-select filter-select">
            <option value="all">-- Semua Provinsi --</option>
            @foreach ($listProvinsi as $prov)
                <option value="{{ $prov }}">{{ $prov }}</option>
            @endforeach
        </select>
    </div>
    <div class="filter-group">
        <label>Download Data</label>
        <button type="button" id="downloadPdfJaminan" class="form-select filter-select">
            Download
        </button>
    </div>
</div>
<br>
>>>>>>> rayhan

{{-- ================= CHART JAMINAN SOSIAL ================= --}}
<div class="chart-card full-width">
    <div class="chart-header">
        <h3 class="chart-title">Jumlah Perusahaan yang Mengikutsertakan BPJS</h3>
    </div>

    <div class="chart-card">

        <!-- CHART -->
<<<<<<< HEAD
        <div class="chart-container chart-provinsi">
            <div class="chart-inner">
                <canvas id="provinsiLineChartJaminan"></canvas>
            </div>
        </div>

        <!-- Togle -->
        <div class="d-flex justify-content-end mb-2">
            <button id="toggleBpjsLabel" class="btn btn-sm btn-outline-primary">
                Sembunyikan Detail Provinsi
            </button>
        </div>

        <!-- LABEL DATA PER PROVINSI -->
        <div class="provinsi-summary" id="bpjsTable">
            @foreach($rowsBpjs as $prov)
                <div class="bpjs-row" data-provinsi="{{ $prov->provinsi }}">
                    <div class="provinsi-name">{{ $prov->provinsi }}</div>
                    <div class="provinsi-values">
                        <span>JKK: {{ number_format($prov->jkk) }}</span>
                        <span>JHT: {{ number_format($prov->jht) }}</span>
                        <span>JKM: {{ number_format($prov->jkm) }}</span>
                        <span>JP: {{ number_format($prov->jp) }}</span>
=======
        <div class="card-body">
            <div style="overflow-x: auto; width: 100%; border: 1px solid #ddd;">
                <div class="chart-container" style="position: relative; height: 650px; min-width: 2000px;">
                    <canvas id="provinsiLineChartJaminan"></canvas>
                </div>
            </div>
        </div>

        <br>
        <!-- Togle -->
        <div class="filter-group">
            <button id="toggleBpjsLabel" class="form-select filter-select">
                Sembunyikan Detail Provinsi
            </button>
        </div>
        <br>

        <!-- LABEL DATA PER PROVINSI -->
        <div class="provinsi-summary" id="bpjsTable">
            @foreach ($rowsBpjs as $prov)
                <div class="bpjs-row" data-provinsi="{{ $prov->provinsi }}">
                    <div class="provinsi-name">{{ $prov->provinsi }}</div>
                    <div class="provinsi-values">
                        <span class=" jkk">JKK: {{ number_format($prov->jkk) }}</span>
                        <span class="jht">JHT: {{ number_format($prov->jht) }}</span>
                        <span class="jkm">JKM: {{ number_format($prov->jkm) }}</span>
                        <span class="jp">JP: {{ number_format($prov->jp) }}</span>
>>>>>>> rayhan
                    </div>
                </div>
            @endforeach
        </div>
<<<<<<< HEAD
        
=======

>>>>>>> rayhan
    </div>

</div>

</div>
<<<<<<< HEAD

<!-- {{-- ================= SUMMARY ANGKA (HORIZONTAL SCROLL) ================= --}}
<div class="metrics-scroll mt-4">

    <div class="metric-item">
        <div class="metric-value">
            {{ number_format($totalJaminan->jkk ?? 0) }}
        </div>
        <div class="metric-label">JKK</div>
    </div>

    <div class="metric-item">
        <div class="metric-value">
            {{ number_format($totalJaminan->jht ?? 0) }}
        </div>
        <div class="metric-label">JHT</div>
    </div>

    <div class="metric-item">
        <div class="metric-value">
            {{ number_format($totalJaminan->jkm ?? 0) }}
        </div>
        <div class="metric-label">JKM</div>
    </div>

    <div class="metric-item">
        <div class="metric-value">
            {{ number_format($totalJaminan->jp ?? 0) }}
        </div>
        <div class="metric-label">JP</div>
    </div>
</div> -->
=======
>>>>>>> rayhan
