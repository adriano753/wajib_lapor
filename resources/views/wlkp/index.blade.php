<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WLKP - Wajib Lapor Ketenagakerjaan Perusahaan</title>

    <link rel="stylesheet" href="{{ asset('css/wlkp.css') }}">
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
            <li><a href="#layanan">Layanan</a></li>
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

        <!-- METRIC -->
        <div class="metrics-grid">
            <div class="metric-item">
                <div class="metric-value">{{ $totalSemua ?? 0 }}</div>
                <div class="metric-label">Jumlah Total Perusahaan</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">{{ $skala['Mikro']->total ?? 0 }}</div>
                <div class="metric-label">Mikro</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">{{ $skala['Kecil']->total ?? 0 }}</div>
                <div class="metric-label">Kecil</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">{{ $skala['Menengah']->total ?? 0 }}</div>
                <div class="metric-label">Menengah</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">{{ $skala['Besar']->total ?? 0 }}</div>
                <div class="metric-label">Besar</div>
            </div>
            <div class="metric-item">
                <div class="metric-value">
                    {{ $skala['Tidak Teridentifikasi']->total ?? 0 }}
                </div>
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
                            $height = $maxVal > 0
                                ? ($row->total / $maxVal * 100)
                                : 0;
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
    </div>
</section>

<section>
    @include('wlkp/perusahaanperklasifikasi')
</section>

<!-- LAYANAN -->
<section class="layanan-section" id="layanan">
    <h2 class="section-title">Layanan</h2>

    <div class="info-grid">
        <div class="info-card image-card"
             style="background-image: url('{{ asset('images/pelanggaran.jpg') }}');">
            <div class="card-overlay">
                <h3>Pelanggaran Ketenagakerjaan</h3>
                <p>Ketidaksesuaian praktik kerja dengan ketentuan yang berlaku.</p>
                <a href="#" class="report-btn">Laporkan →</a>
            </div>
        </div>

        <div class="info-card image-card"
             style="background-image: url('{{ asset('images/kecelakaankerja.jpg') }}');">
            <div class="card-overlay">
                <h3>Kecelakaan Kerja</h3>
                <p>Risiko kecelakaan dan penyakit akibat pekerjaan.</p>
                <a href="#" class="report-btn">Laporkan →</a>
            </div>
        </div>

        <div class="info-card image-card"
             style="background-image: url('{{ asset('images/perselisihan.jpg') }}');">
            <div class="card-overlay">
                <h3>Perselisihan Hubungan Industrial</h3>
                <p>Perbedaan kepentingan tenaga kerja dan perusahaan.</p>
                <a href="#" class="report-btn">Laporkan →</a>
            </div>
        </div>

        <div class="info-card image-card"
             style="background-image: url('{{ asset('images/pungli.jpg') }}');">
            <div class="card-overlay">
                <h3>Pungli / Gratifikasi</h3>
                <p>Praktik pungutan liar dan gratifikasi.</p>
                <a href="#" class="report-btn">Laporkan →</a>
            </div>
        </div>
    </div>
</section>

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

<script src="{{ asset('js/templatemo-graph-script.js') }}"></script>
</body>
</html>
