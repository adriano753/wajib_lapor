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
            </ul>
        </div>
    </nav>

    <section class="hero" id="beranda">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Wajib Lapor Ketenagakerjaan Perusahaan</h1>
                <p>
                    WLKP merupakan sistem pelaporan resmi untuk mendukung
                    pengelolaan data ketenagakerjaan secara terintegrasi.
                </p>
                <a href="#laporan" class="cta-button">Mulai Sekarang</a>
            </div>
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
            @include('wlkp.perusahaanklasifikasi')
            {{-- GRAFIK TK --}}
            @include('wlkp.tenagakerja')
            {{-- GRAFIK SEBARAN TENAGA KERJA BERDASARKAN 2 DIGIT KBLI --}}
            @include('wlkp.sebarantkkbli')

        </div>
    </section>

    <section>@include('wlkp.perusahaanklasifikasi')</section>
    <section>@include('wlkp.linechart')</section>

    <!-- LAYANAN
    <section class="layanan-section" id="layanan">
        <h2 class="section-title">Layanan</h2>

        <div class="info-grid">
            <div class="info-card image-card"
                data-bg="{{ asset('images/pelanggaran.jpg') }}">
                <div class="card-overlay">
                    <h3>Pelanggaran Ketenagakerjaan</h3>
                    <p>Ketidaksesuaian praktik kerja dengan ketentuan yang berlaku.</p>
                    <a href="#" class="report-btn">Laporkan →</a>
                </div>
            </div>

            <div class="info-card image-card"
                data-bg="{{ asset('images/kecelakaankerja.jpg') }}">
                <div class="card-overlay">
                    <h3>Kecelakaan Kerja</h3>
                    <p>Risiko kecelakaan dan penyakit akibat pekerjaan.</p>
                    <a href="#" class="report-btn">Laporkan →</a>
                </div>
            </div>

            <div class="info-card image-card"
                data-bg="{{ asset('images/perselisihan.jpg') }}">
                <div class="card-overlay">
                    <h3>Perselisihan Hubungan Industrial</h3>
                    <p>Perbedaan kepentingan tenaga kerja dan perusahaan.</p>
                    <a href="#" class="report-btn">Laporkan →</a>
                </div>
            </div>

            <div class="info-card image-card"
                data-bg="{{ asset('images/pungli.jpg') }}">
                <div class="card-overlay">
                    <h3>Pungli / Gratifikasi</h3>
                    <p>Praktik pungutan liar dan gratifikasi.</p>
                    <a href="#" class="report-btn">Laporkan →</a>
                </div>
            </div>
        </div>
    </section> -->

    <!-- TENTANG KAMI -->
    <section class="contact-section" id="kontak">
        <div class="beranda-container">
            <h2 class="section-title">Tentang Kami</h2>

            <div class="contact-grid">
                <div class="contact-form">
                    <img src="{{ asset('images/binwas.png') }}" style="max-height:200px;">
                    <h3>Ditjen Binwasnaker & K3</h3>
                    <p>
                        Unit kerja pembinaan pengawasan ketenagakerjaan
                        serta keselamatan dan kesehatan kerja.
                    </p>
                </div>

                <div class="contact-info">
                    <h3>Kontak</h3>
                    <p>📧 pengaduanwlkp.bspk@gmail.com</p>
                    <p>📞 021-5255733</p>
                    <p>📍 Jakarta Selatan</p>
                    <p>🕒 Senin – Jumat (08.00 – 16.00 WIB)</p>
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
            totalProvinsi: @json($dataProvinsi->pluck('total')),
            provinsi: @json($provinsi),
            mikroProv: @json($mikroProv),
            kecilProv: @json($kecilProv),
            menengahProv: @json($menengahProv),
            besarProv: @json($besarProv)

        };
        window.kbliData = @json($rowsKodeTk);
    </script>
    <script src="{{ asset('js/templatemo-graph-script.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="{{ asset('js/wlkp-line-chart.js') }}"></script>
    
    @stack('scripts')
</body>

</html>
