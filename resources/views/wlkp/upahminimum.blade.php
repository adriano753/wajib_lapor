{{-- Filter Provinsi Upah Minimum --}}
<select id="provinsiUpahSelect" class="form-select mb-3">
    <option value="all">-- Semua Provinsi --</option>
    @foreach ($listProvinsi as $prov)
        <option value="{{ $prov }}">{{ $prov }}</option>
    @endforeach
</select>

{{-- CHARD CHART --}}
<div class="chart-card full-width mt-4">
    <div class="chart-header">
        <h3 class="chart-title">
            Jumlah Perusahaan yang Melaporkan Upah Minimum
        </h3>
    </div>

    <div class="chart-container chart-provinsi">
        <div class="chart-inner" style="height:400px">
            <canvas id="upahMinimumChart"></canvas>
        </div>
    </div>

    {{-- <!-- LABEL DATA UPAH MINIMUM -->
    <div id="upahLabelContainer" class="provinsi-summary mt-3"></div> --}}

</div>