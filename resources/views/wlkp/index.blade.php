<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WLKP - Wajib Lapor Ketenagakerjaan Perusahaan</title>
    <link rel="stylesheet" href="{{ asset('css/wlkp.css') }}">
    {{-- <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom@2.0.1/dist/chartjs-plugin-zoom.min.js"></script> --}}
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2"></script>


</head>


<body>

    <nav id="navbar">
        <div class="nav-container">
            <a href="#beranda" class="logo">
                <img src="{{ asset('images/img.png') }}" width="155">
            </a>
            <ul class="nav-links">
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
                    <button id="downloadBarPdf" class="btn btn-danger btn-sm">
                        Download PDF
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
                            <h4>Nomor Telp</h4>
                            021-5255733
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
    </script>

    @vite(['resources/js/templatemo-graph-script.js', 'resources/js/dashboard-klasifikasi.js', 'resources/js/dashboard-pp-pkb.js', 'resources/js/download-data.js', 'resources/js/ketenagakerjaan.js'])

    <script>
        const BPJS_FILTER_URL = "{{ route('filter.bpjs') }}";
    </script>
    <script>
        const allKbliData = @json($kbliChart);
    </script>

    <script>
        document.getElementById('downloadPdf').addEventListener('click', function() {

            const canvases = document.querySelectorAll('canvas');
            let images = [];

            canvases.forEach((canvas) => {
                images.push(canvas.toDataURL('image/png', 1.0));
            });

            document.getElementById('chartsInput').value = JSON.stringify(images);

            document.getElementById('pdfForm').submit();
        });
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

</body>

</html>
