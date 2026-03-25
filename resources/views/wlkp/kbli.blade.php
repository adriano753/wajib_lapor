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