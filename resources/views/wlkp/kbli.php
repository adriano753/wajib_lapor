<div class="card mb-3">
    <div class="card-body">
        <form method="GET">
            <div class="row">
                <div class="col-md-2">
                    <select name="bulan" class="form-control">
                        <option value="">Bulan</option>
                        @foreach($bulanList as $b)
                            <option value="{{ $b }}" {{ request('bulan') == $b ? 'selected' : '' }}>
                                {{ $b }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-2">
                    <select name="tahun" class="form-control">
                        <option value="">Tahun</option>
                        @foreach($tahunList as $t)
                            <option value="{{ $t }}" {{ request('tahun') == $t ? 'selected' : '' }}>
                                {{ $t }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-3">
                    <select name="kbli" class="form-control">
                        <option value="">KBLI</option>
                        @foreach($kbliList as $k)
                            <option value="{{ $k }}" {{ request('kbli') == $k ? 'selected' : '' }}>
                                {{ $k }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-2">
                    <select name="provinsi" class="form-control">
                        <option value="">Provinsi</option>
                        @foreach($provinsiList as $p)
                            <option value="{{ $p }}" {{ request('provinsi') == $p ? 'selected' : '' }}>
                                {{ $p }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div class="col-md-3">
                    <select name="kabupaten" class="form-control">
                        <option value="">Kab/Kota</option>
                        @foreach($kabupatenList as $k)
                            <option value="{{ $k }}" {{ request('kabupaten') == $k ? 'selected' : '' }}>
                                {{ $k }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

            <div class="mt-3">
                <button class="btn btn-primary">Filter</button>
                <a href="{{ url()->current() }}" class="btn btn-secondary">Reset</a>
            </div>
        </form>
    </div>
</div>

<div class="card">
    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Tanggal Daftar</th>
                    <th>KBLI</th>
                    <th>Provinsi</th>
                    <th>Kab/Kota</th>
                </tr>
            </thead>
            <tbody>
                @forelse($data as $i => $row)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ $row->tgl_pendaftaran }}</td>
                    <td>{{ $row->nama_5_digit }}</td>
                    <td>{{ $row->provinsi }}</td>
                    <td>{{ $row->kabupaten_kota }}</td>
                </tr>
                @empty
                <tr>
                    <td colspan="5" class="text-center">Data tidak ditemukan</td>
                </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
