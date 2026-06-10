// ==========================
// CHART OPTIONS
// ==========================
const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    color: () => Chart.defaults.color,
};

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
        padding: {
            top: 60,
        },
    },

    scales: {
        x: {
            offset: true,
            ticks: {
                autoSkip: false,
                maxRotation: 60,
                minRotation: 60,
            },
        },
        y: {
            beginAtZero: true,
            grace: "10%",
            ticks: {
                callback: function (value) {
                    return Number(value).toLocaleString("id-ID");
                },
            },
        },
    },

    plugins: {
        datalabels: {
            anchor: "end",
            align: "top",
            offset: 2,
            clamp: true, // 🔥 penting biar gak keluar canvas // warna angka (ubah kalau background terang)
            font: {
                weight: "bold",
                size: 10,
            },
            formatter: function (value) {
                return Number(value).toLocaleString("id-ID");
            },
        },
    },

    categoryPercentage: 0.5,
    barPercentage: 0.7,
};

let charts = {};
let chartKabupaten = {};

// ==========================
// CREATE DOUGHNUT
// ==========================
function createDoughnutChart(canvasId, indikator = null) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    let labels = ["Sudah", "Belum"];
    let colors = ["#4CAF50", "#F44336"];

    if (indikator === "waktu_kerja") {
        labels = ["Umum", "Sektor"];
        colors = ["#2196F3", "#FF9800"];
    }

    return new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: labels,
            datasets: [
                {
                    data: [0, 0],
                    backgroundColor: colors,
                },
            ],
        },
        plugins: [ChartDataLabels],
        options: {
            ...doughnutOptions,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        generateLabels: function (chart) {
                            const data = chart.data.datasets[0].data;
                            const labels = chart.data.labels;

                            return labels.map((label, i) => ({
                                text:
                                    label +
                                    " : " +
                                    Number(data[i] || 0).toLocaleString(
                                        "id-ID",
                                    ),
                                fillStyle:
                                    chart.data.datasets[0].backgroundColor[i],
                                strokeStyle:
                                    chart.data.datasets[0].backgroundColor[i],
                                fontColor: Chart.defaults.color,
                                index: i,
                            }));
                        },
                    },
                },
                datalabels: {
                    color: () => Chart.defaults.color,
                },
            },
        },
    });
}

// ==========================
// CREATE BAR
// ==========================
function createBarChart(canvasId, indikator = null) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    let datasets = [
        {
            label: "Sudah",
            data: [],
            backgroundColor: "#4CAF50",
            barThickness: 40,
            categoryPercentage: 0.5,
            barPercentage: 0.7,
        },
        {
            label: "Belum",
            data: [],
            backgroundColor: "#F44336",
            barThickness: 40,
            categoryPercentage: 0.5,
            barPercentage: 0.7,
        },
        {
            label: "Total Perusahaan",
            data: [],
            backgroundColor: "#2196F3",
            barThickness: 40,
            categoryPercentage: 0.5,
            barPercentage: 0.7,
        },
    ];

    // 🔥 khusus disabilitas
    if (indikator === "disabilitas") {
        datasets.push({
            label: "Total Disabilitas",
            data: [],
            backgroundColor: "#FFC107",
            barThickness: 40,
            categoryPercentage: 0.5,
            barPercentage: 0.7,
        });
    }

    return new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: datasets,
        },
        plugins: [ChartDataLabels],
        options: {
            ...barOptions,
            plugins: {
                ...barOptions.plugins,
                datalabels: {
                    anchor: "end",
                    align: "top",
                    offset: 8,
                    color: () => Chart.defaults.color,
                    font: {
                        weight: "bold",
                        size: 10,
                    },
                    formatter: (value) =>
                        value > 0 ? value.toLocaleString("id-ID") : "",
                },
            },
        },
    });
}

