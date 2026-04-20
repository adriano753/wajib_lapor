<<<<<<< HEAD
<section class="container-provinsi-fluid py-4">
<br>
<h2 class="mb-3">DATA lAPANGAN USAHA</h2>

<div class="filter-panel mb-4">
    <div class="filter-group">
        <select id="filterKbliBulan" class="form-select filter-select">
            <option value="">Semua Bulan</option>
            @foreach ($optBulan as $b)
            <option value="{{ $b }}">{{ $b }}</option>
            @endforeach
        </select>
    </div>
    <div class="filter-group">
        <select id="filterKbliKota" class="form-select filter-select">
            <option value="">Semua Kab/Kota</option>
            @foreach ($optKota as $k)
            <option value="{{ $k }}">{{ $k }}</option>
            @endforeach
        </select>
    </div>
    <div class="filter-group">
        <select id="filterKbliTahun" class="form-select filter-select">
            <option value="">Semua Tahun</option>
            @foreach ($optTahun as $k)
            <option value="{{ $k }}">{{ $k }}</option>
            @endforeach
        </select>
    </div>
    <div class="filter-group">
        <select id="filterKbliProvinsi" class="form-select filter-select">
            <option value="">Semua Provinsi</option>
            @foreach ($optProvinsi as $k)
            <option value="{{ $k }}">{{ $k }}</option>
            @endforeach
        </select>
    </div>
</div>
<br>
<div style="height: 450px;">
    <canvas id="kbliChartCanvas"></canvas>
</div>
</section>

<script>
    let kbliChart = null;

    function renderKbliChart() {

        const tahun = document.getElementById("filterKbliTahun")?.value;
        const bulan = document.getElementById("filterKbliBulan")?.value;
        const prov = document.getElementById("filterKbliProvinsi")?.value;
        const kota = document.getElementById("filterKbliKota")?.value;

        fetch(`/kbli/filter?tahun=${tahun || ''}&bulan=${bulan || ''}&provinsi=${prov || ''}&kota=${kota || ''}`)
            .then(res => res.json())
            .then(data => {

                console.log("DATA KBLI:", data); // 🔥 DEBUG WAJIB

                const labels = data.map(d => d.nama_2_digit);
                const values = data.map(d => parseInt(d.total));

                const canvas = document.getElementById("kbliChartCanvas");

                if (!canvas) return;

                const oldChart = Chart.getChart(canvas);
                if (oldChart) oldChart.destroy();

                kbliChart = new Chart(canvas, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Jumlah Perusahaan",
                            data: values,
                            backgroundColor: "#42A5F5"
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

            })
            .catch(err => console.error("ERROR KBLI:", err));
    }

    document.addEventListener("DOMContentLoaded", () => {

        renderKbliChart(); // load awal

        document.querySelectorAll(".form-select filter-select")
            .forEach(el => {
                el.addEventListener("change", renderKbliChart);
            });

    });

    console.log("CANVAS:", document.getElementById("kbliChartCanvas"));
</script>
=======
<link rel="stylesheet" href="{{ asset('css/dropdown.css') }}">

<section class="card p-3 mb-4">
    <h2 class="mb-3">Rekap Lapangan Usaha (KBLI)</h2>
<form method="GET" id="filterForm" class="filter-container">
    
    <div class="dropdown-wrapper">
        <select name="tahun" onchange="this.form.submit()">
            <option value="">-- Periode Tahun --</option>
            @foreach ($optTahun as $t)
                <option value="{{ $t }}" @selected(request('tahun')==$t)>{{ $t }}</option>
            @endforeach
        </select>
    </div>

    <div class="dropdown-wrapper">
        <select name="bulan" onchange="this.form.submit()">
            <option value="">-- Periode Bulan --</option>
            @foreach ($optBulan as $b)
                <option value="{{ $b }}" @selected(request('bulan')==$b)>{{ $b }}</option>
            @endforeach
        </select>
    </div>

    <div class="dropdown-wrapper">
        <select name="provinsi" onchange="this.form.submit()">
            <option value="">-- Provinsi --</option>
            @foreach ($optProvinsi as $p)
                <option value="{{ $p }}" @selected(request('provinsi')==$p)>{{ $p }}</option>
            @endforeach
        </select>
    </div>

    <div class="dropdown-wrapper">
        <select name="kota" onchange="this.form.submit()">
            <option value="">-- Kab / Kota --</option>
            @foreach ($optKota as $k)
                <option value="{{ $k }}" @selected(request('kota')==$k)>{{ $k }}</option>
            @endforeach
        </select>
    </div>

    <div class="dropdown-wrapper" style="width: 100%; margin-top: 5px;">
        <select name="kbli" onchange="this.form.submit()" style="width: 100%;">
            <option value="">Lapangan Usaha</option>
            @foreach ($optKBLI as $k)
                <option value="{{ $k }}" @selected(request('kbli')==$k)>{{ $k }}</option>
            @endforeach
        </select>
        <div class="dropdown-info">
            Pilih klasifikasi lapangan usaha sesuai data terbaru.
        </div>
    </div>
</form>

<div class="chart-scroll-wrapper" style="width: 100%; overflow-x: auto; margin-top: 20px; border-radius: 10px;">
    <div id="chartStage" style="height: 450px; min-width: 100%;">
        <canvas id="kbliList"></canvas>
    </div>
</div>
</section>
>>>>>>> eae76cc (codingan jamsos dan upah minimum)
