/* ===============================
       1️⃣ CHART PROVINSI
    =============================== */

const chartProvinsi = new Chart(document.getElementById("provinsiChart"), {
    type: "bar",
    data: {
        labels: window.chartData.provinsi,
        datasets: [
            {
                data: window.chartData.totalProvinsiKlas,
                backgroundColor: "#42A5F5",
                // --- PENGATURAN LEBAR DAN MARGIN ---
                barPercentage: 0.9, // Mengatur lebar bar (0.1 - 1.0). Semakin dekat ke 1, semakin lebar.
                categoryPercentage: 0.8, // Mengatur jarak antar kategori. Semakin kecil, semakin renggang jaraknya.
                maxBarThickness: 100,
                // -----------------------------------
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 40,
                bottom: 30, // Tambah ruang di bawah agar tulisan tidak kepotong
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                anchor: "end",
                align: "top",
                formatter: (value) => value.toLocaleString("id-ID"),
                font: {
                    weight: "bold",
                    size: 11,
                },
                // color: "white",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => value.toLocaleString("id-ID"),
                    // color: "white",
                },
                grid: {
                    // color: "rgba(255, 255, 255, 0.1)", // Garis grid tipis transparan
                },
            },
            x: {
                ticks: {
                    autoSkip: false, // Jangan ada yang disembunyikan
                    maxRotation: 45, // Paksa miring 45 derajat
                    minRotation: 45, // Paksa miring 45 derajat
                    font: {
                        size: 10,
                    },
                    // color: "white",
                },
                grid: {
                    display: false,
                },
            },
        },
    },
    plugins: [ChartDataLabels],
});

const chartKlasifikasi = new Chart(
    document.getElementById("klasifikasiChart"),
    {
        type: "bar",
        data: {
            labels: [
                "Mikro",
                "Kecil",
                "Menengah",
                "Besar",
                "Tidak Teridentifikasi",
            ],
            datasets: [
                {
                    data: 
                    window.chartData.klasifikasi,
                    backgroundColor: [
                        '#ab0728', // Mikro (Merah)
                        '#FFA726', // Kecil (Orange)
                        '#42A5F5', // Menengah (Biru)
                        '#AB47BC', // Besar (Ungu)
                        '#BDBDBD'  // Tidak Teridentifikasi (Abu)
                    ],
                    barPercentage: 0.6,         // Sedikit lebih kurus karena datanya dikit, biar rapi
                    categoryPercentage: 0.8,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 30, // ✅ PADDING: Supaya angka di atas bar tidak kepotong
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    anchor: "end",
                    align: "top",
                    formatter: (value) => value.toLocaleString("id-ID"),
                    font: {
                        weight: "bold",
                        size: 11,
                    },
                    // color: "white", // Atau sesuaikan dengan tema background (misal: black/white)
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => value.toLocaleString("id-ID"),
                        // color: "#e0e0e0", // Warna teks sumbu Y
                    },
                    grid: {
                        // color: "rgba(255, 255, 255, 0.1)", // Grid tipis transparan
                    },
                },
                x: {
                    ticks: {
                        autoSkip: false,
                        // color: "#e0e0e0",
                        font: {
                            size: 11,
                        },
                    },
                    grid: {
                        display: false, // Grid vertikal hilang biar bersih
                    },
                },
            },
        },
        plugins: [ChartDataLabels], // Jangan lupa plugin ini harus sudah di-load
    }
);

const chartKota = new Chart(document.getElementById("kotaChart"), {
    type: "bar",
    data: {
        labels: [],
        datasets: [
            {
                label: "Jumlah Perusahaan",
                data: [],
                backgroundColor: "#66BB6A", // Warna Hijau (Biar beda dengan Provinsi)
                maxBarThickness: 80, // Agar bar tidak raksasa saat cuma 1 kota
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: "end",
                align: "top",
                formatter: (value) => value.toLocaleString("id-ID"),
                font: { weight: "bold", size: 10 },
                // color: "white",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // color: "#e0e0e0",
                    callback: (v) => v.toLocaleString("id-ID"),
                },
                grid: { 
                    // color: "rgba(255, 255, 255, 0.1)" 
                },
            },
            x: {
                ticks: {
                    // color: "#e0e0e0",
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 45,
                },
                grid: { display: false },
            },
        },
        layout: { padding: { top: 30 } },
    },
    plugins: [ChartDataLabels],
});

// 1. AMBIL DATA DARI WINDOW (Global Variable dari Blade)
const masterData = window.chartMasterData; // Pastikan nama ini sama dengan di Blade
const listProvinsiLabel = window.listProvinsiLabel;

// 2. AMBIL ELEMENT DOM
const filterTahun = document.getElementById('tahunSelect');
const filterBulan = document.getElementById('bulanSelect');
const filterProvinsi = document.getElementById('provinsiSelectKlasif');
const filterKabupaten = document.getElementById('kabupatenSelectKlasif');
const filterKlasifikasi = document.getElementById('klasifikasiSelect');

