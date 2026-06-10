<<<<<<< HEAD
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
=======
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
        <h4 id="judulTabelKbli" class="table-title"></h4>
        <table class="table table-bordered table-striped">
            <thead>
                <tr id="headerKbli"></tr>
            </thead>
            <tbody id="tbodyKbli"></tbody>
        </table>
    </div>
</section>

<script>
    window.kbliChart = null;


    function renderKbliLPChart() {

        const tahun = document.getElementById("filterKbliTahun")?.value;
        const bulan = document.getElementById("filterKbliBulan")?.value;
        const prov = document.getElementById("filterKbliProvinsi")?.value;
        const kota = document.getElementById("filterKbliKota")?.value;

        fetch(`/kbli/perusahaan?tahun=${tahun || ''}&bulan=${bulan || ''}&provinsi=${prov || ''}&kota=${kota || ''}`)
            .then(res => res.json())
            .then(data => {


                window.kbliData = data;

                // 🔥 KHUSUS CHART → GLOBAL (tanpa provinsi)
                const groupedChart = {};

                data.forEach(item => {
                    if (!item.nama_2_digit) return;
                    const key = item.nama_2_digit;

                    if (!groupedChart[key]) groupedChart[key] = 0;

                    groupedChart[key] += Number(item.total_perusahaan) || 0;
                });

                const labels = Object.keys(groupedChart);
                const values = Object.values(groupedChart);
                const titleText = generateTitle(tahun, bulan, prov, kota);

                const canvas = document.getElementById("kbliChartCanvas");
                const wrapper = document.getElementById("kbliChartWrapper");

                if (!canvas || !wrapper) return;


                const barWidth = 80;
                const barHeight = 50;
                const totalWidth = labels.length * barWidth;
                const totalHeight = 400 + (labels.length * 2);

                if (labels.length > 8) {
                    wrapper.style.width = (labels.length * 90) + "px"; // paksa melebar
                } else {
                    wrapper.style.width = "100%";
                }
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

        renderKbliLPChart();

        document.querySelectorAll(".filter-select")
            .forEach(el => {
                el.addEventListener("change", renderKbliLPChart);
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
                pdf.text(timestamp, pageWidth - 10, 35, {
                    align: "right"
                });
            }

            // kasih delay biar chart settle
            await new Promise(resolve => setTimeout(resolve, 300));

            // =========================
            // CHART
            // =========================
            await addKop(pdf);
            addHeader();

            const originalChart = Chart.getChart("kbliChartCanvas");

            if (!originalChart) {
                alert("Chart tidak ditemukan");
                return;
            }

            const labels = originalChart.data.labels;
            const values = originalChart.data.datasets[0].data;

            const pageWidth = pdf.internal.pageSize.getWidth();
            const margin = 10;
            const imgWidth = pageWidth - (margin * 2);
            const imgHeight = imgWidth * 0.6;

            // 🔥 20 data per halaman
            const chunkSize = 20;

            // canvas sementara (WAJIB kasih ukuran besar biar gak blur)
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = 2000;
            tempCanvas.height = 800;

            for (let i = 0; i < labels.length; i += chunkSize) {

                const chunkLabels = labels.slice(i, i + chunkSize);
                const chunkValues = values.slice(i, i + chunkSize);

                // hapus chart lama
                if (window.tempChart) {
                    window.tempChart.destroy();
                }

                // render chart baru per halaman
                window.tempChart = new Chart(tempCanvas, {
                    type: originalChart.config.type,
                    data: {
                        labels: chunkLabels,
                        datasets: [{
                            label: "Data KBLI",
                            data: chunkValues,
                            backgroundColor: "#42a5f5"
                        }]
                    },
                    options: {
                        responsive: false,
                        animation: false,
                        maintainAspectRatio: false,
                        plugins: {
                            datalabels: {
                                anchor: 'end',
                                align: 'top',
                                clip: false,
                                color: '#000',
                                font: {
                                    weight: 'bold',
                                    size: 10
                                },
                                formatter: function(value) {
                                    return value.toLocaleString("id-ID");
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    maxRotation: 45,
                                    minRotation: 45,
                                    autoSkip: false,
                                    font: {
                                        size: 10
                                    }
                                }
                            }
                        }
                    },

                    plugins: [ChartDataLabels]

                });

                // convert ke image HD
                const chartImg = tempCanvas.toDataURL("image/png", 1.0);

                // halaman baru kalau bukan pertama
                if (i !== 0) {
                    pdf.addPage();
                    await addKop(pdf);
                    addHeader();
                }

                pdf.setFontSize(14);
                pdf.setFont(undefined, "bold");

                // range data (biar keren: 1–20, 21–40, dst)
                const start = i + 1;
                const end = Math.min(i + chunkSize, labels.length);

                pdf.text(
                    `GRAFIK DATA KBLI (${start} - ${end})`,
                    pageWidth / 2,
                    45, {
                        align: "center"
                    }
                );
                // render ke PDF
                pdf.addImage(chartImg, "PNG", margin, 55, imgWidth, imgHeight);
            }

            // =========================
            // TABEL
            // =========================
            pdf.addPage();
            await addKop(pdf);
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

            const judulText =
                document.getElementById("judulTabelKbli")?.innerText ||
                "TABEL DATA LAPANGAN KERJA BERDASARKAN KBLI";

            const lines = pdf.splitTextToSize(judulText, 250);

            pdf.setFontSize(14);
            pdf.setFont(undefined, "bold");

            const judulY = 48;

            pdf.text(lines, 148, judulY, {
                align: "center"
            });

            const tableStartY = judulY + (lines.length * 6);

            pdf.autoTable({
                html: table,
                startY: tableStartY + 8,
                styles: {
                    fontSize: 8
                },
                headStyles: {
                    fillColor: [66, 165, 245],
                    textColor: 255,
                },
                didDrawPage: async () => {
                    await addKop(pdf);
                    addHeader();
                },
            });
            tableWrapper.style.display = originalDisplay;

            pdf.save("laporan-kbli.pdf");
        });
    });

    // CODE UNTUK CHART FULL 1 HALAMAN
    // document.addEventListener("DOMContentLoaded", () => {

    //     renderKbliLPChart();

    //     document.querySelectorAll(".filter-select")
    //         .forEach(el => {
    //             el.addEventListener("change", renderKbliLPChart);
    //         });

    //     const btnKbli = document.getElementById("downloadPdfKbli");

    //     if (!btnKbli) return;

    //     btnKbli.addEventListener("click", async function() {

    //         const {
    //             jsPDF
    //         } = window.jspdf;
    //         const pdf = new jsPDF("l", "mm", "a4");

    //         const now = new Date();
    //         const tanggal = now.toLocaleDateString("id-ID");
    //         const jam = now.toLocaleTimeString("id-ID");

    //         const timestamp = `Dicetak: ${tanggal} ${jam}`;

    //         function addHeader() {
    //             const pageWidth = pdf.internal.pageSize.getWidth();
    //             pdf.setFontSize(9);
    //             pdf.setTextColor(100);
    //             pdf.text(timestamp, pageWidth - 10, 35, {
    //                 align: "right"
    //             });
    //         }

            // kasih delay biar chart settle
            // await new Promise(resolve => setTimeout(resolve, 300));

            // =========================
            // CHART
            // =========================
            // await addKop(pdf);
            // addHeader();

            // const chart = Chart.getChart("kbliChartCanvas");

            // if (!chart) {
            //     alert("Chart tidak ditemukan");
            //     return;
            // }

            // const chartImg = chart.toBase64Image("image/png", 4);

            // pdf.addImage(chartImg, "PNG", 10, 55, 277, 120);

            // =========================
            // TABEL
            // =========================
    //         pdf.addPage();
    //         await addKop(pdf);
    //         addHeader();

    //         const tableWrapper = document.getElementById("tableWrapperKbli");
    //         const table = document.querySelector("#tableWrapperKbli > table");

    //         if (!tableWrapper || !table) {
    //             alert("Tabel tidak ditemukan");
    //             return;
    //         }

    //         const originalDisplay = tableWrapper.style.display;

    //         tableWrapper.style.display = "block";
    //         tableWrapper.style.visibility = "visible";

    //         const judulText =
    //             document.getElementById("judulTabelKbli")?.innerText ||
    //             "TABEL DATA LAPANGAN KERJA BERDASARKAN KBLI";

    //         const lines = pdf.splitTextToSize(judulText, 250);

    //         pdf.setFontSize(14);
    //         pdf.setFont(undefined, "bold");

    //         const judulY = 48;

    //         pdf.text(lines, 148, judulY, {
    //             align: "center"
    //         });

    //         const tableStartY = judulY + (lines.length * 6);

    //         pdf.autoTable({
    //             html: table,
    //             startY: tableStartY + 8,
    //             styles: {
    //                 fontSize: 8
    //             },
    //             headStyles: {
    //                 fillColor: [66, 165, 245],
    //                 textColor: 255,
    //             },
    //             didDrawPage: async () => {
    //                 await addKop(pdf);
    //                 addHeader();
    //             },
    //         });
    //         tableWrapper.style.display = originalDisplay;

    //         pdf.save("laporan-kbli.pdf");
    //     });
    // });

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

    function renderTabelKbli(data, mode = "single") {
        const tbody = document.getElementById("tbodyKbli");
        const header = document.getElementById("headerKbli");
        const judul = document.getElementById("judulTabelKbli");

        if (!tbody || !header || !judul) return;

        if (!Array.isArray(data)) {
            console.error("Data KBLI bukan array:", data);
            return;
        }

        const tahun = document.getElementById("filterKbliTahun")?.value || "Semua Tahun";
        const bulan = document.getElementById("filterKbliBulan")?.value || "Semua Bulan";
        const prov = document.getElementById("filterKbliProvinsi")?.value || "Semua Provinsi";
        const kota = document.getElementById("filterKbliKota")?.value || "Semua Kab/Kota";

        tbody.innerHTML = "";

        let no = 1;

        // =========================
        // JUDUL TABEL
        // =========================
        if (mode === "single") {
            judul.innerHTML = `
            TABEL DATA LAPANGAN KERJA BERDASARKAN KBLI
            <br>
            <small>${tahun} - ${bulan} | ${prov} | ${kota}</small>
        `;
        } else {
            judul.innerHTML = `
            TABEL DATA LAPANGAN KERJA BERDASARKAN KBLI
            <br>
            <small>KBLI Tertinggi per Provinsi</small>
        `;
        }

        // =========================
        // HEADER
        // =========================
        if (mode === "single") {
            header.innerHTML = `
            <th>No</th>
            <th>Tahun</th>
            <th>Bulan</th>
            <th>Provinsi</th>
            <th>Kab/Kota</th>
            <th>KBLI</th>
            <th>Total</th>
        `;
        } else {
            header.innerHTML = `
            <th>No</th>
            <th>Provinsi</th>
            <th>KBLI Tertinggi</th>
            <th>Total</th>
        `;
        }

        // =========================
        // MODE SINGLE
        // =========================
        if (mode === "single") {
            data
                .sort((a, b) => (parseInt(b.total_perusahaan) || 0) - (parseInt(a.total_perusahaan) || 0))
                .forEach((item) => {
                    tbody.innerHTML += `
                    <tr>
                        <td>${no++}</td>
                        <td>${tahun}</td>
                        <td>${bulan}</td>
                        <td>${prov}</td>
                        <td>${kota}</td>
                        <td>${item.nama_2_digit ?? "-"}</td>
                        <td><b>${parseInt(item.total_perusahaan || 0).toLocaleString("id-ID")}</b></td>
                    </tr>
                `;
                });
        }

        // =========================
        // MODE FULL
        // =========================
        else {
            const grouped = {};

            data.forEach((row) => {
                const provinsi = row.provinsi || "Tidak Diketahui";

                if (!grouped[provinsi]) {
                    grouped[provinsi] = {
                        provinsi,
                        maxTotal: 0,
                        nama_2_digit: "-",
                    };
                }

                const total = parseInt(row.total) || 0;
                const nama = row.nama_2_digit || "-";

                if (
                    total > grouped[provinsi].maxTotal &&
                    nama !== "-" &&
                    nama.trim() !== ""
                ) {
                    grouped[provinsi].maxTotal = total;
                    grouped[provinsi].nama_2_digit = nama;
                }
            });

            Object.values(grouped)
                .sort((a, b) => b.maxTotal - a.maxTotal)
                .forEach((item) => {
                    tbody.innerHTML += `
                    <tr>
                        <td>${no++}</td>
                        <td>${item.provinsi}</td>
                        <td>${item.nama_2_digit}</td>
                        <td><b>${item.maxTotal.toLocaleString("id-ID")}</b></td>
                    </tr>
                `;
                });
        }
    }


    const btnToggle = document.getElementById("toggleTableKbli");
    const tableWrapper = document.getElementById("tableWrapperKbli");

    if (btnToggle && tableWrapper) {
        btnToggle.addEventListener("click", function() {
            if (tableWrapper.style.display === "none") {
                renderTabelKbli(window.kbliData, "single");
                tableWrapper.style.display = "block";
                btnToggle.innerText = "Tutup Tabel";
            } else {
                tableWrapper.style.display = "none";
                btnToggle.innerText = "Buka Tabel";
            }
        });
    }
</script>
>>>>>>> rayhan