// ==========================
// UPDATE DOUGHNUT
// ==========================
function updateDoughnut(chart, data, indikator = null) {
    if (!chart || !data) return;

    let total1 = 0;
    let total2 = 0;

    // 🔥 waktu kerja
    if (indikator === "waktu_kerja") {
        total1 = (data.umum ?? []).reduce((a, b) => a + Number(b), 0);
        total2 = (data.sektor ?? []).reduce((a, b) => a + Number(b), 0);
    } else {
        total1 = (data.sudah ?? []).reduce((a, b) => a + Number(b), 0);
        total2 = (data.belum ?? []).reduce((a, b) => a + Number(b), 0);
    }

    chart.data.datasets[0].data = [total1, total2];
    chart.update();
}

// ==========================
// UPDATE BAR
// ==========================
function updateBar(chart, data, indikator = null) {
    if (!chart || !data) return;

    // 🔥 BIARKAN INI (JANGAN DIHAPUS)
    const jumlahData = data.labels?.length || 0;

    const canvas = chart.canvas;
    const minWidth = 500;
    canvas.style.width = Math.max(jumlahData * 160, minWidth) + "px";

    // label wilayah
    chart.data.labels = data.labels ?? [];

    // 🔥 LOGIC KHUSUS
    if (indikator === "waktu_kerja") {
        chart.data.datasets[0].label = "Umum";
        chart.data.datasets[0].data = data.umum ?? [];

        chart.data.datasets[1].label = "Sektor";
        chart.data.datasets[1].data = data.sektor ?? [];
    } else {
        chart.data.datasets[0].label = "Sudah";
        chart.data.datasets[0].data = data.sudah ?? [];

        chart.data.datasets[1].label = "Belum";
        chart.data.datasets[1].data = data.belum ?? [];
    }

    // total perusahaan (tetap)
    chart.data.datasets[2].data = data.perusahaan ?? [];

    // khusus disabilitas
    if (indikator === "disabilitas") {
        chart.data.datasets[3].data = data.total ?? [];
    }

    chart.update();
}

// ==========================
// LOAD CHART DATA
// ==========================
function loadChartKetenagakerjaan() {
    let jenis = document.getElementById("jenisSelect")?.value ?? "";
    let provinsi =
        document.getElementById("provinsiKetenagakerjaan")?.value ?? "";
    let kabupaten =
        document.getElementById("kabupatenKetenagakerjaan")?.value ?? "";

    fetch(
        `/chart-ketenagakerjaan?jenis=${jenis}&provinsi=${encodeURIComponent(provinsi)}&kabupaten=${encodeURIComponent(kabupaten)}`,
    )
        .then((res) => res.json())
        .then((data) => {
            console.log("DATA:", data);
            updateDoughnut(charts.p2k3?.doughnut, data.p2k3);
            updateBar(charts.p2k3?.bar, data.p2k3);

            updateDoughnut(charts.ahli_k3?.doughnut, data.ahli_k3);
            updateBar(charts.ahli_k3?.bar, data.ahli_k3);

            updateDoughnut(charts.disabilitas?.doughnut, data.disabilitas);
            updateBar(charts.disabilitas?.bar, data.disabilitas, "disabilitas");

            updateDoughnut(charts.susu?.doughnut, data.susu);
            updateBar(charts.susu?.bar, data.susu);

            updateDoughnut(charts.serikat?.doughnut, data.serikat);
            updateBar(charts.serikat?.bar, data.serikat);

            updateDoughnut(charts.bipartit?.doughnut, data.bipartit);
            updateBar(charts.bipartit?.bar, data.bipartit);

            updateDoughnut(
                charts.waktu_kerja?.doughnut,
                data.waktu_kerja,
                "waktu_kerja",
            );
            updateBar(charts.waktu_kerja?.bar, data.waktu_kerja, "waktu_kerja");

            updateDoughnut(charts.rencana_tk?.doughnut, data.rencana_tk);
            updateBar(charts.rencana_tk?.bar, data.rencana_tk);

            // isi tabel
            renderTabelProvinsi(data);
            renderTabelKabupaten(data);
            renderTableP2K3Only(data);
            renderTableSerikatOnly(data);
            renderTableSusuOnly(data);
            renderTableBipartitOnly(data);
            renderTableRencanaTKOnly(data);
            renderTableDisabilitasOnly(data);
            renderTableAhliK3Only(data);
            renderTableWkwiOnly(data);
        })
        .catch((err) => console.error("Fetch error:", err));
}

