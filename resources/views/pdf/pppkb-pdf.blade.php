<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan PP & PKB</title>
    <style>
        body {
            font-family: sans-serif;
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .chart-wrapper {
            margin-bottom: 40px;
            text-align: center;
        }

        img {
            width: 100%;
        }
    </style>
</head>

<body>

    <h2>
        DATA PROVINSI MEMILIKI PERJANJIAN PERUSAHAAN /
        PERJANJIAN KERJA BERSAMA
    </h2>

    @foreach ($charts as $chart)
        <div style="margin-bottom:30px; text-align:center;">
            <img src="{{ $chart }}" style="width:100%;">
        </div>
    @endforeach

</body>

</html>
