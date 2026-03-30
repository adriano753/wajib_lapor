// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const navLinksMobile = document.getElementById("navLinksMobile");
const mobileLinks = navLinksMobile ? navLinksMobile.querySelectorAll("a") : [];

// const navLinksMobile = document.getElementById('navLinksMobile');
// const mobileLinks = navLinksMobile.querySelectorAll('a');

// hamburger.addEventListener('click', function () {
//    hamburger.classList.toggle('active');
//    navLinksMobile.classList.toggle('active');
// });
if (hamburger) {
    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navLinksMobile?.classList.toggle("active");
    });
}

// Close mobile menu when a link is clicked
mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navLinksMobile.classList.remove("active");
    });
});

// Close mobile menu when scrolling
window.addEventListener("scroll", function () {
    if (hamburger) hamburger.classList.remove("active");
    if (navLinksMobile) navLinksMobile.classList.remove("active");
});

// window.addEventListener('scroll', function () {
//    hamburger.classList.remove('active');
//    navLinksMobile.classList.remove('active');
// });

// Navbar scroll effect
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// window.addEventListener('scroll', function () {
//    const navbar = document.getElementById('navbar');
//    if (window.scrollY > 50) {
//       navbar.classList.add('scrolled');
//    } else {
//       navbar.classList.remove('scrolled');
//    }
// });

// BUTTON LIGHT MODE
// const toggleBtn = document.getElementById("themeToggle");

// toggleBtn.addEventListener("click", () => {
//     document.body.classList.toggle("light-mode");

//     if (document.body.classList.contains("light-mode")) {
//         toggleBtn.innerHTML = "☀ Light";
//         localStorage.setItem("theme", "light");
//     } else {
//         toggleBtn.innerHTML = "🌙 Dark";
//         localStorage.setItem("theme", "dark");
//     }

//     // 🔥 UPDATE CHART SETELAH TOGGLE
//     applyChartTheme(kabChart);     // ganti sesuai nama chart kamu
//     applyChartTheme(mainChart);    // kalau ada chart lain
// });

// function applyChartTheme(chart) {
//     const isLight = document.body.classList.contains("light-mode");

//     const textColor = isLight ? "#020617" : "#e5e7eb";
//     const gridColor = isLight
//         ? "rgba(15,23,42,0.12)"
//         : "rgba(255,255,255,0.15)";

//     chart.options.scales.x.ticks.color = textColor;
//     chart.options.scales.y.ticks.color = textColor;

//     chart.options.scales.x.grid.color = gridColor;
//     chart.options.scales.y.grid.color = gridColor;

//     if (chart.options.plugins?.legend?.labels) {
//         chart.options.plugins.legend.labels.color = textColor;
//     }

//     chart.update();
// }

// if (localStorage.getItem("theme") === "light") {
//     document.body.classList.add("light-mode");
//     toggleBtn.innerHTML = "☀ Light";
// }

// // 🔥 sinkronkan chart saat pertama load
// applyChartTheme(kabChart);
// applyChartTheme(mainChart);

// END LIGT MODE

// Active navigation highlighting
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const mobileNavLinks = document.querySelectorAll(".nav-links-mobile a");

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });

            mobileNavLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", updateActiveNav);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Mini charts animation
function drawMiniChart(canvasId, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Generate random data points
    const points = [];
    for (let i = 0; i < 10; i++) {
        points.push(Math.random() * canvas.height);
    }

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    points.forEach((point, index) => {
        const x = (canvas.width / (points.length - 1)) * index;
        const y = point;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color + "40");
    gradient.addColorStop(1, color + "00");

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
}

// Initialize mini charts
setTimeout(() => {
    drawMiniChart("miniChart1", "#00ffcc");
    drawMiniChart("miniChart2", "#ff0080");
    drawMiniChart("miniChart3", "#00ccff");
    drawMiniChart("miniChart4", "#ffcc00");
    drawMiniChart("miniChart5", "#ff6b6b");
    drawMiniChart("miniChart6", "#4ecdc4");
}, 100);

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll(".bar");
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = "slideUp 0.5s ease-out forwards";
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll(".bar-chart").forEach((chart) => {
    observer.observe(chart);
});

// Add slide up animation
const style = document.createElement("style");
style.textContent = `
            @keyframes slideUp {
                from {
                    transform: scaleY(0);
                    transform-origin: bottom;
                }
                to {
                    transform: scaleY(1);
                    transform-origin: bottom;
                }
            }
        `;
document.head.appendChild(style);

// Chart options interaction
document.querySelectorAll(".chart-options").forEach((optionGroup) => {
    const options = optionGroup.querySelectorAll(".chart-option");
    options.forEach((option) => {
        option.addEventListener("click", function () {
            options.forEach((opt) => opt.classList.remove("active"));
            this.classList.add("active");
        });
    });
});

// Form submission handler
// ===== CONTACT FORM (SAFE) =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Message Sent! ✓";
        submitBtn.style.background =
            "linear-gradient(135deg, #4ade80, #22c55e)";

        this.reset();

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background =
                "linear-gradient(135deg, #ff6b6b, #ff8e53)";
        }, 3000);
    });

    // Hover effect inputs
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
        input.addEventListener("focus", function () {
            this.style.borderColor = "rgba(0, 255, 204, 0.5)";
            this.style.background = "rgba(255, 255, 255, 0.08)";
        });

        input.addEventListener("blur", function () {
            this.style.borderColor = "rgba(255, 255, 255, 0.1)";
            this.style.background = "rgba(255, 255, 255, 0.05)";
        });
    });
}

// document.getElementById('contactForm').addEventListener('submit', function (e) {
//    e.preventDefault();

//    // Get form data
//    const formData = {
//       name: document.getElementById('name').value,
//       email: document.getElementById('email').value,
//       subject: document.getElementById('subject').value,
//       message: document.getElementById('message').value
//    };

