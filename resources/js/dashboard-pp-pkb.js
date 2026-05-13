document.addEventListener("DOMContentLoaded", function () {
    // Pastikan data tersedia
    if (window.chartData && window.chartData.PPPKBValues) {
        const rawData = window.chartData.PPPKBValues;

        // =========================
        // RENDER CHART
        // =========================
        const canvas = document.getElementById("chartPPPKB");

        if (canvas && typeof Chart !== "undefined") {
            const ctx = canvas.getContext("2d");

            const categories = rawData.map((item) => item.provinsi ?? "-");
            const dataPPAda = rawData.map((item) => parseInt(item.pp_ada) || 0);
            const dataPPTidak = rawData.map(
                (item) => parseInt(item.pp_tidak_ada) || 0,
            );
            const dataPKBAda = rawData.map(
                (item) => parseInt(item.pkb_ada) || 0,
            );
            const dataPKBTidak = rawData.map(
                (item) => parseInt(item.pkb_tidak_ada) || 0,
            );
            const dataPKBSerikat = rawData.map(
                (item) => parseInt(item.pkb_serikat_lebih_10_tk) || 0,
            );

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: categories,
                    datasets: [
                        // --- GRUP 1: PP (Peraturan Perusahaan) ---
                        {
                            label: "PP - Ada",
                            data: dataPPAda,
                            backgroundColor: "#28a745", // Hijau
                            stack: "Stack 0", // KUNCI: Grouping ID 0
                            barPercentage: 0.8,
                            categoryPercentage: 0.9,
                        },
                        {
                            label: "PP - Belum Ada",
                            data: dataPPTidak,
                            backgroundColor: "#dc3545", // Merah
                            stack: "Stack 0", // KUNCI: Gabung dengan ID 0
                            barPercentage: 0.8,
                            categoryPercentage: 0.9,
                        },

                        // --- GRUP 2: PKB (Perjanjian Kerja Bersama) ---
                        {
                            label: "PKB - Ada",
                            data: dataPKBAda,
                            backgroundColor: "#007bff", // Biru
                            stack: "Stack 1", // KUNCI: Grouping ID 1 (Sebelahnya)
                            barPercentage: 0.8,
                            categoryPercentage: 0.9,
                        },
                        {
                            label: "PKB - Belum Ada",
                            data: dataPKBTidak,
                            backgroundColor: "#ffc107", // Kuning
                            stack: "Stack 1", // KUNCI: Gabung dengan ID 1
                            barPercentage: 0.8,
                            categoryPercentage: 0.9,
                        },
                        {
                            label: "PKB + SP + TK > 10",
                            data: dataPKBSerikat,
                            backgroundColor: "#6f42c1", // ungu biar beda
                            stack: "Stack 2", // 🔥 beda stack biar jadi grup baru
                            barPercentage: 0.8,
                            categoryPercentage: 0.9,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: "index",
                        intersect: false,
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: "Perbandingan Status Kepatuhan PP & PKB per Provinsi",
                            font: {
                                size: 16,
                            },
                        },
                        tooltip: {
                            callbacks: {
                                footer: function (tooltipItems) {
                                    let total = 0;
                                    tooltipItems.forEach(
                                        function (tooltipItem) {
                                            total += tooltipItem.parsed.y;
                                        },
                                    );
                                    return (
                                        "Total: " +
                                        total.toLocaleString("id-ID")
                                    );
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            stacked: true,
                            ticks: {
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45,
                            },
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Jumlah Perusahaan",
                            },
                        },
                    },
                },
            });

            // 4. FUNCITON RENDER TABEL PROVINSI PP-PKB
            // =========================
            // RENDER TABEL + TOGGLE
            // =========================
        }
        renderTablePPPKB("single");
    }
    document.getElementById("toggleTableBtn").onclick = function () {
        const tableWrapper = document.getElementById(
            "tableProvinsiPPPKBWrapper",
        );

        const isHidden = tableWrapper.style.display === "none";

        tableWrapper.style.display = isHidden ? "block" : "none";

        this.innerText = isHidden ? "Tutup Tabel" : "Buka Tabel";
    };
});

function renderTablePPPKB(mode = "single") {
    const tbody = document.getElementById("tablePPPKBBody");
    const header = document.getElementById("headerPPPKB");
    console.log(window.chartData.PPPKBValues);
    if (!tbody || !header) return;

    const data = window.chartData?.PPPKBValues || [];

    // 🔥 RESET
    tbody.innerHTML = "";

    // =========================
    // HEADER DINAMIS
    // =========================
    if (mode === "single") {
        header.innerHTML = `
            <th>No</th>
            <th>Provinsi</th>
            <th>PP - Ada</th>
            <th>PP - Belum Ada</th>
            <th>PKB - Ada</th>
            <th>PKB - Belum Ada</th>
            <th>PKB + SP + TK > 10</th>
        `;
    } else {
        header.innerHTML = `
            <th>No</th>
            <th>Provinsi</th>
            <th>PP</th>
            <th>PKB</th>
            <th>PKB + SP + TK > 10</th>
        `;
    }

    // =========================
    // BODY
    // =========================
    let no = 1;
    data.forEach((item) => {
        const ppAda = parseInt(item.pp_ada) || 0;
        const ppTidak = parseInt(item.pp_tidak_ada) || 0;
        const pkbAda = parseInt(item.pkb_ada) || 0;
        const pkbTidak = parseInt(item.pkb_tidak_ada) || 0;
        const pkbSerikat = parseInt(item.pkb_serikat_lebih_10_tk) || 0;

        if (mode === "single") {
            tbody.innerHTML += `
                <tr>
                    <td>${no++}</td>
                    <td>${item.provinsi ?? "-"}</td>
                    <td>${ppAda.toLocaleString("id-ID")}</td>
                    <td>${ppTidak.toLocaleString("id-ID")}</td>
                    <td>${pkbAda.toLocaleString("id-ID")}</td>
                    <td>${pkbTidak.toLocaleString("id-ID")}</td>
                    <td>${pkbSerikat.toLocaleString("id-ID")}</td>
                </tr>
            `;
        } else {
            tbody.innerHTML += `
                <tr>
                    <td>${no++}</td>
                    <td>${item.provinsi ?? "-"}</td>
                    <td>${ppAda.toLocaleString("id-ID")}</td>
                    <td>${pkbAda.toLocaleString("id-ID")}</td>
                    <td>${pkbSerikat.toLocaleString("id-ID")}</td>
                </tr>
            `;
        }
    });
}

window.renderTablePPPKB = renderTablePPPKB;
