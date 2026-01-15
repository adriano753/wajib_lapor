<section class="dashboard-section">
    <h2 class="dashboard-title">Filter Data KBLI (Nama 2 Digit)</h2>

    <form action="{{ url()->current() }}" method="GET">
        <div class="filter-bar">
            <select name="tahun" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Tahun</option>
                @foreach ($optTahun as $thn)
                    <option value="{{ $thn }}" {{ request('tahun') == $thn ? 'selected' : '' }}>{{ $thn }}</option>
                @endforeach
            </select>

            <select name="bulan" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Bulan</option>
                @for ($i = 1; $i <= 12; $i++)
                    <option value="{{ $i }}" {{ request('bulan') == $i ? 'selected' : '' }}>
                        {{ date("F", mktime(0, 0, 0, $i, 10)) }}
                    </option>
                @endfor
            </select>

            <select name="provinsi" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Provinsi</option>
                @foreach ($optProvinsi as $prov)
                    <option value="{{ $prov }}" {{ request('provinsi') == $prov ? 'selected' : '' }}>{{ $prov }}</option>
                @endforeach
            </select>

            <select name="kota" class="form-control" onchange="this.form.submit()">
                <option value="">Semua Kota</option>
                @foreach($optKota as $k)
                    <option value="{{ $k }}" {{ request('kota') == $k ? 'selected' : '' }}>{{ $k }}</option>
                @endforeach
            </select>
        </div>
    </form>

    <div class="chart-grid">
        <div class="chart-card full-width">
            <div class="chart-header">
                <h3 class="chart-title">Berdasarkan KBLI (Nama 2 Digit)</h3>
            </div>
            <div class="chart-container">
                <div class="bar-chart">
                    @forelse ($chartKbli as $row)
                        @php $height = $maxKbli > 0 ? ($row->total / $maxKbli * 100) : 0; @endphp
                        <div class="bar" style="height: {{ $height }}%" title="{{ $row->nama_2_digit }}">
                            <span class="bar-value">{{ number_format($row->total, 0, ',', '.') }}</span>
                            <span class="bar-label">{{ $row->nama_2_digit }}</span>
                        </div>
                    @empty
                        <p>Data tidak tersedia.</p>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</section>