//    // Show success message
//    const submitBtn = this.querySelector('button[type="submit"]');
//    const originalText = submitBtn.textContent;
//    submitBtn.textContent = 'Message Sent! ✓';
//    submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';

//    // Reset form
//    this.reset();

//    // Reset button after 3 seconds
//    setTimeout(() => {
//       submitBtn.textContent = originalText;
//       submitBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff8e53)';
//    }, 3000);
// });

// Add hover effect to contact form inputs
document
    .querySelectorAll("#contactForm input, #contactForm textarea")
    .forEach((input) => {
        input.addEventListener("focus", function () {
            this.style.borderColor = "rgba(0, 255, 204, 0.5)";
            this.style.background = "rgba(255, 255, 255, 0.08)";
            this.style.boxShadow = "0 0 20px rgba(0, 255, 204, 0.1)";
        });

        input.addEventListener("blur", function () {
            this.style.borderColor = "rgba(255, 255, 255, 0.1)";
            this.style.background = "rgba(255, 255, 255, 0.05)";
            this.style.boxShadow = "none";
        });
    });

// Metrics animation on scroll
const metricsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const metrics = entry.target.querySelectorAll(".metric-item");
                metrics.forEach((metric, index) => {
                    setTimeout(() => {
                        metric.style.transform = "translateY(0)";
                        metric.style.opacity = "1";
                    }, index * 100);
                });
            }
        });
    },
    {
        threshold: 0.3,
    },
);

document.querySelectorAll(".metrics-grid").forEach((grid) => {
    metricsObserver.observe(grid);
});

// Initialize metrics animation state
document.querySelectorAll(".metric-item").forEach((item) => {
    item.style.transform = "translateY(20px)";
    item.style.opacity = "0";
    item.style.transition = "all 0.5s ease";
});

/* =================================
GLOBAL DATA FUNCTION (WAJIB DI ATAS)
================================= */

function totalProvinsi() {
    const map = {};
    window.provData.forEach((d) => {
        if (!map[d.provinsi]) map[d.provinsi] = 0;
        map[d.provinsi] += getTotalByJenis(d);
    });
    return map;
}

function totalKotaByProvinsi(provinsi) {
    const map = {};
    const target = provinsi.trim().toUpperCase();

    window.kabData.forEach((d) => {
        if (!d.provinsi) return;
        const dataProv = d.provinsi.trim().toUpperCase();

        if (dataProv === target) {
            if (!map[d.kota]) map[d.kota] = 0;
            map[d.kota] += getTotalByJenis(d);
        }
    });

    return map;
}

function totalSemuaTenagaKerja() {
    let total = 0;
    window.provData.forEach((d) => {
        total += getTotalByJenis(d);
    });
    return total;
}

function totalTenagaKerjaProvinsi(provinsi) {
    const kotaMap = totalKotaByProvinsi(provinsi);
    let total = 0;
    Object.values(kotaMap).forEach((val) => (total += val));
    return total;
}

function totalSemuaProvinsi() {
    const provMap = totalProvinsi();
    let total = 0;
    Object.values(provMap).forEach((val) => (total += val));
    return total;
}

function sumBySkalaKab(skala, kota = null) {
    return window.kabData
        .filter(
            (d) =>
                d.skala_objek_pengawasan === skala &&
                (!kota || d.kota === kota),
        )
        .reduce((sum, d) => sum + getTotalByJenis(d), 0);
}

function sumTidakTeridentifikasiKab(kota = null) {
    return window.kabData
        .filter(
            (d) =>
                (!d.skala_objek_pengawasan ||
                    d.skala_objek_pengawasan.trim() === "") &&
                (!kota || d.kota === kota),
        )
        .reduce((sum, d) => sum + getTotalByJenis(d), 0);
}

/* =================================
       START GRAFIK TENAGA KERJA 
    ==================================== */
