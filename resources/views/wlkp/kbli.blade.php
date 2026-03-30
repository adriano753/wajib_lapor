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
    <div id="kbliOuterWrapper">
        <div id="kbliChartWrapper">
            <canvas id="kbliChartCanvas"></canvas>
        </div>
    </div>
</section>

<script>
    window.kbliChart = null;


    function renderKbliChart() {

        const tahun = document.getElementById("filterKbliTahun")?.value;
        const bulan = document.getElementById("filterKbliBulan")?.value;
        const prov = document.getElementById("filterKbliProvinsi")?.value;
        const kota = document.getElementById("filterKbliKota")?.value;

        fetch(`/kbli/filter?tahun=${tahun || ''}&bulan=${bulan || ''}&provinsi=${prov || ''}&kota=${kota || ''}`)
            .then(res => res.json())
            .then(data => {

                const labels = data.map(d => d.nama_2_digit);
                const values = data.map(d => parseInt(d.total));
                const titleText = generateTitle(tahun, bulan, prov, kota);

                const canvas = document.getElementById("kbliChartCanvas");
                const wrapper = document.getElementById("kbliChartWrapper");

                if (!canvas || !wrapper) return;


                const barWidth = 80;
                const barHeight = 50;
                const totalWidth = labels.length * barWidth;
                const totalHeight = 400 + (labels.length * 2);

                wrapper.style.width = totalWidth > 1000 ?
                    totalWidth + "px" :
                    "100%";
                wrapper.style.height = totalHeight > 400 ? totalHeight + "px" : "400px";

                const oldChart = Chart.getChart(canvas);
                if (oldChart) oldChart.destroy();

                window.kbliChart = new Chart(canvas, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Jumlah Perusahaan",
                            data: values,
                            backgroundColor: "#42A5F5",
                            barThickness: 40
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        layout: {
                            padding: {
                                top: 30,
                                bottom: 20
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: titleText,
                                color: getTextColor(),
                                font: {
                                    size: 16,
                                    weight: 'bold'
                                }
                            },
                            datalabels: {
                                anchor: 'end',
                                align: 'top',
                                color: getTextColor(),
                                font: {
                                    weight: 'bold',
                                    size: 12
                                },
                                formatter: (value) => value.toLocaleString('id-ID')
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    autoSkip: false,
                                    maxRotation: 45,
                                    minRotation: 45,
                                    color: getTextColor()
                                }
                            },
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    color: getTextColor()
                                },
                                grid: {
                                    color: document.body.classList.contains("light-mode") ?
                                        "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });

            })

            .catch(err => console.error("ERROR KBLI:", err));
    }

    document.addEventListener("DOMContentLoaded", () => {

        renderKbliChart(); // load awal

        document.querySelectorAll(".filter-select")
            .forEach(el => {
                el.addEventListener("change", renderKbliChart);
            });

    });
    document.getElementById("filterKbliProvinsi")
        ?.addEventListener("change", function() {

            const provinsi = this.value;
            const kotaSelect = document.getElementById("filterKbliKota");

            // reset dulu
            kotaSelect.innerHTML = `<option value="">Semua Kabupaten</option>`;

            if (!provinsi) return;

            fetch(`/get-kabupaten?provinsi=${encodeURIComponent(provinsi)}`)
                .then(res => res.json())
                .then(data => {

                    data.forEach(kota => {
                        const opt = document.createElement("option");
                        opt.value = kota.nama;
                        opt.textContent = kota.nama;
                        kotaSelect.appendChild(opt);
                    });

                })
                .catch(err => console.error("ERROR KABUPATEN:", err));
        });

    function getTextColor() {
        return document.body.classList.contains("light-mode") ?
            "#000000" :
            "#ffffff";
    }

    function generateTitle(tahun, bulan, prov, kota) {
        let text = "Sebaran Jumlah Perusahaan Berdasarkan KBLI";

        const namaBulan = [
            "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ];

        if (tahun) text += ` Tahun ${tahun}`;
        if (bulan) text += ` Bulan ${namaBulan[bulan]}`;
        if (prov) text += ` - ${prov}`;
        if (kota) text += ` (${kota})`;

        return text;
    }

    console.log("CANVAS:", document.getElementById("kbliChartCanvas"));
</script>
