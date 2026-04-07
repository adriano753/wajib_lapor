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
            const wrapper = document.getElementById(
                "tableProvinsiPPPKBWrapper",
            );

            if (wrapper) {
                let html = `
        <div id="tableContent">
            <table class="table table-bordered table-striped">
                <thead class="table-primary">
                    <tr>
                        <th>Provinsi</th>
                        <th>PP - Ada</th>
                        <th>PP - Belum Ada</th>
                        <th>PKB - Ada</th>
                        <th>PKB - Belum Ada</th>
                    </tr>
                </thead>
                <tbody>
    `;

                rawData.forEach((item) => {
                    html += `
            <tr>
                <td>${item.provinsi ?? "-"}</td>
                <td>${(parseInt(item.pp_ada) || 0).toLocaleString("id-ID")}</td>
                <td>${(parseInt(item.pp_tidak_ada) || 0).toLocaleString("id-ID")}</td>
                <td>${(parseInt(item.pkb_ada) || 0).toLocaleString("id-ID")}</td>
                <td>${(parseInt(item.pkb_tidak_ada) || 0).toLocaleString("id-ID")}</td>
            </tr>
        `;
                });

                html += `
                </tbody>
            </table>
        </div>
    `;

                wrapper.innerHTML = html;

              

                // =========================
                // TOGGLE TABEL (HANYA SEKALI)
                // =========================
                const toggleBtn = document.getElementById("toggleTableBtn");
                const tableContent = document.getElementById("tableContent");

                if (toggleBtn && tableContent) {
                    // default hidden kalau tombolnya "Buka Tabel"
                    if (toggleBtn.innerText.trim() === "Buka Tabel") {
                        tableContent.style.display = "none";
                    }

                    toggleBtn.addEventListener("click", function () {
                        const isHidden = tableContent.style.display === "none";

                        tableContent.style.display = isHidden
                            ? "block"
                            : "none";
                        toggleBtn.innerText = isHidden
                            ? "Tutup Tabel"
                            : "Buka Tabel";

                        toggleBtn.classList.toggle("btn-success", !isHidden);
                        toggleBtn.classList.toggle("btn-secondary", isHidden);
                    });
                }
            } else {
                console.error("Wrapper tabel tidak ditemukan!");
            }
        }
    }
});
