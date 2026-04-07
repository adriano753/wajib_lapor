<section class="container-provinsi-fluid py-4">
    <br>
    <h2 class="mb-3">DATA LAPANGAN USAHA</h2>

    <div class="filter-panel mb-4">
        <div class="filter-group">
            <select id="filterKbliProvinsi" class="form-select filter-select">
                <option value="">Semua Provinsi</option>
                @foreach ($optProvinsi as $k)
                    <option value="{{ $k }}">{{ $k }}</option>
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
            <select id="filterKbliBulan" class="form-select filter-select">
                <option value="">Semua Bulan</option>
                @foreach ($optBulan as $b)
                    <option value="{{ $b }}">{{ $b }}</option>
                @endforeach
            </select>
        </div>
        <div class="filter-group">
            <button id="toggleTableKbli" class="form-select filter-select">
                Buka Tabel
            </button>
        </div>
        <div class="filter-group">
            <label for="">Download Data</label>
            <button id="downloadPdfKbli" class="form-select filter-select">
                Download
            </button>
        </div>
    </div>
    </div>
    <br>
    <div id="kbliOuterWrapper">
        <div id="kbliChartWrapper">
            <canvas id="kbliChartCanvas"></canvas>
        </div>
    </div>
    <div id="tableWrapperKbli" style="display: none;">
        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Tahun</th>
                    <th>Bulan</th>
                    <th>Provinsi</th>
                    <th>Kab/Kota</th>
                    <th>KBLI</th>
                    <th>Jumlah</th>
                </tr>
            </thead>
            <tbody id="tbodyKbli"></tbody>
        </table>
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
                renderTabelKbli(data);

            })

            .catch(err => console.error("ERROR KBLI:", err));
    }

    document.addEventListener("DOMContentLoaded", () => {

        renderKbliChart();

        document.querySelectorAll(".filter-select")
            .forEach(el => {
                el.addEventListener("change", renderKbliChart);
            });

        const btnKbli = document.getElementById("downloadPdfKbli");

        if (!btnKbli) return;

        btnKbli.addEventListener("click", async function() {

            const {
                jsPDF
            } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            const now = new Date();
            const tanggal = now.toLocaleDateString("id-ID");
            const jam = now.toLocaleTimeString("id-ID");

            const timestamp = `Dicetak: ${tanggal} ${jam}`;

            function addHeader() {
                const pageWidth = pdf.internal.pageSize.getWidth();
                pdf.setFontSize(9);
                pdf.setTextColor(100);
                pdf.text(timestamp, pageWidth - 10, 8, {
                    align: "right"
                });
            }

            // kasih delay biar chart settle
            await new Promise(resolve => setTimeout(resolve, 300));

            // =========================
            // CHART
            // =========================
            addHeader();

            const chart = Chart.getChart("kbliChartCanvas");

            if (!chart) {
                alert("Chart tidak ditemukan");
                return;
            }

            const chartImg = chart.toBase64Image("image/png", 4);

            pdf.addImage(chartImg, "PNG", 10, 15, 277, 120);

            // =========================
            // TABEL
            // =========================
            pdf.addPage();
            addHeader();

            const tableWrapper = document.getElementById("tableWrapperKbli");
            const table = document.querySelector("#tableWrapperKbli > table");

            if (!tableWrapper || !table) {
                alert("Tabel tidak ditemukan");
                return;
            }

            const originalDisplay = tableWrapper.style.display;

            tableWrapper.style.display = "block";
            tableWrapper.style.visibility = "visible";

            pdf.autoTable({
                html: table,
                startY: 15,
                styles: {
                    fontSize: 8
                },
                headStyles: {
                    fillColor: [66, 165, 245],
                    textColor: 255,
                },
                didDrawPage: () => addHeader(),
            });

            tableWrapper.style.display = originalDisplay;

            pdf.save("laporan-kbli.pdf");
        });
    });

    document.getElementById("filterKbliProvinsi")
        ?.addEventListener("change", function() {

            const provinsi = this.value;
            const kotaSelect = document.getElementById("filterKbliKota");

            
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

    function renderTabelKbli(data) {
        const tbody = document.getElementById("tbodyKbli");
        if (!tbody) return;

        const tahun = document.getElementById("filterKbliTahun")?.value || "Semua Tahun";
        const bulan = document.getElementById("filterKbliBulan")?.value || "Semua Bulan";
        const prov = document.getElementById("filterKbliProvinsi")?.value || "Semua Provinsi";
        const kota = document.getElementById("filterKbliKota")?.value || "Semua Kab/Kota";

        tbody.innerHTML = "";

        let no = 1;

        data
            .sort((a, b) => {
                const kbliA = (a.nama_2_digit || "").toLowerCase();
                const kbliB = (b.nama_2_digit || "").toLowerCase();

                if (kbliA.includes("tidak")) return 1;
                if (kbliB.includes("tidak")) return -1;

                return kbliA.localeCompare(kbliB, "id");
            })
            .forEach((item) => {
                tbody.innerHTML += `
                <tr>
                    <td>${no++}</td>
                    <td>${tahun}</td>
                    <td>${bulan}</td>
                    <td>${prov}</td>
                    <td>${kota}</td>
                    <td>${item.nama_2_digit}</td>
                    <td><b>${parseInt(item.total).toLocaleString("id-ID")}</b></td>
                </tr>
            `;
            });
    }
    const btnToggle = document.getElementById("toggleTableKbli");
    const tableWrapper = document.getElementById("tableWrapperKbli");

    if (btnToggle && tableWrapper) {
        btnToggle.addEventListener("click", function() {
            if (tableWrapper.style.display === "none") {
                tableWrapper.style.display = "block";
                btnToggle.innerText = "Tutup Tabel";
            } else {
                tableWrapper.style.display = "none";
                btnToggle.innerText = "Buka Tabel";
            }
        });
    }
</script>
