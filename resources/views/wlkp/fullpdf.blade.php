<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: sans-serif;
        }

        img {
            width: 100%;
            margin-bottom: 20px;
        }
    </style>
</head>

<body>

    <h2>LAPORAN TENAGA KERJA</h2>

    <p>
        Download pada: {{ $hari }}, {{ $tanggal }} - {{ $jam }}
    </p>

    <hr>

    <h3>Filter Aktif</h3>
    <p>
        Jenis TK: {{ $filters['jenis_tk'] }} <br>
        Provinsi: {{ $filters['provinsi'] ?? 'Semua' }} <br>
        Jenis Kelamin: {{ $filters['jenis_kelamin'] }} <br>
        Perjanjian: {{ $filters['perjanjian'] }} <br>
        Kabupaten: {{ $filters['kabupaten'] ?? 'Semua' }}
    </p>

    <hr>

    <h3>Grafik</h3>
    @foreach ($charts as $chart)
        <img src="{{ $chart }}">
    @endforeach

    <hr>

    <h3>Tabel Data</h3>
    <table border="1" width="100%" cellspacing="0" cellpadding="5">
        <tr>
            <th>Provinsi</th>
            <th>Kabupaten</th>
            <th>Jenis TK</th>
            <th>Jenis Kelamin</th>
            <th>Perjanjian</th>
        </tr>

        @foreach ($data as $row)
            <tr>
                <td>{{ $row->provinsi }}</td>
                <td>{{ $row->kabupaten }}</td>
                <td>{{ $row->jenis_tk }}</td>
                <td>{{ $row->jenis_kelamin }}</td>
                <td>{{ $row->perjanjian_kerja }}</td>
            </tr>
        @endforeach
    </table>

</body>

</html>
