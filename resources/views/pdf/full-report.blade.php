<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        img { width: 100%; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        table, th, td { border: 1px solid black; padding: 5px; }
        h2 { margin-top: 30px; }
    </style>
</head>
<body>

<h1>Laporan Dashboard WLKP</h1>
<p>Download: {{ $tanggal }}</p>

{{-- ===== CHARTS ===== --}}
<h2>Grafik</h2>

@foreach($charts as $chart)
    <img src="{{ $chart }}">
@endforeach


{{-- ===== TABLES ===== --}}
<h2>Data Tabel</h2>

@foreach($tables as $table)
    {!! $table !!}
@endforeach

</body>
</html>