document.addEventListener("DOMContentLoaded", function () {
    renderKBLIChart();
    console.log("ProvData:", window.provData);
    console.log("KabData:", window.kabData);

    if (typeof Chart === "undefined") {
        console.error("Chart.js belum ke-load");
        return;
    }

    if (!window.chartData || !window.kabData) {
        console.error("Data chart tidak lengkap");
        return;
    }
    if (!window.chartJaminanData) {
        console.warn("chartJaminanData kosong");
        return;
    }

    /* ===============================
       FILTER PROVINSI JAMINAN SOSIAL
    =============================== */
    document
        .getElementById("provinsiUpahSelect")
        .addEventListener("change", function () {
            const provinsi = this.value;

            if (provinsi === "all") {
                upahChart.data.labels = window.chartUpahData.labels;
                upahChart.data.datasets[0].data = window.chartUpahData.values;
            } else {
                const idx = window.chartUpahData.labels.indexOf(provinsi);

                if (idx !== -1) {
                    upahChart.data.labels = [provinsi];
                    upahChart.data.datasets[0].data = [
                        window.chartUpahData.values[idx],
                    ];
                }
            }

            upahChart.update();
        });

    const canvas = document.getElementById("provinsiLineChartJaminan");
    if (!canvas) return;

    const bpjsMainChart = new Chart(canvas, {
        type: "bar",
        data: {
            labels: window.chartJaminanData.labels, // PROVINSI
            datasets: [
                {
                    label: "JKK",
                    data: window.chartJaminanData.jkk,
                    backgroundColor: "#3B82F6",
                },
                {
                    label: "JHT",
                    data: window.chartJaminanData.jht,
                    backgroundColor: "#22C55E",
                },
                {
                    label: "JKM",
                    data: window.chartJaminanData.jkm,
                    backgroundColor: "#F97316",
                },
                {
                    label: "JP",
                    data: window.chartJaminanData.jp,
                    backgroundColor: "#A855F7",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index", // ⬅️ KUNCI PER PROVINSI
                axis: "x",
                intersect: false, // ⬅️ cursor bebas, tetap sesuai provinsi
            },

            scales: {
                x: {
                    categoryPercentage: 0.55,
                    barPercentage: 0.9,
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                    },
                },
                y: {
                    beginAtZero: true,
                },
            },

            plugins: {
                tooltip: {
                    enabled: true,
                    mode: "index",
                    intersect: false,
                    callbacks: {
                        title: function (tooltipItems) {
                            // ⬅️ INI KUNCI UTAMA
                            return tooltipItems[0].label;
                        },
                    },
                },
                legend: {
                    position: "top",
                },
            },
        },
    });

    /* ===============================
       1️⃣ START FILTER BPJS TABLE PROVINSI
    =============================== */

    const provinsiSelect = document.getElementById("provinsiBpjsSelect");
    const tableRows = document.querySelectorAll("#bpjsTable .bpjs-row");

    provinsiSelect.addEventListener("change", function () {
        const provinsi = this.value;

        // ================= CHART =================
        fetch(`/filter/bpjs?provinsi=${provinsi}`)
            .then((res) => res.json())
            .then((data) => {
                if (provinsi === "all") {
                    bpjsMainChart.data.labels = window.chartJaminanData.labels;

                    bpjsMainChart.data.datasets[0].data =
                        window.chartJaminanData.jkk;
                    bpjsMainChart.data.datasets[1].data =
                        window.chartJaminanData.jht;
                    bpjsMainChart.data.datasets[2].data =
                        window.chartJaminanData.jkm;
                    bpjsMainChart.data.datasets[3].data =
                        window.chartJaminanData.jp;
                } else {
                    const r = data[0];

                    bpjsMainChart.data.labels = [r.provinsi];
                    bpjsMainChart.data.datasets[0].data = [r.jkk];
                    bpjsMainChart.data.datasets[1].data = [r.jht];
                    bpjsMainChart.data.datasets[2].data = [r.jkm];
                    bpjsMainChart.data.datasets[3].data = [r.jp];
                }

                bpjsMainChart.update();
            });

        // ================= TABLE =================
        tableRows.forEach((row) => {
            const rowProv = row.dataset.provinsi;

            if (provinsi === "all" || rowProv === provinsi) {
                row.style.display = "block";
            } else {
                row.style.display = "none";
            }
        });
    });

    /* ===============================
    TOGGLE LABEL BPJS (TABLE)
    =============================== */
    const toggleBtnBpjs = document.getElementById("toggleBpjsLabel");
    const bpjsTable = document.getElementById("bpjsTable");

    let isVisible = true;

    toggleBtnBpjs.addEventListener("click", function () {
        isVisible = !isVisible;

        bpjsTable.classList.toggle("hidden", !isVisible);

        toggleBtnBpjs.innerText = isVisible
            ? "Sembunyikan Detail Provinsi"
            : "Tampilkan Detail Provinsi";
    });

    if (!window.chartJaminanData) {
        console.warn("chartJaminanData kosong");
        return;
    }

    if (!window.chartData || !window.provData) {
        console.error("Data chart tidak lengkap");
        return;
    }
    /* =================================
        START GRAFIK UTAMA → DEFAULT PROVINSI
    ==================================== */
    const provMap = totalProvinsi();
    const provLabels = Object.keys(provMap);
    const provValues = Object.values(provMap);
    const totalAll = totalSemuaTenagaKerja();

    const mainChart = new Chart(
        document.getElementById("tenagaKerjaProvChart"),
        {
            type: "line",
            data: {
                labels: provLabels,
                datasets: [
                    {
                        label:
                            "Total " +
                            getLabelJenis() +
                            " Semua Provinsi : " +
                            totalAll.toLocaleString("id-ID") +
                            " Orang",
                        data: provValues,
                        tension: 0.4,
                        borderWidth: 3,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {},
                    tooltip: {
                        callbacks: {
                            // Judul tooltip (Mikro / Besar / Menengah / Kecil)
                            title: function (context) {
                                return context[0].label;
                            },

                            // Isi tooltip → hanya data yang dipilih
                            label: function (context) {
                                const value = context.raw || 0;
                                return (
                                    "Jumlah: " +
                                    value.toLocaleString("id-ID") +
                                    " orang"
                                );
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                        },
                    },
                    y: {
                        ticks: {},
                    },
                },
            },
        },
    );
    /* =================================
        END GRAFIK UTAMA → DEFAULT PROVINSI
    ==================================== */

    /* ===============================
   START CHART KABUPATEN (DEFAULT KOSONG)
=============================== */
    const kabChart = new Chart(document.getElementById("tenagaKerjaKabChart"), {
        type: "line",
        data: {
            labels: [
                "Tidak Teridentifikasi",
                "Mikro",
                "Kecil",
                "Menengah",
                "Besar",
            ],
            datasets: [
                {
                    label: "Tenaga Kerja",
                    data: [0, 0, 0, 0, 0],
                    tension: 0.4,
                    borderWidth: 3,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {},

                tooltip: {
                    callbacks: {
                        // Judul tooltip (Mikro / Besar / Menengah / Kecil)
                        title: function (context) {
                            return context[0].label;
                        },

                        // Isi tooltip → hanya data yang dipilih
                        label: function (context) {
                            const value = context.raw || 0;
                            return (
                                "Jumlah: " +
                                value.toLocaleString("id-ID") +
                                " orang"
                            );
                        },
                    },
                },
            },

            scales: {
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                    },
                },
                y: {
                    ticks: {},
                },
            },
        },
    });

    /* ===============================
   END CHART KABUPATEN (DEFAULT KOSONG)
=============================== */

    /* ===============================
   START BUTTON LIGHT MODE
=============================== */
    const toggleBtn = document.getElementById("themeToggle");

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                toggleBtn.innerHTML = "☀ Light";
                localStorage.setItem("theme", "light");
            } else {
                toggleBtn.innerHTML = "🌙 Dark";
                localStorage.setItem("theme", "dark");
            }

            if (window.kabChart) applyChartTheme(kabChart);
            if (window.mainChart) applyChartTheme(mainChart);
        });
    }

    function applyChartTheme(chart) {
        if (!chart) return;

        const isLight = document.body.classList.contains("light-mode");

        const textColor = isLight ? "#020617" : "#e5e7eb";
        const gridColor = isLight
            ? "rgba(15,23,42,0.15)"
            : "rgba(255,255,255,0.15)";

        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;

        chart.options.scales.x.grid.color = gridColor;
        chart.options.scales.y.grid.color = gridColor;

        if (chart.options.plugins?.title) {
            chart.options.plugins.title.color = textColor;
        }

        if (chart.options.plugins?.legend?.labels) {
            chart.options.plugins.legend.labels.color = textColor;
        }

        if (chart.options.plugins?.tooltip) {
            chart.options.plugins.tooltip.titleColor = textColor;
            chart.options.plugins.tooltip.bodyColor = textColor;
        }

        chart.update();
    }
    /* ===============================
   END BUTTON LIGHT
=============================== */
    const tableFilter = document.getElementById("tableFilter");

    if (tableFilter) {
        tableFilter.addEventListener("change", function () {
            const val = this.value;

            const prov = document.getElementById("tableProvinsiWrapper");
            const kab = document.getElementById("tableKabupatenWrapper");

            if (prov) prov.style.display = "none";
            if (kab) kab.style.display = "none";

            if (val === "provinsi") {
                renderTableProvinsi();
                if (prov) prov.style.display = "block";
            }

            if (val === "kabupaten") {
                renderTableKabupaten();
                if (kab) kab.style.display = "block";
            }
        });

        // trigger awal
        tableFilter.dispatchEvent(new Event("change"));
    }

    /* ===============================
       4️⃣ START FILTER DROPDOWN KABUPATEN
    =============================== */
    document
        .getElementById("kabupatenSelect")
        .addEventListener("change", function () {
            const kota = this.value;
            // if (!kota) return;
            if (!kota || kota === "") {
                updateKabChartSummary(null); // kosongkan summary
                kabChart.data.datasets[0].label =
                    "Tenaga Kerja - Pilih Kab/Kota";
                kabChart.data.datasets[0].data = [0, 0, 0, 0, 0];
                kabChart.update();
                return;
            }

            const mikro = sumBySkalaKab("Mikro", kota);
            const besar = sumBySkalaKab("Besar", kota);
            const menengah = sumBySkalaKab("Menengah", kota);
            const kecil = sumBySkalaKab("Kecil", kota);
            const tidakTeridentifikasi = sumTidakTeridentifikasiKab(kota);

            const total =
                mikro + besar + menengah + kecil + tidakTeridentifikasi;

            kabChart.data.datasets[0].label = "Tenaga Kerja - " + kota;
            // " (" +
            // total.toLocaleString("id-ID") +
            // " Orang)" +
            // " | Tidak Teridentifikasi: (" +
            // tidakTeridentifikasi.toLocaleString("id-ID") +
            // " Orang)" +
            // " | Mikro: (" +
            // mikro.toLocaleString("id-ID") +
            // " Orang)" +
            // " | Kecil: (" +
            // kecil.toLocaleString("id-ID") +
            // " Orang)" +
            // " | Menengah: (" +
            // menengah.toLocaleString("id-ID") +
            // " Orang)" +
            // " | Besar: (" +
            // besar.toLocaleString("id-ID") +
            // " Orang)";

            kabChart.data.datasets[0].data = [
                tidakTeridentifikasi,
                mikro,
                kecil,
                menengah,
                besar,
            ];

            kabChart.update();
            updateKabChartSummary(
                kota,
                total,
                tidakTeridentifikasi,
                mikro,
                kecil,
                menengah,
                besar,
            );
        });

    /* ===============================
       4️⃣ END FILTER DROPDOWN KABUPATEN
    =============================== */

    /* ===============================
       4️⃣ START FILTER DROPDOWN PROVINSI
    =============================== */
    document
        .getElementById("provinsiSelect")
        .addEventListener("change", function () {
            const provinsi = this.value;
            renderKBLIChart();
            const labelJenis = getLabelJenis();
            document
                .getElementById("tableFilter")
                .dispatchEvent(new Event("change"));

            // update dropdown kabupaten
            updateKabupatenDropdown(provinsi);

            // reset chart kabupaten
            kabChart.data.datasets[0].label = "Pilih Kab/Kota";
            kabChart.data.datasets[0].data = [0, 0, 0, 0, 0];
            kabChart.update();

            updateKabChartSummary(null);

            // reset → tampil provinsi lagi
            if (!provinsi) {
                const provMap = totalProvinsi();
                const totalAll = totalSemuaProvinsi();
                mainChart.data.labels = Object.keys(provMap);

                mainChart.data.datasets[0].label =
                    "Total " +
                    getLabelJenis() +
                    " (Semua Provinsi: " +
                    totalAll.toLocaleString("id-ID") +
                    " orang)";

                mainChart.data.datasets[0].data = Object.values(provMap);
                mainChart.update();
                return;
            }

            // tampil kabupaten dalam provinsi (chart utama)
            const kotaMap = totalKotaByProvinsi(provinsi);
            const totalTk = totalTenagaKerjaProvinsi(provinsi);
            mainChart.data.labels = Object.keys(kotaMap);
            mainChart.data.datasets[0].label =
                "Total " +
                getLabelJenis() +
                " - " +
                provinsi +
                " (" +
                totalTk.toLocaleString("id-ID") +
                " orang)";
            mainChart.data.datasets[0].data = Object.values(kotaMap);
            mainChart.update();
        });
    /* ===============================
       4️⃣ END FILTER DROPDOWN PROVINSI
    =============================== */
    document
        .getElementById("tableFilter")
        .addEventListener("change", function () {
            const val = this.value;

            document.getElementById("tableProvinsiWrapper").style.display =
                "none";
            document.getElementById("tableKabupatenWrapper").style.display =
                "none";

            if (val === "provinsi") {
                renderTableProvinsi();
                document.getElementById("tableProvinsiWrapper").style.display =
                    "block";
            }

            if (val === "kabupaten") {
                renderTableKabupaten();
                document.getElementById("tableKabupatenWrapper").style.display =
                    "block";
            }
        });

    document
        .getElementById("jenisTenagaKerja")
        .addEventListener("change", function () {
            document
                .getElementById("provinsiSelect")
                .dispatchEvent(new Event("change"));
        });
    document
        .getElementById("jenisKelamin")
        .addEventListener("change", function () {
            document
                .getElementById("provinsiSelect")
                .dispatchEvent(new Event("change"));
        });
    document
        .getElementById("perjanjianKerja")
        .addEventListener("change", function () {
            document
                .getElementById("provinsiSelect")
                .dispatchEvent(new Event("change"));
        });
    document.getElementById("tableFilter").dispatchEvent(new Event("change"));

    /* ===================================================================
       START DISABLE JENIS TENAGA & JENIS KELAMIN SAAT MEMILIH PERJANJIAN KERJA
    ============================================================================ */
    document
        .getElementById("perjanjianKerja")
        .addEventListener("change", function () {
            const perjanjianValue = this.value.toLowerCase();
            const jenisTenaga = document.getElementById("jenisTenagaKerja");
            const jenisKelamin = document.getElementById("jenisKelamin");

            if (perjanjianValue === "pkwt" || perjanjianValue === "pkwtt") {
                // Set otomatis
                jenisTenaga.value = "wni"; // otomatis WNI
                jenisTenaga.disabled = true; // disable pilihan
                jenisKelamin.value = "all"; // semua gender
                jenisKelamin.disabled = true; // disable pilihan
            } else {
                // Kembalikan normal
                jenisTenaga.disabled = false;
                jenisKelamin.disabled = false;
            }

            // Trigger update chart / data
            document
                .getElementById("provinsiSelect")
                .dispatchEvent(new Event("change"));
        });
    /* ===================================================================
       END DISABLE JENIS TENAGA & JENIS KELAMIN SAAT MEMILIH PERJANJIAN KERJA
    ============================================================================ */

    /* ===============================
        START FUNCTION TOTAL  PROVINSI
    =============================== */
    function totalProvinsi() {
        const map = {};

        window.provData.forEach((d) => {
            if (!map[d.provinsi]) map[d.provinsi] = 0;
            map[d.provinsi] += getTotalByJenis(d);
        });

        return map;
    }

    /* ===============================
        END FUNCTION TOTAL  PROVINSI
    =============================== */

    /* ===============================
        START FUNCTION TOTAL KOTA BY PROVINSI
    =============================== */

    function totalKotaByProvinsi(provinsi) {
        const map = {};

        const target = provinsi.trim().toUpperCase();

        window.kabData.forEach((d) => {
            if (!d.provinsi) return;

            const dataProv = d.provinsi.trim().toUpperCase();

            if (dataProv === target) {
                if (!map[d.kota]) map[d.kota] = 0;
                map[d.kota] += getTotalByJenis(d); // ⬅ hanya ini yang berubah
            }
        });

        return map;
    }

    /* ===============================
        END FUNCTION TOTAL KOTA BY PROVINSI
    =============================== */

    /* ===============================
        START FUNCTION TOTAL ALL TENAGA KERJA
    =============================== */
    function totalSemuaTenagaKerja() {
        let total = 0;

        window.provData.forEach((d) => {
            total += getTotalByJenis(d); // ⬅ hanya ini yang berubah
        });

        return total;
    }

    /* ===============================
        END FUNCTION TOTAL ALL TENAGA KERJA
    =============================== */

    /* ===============================
        START FUNCTION TOTAL TENAGA KERJA PER PROVINSI
    =============================== */

    function totalTenagaKerjaProvinsi(provinsi) {
        const kotaMap = totalKotaByProvinsi(provinsi);

        let total = 0;
        Object.values(kotaMap).forEach((val) => {
            total += val;
        });

        return total;
    }

    /* ===============================
        END FUNCTION TOTAL TENAGA KERJA PER PROVINSI
    =============================== */

    /* ===============================
        START FUNCTION TOTAL PROVINSI
    =============================== */
    function totalSemuaProvinsi() {
        const provMap = totalProvinsi();

        let total = 0;
        Object.values(provMap).forEach((val) => {
            total += val;
        });

        return total;
    }

    /* ===============================
        END FUNCTION TOTAL PROVINSI
    =============================== */

    /* ===============================
        START DATA TIDAK TERIDENTIFIKASI
    =============================== */

    function sumBySkalaKab(skala, kota = null) {
        return window.kabData
            .filter(
                (d) =>
                    d.skala_objek_pengawasan === skala &&
                    (!kota || d.kota === kota),
            )
            .reduce((sum, d) => sum + getTotalByJenis(d), 0);
    }

    function sumTidakTeridentifikasiKab(kota = null) {
        return window.kabData
            .filter(
                (d) =>
                    (!d.skala_objek_pengawasan ||
                        d.skala_objek_pengawasan.trim() === "") &&
                    (!kota || d.kota === kota),
            )
            .reduce((sum, d) => sum + getTotalByJenis(d), 0);
    }

    /* ===============================
        END DATA TIDAK TERIDENTIFIKASI
    =============================== */

    /* ===============================
        START FUNCTION FILTER KABUPATEN PER PROVINSI
    =============================== */
    function updateKabupatenDropdown(provinsi) {
        const kabSelect = document.getElementById("kabupatenSelect");

        // reset dropdown
        kabSelect.innerHTML = '<option value="">-- Pilih Kab/Kota --</option>';

        if (!provinsi) return;

        // ambil kabupaten unik dari provinsi terpilih
        const kotaList = [
            ...new Set(
                window.kabData
                    .filter((d) => d.provinsi === provinsi)
                    .map((d) => d.kota),
            ),
        ];

        kotaList.forEach((kota) => {
            const opt = document.createElement("option");
            opt.value = kota;
            opt.textContent = kota;
            kabSelect.appendChild(opt);
        });
    }
    /* ===============================
        END FUNCTION FILTER KABUPATEN PER PROVINSI
    =============================== */

    /* ===============================
   START DATA RINGKAS DI SAMPING CHART KABUPATEN
=============================== */
    function updateKabChartSummary(
        kota,
        total = 0,
        tidakTeridentifikasi = 0,
        mikro = 0,
        kecil = 0,
        menengah = 0,
        besar = 0,
    ) {
        const summaryDiv = document.getElementById("dataSummary");
        if (!summaryDiv) return;

        // Jika belum pilih kabupaten
        if (!kota) {
            summaryDiv.innerHTML = "";
            return;
        }

        summaryDiv.innerHTML = `
        <div class="summary-title">Rincian Tenaga Kerja<br>${kota}</div>

        <table class="summary-table">
            <tr>
                <th colspan="2">Ringkasan</th>
            </tr>
            <tr>
                <td>Total Tenaga Kerja</td>
                <td>${total.toLocaleString("id-ID")}</td>
            </tr>
            <tr>
                <td>Tidak Teridentifikasi</td>
                <td>${tidakTeridentifikasi.toLocaleString("id-ID")}</td>
            </tr>
            <tr>
                <td>Mikro</td>
                <td>${mikro.toLocaleString("id-ID")}</td>
            </tr>
            <tr>
                <td>Kecil</td>
                <td>${kecil.toLocaleString("id-ID")}</td>
            </tr>
            <tr>
                <td>Menengah</td>
                <td>${menengah.toLocaleString("id-ID")}</td>
            </tr>
            <tr>
                <td>Besar</td>
                <td>${besar.toLocaleString("id-ID")}</td>
            </tr>
        </table>
    `;
    }

    /* ===============================
        START FUNCTION TOTAL KOTA BY PROVINSI
    =============================== */

    function totalKotaByProvinsi(provinsi) {
        const map = {};

        const target = provinsi.trim().toUpperCase();

        window.kabData.forEach((d) => {
            if (!d.provinsi) return;

            const dataProv = d.provinsi.trim().toUpperCase();

            if (dataProv === target) {
                if (!map[d.kota]) map[d.kota] = 0;
                map[d.kota] += getTotalByJenis(d); // ⬅ hanya ini yang berubah
            }
        });

        return map;
    }

    /* ===============================
        END FUNCTION TOTAL KOTA BY PROVINSI
    =============================== */

    /* ===============================
        START FUNCTION TOTAL ALL TENAGA KERJA
    =============================== */
    function totalSemuaTenagaKerja() {
        let total = 0;

        window.provData.forEach((d) => {
            total += getTotalByJenis(d); // ⬅ hanya ini yang berubah
        });

        return total;
    }

    /* ===============================
        END FUNCTION TOTAL ALL TENAGA KERJA
    =============================== */

    /* ===============================
        START FUNCTION TOTAL TENAGA KERJA PER PROVINSI
    =============================== */

    function totalTenagaKerjaProvinsi(provinsi) {
        const kotaMap = totalKotaByProvinsi(provinsi);

        let total = 0;
        Object.values(kotaMap).forEach((val) => {
            total += val;
        });

        return total;
    }

    /* ===============================
        END FUNCTION TOTAL TENAGA KERJA PER PROVINSI
    =============================== */

    /* ===============================
        START FUNCTION TOTAL PROVINSI
    =============================== */
    function totalSemuaProvinsi() {
        const provMap = totalProvinsi();

        let total = 0;
        Object.values(provMap).forEach((val) => {
            total += val;
        });

        return total;
    }

    /* ===============================
        END FUNCTION TOTAL PROVINSI
    =============================== */

    /* ===============================
        START DATA TIDAK TERIDENTIFIKASI
    =============================== */

    function lineFilterKab(skala, kota) {
        return window.chartData.kota.map((k) => {
            if (k !== kota) return 0;

            return window.kabData
                .filter(
                    (d) =>
                        d.kota === kota && d.skala_objek_pengawasan === skala,
                )
                .reduce((sum, d) => sum + getTotalByJenis(d), 0);
        });
    }
});