// 3. FUNGSI UTAMA: UPDATE DASHBOARD
function updateDashboard() {
    // A. Ambil value dropdown
    const valTahun = filterTahun.value;
    const valBulan = filterBulan.value;
    const valProv = filterProvinsi.value;
    const valKab = filterKabupaten.value;
    const valKlas = filterKlasifikasi.value;
    filterBulan.disabled = !filterTahun.value;

// B. Filter Data
    const filteredData = masterData.filter(row => {
        // Normalisasi value klasifikasi dari row data (null jadi string kosong)
        const rowKlas = (row.skala_objek_pengawasan || "").toLowerCase();
        const searchKlas = valKlas.toLowerCase();

        // Cek Logika Khusus Klasifikasi
        let isKlasifikasiMatch = false;

        if (searchKlas === "") {
            // Jika dropdown "Semua", ambil semua
            isKlasifikasiMatch = true; 
        } else if (searchKlas === "tidak teridentifikasi") {
            // Jika dropdown "Tidak Teridentifikasi", ambil yang kosong ATAU yang teksnya memang "tidak teridentifikasi"
            isKlasifikasiMatch = (rowKlas === "" || rowKlas === "tidak teridentifikasi");
        } else {
            // Selain itu, cocokkan teks biasa (Mikro, Kecil, Besar, dll)
            isKlasifikasiMatch = rowKlas === searchKlas;
        }

        return (valTahun === "" || String(row.tahun) === valTahun) &&
               (valBulan === "" || String(row.bulan) === valBulan) &&
               (valProv  === "" || row.provinsi === valProv) &&
               (valKab   === "" || row.kota === valKab) &&
               isKlasifikasiMatch; // <--- Gunakan logika baru di sini
    });

    // C. Hitung Ulang Data (SUM Total)

    const chartContainer = document.getElementById("provinsiChartContainer");

    // --- Chart Provinsi ---
    let chartProvinsiLabels = [];
    let chartProvinsiData = [];

    if (valProv !== "") {
        // === MODE 1 PROVINSI ===

        // 1. Ubah Style Container: Hapus lebar 2000px, jadikan 100%
        // Ini otomatis MENGHILANGKAN Scrollbar & membuat chart ke tengah
        if (chartContainer) chartContainer.style.width = "100%";

        // 2. Set Data & Label Single
        chartProvinsiLabels = [valProv];
        const totalOneProv = filteredData.reduce(
            (sum, row) => sum + parseInt(row.total),
            0
        );
        chartProvinsiData = [totalOneProv];
    } else {
        // === MODE SEMUA PROVINSI ===

        // 1. Ubah Style Container: Kembalikan ke 2000px (atau lebih)
        // Ini memunculkan Scrollbar agar muat 38 provinsi
        if (chartContainer) chartContainer.style.width = "2000px";

        // 1. Mengubah value 'null' dari Controller menjadi string 'TIDAK TERINDENTIFIKASI'
        chartProvinsiLabels = listProvinsiLabel.map(label => {
            return (label === null || label === "") ? "TIDAK TERINDENTIFIKASI" : label;
        });

        // 2. Mapping Data (Sekarang labelnya sudah string, jadi akan cocok dengan datanya)
        chartProvinsiData = chartProvinsiLabels.map((namaProv) => {
            const dataProv = filteredData.filter((r) => {
                const rowProv = (r.provinsi === null || r.provinsi === "") ? "TIDAK TERINDENTIFIKASI" : r.provinsi;
                return rowProv === namaProv;
            });
            return dataProv.reduce((sum, row) => sum + parseInt(row.total), 0);
        });
    }
    chartProvinsi.data.datasets[0].maxBarThickness = 100;

    // --- Chart Klasifikasi ---
    const sumByKategori = (namaKategori) => {
        return filteredData
            .filter(
                (r) =>
                    (r.skala_objek_pengawasan || "").toLowerCase() ===
                    namaKategori
            )
            .reduce((sum, row) => sum + parseInt(row.total), 0);
    };

    const sumNull = filteredData
        .filter((r) => !r.skala_objek_pengawasan)
        .reduce((sum, row) => sum + parseInt(row.total), 0);

    const dataKlasifikasiBaru = [
        sumByKategori("mikro"),
        sumByKategori("kecil"),
        sumByKategori("menengah"),
        sumByKategori("besar"),
        sumNull,
    ];

    // D. Update Chart
    chartProvinsi.data.labels = chartProvinsiLabels; // <--- Update Sumbu X
    chartProvinsi.data.datasets[0].data = chartProvinsiData; // <--- Update Data Batang
    chartProvinsi.update();

    chartKlasifikasi.data.datasets[0].data = dataKlasifikasiBaru;
    chartKlasifikasi.update();

    // E. Update Opsi Kota (Jika Provinsi Terpilih)
    if (valProv !== "") {
        updateKabupatenOptions(valProv);
    }

    // ==========================================
    // F. LOGIC CHART KABUPATEN/KOTA (Hidden/Show)
    // ==========================================

    const sectionKota = document.getElementById("kotaChartSection");
    const containerKota = document.getElementById("kotaChartContainer");

    // Cek apakah user sudah memilih Wilayah (Provinsi ATAU Kota)
    if (valProv === "" && valKab === "") {
        // KASUS 1: Belum pilih wilayah apapun -> Sembunyikan Chart
        if (sectionKota) sectionKota.style.display = "none";
    } else {
        // KASUS 2: Sudah pilih wilayah -> Tampilkan Chart & Olah Data
        if (sectionKota) sectionKota.style.display = "block";

        // 1. Siapkan Label & Data
        // Ambil list nama kota unik dari data yang sudah terfilter
        // ( filteredData otomatis isinya cuma kota-kota di provinsi yg dipilih )
        const listKotaUnik = [
            ...new Set(
                filteredData
                    .map((r) => r.kota)
                    .filter((k) => k) // hapus null
                    .sort()
            ),
        ];

        // Hitung total per kota
        const dataKota = listKotaUnik.map((namaKota) => {
            return filteredData
                .filter((r) => r.kota === namaKota)
                .reduce((sum, r) => sum + parseInt(r.total), 0);
        });

        // 2. Atur Style Container (Scroll vs Tengah)
        // Jika kotanya banyak (> 15), lebarkan container biar bisa scroll
        // Jika kotanya sedikit (atau cuma 1), bikin 100% biar ketengah
        if (listKotaUnik.length > 15) {
            containerKota.style.width = "2500px"; // Paksa lebar biar scroll
        } else {
            containerKota.style.width = "100%"; // Fit screen (ketengah)
        }

        // 3. Update Chart
        chartKota.data.labels = listKotaUnik;
        chartKota.data.datasets[0].data = dataKota;
        chartKota.update();
    }
    renderTabelKlasifikasi(filteredData);
}