function loadChartKabupaten(indikator, provinsi) {
    let jenis = document.getElementById("jenisSelect")?.value ?? "";
    let kabupaten =
        document.getElementById("kabupatenKetenagakerjaan")?.value ?? "";

    let wrapperId = {
        p2k3: "chartKabupatenWrapperP2K3",
        ahli_k3: "chartKabupatenWrapperAhliK3",
        disabilitas: "chartKabupatenWrapperDisabilitas",
        susu: "chartKabupatenWrapperSusu",
        serikat: "chartKabupatenWrapperSerikatPekerja",
        bipartit: "chartKabupatenWrapperBipartitPekerja",
        waktu_kerja: "chartKabupatenWrapperWkwi",
        rencana_tk: "chartKabupatenWrapperPerencanaanTk",
    }[indikator];

    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    wrapper.style.display = "block";

    fetch(
        `/chart-ketenagakerjaan?jenis=${jenis}&provinsi=${encodeURIComponent(provinsi)}&kabupaten=${encodeURIComponent(kabupaten)}`,
    )
        .then((res) => res.json())
        .then((data) => {
            if (indikator === "p2k3") {
                updateBar(chartKabupaten.p2k3, data.p2k3);
            }

            if (indikator === "ahli_k3") {
                updateBar(chartKabupaten.ahli_k3, data.ahli_k3);
            }
        })
        .catch((err) => console.error(err));
}

// ==========================
// FILTER TABEL
// ==========================

const tableFilterKetenagakerjaan = document.getElementById(
    "tableFilterKetenagakerjaan",
);

if (tableFilterKetenagakerjaan) {
    tableFilterKetenagakerjaan.addEventListener("change", function () {
        const val = this.value;

        const provWrap = document.getElementById(
            "tabelProvinsiKetenagakerjaan",
        );
        const kabWrap = document.getElementById(
            "tabelKabupatenKetenagakerjaan",
        );

        if (provWrap) provWrap.style.display = "none";
        if (kabWrap) kabWrap.style.display = "none";

        if (val === "provinsiKetenagakerjaan") {
            if (provWrap) provWrap.style.display = "block";
        } else if (val === "kabupatenKetenagakerjaan") {
            if (kabWrap) kabWrap.style.display = "block";
        }
    });

    tableFilterKetenagakerjaan.dispatchEvent(new Event("change"));
}

// ==========================
// LOAD KABUPATEN
// ==========================
function loadKabupaten(provinsi) {
    const kabupatenKetenagakerjaan = document.getElementById(
        "kabupatenKetenagakerjaan",
    );

    if (!provinsi) {
        kabupatenKetenagakerjaan.innerHTML = `
            <option value="" disabled selected>Pilih Provinsi Terlebih Dahulu</option>
        `;
        return;
    }

    fetch(`/get-kabupaten?provinsi=${encodeURIComponent(provinsi)}`)
        .then((res) => res.json())
        .then((data) => {
            kabupatenKetenagakerjaan.innerHTML = `<option value="">Semua Kabupaten</option>`;

            data.forEach((kab) => {
                kabupatenKetenagakerjaan.innerHTML += `
        <option value="${kab.nama}">
            ${kab.nama}
        </option>
    `;
            });
        })
        .catch((err) => console.error("Load Kabupaten error:", err));
}

