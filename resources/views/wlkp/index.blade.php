<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WLKP - Wajib Lapor Ketenagakerjaan Perusahaan</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/kemnaker_logo.png') }}">
    <link rel="stylesheet" href="{{ asset('css/wlkp.css') }}">
    {{-- <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.1/dist/chartjs-plugin-zoom.min.js"></script> --}}
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>
    <script src="https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/exceljs/dist/exceljs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/file-saver/dist/FileSaver.min.js"></script>
</head>


<body>
    <div id="loader">
        <div class="loader-content">
            <img src="{{ asset('images/logo_kemnaker.png') }}" class="loader-logo" alt="WLKP">

            <div class="spinner"></div>

            <p class="loading-text">Memuat Sistem WLKP...</p>
        </div>
    </div>

    <nav id="navbar">
        <div class="nav-container">
            <a href="#beranda" class="logo">
                <img src="{{ asset('images/img.png') }}" width="155">
            </a>
            <div class="menu-toggle" id="menuToggle">
                ☰
            </div>
            <ul class="nav-links" id="navLinks">
                <li><a href="#beranda" class="active">Beranda</a></li>
                <li><a href="#laporan">Laporan</a></li>
                <!-- <li><a href="#layanan">Layanan</a></li> -->
                <li><a href="#kontak">Tentang Kami</a></li>
                <button id="themeToggle" class="cta-button" style="padding:8px 20px;font-size:14px;">
                    🌙 Dark
                </button>

            </ul>
        </div>
    </nav>

    <section class="hero" id="beranda">
        <div class="geometric-shapes">
            <div class="shape shape2"></div>
            <div class="shape shape3"></div>
            <div class="shape shape4"></div>
            <div class="shape shape5"></div>
            <div class="shape shape6"></div>
        </div>
        <div class="hero-content">
            <div class="hero-text">
                <h1>Wajib Lapor Ketenagakerjaan Perusahaan</h1>
                <p>
                    Wajib Lapor Ketenagakerjaan Perusahaan (WLKP)
                    merupakan sistem pelaporan resmi untuk mendukung
                    pengelolaan data ketenagakerjaan secara terintegrasi.
                </p>
                <a href="#laporan" class="cta-button">Mulai Sekarang</a>
            </div>
            <div class="hero-visual">
                <div class="neon-line neon-line1"></div>
                <div class="neon-line neon-line2"></div>
            </div>
    </section>

    <!-- LAPORAN -->
    <section class="laporan-section" id="laporan">
        <div class="beranda-container">
            <h2 class="section-title">Laporan</h2>

            <!-- Data -->
            <div class="metrics-grid">
                <div class="metric-item">
                    <div class="metric-value">{{ $totalSemua ?? 0 }}</div>
                    <div class="metric-label">Jumlah Total Perusahaan</div>
                </div>

                <div class="metric-item">
                    <div class="metric-value">{{ $mikro ?? 0 }}</div>
                    <div class="metric-label">Mikro</div>
                </div>

                <div class="metric-item">
                    <div class="metric-value">{{ $kecil ?? 0 }}</div>
                    <div class="metric-label">Kecil</div>
                </div>

                <div class="metric-item">
                    <div class="metric-value">{{ $menengah ?? 0 }}</div>
                    <div class="metric-label">Menengah</div>
                </div>

                <div class="metric-item">
                    <div class="metric-value">{{ $besar ?? 0 }}</div>
                    <div class="metric-label">Besar</div>
                </div>

                <div class="metric-item">
                    <div class="metric-value">{{ $tidak_terident ?? 0 }}</div>
                    <div class="metric-label">Tidak Teridentifikasi</div>
                </div>
            </div>

            <!-- GRAFIK PROVINSI -->
            <div class="chart-card full-width">
                <div class="chart-header">
                    <h3 class="chart-title">Laporan Provinsi</h3>
                    <button id="downloadBarPdf" class="form-select filter-select">
                        Download PDF
                    </button>
                    <button id="downloadPdfAll" class="form-select filter-select">
                        Download full
                    </button>
                    <button id="toggleTablelprBtn" class="form-select filter-select">
                        Tampilkan Tabel
                    </button>
                </div>

                <div class="chart-container">
                    <div class="bar-chart" id="barChart">
                        @forelse ($dataProvinsi as $row)
                            @php
                                $height = $maxVal > 0 ? ($row->total / $maxVal) * 100 : 0;
                            @endphp

                            <div class="bar" style="height: {{ $height }}%" title="{{ $row->provinsi }}">
                                <span class="bar-value">
                                    {{ number_format($row->total, 0, ',', '.') }}
                                </span>
                                <span class="bar-label">
                                    {{ $row->provinsi }}
                                </span>
                            </div>
                        @empty
                            <p>Tidak ada data</p>
                        @endforelse
                    </div>
                </div>
                <div id="tableProvinsilprWrapper" style="display: none;">
                    <div class="table-responsive mt-2">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Provinsi</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($dataProvinsi as $index => $row)
                                    <tr>
                                        <td>{{ $index + 1 }}</td>
                                        <td>{{ $row->provinsi }}</td>
                                        <td>{{ number_format($row->total, 0, ',', '.') }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="3" class="text-center">Tidak ada data</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {{-- GRAFIK KLASIFIKASI --}}
            @include('wlkp.perusahaanklasifikasi')
            @include('wlkp.kbli')
            {{-- GRAFIK TK --}}
            @include('wlkp.tenagakerja')
            {{-- GRAFIK SEBARAN TENAGA KERJA BERDASARKAN 2 DIGIT KBLI --}}
            @include('wlkp.sebarantkkbli')
            @include('wlkp.jaminansosial')
            @include('wlkp.pppkb')
            @include('wlkp.upahminimum')
            @include('wlkp.ketenagakerjaan')
        </div>

    </section>

    <!-- TENTANG KAMI -->
    <!-- Contact Section -->
    <section class="contact-section" id="kontak">
        <div class="beranda-container">
            <h2 class="section-title">Tentang Kami</h2>
            <div class="contact-grid">
                <!-- Contact Form -->
                <div class="contact-form">
                    <h3 style="margin-bottom: 30px; font-size: 24px;">Informasi Unit Kerja</h3>
                    <div class="mb-3 text-center">
                        <img src="images/binwas.png"
                            style="display: block; margin-left: auto; margin-right: auto; max-height: 225px; object-fit: contain;">
                    </div>
                    <h3>Ditjen Binwasnaker & K3</h3>
                    <p class="text-muted" style="text-align: justify;">
                        Merupakan unit kerja yang mempunyai tugas menyelenggarakan perumusan dan pelaksanaan kebijakan
                        di bidang pembinaan pengawasan ketenagakerjaan serta keselamatan dan kesehatan kerja.
                    </p>
                </div>

                <!-- Contact Info -->
                <div class="contact-info">
                    <h3>Informasi Kontak</h3>

                    <div class="contact-item">
                        <div class="contact-icon">📧</div>
                        <div class="contact-details">
                            <h4>Email</h4>
                            pengaduanwlkp.bspk@gmail.com
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">📞</div>
                        <div class="contact-details">
                            <div style="display: flex; gap: 20px; align-items: center;">
                                <div>
                                    <strong style="color: #000; font-size: 1.1em;">Telepon</strong>
                                    <strong style="color: #000; font-size: 1.1em;">021-5255733</strong>
                                </div>
                                <div style="border-left: 2px solid #ddd; padding-left: 20px;">
                                    <strong style="color: #000; font-size: 1.1em;">Call
                                        Center</strong>
                                    <strong style="color: #000; font-size: 1.1em;">1500630</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">📍</div>
                        <div class="contact-details">
                            <h4>Lokasi</h4>
                            Jl. Gatot Subroto No.Kav 51, RT.5/RW.4, Kuningan Tim., Kecamatan Setiabudi, Kota Jakarta
                            Selatan, Daerah Khusus Ibukota Jakarta 12950
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">🕒</div>
                        <div class="contact-details">
                            <h4>Jam Kerja</h4>
                            <p>Senin - Jumat</p>
                            8:00 WIB - 16:00 WIB
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p>© 2026 Kementerian Ketenagakerjaan Republik Indonesia</p>
    </footer>
    <script>
        window.kabData = @json($rows ?? []);
        window.provData = @json($rowsProvinsi ?? []);
        window.chartData = {
            kota: @json($kota),
            mikro: @json($mikroChart),
            kecil: @json($kecilChart),
            menengah: @json($menengahChart),
            besar: @json($besarChart),
            provinsi: @json($dataProvinsi->pluck('provinsi')),
            klasifikasi: @json($dataKlasifikasi),
            totalProvinsiKlas: @json($dataProvinsi->pluck('total')),
            provinsi: @json($provinsi),
            mikroProv: @json($mikroProv),
            kecilProv: @json($kecilProv),
            menengahProv: @json($menengahProv),
            besarProv: @json($besarProv),
            kbliLabels: @json($kbliLabels),
            kbliValues: @json($kbliValues),
            PPPKBValues: @json($rowsPPPKB),
        };
        window.kbliData = @json($rowsKodeTk);
        window.chartData.kbliLabels = @json($kbliChart->pluck('nama_2_digit'));
        window.chartData.kbliValues = @json($kbliChart->pluck('total'));
        window.chartMasterData = @json($masterData);
        window.listProvinsiLabel = @json($listProvinsi);
        window.chartJaminanData = {
            labels: @json($rowsBpjs->pluck('provinsi')),
            jkk: @json($rowsBpjs->pluck('jkk')),
            jht: @json($rowsBpjs->pluck('jht')),
            jkm: @json($rowsBpjs->pluck('jkm')),
            jp: @json($rowsBpjs->pluck('jp')),
        };
        window.chartUpahMinimumData = {
            labels: @json($listProvinsi),
            values: @json($listUpah)
        };
    </script>

    <!-- ============================
     Ini untuk memanggil data dan menampilkan data KBLI
     ================================ -->
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const labels = window.chartData?.kbliLabels || [];
            const values = window.chartData?.kbliValues || [];

            if (labels.length === 0) return;

            const canvas = document.getElementById("kbliList");
            const chartStage = document.getElementById("chartStage");

            // --- KUNCI KONSISTENSI UKURAN ---
            const barWidth = 80;
            const totalWidth = labels.length * barWidth;

            chartStage.style.width = totalWidth > chartStage.parentElement.offsetWidth ?
                totalWidth + "px" :
                "100%";

            new Chart(canvas, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Jumlah Perusahaan",
                        data: values,
                        backgroundColor: '#42A5F5',
                        barThickness: 40, // Lebar batang tetap 40px
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            // color: 'white',
                            font: {
                                weight: 'bold'
                            },
                            formatter: (value) => value.toLocaleString('id-ID')
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                // color: 'white',
                                maxRotation: 45,
                                minRotation: 45,
                                autoSkip: false // Tampilkan semua label karena sudah bisa di-scroll
                            }
                        },
                        y: {
                            beginAtZero: true,
                            // ticks: { color: 'white' },
                            // grid: { color: 'rgba(255,255,255,0.1)' }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        });
        document.addEventListener("DOMContentLoaded", function() {
            const btn = document.getElementById("toggleTablelprBtn");
            const table = document.getElementById("tableProvinsilprWrapper");

            if (!btn || !table) return;

            btn.addEventListener("click", function() {
                if (table.style.display === "none") {
                    table.style.display = "block";
                    btn.innerText = "Tutup Tabel";
                } else {
                    table.style.display = "none";
                    btn.innerText = "Tampilkan Tabel";
                }
            });
        });
    </script>

    @vite(['resources/js/templatemo-graph-script.js', 'resources/js/dashboard-klasifikasi.js', 'resources/js/dashboard-pp-pkb.js', 'resources/js/download-data.js', 'resources/js/ketenagakerjaan.js', 'resources/js/loader.js', 'resources/js/download-data-full.js'])

    <script>
        const BPJS_FILTER_URL = "{{ route('filter.bpjs') }}";
    </script>
    <script>
        const allKbliData = @json($kbliChart);
    </script>

    <script>
        document.getElementById("downloadBarPdf").addEventListener("click", function() {
            const {
                jsPDF
            } = window.jspdf;
            const doc = new jsPDF("landscape", "mm", "a4");

            doc.setFontSize(16);
            doc.text("Laporan Provinsi", 14, 15);

            const chartElement = document.getElementById("barChart");

            html2canvas(chartElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                width: chartElement.scrollWidth,
                height: chartElement.scrollHeight,
                windowWidth: chartElement.scrollWidth,
                windowHeight: chartElement.scrollHeight
            }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");

                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();

                const imgWidth = pageWidth - 20;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                doc.addImage(imgData, "PNG", 10, 25, imgWidth, imgHeight);

                const rows = [];
                const tableRows = document.querySelectorAll("#tableProvinsilprWrapper tbody tr");

                tableRows.forEach((tr) => {
                    const cells = tr.querySelectorAll("td");
                    rows.push([
                        cells[0]?.innerText || "",
                        cells[1]?.innerText || "",
                        cells[2]?.innerText || ""
                    ]);
                });

                let tableStartY = imgHeight + 35;

                if (tableStartY > pageHeight - 30) {
                    doc.addPage();
                    tableStartY = 20;
                }

                doc.autoTable({
                    head: [
                        ["No", "Provinsi", "Total"]
                    ],
                    body: rows,
                    startY: tableStartY
                });

                doc.save("laporan-provinsi.pdf");
            });
        });
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>


</body>

</html>
