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
</div>
<br>


{{-- CHARD CHART --}}
<div class="chart-card full-width mt-4">
    <div class="chart-header">
        <h3 class="chart-title">
            Jumlah Perusahaan yang Melaporkan Besaran Upah Minimum
        </h3>
    </div>

    <div class="chart-container chart-provinsi">
        <div class="chart-inner" style="height:400px">
            <canvas id="upahMinimumChart"></canvas>
        </div>
    </div>
    <div id="totalUpah" style="margin-top:10px; font-weight:bold;"></div>

    {{-- <!-- LABEL DATA UPAH MINIMUM -->
    <div id="upahLabelContainer" class="provinsi-summary mt-3"></div> --}}

</div>