function renderTabelProvinsi(data) {
    const tbody = document.getElementById("tbodyProvinsi");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.p2k3?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        if (!provinsi) return;

        const get = (obj, type) =>
            Number(obj?.[type]?.[i] ?? 0).toLocaleString("id-ID");

        let row = `
        <tr>
            <td>${provinsi}</td>

            <td>${get(data.p2k3, "sudah")}</td>
            <td>${get(data.p2k3, "belum")}</td>
            <td>${get(data.p2k3, "perusahaan")}</td>

            <td>${get(data.ahli_k3, "sudah")}</td>
            <td>${get(data.ahli_k3, "belum")}</td>
            <td>${get(data.ahli_k3, "perusahaan")}</td>

            <td>${get(data.disabilitas, "sudah")}</td>
            <td>${get(data.disabilitas, "belum")}</td>
            <td>${get(data.disabilitas, "perusahaan")}</td>
            <td>${get(data.disabilitas, "total")}</td>

            <td>${get(data.rencana_tk, "sudah")}</td>
            <td>${get(data.rencana_tk, "belum")}</td>
            <td>${get(data.rencana_tk, "perusahaan")}</td>

            <td>${get(data.serikat, "sudah")}</td>
            <td>${get(data.serikat, "belum")}</td>
            <td>${get(data.serikat, "perusahaan")}</td>

            <td>${get(data.bipartit, "sudah")}</td>
            <td>${get(data.bipartit, "belum")}</td>
            <td>${get(data.bipartit, "perusahaan")}</td>

            <td>${get(data.susu, "sudah")}</td>
            <td>${get(data.susu, "belum")}</td>
            <td>${get(data.susu, "perusahaan")}</td>

            <td>${get(data.waktu_kerja, "umum")}</td>
            <td>${get(data.waktu_kerja, "sektor")}</td>
            <td>${get(data.waktu_kerja, "perusahaan")}</td>
        </tr>
    `;

        tbody.innerHTML += row;
    });
}
function renderTableP2K3Only(data) {
    const tbody = document.getElementById("tbodyP2K3");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.p2k3?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        const sudah = Number(data.p2k3?.sudah?.[i] ?? 0);
        const belum = Number(data.p2k3?.belum?.[i] ?? 0);
        const perusahaan = Number(data.p2k3?.perusahaan?.[i] ?? 0);

        tbody.innerHTML += `
            <tr>
                <td>${provinsi}</td>
                <td>${sudah.toLocaleString("id-ID")}</td>
                <td>${belum.toLocaleString("id-ID")}</td>
                <td>${perusahaan.toLocaleString("id-ID")}</td>
            </tr>
        `;
    });
}