// 4. FUNGSI BANTUAN: UPDATE DROPDOWN KOTA
// (Ditaruh DI LUAR updateDashboard agar rapi)
function updateKabupatenOptions(selectedProv) {
    let sourceData = masterData;

    // Jika ada provinsi yang dipilih, filter data berdasarkan provinsi itu
    if (selectedProv !== "") {
        sourceData = masterData.filter((r) => r.provinsi === selectedProv);
    }
    // Jika selectedProv == "" (Reset), maka sourceData tetap masterData (SEMUA)

    // 2. Ambil List Kota Unik dari sourceData
    const availableCities = [
        ...new Set(
            sourceData
                .map((r) => r.kota)
                .filter((k) => k) // Hapus null
                .sort()
        ),
    ];

    // 3. Simpan nilai kota saat ini (jika ada)
    const currentCity = filterKabupaten.value;

    // 4. Reset & Isi Ulang Dropdown
    filterKabupaten.innerHTML =
        '<option value="">-- Pilih Kab/Kota --</option>';

    availableCities.forEach((city) => {
        const option = document.createElement("option");
        option.value = city;
        option.text = city;

        // Cek apakah kota yang dipilih sebelumnya masih valid ada di list baru?
        if (city === currentCity) option.selected = true;

        filterKabupaten.appendChild(option);
    });
}
function renderTabelKlasifikasi(filteredData) {
    const tbody = document.getElementById("tbodyKlasifikasi");
    if (!tbody) return;

    const valTahun = filterTahun.value || "Semua Tahun";
    const valBulan = filterBulan.value || "Semua Bulan";

    tbody.innerHTML = "";

    let no = 1;

    // 🔥 GROUP BY provinsi + kota
    const grouped = {};

    filteredData.forEach((row) => {
        const prov = row.provinsi || "Tidak Diketahui";
        const kab = row.kota || "Tidak Diketahui"; // ✅ FIX DISINI
        const key = `${prov}||${kab}`;

        if (!grouped[key]) {
            grouped[key] = {
                provinsi: prov,
                kabupaten: kab,
                mikro: 0,
                kecil: 0,
                menengah: 0,
                besar: 0,
                tidak: 0,
            };
        }

        const klas = (row.skala_objek_pengawasan || "").toLowerCase().trim();
        const total = parseInt(row.total) || 0;

        if (klas === "mikro") grouped[key].mikro += total;
        else if (klas === "kecil") grouped[key].kecil += total;
        else if (klas === "menengah") grouped[key].menengah += total;
        else if (klas === "besar") grouped[key].besar += total;
        else grouped[key].tidak += total;
    });

    // 🔥 render tetap pakai template kamu
    Object.values(grouped)
    .sort((a, b) => {
        const provA = (a.provinsi || "").toLowerCase();
        const provB = (b.provinsi || "").toLowerCase();

        // 🔥 paksa "tidak diketahui" ke bawah
        if (provA.includes("tidak")) return 1;
        if (provB.includes("tidak")) return -1;

        // urutkan normal A-Z
        const provCompare = provA.localeCompare(provB, "id");
        if (provCompare !== 0) return provCompare;

        // 🔥 sorting kota juga + "tidak diketahui" di bawah
        const kabA = (a.kabupaten || "").toLowerCase();
        const kabB = (b.kabupaten || "").toLowerCase();

        if (kabA.includes("tidak")) return 1;
        if (kabB.includes("tidak")) return -1;

        return kabA.localeCompare(kabB, "id");
    })
    .forEach((item) => {
        const grandTotal =
            item.mikro +
            item.kecil +
            item.menengah +
            item.besar +
            item.tidak;

        tbody.innerHTML += `
            <tr>
                <td>${no++}</td>
                <td>${valTahun}</td>
                <td>${valBulan}</td>
                <td>${item.provinsi}</td>
                <td>${item.kabupaten}</td>
                <td>${item.mikro.toLocaleString("id-ID")}</td>
                <td>${item.kecil.toLocaleString("id-ID")}</td>
                <td>${item.menengah.toLocaleString("id-ID")}</td>
                <td>${item.besar.toLocaleString("id-ID")}</td>
                <td>${item.tidak.toLocaleString("id-ID")}</td>
                <td><b>${grandTotal.toLocaleString("id-ID")}</b></td>
            </tr>
        `;
    });
}