function sumBySkalaProv(skala, provinsi = null) {
    return window.provData
        .filter(
            (d) =>
                d.skala_objek_pengawasan === skala &&
                (!provinsi || d.provinsi === provinsi),
        )
        .reduce((sum, d) => sum + getTotalByJenis(d), 0);
}

function lineFilterProv(skala, provinsi) {
    return window.chartData.provinsi.map((k) => {
        if (k !== provinsi) return 0;

        return window.provData
            .filter(
                (d) =>
                    d.provinsi === provinsi &&
                    d.skala_objek_pengawasan === skala,
            )
            .reduce((sum, d) => sum + getTotalByJenis(d), 0);
    });
}

/* ===============================
       END HELPER FUNCTION PROVINSI
    =============================== */

/* ===============================
       START FUNCTION LABEL JENIS
    =============================== */
function getLabelJenis() {
    const jenisTenaga = document.getElementById("jenisTenagaKerja").value;
    const jenisKelamin = document.getElementById("jenisKelamin").value;
    const perjanjianKerja = document.getElementById("perjanjianKerja").value;

    let labelTenaga = "";
    let labelGender = "";
    let labelPerjanjian = "";

    if (jenisTenaga === "wni") labelTenaga = "Tenaga Kerja Indonesia";
    else if (jenisTenaga === "wna") labelTenaga = "Tenaga Kerja Asing";
    else labelTenaga = "Seluruh Tenaga Kerja";

    if (jenisKelamin === "l") labelGender = "Laki-laki";
    else if (jenisKelamin === "p") labelGender = "Perempuan";

    if (perjanjianKerja === "pkwtt") labelPerjanjian = "PKWTT";
    else if (perjanjianKerja === "pkwt") labelPerjanjian = "PKWT";

    let label = labelTenaga;

    if (labelGender) label += ` (${labelGender})`;
    if (labelPerjanjian) label += ` (${labelPerjanjian})`;

    return label;
}

