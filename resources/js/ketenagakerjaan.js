// ==========================
// CHART OPTIONS
// ==========================
const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
};

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
        padding: {
            top: 40, // tambahkan ruang atas supaya label tidak menimpa legend
        },
    },

    scales: {
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 60,
                minRotation: 60,
            },
        },
        y: {
            beginAtZero: true,
            grace: "10%", // beri ruang atas pada batang chart
            ticks: {
                callback: function (value) {
                    return Number(value).toLocaleString("id-ID");
                },
            },
        },
    },
};

let charts = {};
let chartKabupaten = {};

// ==========================
// CREATE DOUGHNUT
// ==========================
function createDoughnutChart(canvasId) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    return new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Sudah", "Belum"],
            datasets: [
                {
                    data: [0, 0],
                    backgroundColor: ["#4CAF50", "#F44336"],
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
                                index: i,
                            }));
                        },
                    },
                },
                datalabels: {
                    display: false,
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

    return new Chart(ctx, {
        type: "bar",
        data: {
            labels: [],
            datasets: [
                {
                    label: "Sudah",
                    data: [],
                    backgroundColor: "#4CAF50",
                    barThickness: 40,
                    maxBarThickness: 40,
                },
                {
                    label: "Belum",
                    data: [],
                    backgroundColor: "#F44336",
                    barThickness: 40,
                    maxBarThickness: 40,
                },
            ],
        },
        plugins: [ChartDataLabels],
        options: {
            ...barOptions,

            onClick: function (evt, elements) {
                if (elements.length > 0 && indikator) {
                    const index = elements[0].index;
                    const provinsi = this.data.labels[index];

                    console.log("Klik provinsi:", provinsi, indikator);

                    loadChartKabupaten(indikator, provinsi);
                }
            },

            plugins: {
                legend: {
                    position: "top",
                },
                datalabels: {
                    anchor: "end",
                    align: "top",
                    offset: 6,
                    clamp: true,
                    clip: false,
                    color: "#000",
                    font: {
                        weight: "bold",
                        size: 12,
                    },
                    formatter: function (value) {
                        return Number(value ?? 0).toLocaleString("id-ID");
                    },
                },
            },
        },
    });
}

// ==========================
// UPDATE DOUGHNUT
// ==========================
function updateDoughnut(chart, data) {
    if (!chart || !data) return;

    const sudah = data.sudah ?? [];
    const belum = data.belum ?? [];

    let totalSudah = sudah.reduce((a, b) => a + Number(b), 0);
    let totalBelum = belum.reduce((a, b) => a + Number(b), 0);

    chart.data.datasets[0].data = [totalSudah, totalBelum];
    chart.update();
}

