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
    </body>
</html>