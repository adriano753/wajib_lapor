            <!-- GRAFIK PROVINSI -->
            <section class="class laporan-section" id="laporan">
                <div class="class beranda-container">
                    <div class="chart-card full-width">
                        <div class="chart-header">
                            <h3 class="chart-title">Laporan Provinsi</h3>
                        </div>

                        <div class="chart-container">
                            <div class="bar-chart" id="barChart">

                                @forelse ($rowsKodeTk as $row)
                                    @php
                                        $height = $maxValTk > 0 ? ($row->total / $maxValTk) * 100 : 0;
                                    @endphp

                                    <div class="bar" style="height: {{ $height }}%"
                                        title="{{ $row->nama_2_digit }}">

                                        <span class="bar-value">
                                            {{ number_format($row->total, 0, ',', '.') }}
                                        </span>

                                        <span class="bar-label">
                                            {{ $row->nama_2_digit }}
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