function renderTableSerikatOnly(data) {
    const tbody = document.getElementById("tbodySerikat");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.serikat?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        const sudah = Number(data.serikat?.sudah?.[i] ?? 0);
        const belum = Number(data.serikat?.belum?.[i] ?? 0);
        const perusahaan = Number(data.serikat?.perusahaan?.[i] ?? 0);

        tbody.innerHTML += `
            <tr>
                <td>${provinsi}</td>
                <td>${sudah.toLocaleString("id-ID")}</td>
                <td>${belum.toLocaleString("id-ID")}</td>
                <td>${perusahaan.toLocaleString("id-ID")}</td>
            </tr>
        `;
    });
}
function renderTableSusuOnly(data) {
    const tbody = document.getElementById("tbodySusu");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.susu?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        const sudah = Number(data.susu?.sudah?.[i] ?? 0);
        const belum = Number(data.susu?.belum?.[i] ?? 0);
        const perusahaan = Number(data.susu?.perusahaan?.[i] ?? 0);

        tbody.innerHTML += `
            <tr>
                <td>${provinsi}</td>
                <td>${sudah.toLocaleString("id-ID")}</td>
                <td>${belum.toLocaleString("id-ID")}</td>
                <td>${perusahaan.toLocaleString("id-ID")}</td>
            </tr>
        `;
    });
}
function renderTableBipartitOnly(data) {
    const tbody = document.getElementById("tbodyBipartit");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.bipartit?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        const sudah = Number(data.bipartit?.sudah?.[i] ?? 0);
        const belum = Number(data.bipartit?.belum?.[i] ?? 0);
        const perusahaan = Number(data.bipartit?.perusahaan?.[i] ?? 0);

        tbody.innerHTML += `
            <tr>
                <td>${provinsi}</td>
                <td>${sudah.toLocaleString("id-ID")}</td>
                <td>${belum.toLocaleString("id-ID")}</td>
                <td>${perusahaan.toLocaleString("id-ID")}</td>
            </tr>
        `;
    });
}
function renderTableRencanaTKOnly(data) {
    const tbody = document.getElementById("tbodyRencanaTK");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.rencana_tk?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        const sudah = Number(data.rencana_tk?.sudah?.[i] ?? 0);
        const perusahaan = Number(data.rencana_tk?.perusahaan?.[i] ?? 0);

        tbody.innerHTML += `
            <tr>
                <td>${provinsi}</td>
                <td>${sudah.toLocaleString("id-ID")}</td>
                <td>${perusahaan.toLocaleString("id-ID")}</td>
            </tr>
        `;
    });
}
function renderTableDisabilitasOnly(data) {
    const tbody = document.getElementById("tbodyDisabilitas");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.disabilitas?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        const sudah = Number(data.disabilitas?.sudah?.[i] ?? 0);
        const total = Number(data.disabilitas?.total?.[i] ?? 0);
        const perusahaan = Number(data.disabilitas?.perusahaan?.[i] ?? 0);

        tbody.innerHTML += `
            <tr>
                <td>${provinsi}</td>
                <td>${sudah.toLocaleString("id-ID")}</td>
                <td>${total.toLocaleString("id-ID")}</td>
                <td>${perusahaan.toLocaleString("id-ID")}</td>
            </tr>
        `;
    });
}
function renderTableAhliK3Only(data) {
    const tbody = document.getElementById("tbodyAhliK3");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.ahli_k3?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        const sudah = Number(data.ahli_k3?.sudah?.[i] ?? 0);
        const total = Number(data.ahli_k3?.total?.[i] ?? 0);
        const perusahaan = Number(data.ahli_k3?.perusahaan?.[i] ?? 0);

        tbody.innerHTML += `
            <tr>
                <td>${provinsi}</td>
                <td>${sudah.toLocaleString("id-ID")}</td>
                <td>${total.toLocaleString("id-ID")}</td>
                <td>${perusahaan.toLocaleString("id-ID")}</td>
            </tr>
        `;
    });
}
function renderTableWkwiOnly(data) {
    const tbody = document.getElementById("tbodyWkwi");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = (data.waktu_kerja?.labels ?? []).filter((v) => v !== null);

    labels.forEach((provinsi, i) => {
        const umum = Number(data.waktu_kerja?.umum?.[i] ?? 0);
        const sektor = Number(data.waktu_kerja?.sektor?.[i] ?? 0);
        const perusahaan = Number(data.waktu_kerja?.perusahaan?.[i] ?? 0);

        tbody.innerHTML += `
            <tr>
                <td>${provinsi}</td>
                <td>${umum.toLocaleString("id-ID")}</td>
                <td>${sektor.toLocaleString("id-ID")}</td>
                <td>${perusahaan.toLocaleString("id-ID")}</td>
            </tr>
        `;
    });
}
function renderTabelKabupaten(data) {
    const tbody = document.getElementById("tbodyKabupaten");
    if (!tbody) return;

    tbody.innerHTML = "";

    const provinsi = document.getElementById("provinsiKetenagakerjaan")?.value;

    if (!provinsi) {
        tbody.innerHTML = `
            <tr>
                <td colspan="17">Silakan pilih provinsi terlebih dahulu</td>
            </tr>
        `;
        return;
    }

    const labels = data.p2k3?.labels ?? [];

    labels.forEach((kab, i) => {
        const get = (obj, type) =>
            Number(obj?.[type]?.[i] ?? 0).toLocaleString("id-ID");

        tbody.innerHTML += `
        <tr>
            <td>${kab}</td>
            <td>${get(data.p2k3, "sudah")}</td>
            <td>${get(data.p2k3, "belum")}</td>
            <td>${get(data.p2k3, "perusahaan")}</td>

            <td>${get(data.ahli_k3, "sudah")}</td>
            <td>${get(data.ahli_k3, "belum")}</td>
            <td>${get(data.ahli_k3, "perusahaan")}</td>

            <td>${get(data.disabilitas, "sudah")}</td>
            <td>${get(data.disabilitas, "belum")}</td>
            <td>${get(data.disabilitas, "perusahaan")}</td>
            <td>${get(data.disabilitas, "total")}</td>

            <td>${get(data.rencana_tk, "sudah")}</td>
            <td>${get(data.rencana_tk, "belum")}</td>
            <td>${get(data.rencana_tk, "perusahaan")}</td>

            <td>${get(data.serikat, "sudah")}</td>
            <td>${get(data.serikat, "belum")}</td>
            <td>${get(data.serikat, "perusahaan")}</td>

            <td>${get(data.bipartit, "sudah")}</td>
            <td>${get(data.bipartit, "belum")}</td>
            <td>${get(data.bipartit, "perusahaan")}</td>

            <td>${get(data.susu, "sudah")}</td>
            <td>${get(data.susu, "belum")}</td>
            <td>${get(data.susu, "perusahaan")}</td>

            <td>${get(data.waktu_kerja, "umum")}</td>
            <td>${get(data.waktu_kerja, "sektor")}</td>
            <td>${get(data.waktu_kerja, "perusahaan")}</td>
        </tr>
        `;
    });
}

