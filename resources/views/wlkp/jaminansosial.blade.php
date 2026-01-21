{{-- <select id="filterProvinsi">
    <option value="all">Semua Provinsi</option>
    @foreach($rowsBpjs as $prov)
        <option value="{{ $prov->provinsi }}">{{ $prov->provinsi }}</option>
    @endforeach
</select>

<select id="filterSatuan">
    <option value="all">Semua Jaminan</option>
    <option value="jkk">JKK</option>
    <option value="jht">JHT</option>
    <option value="jkm">JKM</option>
    <option value="jp">JP</option>
</select> --}}

{{-- ================= CHART JAMINAN SOSIAL ================= --}}
<div class="chart-card full-width">
    <div class="chart-header">
        <h3 class="chart-title">Jumlah Perusahaan yang Mengikutsertakan BPJS</h3>
    </div>

    <div class="chart-card">

        <!-- CHART -->
        <div class="chart-container chart-provinsi">
            <div class="chart-inner">
                <canvas id="provinsiLineChartJaminan"></canvas>
            </div>
        </div>

        <!-- LABEL DATA PER PROVINSI -->
        <div class="provinsi-summary">
            @foreach($rowsBpjs as $prov)
                <div class="provinsi-name">{{ $prov->provinsi }}</div>
                <div class="provinsi-values">
                    <span>JKK: {{ number_format($prov->jkk) }}</span>
                    <span>JHT: {{ number_format($prov->jht) }}</span>
                    <span>JKM: {{ number_format($prov->jkm) }}</span>
                    <span>JP: {{ number_format($prov->jp) }}</span>
                </div>
            @endforeach
        </div>

    </div>

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