function safeNumber(val) {
    if (val === null || val === undefined || val === "") return 0;
    return Number(val);
}

function getTotalByJenis(d) {
    const jenisTenaga = document.getElementById("jenisTenagaKerja").value; // wni | wna | all
    const jenisKelamin = document.getElementById("jenisKelamin").value; // all | l | p
    const perjanjianKerja = document.getElementById("perjanjianKerja").value; // all | pkwtt | pkwt

    const totalWni = safeNumber(d.total_wni);
    const totalWna = safeNumber(d.total_wna);

    const totalWniLaki = safeNumber(d.total_laki);
    const totalWniPerempuan = safeNumber(d.total_perempuan);

    const totalWnaLaki = safeNumber(d.total_tka_laki);
    const totalWnaPerempuan = safeNumber(d.total_tka_perempuan);

    const totalPKWTT = safeNumber(d.total_pkwtt);
    const totalPKWT = safeNumber(d.total_pkwt);

    let total = 0;
    /* ===============================
       END FUNCTION LABEL JENIS
    =============================== */

    /* =============================
       FILTER TENAGA KERJA + GENDER
       ============================= */

    if (jenisTenaga === "all") {
        if (jenisKelamin === "l") total = totalWniLaki + totalWnaLaki;
        else if (jenisKelamin === "p")
            total = totalWniPerempuan + totalWnaPerempuan;
        else total = totalWni + totalWna;
    }

    if (jenisTenaga === "wni") {
        if (jenisKelamin === "l") total = totalWniLaki;
        else if (jenisKelamin === "p") total = totalWniPerempuan;
        else total = totalWni;
    }

    if (jenisTenaga === "wna") {
        if (jenisKelamin === "l") total = totalWnaLaki;
        else if (jenisKelamin === "p") total = totalWnaPerempuan;
        else total = totalWna;
    }

    /* =============================
       FILTER PERJANJIAN KERJA
       ============================= */

    if (perjanjianKerja === "pkwtt") return totalPKWTT;
    if (perjanjianKerja === "pkwt") return totalPKWT;

    return total;
}