function updateJudulWilayah(provinsi, kabupaten) {
    const titles = {
        titleP2K3: "P2K3",
        titleP2K3nasional: "P2K3",

        titleAhliK3: "Ahli K3",
        titleAhliK3nasional: "Ahli K3 ",

        titleDisabilitas: "Perusahaan Yang Mempekerjakan Disabilitas",
        titleDisabilitasnasional: "Perusahaan Yang Mempekerjakan Disabilitas",

        titleSerikat: "Perusahaan Yang Memiliki Serikat Pekerja",
        titleSerikatnasional: "Perusahaan Yang Memiliki Serikat Pekerja",

        titleBipartit: "Perusahaan Yang Memiliki LKS Bipartit",
        titleBipartitnasional: "Perusahaan Yang Memiliki LKS Bipartit",

        titleSusu: "Perusahaan Yang Menerapkan Struktur Skala Upah",
        titleSusunasional: "Perusahaan Yang Menerapkan Struktur Skala Upah",

        titleWkwi:
            "Perusahaan Yang Mengisi Pengaturan Waktu Kerja Waktu Istirahat",
        titleWkwinasional:
            "Perusahaan Yang Mengisi Pengaturan Waktu Kerja Waktu Istirahat ",

        titleRencanaTk:
            "Perusahaan Yang Sudah Menyusun Perencanaan Tenaga Kerja",
        titleRencanaTknasional:
            "Perusahaan Yang Sudah Menyusun Perencanaan Tenaga Kerja ",
    };

    Object.keys(titles).forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        // PRIORITAS KABUPATEN
        if (kabupaten) {
            el.innerText = titles[id] + " di " + kabupaten;
        }

        // JIKA HANYA PROVINSI
        else if (provinsi) {
            el.innerText =
                titles[id] + " Per Kabupaten di Provinsi (" + provinsi + ")";
        }

        // NASIONAL
        else {
            el.innerText = titles[id];
        }
    });
}
function updateChartTheme(isDark) {
    Chart.defaults.color = isDark ? "#fff" : "#000";

    Object.values(charts).forEach((c) => {
        c.doughnut?.update();
        c.bar?.update();
    });

    Object.values(chartKabupaten).forEach((c) => {
        c?.update();
    });
}
// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", function () {
    loadKabupaten("");
    charts = {
        p2k3: {
            doughnut: createDoughnutChart("doughnutP2K3"),
            bar: createBarChart("barP2K3", "p2k3"),
        },

        ahli_k3: {
            doughnut: createDoughnutChart("doughnutAhliK3"),
            bar: createBarChart("barAhliK3", "ahli_k3"),
        },

        disabilitas: {
            doughnut: createDoughnutChart("doughnutDisabilitas"),
            bar: createBarChart("barDisabilitas", "disabilitas"),
        },

        susu: {
            doughnut: createDoughnutChart("doughnutSusu"),
            bar: createBarChart("barSusu", "susu"),
        },

        serikat: {
            doughnut: createDoughnutChart("doughnutSerikatPekerja"),
            bar: createBarChart("barSerikatPekerja", "serikat"),
        },

        bipartit: {
            doughnut: createDoughnutChart("doughnutBipartitPekerja"),
            bar: createBarChart("barBipartitPekerja", "bipartit"),
        },

        waktu_kerja: {
            doughnut: createDoughnutChart("doughnutWkwi", "waktu_kerja"),
            bar: createBarChart("barWkwi", "waktu_kerja"),
        },

        rencana_tk: {
            doughnut: createDoughnutChart("doughnutPerencanaanTk"),
            bar: createBarChart("barPerencanaanTk", "rencana_tk"),
        },
    };
    chartKabupaten = {
        p2k3: createBarChart("barKabupatenP2K3"),
        ahli_k3: createBarChart("barKabupatenAhliK3"),
        disabilitas: createBarChart("barKabupatenDisabiliats"),
        susu: createBarChart("barKabupatenSusu"),
        serikat: createBarChart("barKabupatenSerikatPekerja"),
        bipartit: createBarChart("barKabupatenBipartitPekerja"),
        waktu_kerja: createBarChart("barKabupatenWkwi"),
        rencana_tk: createBarChart("barKabupatenPerencanaanTk"),
    };

    loadChartKetenagakerjaan();

    document
        .getElementById("jenisSelect")
        ?.addEventListener("change", loadChartKetenagakerjaan);

    document
        .getElementById("provinsiKetenagakerjaan")
        ?.addEventListener("change", function () {
            const provinsi = this.value;
            const kabupaten = document.getElementById(
                "kabupatenKetenagakerjaan",
            )?.value;

            updateJudulWilayah(provinsi, kabupaten);

            loadKabupaten(provinsi);
            loadChartKetenagakerjaan();
        });

    document
        .getElementById("kabupatenKetenagakerjaan")
        ?.addEventListener("change", function () {
            const provinsi = document.getElementById(
                "provinsiKetenagakerjaan",
            )?.value;
            const kabupaten = this.value;

            updateJudulWilayah(provinsi, kabupaten);

            loadChartKetenagakerjaan();
        });

    document
        .getElementById("tableFilterKetenagakerjaan")
        ?.addEventListener("change", function () {
            loadChartKetenagakerjaan(); // refresh tabel
        });

    const btnExport = document.getElementById("downloadPdfKetenagakerjaan");

    if (btnExport) {
        btnExport.addEventListener("click", async function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            const KOP_Y = 35;
            const FILTER_Y = KOP_Y + 12;
            let y = FILTER_Y + 8;

            const now = new Date();
            const tanggal = now.toLocaleDateString("id-ID");
            const jam = now.toLocaleTimeString("id-ID");

            const addHeader = () => {
                pdf.setFontSize(9);
                pdf.setTextColor(100);
                pdf.text(`Dicetak: ${tanggal} ${jam}`, 280, KOP_Y, {
                    align: "right",
                });
            };

            await addKop(pdf);
            addHeader();

            // =========================
            // FILTER AKTIF
            // =========================
            const jenis = document.getElementById("jenisSelect")?.value;
            const provinsi = document.getElementById(
                "provinsiKetenagakerjaan",
            )?.value;
            const kabupaten = document.getElementById(
                "kabupatenKetenagakerjaan",
            )?.value;

            pdf.setFontSize(11);
            pdf.setFont(undefined, "normal");

            pdf.text(
                `Filter: ${jenis || "semua"} | ${provinsi || "nasional"} | ${kabupaten || "-"}`,
                10,
                FILTER_Y,
            );

            y = FILTER_Y + 10;

            // =========================
            // LIST CHART
            // =========================
            const chartIds = [
                "barP2K3",
                "barAhliK3",
                "barDisabilitas",
                "barSusu",
                "barSerikatPekerja",
                "barBipartitPekerja",
                "barWkwi",
                "barPerencanaanTk",
            ];

            for (let i = 0; i < chartIds.length; i++) {
                const chart = Chart.getChart(chartIds[i]);
                if (!chart) continue;

                // page baru untuk chart selain chart pertama
                const labels = chart.data.labels;
                const values = chart.data.datasets[0].data;

                const chunkSize = 20;

                // canvas sementara biar HD
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = 2000;
                tempCanvas.height = 800;

                for (let j = 0; j < labels.length; j += chunkSize) {
                    const chunkLabels = labels.slice(j, j + chunkSize);
                    const chunkValues = values.slice(j, j + chunkSize);

                    // destroy chart lama
                    if (window.tempChart) {
                        window.tempChart.destroy();
                    }

                    // render chart baru (per 20 data)
                    window.tempChart = new Chart(tempCanvas, {
                        type: chart.config.type,
                        data: {
                            labels: chunkLabels,
                            datasets: chart.data.datasets.map((ds) => ({
                                label: ds.label,
                                data: ds.data.slice(j, j + chunkSize),
                                backgroundColor: Array.isArray(
                                    ds.backgroundColor,
                                )
                                    ? ds.backgroundColor.slice(j, j + chunkSize)
                                    : ds.backgroundColor,
                            })),
                        },
                        options: {
                            responsive: false,
                            animation: false,
                            maintainAspectRatio: false,

                            plugins: {
                                datalabels: {
                                    anchor: "end",
                                    align: "top",
                                    offset: 4,
                                    color: "#000", // biar keliatan di PDF putih
                                    font: {
                                        weight: "bold",
                                        size: 10,
                                    },
                                    formatter: (value) =>
                                        value > 0
                                            ? value.toLocaleString("id-ID")
                                            : "",
                                },
                            },

                            scales: {
                                x: {
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 45,
                                        minRotation: 45,
                                        font: { size: 10 },
                                    },
                                },
                            },
                        },
                        plugins: [ChartDataLabels],
                    });

                    const img = tempCanvas.toDataURL("image/png", 1.0);

                    // halaman baru kecuali pertama
                    if (j !== 0 || i !== 0) {
                        pdf.addPage();
                    }

                    await addKop(pdf);
                    addHeader();

                    const chartTitle =
                        chart.canvas
                            .closest(".card")
                            ?.querySelector(".card-title")?.innerText ||
                        chartIds[i];

                    pdf.setFontSize(12);
                    pdf.setFont(undefined, "bold");

                    const start = j + 1;
                    const end = Math.min(j + chunkSize, labels.length);

                    pdf.text(`${chartTitle} (${start}-${end})`, 10, KOP_Y + 8);

                    pdf.addImage(img, "PNG", 10, KOP_Y + 20, 270, 105);
                }
            }

            // =========================
            // TABEL
            // =========================
            const tableProv = document.getElementById(
                "tabelProvinsiKetenagakerjaan",
            );
            const tableKab = document.getElementById(
                "tabelKabupatenKetenagakerjaan",
            );

            if (tableProv?.style.display !== "none") {
                pdf.addPage();
                await addKop(pdf);
                addHeader();

                pdf.text("Tabel Provinsi", 10, KOP_Y + 5);

                pdf.autoTable({
                    html: "#tabelProvinsiKetenagakerjaan table",
                    startY: KOP_Y + 10,
                    styles: { fontSize: 6 },
                    headStyles: { fillColor: [13, 110, 253] },
                });
            }

            if (tableKab?.style.display !== "none") {
                pdf.addPage();
                await addKop(pdf);
                addHeader();

                pdf.text("Tabel Kabupaten", 10, KOP_Y + 5);

                pdf.autoTable({
                    html: "#tabelKabupatenKetenagakerjaan table",
                    startY: KOP_Y + 10,
                    styles: { fontSize: 6 },
                    headStyles: { fillColor: [220, 53, 69] },
                });
            }

            // =========================
            // SAVE
            // =========================
            pdf.save("laporan-ketenagakerjaan.pdf");
        });
    }
});