// 5. PASANG EVENT LISTENER (DI LUAR FUNGSI APAPUN)
// A. Event Listener: TAHUN, BULAN, KLASIFIKASI (Standar)
if (filterTahun) {
    filterTahun.addEventListener("change", function () {
        // aktif/nonaktif bulan berdasarkan tahun
        filterBulan.disabled = this.value === "";

        // kalau tahun dihapus, reset bulan juga
        if (this.value === "") {
            filterBulan.value = "";
        }

        updateDashboard();
    });
}

[filterBulan, filterKlasifikasi].forEach((f) => {
    if (f) {
        f.addEventListener("change", updateDashboard);
    }
});

// B. Event Listener: PROVINSI (Reset Kota)
if (filterProvinsi) {
    filterProvinsi.addEventListener("change", () => {
        // 1. Reset Nilai Kota karena provinsi berubah
        if (filterKabupaten) filterKabupaten.value = "";

        // 2. Update List Opsi Kota sesuai provinsi baru
        updateKabupatenOptions(filterProvinsi.value);

        // 3. Update Chart
        updateDashboard();
    });
}

// C. Event Listener: KABUPATEN (Auto-Select Provinsi)
if (filterKabupaten) {
    filterKabupaten.addEventListener("change", () => {
        const selectedCity = filterKabupaten.value;
        const currentProv = filterProvinsi.value;

        // Cek: Jika user pilih kota, tapi provinsi masih kosong/salah
        if (selectedCity !== "") {
            // 1. Cari data baris pertama yang kotanya sama dengan yang dipilih
            const matchedRow = masterData.find(
                (row) => row.kota === selectedCity
            );

            // 2. Jika ketemu dan provinsinya beda dengan yang sekarang dipilih
            if (matchedRow && matchedRow.provinsi !== currentProv) {
                // Set otomatis dropdown Provinsi
                filterProvinsi.value = matchedRow.provinsi;

                // Update opsi kota agar list-nya terfilter (misal cuma kota-kota di Jabar)
                updateKabupatenOptions(matchedRow.provinsi);

                // 🔥 PENTING: Set balik nilai kotanya
                // (karena fungsi updateKabupatenOptions mereset isi dropdown)
                filterKabupaten.value = selectedCity;
            }
        }

        // 3. Update Chart
        // Karena filterProvinsi.value sudah terisi otomatis di atas,
        // maka logic chart akan otomatis masuk ke "Mode 1 Provinsi" (Tengah)
        updateDashboard();
    });
}

const toggleTableBtnKlasifikasi = document.getElementById("toggleTableBtnKlasifikasi");
const tableWrapper = document.getElementById("tableWrapper");

if (toggleTableBtnKlasifikasi && tableWrapper) {
    toggleTableBtnKlasifikasi.addEventListener("click", function () {
        if (tableWrapper.style.display === "none") {
            tableWrapper.style.display = "block";
            toggleTableBtnKlasifikasi.innerText = "Tutup Tabel";
        } else {
            tableWrapper.style.display = "none";
            toggleTableBtnKlasifikasi.innerText = "Buka Tabel";
        }
    });
}

updateDashboard();