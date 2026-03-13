<!-- FILTER -->
<div class="filter-panel mb-4">

    <!-- STATUS -->
    <div class="filter-group">
        <label>Status</label>
        <select id="jenisSelect" class="form-select filter-select">
            <option value="semua">Semua</option>
            <option value="sudah">Sudah</option>
            <option value="belum">Belum</option>
        </select>
    </div>

    <!-- PROVINSI -->
    <div class="filter-group">
        <label>Provinsi</label>
        <select id="provinsiKetenagakerjaan" class="form-select filter-select">
            <option value="">Semua Provinsi</option>
            @foreach ($provinsi as $p)
                <option value="{{ $p }}">{{ $p }}</option>
            @endforeach
        </select>
    </div>

    <!-- KABUPATEN -->
    <div class="filter-group">
        <label>KABUPATEN / KOTA</label>
        <select id="kabupatenKetenagakerjaan" class="form-select filter-select">
            <option value="">-- Pilih Kab/Kota --</option>
            @foreach ($kota as $k)
                <option value="{{ $k }}">{{ $k }}</option>
            @endforeach
        </select>
    </div>

    <!-- TABEL -->
    <div class="filter-group">
        <label>Tabel</label>
        <select id="tableFilterKetenagakerjaan" class="form-select filter-select">
            <option value="">-- Tutup Semua Tabel --</option>
            <option value="provinsiKetenagakerjaan">Tabel Provinsi</option>
            <option value="kabupatenKetenagakerjaan">Tabel Kabupaten</option>
        </select>
    </div>

</div>
<br>


<!-- CHARTS -->
{{-- 1. P2K3 --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleP2K3nasional">P2K3 Nasional</h5>
            <canvas id="doughnutP2K3"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleP2K3">P2K3 Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barP2K3"></canvas>
                </div>
            </div>
        </div>

    </div>
    <div id="chartKabupatenWrapperP2K3" style="display:none;">
        <h5 class="mt-4">P2K3 Per Kabupaten</h5>
        <canvas id="barKabupatenP2K3"></canvas>
    </div>
</div>
<br>

{{-- 2. AHLI K3 --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleAhliK3nasional">Ahli K3 Nasional</h5>
            <canvas id="doughnutAhliK3"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleAhliK3">Ahli K3 Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barAhliK3"></canvas>
                </div>
            </div>
        </div>

    </div>
    <div id="chartKabupatenWrapperAhliK3" style="display:none;">
        <h5 class="mt-4">Ahli K3 Per Kabupaten</h5>
        <canvas id="barKabupatenAhliK3"></canvas>
    </div>
</div>
<br>

{{-- 3. TENAGA KERJA DISABILITAS --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleDisabilitasnasional">Perusahaan Yang Mempekerjakan Disabilitas per Nasional</h5>
            <canvas id="doughnutDisabilitas"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleDisabilitas">Perusahaan Yang Mempekerjakan Disabilitas Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barDisabilitas"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
<br>

{{-- 4. PERUSAHAAN YANG MENERAPKAN SUSU --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleSusunasional">Perusahaan Yang Menerapkan Susu per Nasional</h5>
            <canvas id="doughnutSusu"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleSusu">Perusahaan Yang Menerapkan Susu Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barSusu"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
<br>

{{-- 5. PERUSAHAAN YANG MEMILIKI SERIKAT PEKERJA --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleSerikatnasional">Perusahaan Yang Memiliki Serikat Pekerja per Nasional</h5>
            <canvas id="doughnutSerikatPekerja"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleSerikat">Perusahaan Yang Memiliki Serikat Pekerja Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barSerikatPekerja"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
<br>

{{-- 7. PERUSAHAAN DENGAN PENGATURAN WAKTU KERJA WAKTU ISTIRAHAT --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleWkwinasional">Perusahaan Dengan Pengaturan Waktu Kerja Waktu Istirahat per Nasional</h5>
            <canvas id="doughnutWkwi"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleWkwi">Perusahaan Dengan Pengaturan Waktu Kerja Waktu Istirahat Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barWkwi"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
<br>

{{-- 8. PERUSAHAAN YANG SUDAH MENYUSUN PERENCANAAN TENAGA KERJA --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleRencanaTknasional">Perusahaan Yang Sudah Menyusun Perencanaan Tenaga Kerja per Nasional</h5>
            <canvas id="doughnutPerencanaanTk"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleRencanaTk">Perusahaan Yang Sudah Menyusun Perencanaan Tenaga Kerja Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barPerencanaanTk"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>
<br>

<!-- ========================= -->
<!-- TABEL PROVINSI -->
<!-- ========================= -->
<div id="tabelProvinsiKetenagakerjaan" style="display:none" class="mt-4">

    <h5 class="mb-3">Tabel Data Berdasarkan Provinsi</h5>

    <div class="table-responsive">
        <table class="table table-bordered table-striped table-sm text-center">

            <thead class="table-dark">
                <tr>
                    <th rowspan="2">Provinsi</th>

                    <th colspan="2">P2K3</th>
                    <th colspan="2">Ahli K3</th>
                    <th colspan="2">Disabilitas</th>
                    <th colspan="2">Perencanaan TK</th>
                    <th colspan="2">Serikat Pekerja</th>
                    <th colspan="2">Pemberian Susu</th>
                    <th colspan="2">Waktu Kerja</th>
                </tr>

                <tr>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                </tr>
            </thead>

            <tbody id="tbodyProvinsi"></tbody>

        </table>
    </div>

</div>


<!-- ========================= -->
<!-- TABEL KABUPATEN -->
<!-- ========================= -->
<div id="tabelKabupatenKetenagakerjaan" style="display:none" class="mt-4">

    <h5 class="mb-3">Tabel Data Berdasarkan Kabupaten / Kota</h5>

    <div class="table-responsive">
        <table class="table table-bordered table-striped table-sm text-center">

            <thead class="table-dark">
                <tr>
                    <th rowspan="2">Kabupaten / Kota</th>

                    <th colspan="2">P2K3</th>
                    <th colspan="2">Ahli K3</th>
                    <th colspan="2">Disabilitas</th>
                    <th colspan="2">Perencanaan TK</th>
                    <th colspan="2">Serikat Pekerja</th>
                    <th colspan="2">Pemberian Susu</th>
                    <th colspan="2">Waktu Kerja</th>
                </tr>
                <tr>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                </tr>
            </thead>

            <tbody id="tbodyKabupaten"></tbody>

        </table>
    </div>

</div>
