{{-- ================= CHART JAMINAN SOSIAL ================= --}}
<div class="chart-card full-width">
    <div class="chart-header">
        <h3 class="chart-title">Jumlah Perusahaan yang Mengikutsertakan BPJS</h3>
    </div>
    <div class="chart-container small-chart">
        <canvas id="provinsiLineChartJaminan" width="600" height="300"></canvas>
    </div>
</div>

{{-- ================= SUMMARY ANGKA (HORIZONTAL SCROLL) ================= --}}
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

</div>
