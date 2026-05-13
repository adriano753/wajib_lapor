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

    <div class="filter-group">
        <label>Download</label>
        <button id="downloadPdfKetenagakerjaan" class="form-select filter-select">
            Download
        </button>
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
        <div style="height: 350px;">
            <canvas id="barKabupatenP2K3"></canvas>
        </div>
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
        <div style="height: 350px;">
            <canvas id="barKabupatenAhliK3"></canvas>
        </div>
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
    <div id="chartKabupatenWrapperDisabilitas" style="display:none;">
        <h5 class="mt-4">Disabilitas Per Kabupaten</h5>
        <div style="height: 350px;">
            <canvas id="barKabupatenDisabilitas"></canvas>
        </div>
    </div>
</div>
<br>

{{-- 4. PERUSAHAAN YANG MENERAPKAN SUSU --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleSusunasional">Perusahaan Yang Menerapkan Struktur Skala Upah per Nasional</h5>
            <canvas id="doughnutSusu"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleSusu">Perusahaan Yang Menerapkan Struktur Skala Upah Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barSusu"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div id="chartKabupatenWrapperSusu" style="display:none;">
        <h5 class="mt-4">SUSU Per Kabupaten</h5>
        <div style="height: 350px;">
            <canvas id="barKabupatenSusu"></canvas>
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
    <div id="chartKabupatenWrapperSerikatPekerja" style="display:none;">
        <h5 class="mt-4">Serikat Pekerja Per Kabupaten</h5>
        <div style="height: 350px;">
            <canvas id="barKabupatenSerikatPekerja"></canvas>
        </div>
    </div>
</div>
<br>

{{-- 7. PERUSAHAAN YANG MEMILIKI LKS BIPARTIT --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleBipartitnasional">Perusahaan Yang Memiliki LKS Bipartit per Nasional</h5>
            <canvas id="doughnutBipartitPekerja"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleBipartit">Perusahaan Yang Memiliki LKS Bipartit Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barBipartitPekerja"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div id="chartKabupatenWrapperBipartitPekerja" style="display:none;">
        <h5 class="mt-4">Bipartit Per Kabupaten</h5>
        <div style="height: 350px;">
            <canvas id="barKabupatenBipartitPekerja"></canvas>
        </div>
    </div>
</div>
<br>

{{-- 7. PERUSAHAAN DENGAN PENGATURAN WAKTU KERJA WAKTU ISTIRAHAT --}}
<div class="chart-card full-width mt-4">
    <div class="chart-row">

        <!-- DOUGHNUT -->
        <div class="chart-left">
            <h5 id="titleWkwinasional">Perusahaan Yang Mengisi Pengaturan Waktu Kerja Waktu Istirahat per Nasional</h5>
            <canvas id="doughnutWkwi"></canvas>
        </div>

        <!-- BAR CHART SCROLL -->
        <div class="chart-right">
            <h5 id="titleWkwi">Perusahaan Yang Mengisi Pengaturan Waktu Kerja Waktu Istirahat Per Provinsi</h5>

            <div class="scroll-wrapper">
                <div class="chart-wide">
                    <canvas id="barWkwi"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div id="chartKabupatenWrapperWkwi" style="display:none;">
        <h5 class="mt-4">WKWI Per Kabupaten</h5>
        <div style="height: 350px;">
            <canvas id="barKabupatenWkwi"></canvas>
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
    <div id="chartKabupatenWrapperPerencanaanTk" style="display:none;">
        <h5 class="mt-4">Perencanaan TK Per Kabupaten</h5>
        <div style="height: 350px;">
            <canvas id="barKabupatenPerencanaanTk"></canvas>
        </div>
    </div>
</div>
<br>

<!-- ========================= -->
<!-- TABEL PROVINSI
<!-- ========================= -->
<div id="tabelProvinsiKetenagakerjaan" style="display:none" class="mt-4">

    <h5 class="mb-3">Tabel Data Berdasarkan Provinsi</h5>

    <div class="table-responsive">
        <table class="table table-bordered table-striped table-sm text-center">

            <thead class="table-dark">
                <tr>
                    <th rowspan="2">Provinsi</th>

                    <th colspan="3">P2K3</th>
                    <th colspan="3">Ahli K3</th>
                    <th colspan="4">Disabilitas</th>
                    <th colspan="3">Perencanaan TK</th>
                    <th colspan="3">Serikat Pekerja</th>
                    <th colspan="3">LKS Bipartit</th>
                    <th colspan="3">Pemberian SUSU</th>
                    <th colspan="3">Waktu Kerja</th>
                </tr>

                    <tr>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Total Total TK Disabilitas</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Umum</th>
                    <th>Sektor</th>
                    <th>Total Perusahaan</th>
                </tr>
            </thead>

            <tbody id="tbodyProvinsi"></tbody>

        </table>
    </div>

</div>


<!-- ========================= -->
<!-- TABEL KABUPATEN
<!-- ========================= -->
<div id="tabelKabupatenKetenagakerjaan" style="display:none" class="mt-4">

    <h5 class="mb-3">Tabel Data Berdasarkan Kabupaten / Kota</h5>

    <div class="table-responsive">
        <table class="table table-bordered table-striped table-sm text-center">

            <thead class="table-dark">
                <tr>
                    <th rowspan="2">Kabupaten / Kota</th>

                    <th colspan="3">P2K3</th>
                    <th colspan="3">Ahli K3</th>
                    <th colspan="4">Disabilitas</th>
                    <th colspan="3">Perencanaan TK</th>
                    <th colspan="3">Serikat Pekerja</th>
                    <th colspan="3">LKS Bipartit</th>
                    <th colspan="3">Pemberian SUSU</th>
                    <th colspan="3">Waktu Kerja</th>
                </tr>
                <tr>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Total Total TK Disabilitas</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Total Perusahaan</th>
                    <th>Umum</th>
                    <th>Sektor</th>
                    <th>Total Perusahaan</th>
                </tr>
            </thead>

            <tbody id="tbodyKabupaten"></tbody>

        </table>
    </div>
    <div id="tableP2K3Wrapper" style="display:none;">
        <table>
            <thead>
                <tr>
                    <th>Provinsi</th>
                    <th>P2K3 Sudah</th>
                    <th>P2K3 Belum</th>
                    <th>Perusahaan</th>
                </tr>
            </thead>
            <tbody id="tbodyP2K3"></tbody>
        </table>
    </div>
    <div id="tableSerikatWrapper" style="display:none;">
        <table>
            <thead>
                <tr>
                    <th>Provinsi</th>
                    <th>Serikat Sudah</th>
                    <th>Serikat Belum</th>
                    <th>Perusahaan</th>
                </tr>
            </thead>
            <tbody id="tbodySerikat"></tbody>
        </table>
    </div>
    <div id="tableSusuWrapper" style="display:none;">
        <table>
            <thead>
                <tr>
                    <th>Provinsi</th>
                    <th>SUSU Sudah</th>
                    <th>SUSU Belum</th>
                    <th>Perusahaan</th>
                </tr>
            </thead>
            <tbody id="tbodySusu"></tbody>
        </table>
    </div>
    <div id="tableBipartitWrapper" style="display:none;">
        <table>
            <thead>
                <tr>
                    <th>Provinsi</th>
                    <th>Sudah</th>
                    <th>Belum</th>
                    <th>Perusahaan</th>
                </tr>
            </thead>
            <tbody id="tbodyBipartit"></tbody>
        </table>
    </div>
    <div id="tableRencanaTKWrapper" style="display:none;">
        <table>
            <thead>
                <tr>
                    <th>Provinsi</th>
                    <th>Sudah</th>
                    <th>Perusahaan</th>
                </tr>
            </thead>
            <tbody id="tbodyRencanaTK"></tbody>
        </table>
    </div>
    <div id="tableDisabilitasWrapper" style="display:none;">
        <table>
            <thead>
                <tr>
                    <th>Provinsi</th>
                    <th>Sudah</th>
                    <th>Total Disabilitas</th>
                    <th>Perusahaan</th>
                </tr>
            </thead>
            <tbody id="tbodyDisabilitas"></tbody>
        </table>
    </div>
    <div id="tableAhliK3Wrapper" style="display:none;">
        <table>
            <thead>
                <tr>
                    <th>Provinsi</th>
                    <th>Sudah</th>
                    <th>Total Ahli K3</th>
                    <th>Perusahaan</th>
                </tr>
            </thead>
            <tbody id="tbodyAhliK3"></tbody>
        </table>
    </div><div id="tableWkwiWrapper" style="display:none;">
        <table>
            <thead>
                <tr>
                    <th>Provinsi</th>
                    <th>Umum</th>
                    <th>Sektor</th>
                    <th>Perusahaan</th>
                </tr>
            </thead>
            <tbody id="tbodyWkwi"></tbody>
        </table>
    </div>

</div>