/* ===============================
       END FUNCTION LABEL JENIS
    =============================== */

/* ===============================
       START FUNCTION KBLI PROVINSI
    =============================== */
function getKBLIByProvinsi(provinsi) {
    const map = {};

    window.kbliData.forEach((d) => {
        if (provinsi && d.provinsi !== provinsi) return;

        const kode = d.kode_2_digit;
        const nama = d.nama_2_digit || "Tidak Teridentifikasi"; // ganti null

        if (!map[kode]) {
            map[kode] = {
                nama: nama,
                total: 0,
            };
        }

        map[kode].total += Number(d.total);
    });

    // ubah ke array dan urutkan berdasarkan nama A-Z
    return Object.values(map).sort((a, b) => {
        const nameA = a.nama.toUpperCase();
        const nameB = b.nama.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
}

function renderKBLIChart() {
    const provinsi = document.getElementById("provinsiSelect").value;
    const barChart = document.getElementById("barChartKbli");
    const title = document.getElementById("kbliChartTitle");

    barChart.innerHTML = "";

    // update judul
    if (!provinsi) {
        title.innerText =
            "Laporan Sebaran Tenaga Kerja Berdasarkan  KBLI (Semua Provinsi)";
    } else {
        title.innerText =
            "Laporan Sebaran Tenaga Kerja Berdasarkan KBLI (" + provinsi + ")";
    }

    const data = getKBLIByProvinsi(provinsi);
    if (!data.length) {
        barChart.innerHTML = "<p>Tidak ada data</p>";
        return;
    }

    const maxVal = Math.max(...data.map((d) => d.total), 1);

    data.forEach((row) => {
        const height = (row.total / maxVal) * 100;

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = height + "%";
        bar.title = row.nama;

        bar.innerHTML = `
            <span class="bar-value">${row.total.toLocaleString("id-ID")}</span>
            <span class="bar-label">${row.nama}</span>
        `;

        barChart.appendChild(bar);
    });
}

/* ===============================
       END FUNCTION KBLI PROVINSI
    =============================== */

function renderTableProvinsi() {
    const tbody = document.getElementById("tableProvinsiBody");
    tbody.innerHTML = "";

    const provinsiSelected = document.getElementById("provinsiSelect").value;
    const provMap = totalProvinsi();

    // Jika provinsi dipilih → tampilkan hanya 1 baris
    if (provinsiSelected) {
        const total = provMap[provinsiSelected] || 0;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${provinsiSelected}</td>
            <td>${total.toLocaleString("id-ID")}</td>
        `;

        tbody.appendChild(tr);
        return;
    }

    // Jika belum pilih provinsi → tampilkan semua
    Object.keys(provMap).forEach((prov) => {
        const total = provMap[prov];

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${prov}</td>
            <td>${total.toLocaleString("id-ID")}</td>
        `;

        tbody.appendChild(tr);
    });
}

function renderTableKabupaten() {
    const tbody = document.getElementById("tableKabupatenBody");
    tbody.innerHTML = "";

    const provinsi = document.getElementById("provinsiSelect").value;

    let kotaList = window.kabData;

    // Jika provinsi dipilih, filter kabupaten dalam provinsi itu saja
    if (provinsi) {
        kotaList = kotaList.filter((d) => d.provinsi === provinsi);
    }

    // Ambil kota unik
    const kotaUnik = [...new Set(kotaList.map((d) => d.kota))];

    kotaUnik.forEach((kota) => {
        const mikro = sumBySkalaKab("Mikro", kota);
        const kecil = sumBySkalaKab("Kecil", kota);
        const menengah = sumBySkalaKab("Menengah", kota);
        const besar = sumBySkalaKab("Besar", kota);
        const tidakTeridentifikasi = sumTidakTeridentifikasiKab(kota);

        const total = mikro + kecil + menengah + besar + tidakTeridentifikasi;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${kota}</td>
            <td>${total.toLocaleString("id-ID")}</td>
            <td>${tidakTeridentifikasi.toLocaleString("id-ID")}</td>
            <td>${mikro.toLocaleString("id-ID")}</td>
            <td>${kecil.toLocaleString("id-ID")}</td>
            <td>${menengah.toLocaleString("id-ID")}</td>
            <td>${besar.toLocaleString("id-ID")}</td>
        `;

        tbody.appendChild(tr);
    });
}

/* ===============================
       END FUNCTION KBLI PROVINSI
    =============================== */

/* =================================
       END GRAFIK TENAGA KERJA 
    ==================================== */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Ambil data mentah dari window object yang sudah di-json-kan di index.blade.php
    const fullLabels = window.chartData.kbliLabels || [];
    const fullValues = window.chartData.kbliValues || [];

    if (fullLabels.length === 0) {
        console.warn("Data KBLI tidak ditemukan");
        return;
    }

    // 2. Variabel Kontrol Pagination
    let currentPage = 0;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(fullLabels.length / itemsPerPage);

    let kbliChartInstance = null;
    const ctx = document.getElementById("kbliList").getContext("2d");

    // 3. Fungsi untuk Render Chart per Halaman
    function renderKBLIPage(page) {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;

        // Memotong data hanya 10 item untuk halaman ini
        const labelsSubset = fullLabels.slice(start, end);
        const valuesSubset = fullValues.slice(start, end);

        // Hancurkan instance lama jika ada (agar tidak tumpang tindih)
        if (kbliChartInstance) {
            kbliChartInstance.destroy();
        }

        kbliChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labelsSubset,
                datasets: [
                    {
                        label: "Jumlah Perusahaan",
                        data: valuesSubset,
                        backgroundColor: "#42A5F5",
                        barPercentage: 0.6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, labels: { color: "white" } },
                    datalabels: {
                        anchor: "end",
                        align: "top",
                        // color: "white",
                        formatter: (val) => val.toLocaleString("id-ID"),
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        // ticks: { color: 'white' },
                        // grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    x: {
                        // ticks: { color: 'white', autoSkip: false, maxRotation: 45 },
                        grid: { display: false },
                    },
                },
            },
            plugins: [ChartDataLabels],
        });

        // Update indikator teks
        document.getElementById("pageIndicatorKBLI").innerText =
            `Halaman ${page + 1} dari ${totalPages}`;

        // Atur status tombol
        document.getElementById("prevBtnKBLI").disabled = page === 0;
        document.getElementById("nextBtnKBLI").disabled =
            page === totalPages - 1;

        // Styling tombol disabled agar terlihat jelas
        document.getElementById("prevBtnKBLI").style.opacity =
            page === 0 ? "0.5" : "1";
        document.getElementById("nextBtnKBLI").style.opacity =
            page === totalPages - 1 ? "0.5" : "1";
    }

    // 4. Inisialisasi Pemuatan Pertama
    renderKBLIPage(currentPage);

    // 5. Event Listener Tombol Navigasi
    document
        .getElementById("nextBtnKBLI")
        .addEventListener("click", function () {
            if (currentPage < totalPages - 1) {
                currentPage++;
                renderKBLIPage(currentPage);
            }
        });

    document
        .getElementById("prevBtnKBLI")
        .addEventListener("click", function () {
            if (currentPage > 0) {
                currentPage--;
                renderKBLIPage(currentPage);
            }
        });
});

document.addEventListener("DOMContentLoaded", function () {
    if (typeof Chart === "undefined") {
        console.error("Chart.js belum ke-load");
        return;
    }

    /* ===============================
       UPAH MINIMUM CHART
    =============================== */
    let upahChart = null;

    const upahCanvas = document.getElementById("upahMinimumChart");

    if (upahCanvas && window.chartUpahMinimumData) {
        upahChart = new Chart(upahCanvas, {
            type: "bar",
            data: {
                labels: window.chartUpahMinimumData.labels,
                datasets: [
                    {
                        label: "Upah Minimum",
                        data: window.chartUpahMinimumData.values,
                        backgroundColor: "#0d6efd",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true },
                },
            },
        });
    } else {
        console.warn("Canvas atau data upah minimum tidak ditemukan");
    }

    /* ===============================
       FILTER PROVINSI UPAH MINIMUM
    =============================== */
    const upahSelect = document.getElementById("provinsiUpahSelect");

    if (upahSelect && upahChart) {
        upahSelect.addEventListener("change", function () {
            const provinsi = this.value;

            fetch(`/filter/upah-minimum?provinsi=${provinsi}`)
                .then((res) => res.json())
                .then((data) => {
                    if (provinsi === "all") {
                        upahChart.data.labels =
                            window.chartUpahMinimumData.labels;
                        upahChart.data.datasets[0].data =
                            window.chartUpahMinimumData.values;
                    } else if (data.length) {
                        upahChart.data.labels = [data[0].provinsi];
                        upahChart.data.datasets[0].data = [data[0].total];
                    }

                    upahChart.update();
                });
        });
    }
});