// ==========================
// UPDATE BAR
// ==========================
function updateBar(chart, data) {
    if (!chart || !data) return;

    let jenis = document.getElementById("jenisSelect")?.value;

    // reset chart dulu
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];

    chart.data.labels = data.labels ?? [];

    if (jenis === "sudah") {
        chart.data.datasets[0].data = data.sudah ?? [];
    } else if (jenis === "belum") {
        chart.data.datasets[1].data = data.belum ?? [];
    } else {
        chart.data.datasets[0].data = data.sudah ?? [];
        chart.data.datasets[1].data = data.belum ?? [];
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

    console.log("FILTER:", jenis, provinsi, kabupaten);
    fetch(
        `/chart-ketenagakerjaan?jenis=${jenis}&provinsi=${encodeURIComponent(provinsi)}&kabupaten=${encodeURIComponent(kabupaten)}`,
    )
        .then((res) => res.json())
        .then((data) => {
            updateDoughnut(charts.p2k3?.doughnut, data.p2k3);
            updateBar(charts.p2k3?.bar, data.p2k3);

            updateDoughnut(charts.ahli_k3?.doughnut, data.ahli_k3);
            updateBar(charts.ahli_k3?.bar, data.ahli_k3);

            updateDoughnut(charts.disabilitas?.doughnut, data.disabilitas);
            updateBar(charts.disabilitas?.bar, data.disabilitas);

            updateDoughnut(charts.susu?.doughnut, data.susu);
            updateBar(charts.susu?.bar, data.susu);

            updateDoughnut(charts.serikat?.doughnut, data.serikat);
            updateBar(charts.serikat?.bar, data.serikat);

            updateDoughnut(charts.waktu_kerja?.doughnut, data.waktu_kerja);
            updateBar(charts.waktu_kerja?.bar, data.waktu_kerja);

            updateDoughnut(charts.rencana_tk?.doughnut, data.rencana_tk);
            updateBar(charts.rencana_tk?.bar, data.rencana_tk);

            // isi tabel
            renderTabelProvinsi(data);
            renderTabelKabupaten(data);
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
        kabupatenKetenagakerjaan.innerHTML = `<option value="">Semua Kabupaten</option>`;
        return;
    }

    fetch(`/get-kabupaten?provinsi=${encodeURIComponent(provinsi)}`)
        .then((res) => res.json())
        .then((data) => {
            kabupatenKetenagakerjaan.innerHTML = `<option value="">Semua Kabupaten</option>`;

            data.forEach((kab) => {
                kabupatenKetenagakerjaan.innerHTML += `
                    <option value="${kab}">
                        ${kab}
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

            <td>${get(data.ahli_k3, "sudah")}</td>
            <td>${get(data.ahli_k3, "belum")}</td>

            <td>${get(data.disabilitas, "sudah")}</td>
            <td>${get(data.disabilitas, "belum")}</td>

            <td>${get(data.rencana_tk, "sudah")}</td>
            <td>${get(data.rencana_tk, "belum")}</td>

            <td>${get(data.serikat, "sudah")}</td>
            <td>${get(data.serikat, "belum")}</td>

            <td>${get(data.susu, "sudah")}</td>
            <td>${get(data.susu, "belum")}</td>

            <td>${get(data.waktu_kerja, "sudah")}</td>
            <td>${get(data.waktu_kerja, "belum")}</td>
        </tr>
    `;

        tbody.innerHTML += row;
    });
}

function renderTabelKabupaten(data) {
    const tbody = document.getElementById("tbodyKabupaten");
    if (!tbody) return;

    tbody.innerHTML = "";

    const labels = data.p2k3?.labels ?? [];

    labels.forEach((kab, i) => {
        const get = (obj, type) =>
            Number(obj?.[type]?.[i] ?? 0).toLocaleString("id-ID");

        tbody.innerHTML += `
        <tr>
            <td>${kab}</td>
             <td>${get(data.p2k3, "sudah")}</td>
            <td>${get(data.p2k3, "belum")}</td>

            <td>${get(data.ahli_k3, "sudah")}</td>
            <td>${get(data.ahli_k3, "belum")}</td>

            <td>${get(data.disabilitas, "sudah")}</td>
            <td>${get(data.disabilitas, "belum")}</td>

            <td>${get(data.rencana_tk, "sudah")}</td>
            <td>${get(data.rencana_tk, "belum")}</td>

            <td>${get(data.serikat, "sudah")}</td>
            <td>${get(data.serikat, "belum")}</td>

            <td>${get(data.susu, "sudah")}</td>
            <td>${get(data.susu, "belum")}</td>

            <td>${get(data.waktu_kerja, "sudah")}</td>
            <td>${get(data.waktu_kerja, "belum")}</td>
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

        titleSusu: "Perusahaan Yang Menerapkan Susu",
        titleSusunasional: "Perusahaan Yang Menerapkan Susu",

        titleWkwi: "Perusahaan Dengan Pengaturan Waktu Kerja Waktu Istirahat",
        titleWkwinasional:
            "Perusahaan Dengan Pengaturan Waktu Kerja Waktu Istirahat ",

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
// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", function () {
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

        waktu_kerja: {
            doughnut: createDoughnutChart("doughnutWkwi"),
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
    };

    loadChartKetenagakerjaan();

    // FILTER EVENT
    // ==========================
    // FILTER EVENT
    // ==========================
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
});
