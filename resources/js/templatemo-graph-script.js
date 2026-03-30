/* ==========================================================================
   BAGIAN 1: HELPER FUNCTIONS & LOGIC (GLOBAL SCOPE)
   Fungsi ini ditaruh di luar agar bisa diakses oleh event listener manapun.
   ========================================================================== */

// --- Fungsi Konversi Angka Aman ---
function safeNumber(val) {
    if (val === null || val === undefined || val === "") return 0;
    return Number(val);
}

// --- Fungsi Mendapatkan Label Berdasarkan Filter ---
function getLabelJenis() {
    const jenisTenaga =
        document.getElementById("jenisTenagaKerja")?.value || "all";
    const jenisKelamin =
        document.getElementById("jenisKelamin")?.value || "all";
    const perjanjianKerja =
        document.getElementById("perjanjianKerja")?.value || "all";

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

// --- Core Calculation: Hitung Total Berdasarkan Filter ---
function getTotalByJenis(d) {
    const jenisTenaga =
        document.getElementById("jenisTenagaKerja")?.value || "all";
    const jenisKelamin =
        document.getElementById("jenisKelamin")?.value || "all";
    const perjanjianKerja =
        document.getElementById("perjanjianKerja")?.value || "all";

    const totalWni = safeNumber(d.total_wni);
    const totalWna = safeNumber(d.total_wna);
    const totalWniLaki = safeNumber(d.total_laki);
    const totalWniPerempuan = safeNumber(d.total_perempuan);
    const totalWnaLaki = safeNumber(d.total_tka_laki);
    const totalWnaPerempuan = safeNumber(d.total_tka_perempuan);
    const totalPKWTT = safeNumber(d.total_pkwtt);
    const totalPKWT = safeNumber(d.total_pkwt);

    let total = 0;

    // Filter Tenaga Kerja & Gender
    if (jenisTenaga === "all") {
        if (jenisKelamin === "l") total = totalWniLaki + totalWnaLaki;
        else if (jenisKelamin === "p")
            total = totalWniPerempuan + totalWnaPerempuan;
        else total = totalWni + totalWna;
    } else if (jenisTenaga === "wni") {
        if (jenisKelamin === "l") total = totalWniLaki;
        else if (jenisKelamin === "p") total = totalWniPerempuan;
        else total = totalWni;
    } else if (jenisTenaga === "wna") {
        if (jenisKelamin === "l") total = totalWnaLaki;
        else if (jenisKelamin === "p") total = totalWnaPerempuan;
        else total = totalWna;
    }

    // Filter Perjanjian Kerja
    if (perjanjianKerja === "pkwtt") return totalPKWTT;
    if (perjanjianKerja === "pkwt") return totalPKWT;

    return total;
}

// --- Aggregation Functions (Provinsi & Kabupaten) ---

function totalProvinsi() {
    const map = {};
    if (!window.provData) return map;
    window.provData.forEach((d) => {
        if (!map[d.provinsi]) map[d.provinsi] = 0;
        map[d.provinsi] += getTotalByJenis(d);
    });
    return map;
}

function totalSemuaTenagaKerja() {
    let total = 0;
    if (!window.provData) return 0;
    window.provData.forEach((d) => {
        total += getTotalByJenis(d);
    });
    return total;
}

function totalSemuaProvinsi() {
    const provMap = totalProvinsi();
    let total = 0;
    Object.values(provMap).forEach((val) => {
        total += val;
    });
    return total;
}

function totalKotaByProvinsi(provinsi) {
    const map = {};
    if (!provinsi || !window.kabData) return map;
    const target = provinsi.trim().toUpperCase();

    window.kabData.forEach((d) => {
        if (!d.provinsi) return;
        if (d.provinsi.trim().toUpperCase() === target) {
            if (!map[d.kota]) map[d.kota] = 0;
            map[d.kota] += getTotalByJenis(d);
        }
    });
    return map;
}

function totalTenagaKerjaProvinsi(provinsi) {
    const kotaMap = totalKotaByProvinsi(provinsi);
    let total = 0;
    Object.values(kotaMap).forEach((val) => {
        total += val;
    });
    return total;
}

// --- Specific Filters (Skala & Tidak Teridentifikasi) ---

function sumBySkalaKab(skala, kota = null) {
    if (!window.kabData) return 0;
    return window.kabData
        .filter(
            (d) =>
                d.skala_objek_pengawasan === skala &&
                (!kota || d.kota === kota),
        )
        .reduce((sum, d) => sum + getTotalByJenis(d), 0);
}

function sumTidakTeridentifikasiKab(kota = null) {
    if (!window.kabData) return 0;
    return window.kabData
        .filter(
            (d) =>
                (!d.skala_objek_pengawasan ||
                    d.skala_objek_pengawasan.trim() === "") &&
                (!kota || d.kota === kota),
        )
        .reduce((sum, d) => sum + getTotalByJenis(d), 0);
}

// --- KBLI Logic ---

function getKBLIByProvinsi(provinsi) {
    const map = {};
    if (!window.kbliData) return [];

    window.kbliData.forEach((d) => {
        if (provinsi && d.provinsi !== provinsi) return;
        const kode = d.kode_2_digit;
        const nama = d.nama_2_digit || "Tidak Teridentifikasi";

        if (!map[kode]) {
            map[kode] = { nama: nama, total: 0 };
        }
        map[kode].total += Number(d.total);
    });

    return Object.values(map).sort((a, b) => {
        if (a.nama.toUpperCase() < b.nama.toUpperCase()) return -1;
        if (a.nama.toUpperCase() > b.nama.toUpperCase()) return 1;
        return 0;
    });
}

// --- Update Summary HTML ---
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

    if (!kota) {
        summaryDiv.innerHTML = "";
        return;
    }

    summaryDiv.innerHTML = `
        <div class="summary-title">Rincian Tenaga Kerja<br>${kota}</div>
        <table class="summary-table">
            <tr><th colspan="2">Ringkasan</th></tr>
            <tr><td>Total Tenaga Kerja</td><td>${total.toLocaleString("id-ID")}</td></tr>
            <tr><td>Tidak Teridentifikasi</td><td>${tidakTeridentifikasi.toLocaleString("id-ID")}</td></tr>
            <tr><td>Mikro</td><td>${mikro.toLocaleString("id-ID")}</td></tr>
            <tr><td>Kecil</td><td>${kecil.toLocaleString("id-ID")}</td></tr>
            <tr><td>Menengah</td><td>${menengah.toLocaleString("id-ID")}</td></tr>
            <tr><td>Besar</td><td>${besar.toLocaleString("id-ID")}</td></tr>
        </table>
    `;
}

// --- Theme Application ---
function applyChartTheme(chart) {
    if (!chart) return;

    const isLight = document.body.classList.contains("light-mode");

    const textColor = isLight ? "#020617" : "#e5e7eb";
    const gridColor = isLight
        ? "rgba(15,23,42,0.15)"
        : "rgba(255,255,255,0.08)"; // 🔥 lebih soft

    chart.options.scales.x.ticks.color = textColor;
    chart.options.scales.y.ticks.color = textColor;

    chart.options.scales.x.grid.color = gridColor;
    chart.options.scales.y.grid.color = gridColor;

    // 🔥 legend
    if (chart.options.plugins.legend) {
        chart.options.plugins.legend.labels.color = textColor;
    }

    chart.update();
}

/* ==========================================================================
   BAGIAN 2: UI INTERACTIONS & ANIMATIONS
   ========================================================================== */

// --- Navbar & Hamburger ---
const hamburger = document.getElementById("hamburger");
const navLinksMobile = document.getElementById("navLinksMobile");
const mobileLinks = navLinksMobile ? navLinksMobile.querySelectorAll("a") : [];

if (hamburger) {
    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navLinksMobile?.classList.toggle("active");
    });
}

mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navLinksMobile.classList.remove("active");
    });
});

// --- Scroll Effects (Combined) ---
window.addEventListener("scroll", function () {
    // 1. Navbar Effect
    const navbar = document.getElementById("navbar");
    if (navbar) {
        if (window.scrollY > 50) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    }

    // 2. Active Nav Highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const mobileNavLinks = document.querySelectorAll(".nav-links-mobile a");

    let scrollY = window.pageYOffset;
    sections.forEach((section) => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`)
                    link.classList.add("active");
            });
            mobileNavLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${sectionId}`)
                    link.classList.add("active");
            });
        }
    });

    // 3. Close mobile menu on scroll
    if (hamburger) hamburger.classList.remove("active");
    if (navLinksMobile) navLinksMobile.classList.remove("active");
});

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// --- Mini Charts Animation ---
function drawMiniChart(canvasId, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const points = [];
    for (let i = 0; i < 10; i++) points.push(Math.random() * canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    points.forEach((point, index) => {
        const x = (canvas.width / (points.length - 1)) * index;
        if (index === 0) ctx.moveTo(x, point);
        else ctx.lineTo(x, point);
    });
    ctx.stroke();

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, color + "40");
    gradient.addColorStop(1, color + "00");
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
}

setTimeout(() => {
    drawMiniChart("miniChart1", "#00ffcc");
    drawMiniChart("miniChart2", "#ff0080");
    drawMiniChart("miniChart3", "#00ccff");
    drawMiniChart("miniChart4", "#ffcc00");
    drawMiniChart("miniChart5", "#ff6b6b");
    drawMiniChart("miniChart6", "#4ecdc4");
}, 100);

// --- Animation on Scroll (Intersection Observer) ---
const observerOptions = { threshold: 0.5, rootMargin: "0px" };
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

document
    .querySelectorAll(".bar-chart")
    .forEach((chart) => observer.observe(chart));

// --- Contact Form ---
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
}

/* ==========================================================================
   BAGIAN 3: MAIN INITIALIZATION (CHART & DATA)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("theme")) {
        document.body.classList.add("light-mode");
    }
    // Cek ketersediaan library Chart.js
    if (typeof Chart === "undefined") {
        console.error("Chart.js belum ke-load");
        return;
    }

    // --- 1. INISIALISASI CHART UTAMA (PROVINSI) ---
    const provMap = totalProvinsi();
    const totalAll = totalSemuaTenagaKerja();

    // Assign ke window agar bisa diakses toggle theme
    window.mainChart = new Chart(
        document.getElementById("tenagaKerjaProvChart"),
        {
            type: "line",
            data: {
                labels: Object.keys(provMap),
                datasets: [
                    {
                        label:
                            "Total " +
                            getLabelJenis() +
                            " Semua Provinsi : " +
                            totalAll.toLocaleString("id-ID") +
                            " Orang",
                        data: Object.values(provMap),
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
                            title: (context) => context[0].label,
                            label: (context) =>
                                "Jumlah: " +
                                (context.raw || 0).toLocaleString("id-ID") +
                                " orang",
                        },
                    },
                },
                scales: {
                    x: { ticks: { maxRotation: 45, minRotation: 45 } },
                },
            },
        },
    );

    // --- 2. INISIALISASI CHART KABUPATEN ---
    window.kabChart = new Chart(
        document.getElementById("tenagaKerjaKabChart"),
        {
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
                        label: "Tenaga Kerja (Pilih Kab/Kota)",
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
                            label: (context) =>
                                "Jumlah: " +
                                (context.raw || 0).toLocaleString("id-ID") +
                                " orang",
                        },
                    },
                },
                scales: {
                    x: { ticks: { maxRotation: 45, minRotation: 45 } },
                },
            },
        },
    );

    // --- 3. EVENT LISTENERS FILTER ---

    // A. Filter Provinsi Dropdown
    const dropdownProvinsi = document.getElementById("provinsiSelect");
    if (dropdownProvinsi) {
        dropdownProvinsi.addEventListener("change", function () {
            const provinsi = this.value;
            renderKBLIChart();

            // Trigger update tabel
            const tableFilter = document.getElementById("tableFilter");
            if (tableFilter) tableFilter.dispatchEvent(new Event("change"));

            updateKabupatenDropdown(provinsi);

            // Reset Chart Kabupaten
            window.kabChart.data.datasets[0].label = "Pilih Kab/Kota";
            window.kabChart.data.datasets[0].data = [0, 0, 0, 0, 0];
            window.kabChart.update();
            updateKabChartSummary(null);

            // Logic Switch Chart Utama
            if (!provinsi) {
                // Tampilkan Semua Provinsi
                const pMap = totalProvinsi();
                const tAll = totalSemuaProvinsi();
                window.mainChart.data.labels = Object.keys(pMap);
                window.mainChart.data.datasets[0].label =
                    "Total " +
                    getLabelJenis() +
                    " (Semua Provinsi: " +
                    tAll.toLocaleString("id-ID") +
                    " orang)";
                window.mainChart.data.datasets[0].data = Object.values(pMap);
            } else {
                // Tampilkan Detail Kota dalam Provinsi
                const kMap = totalKotaByProvinsi(provinsi);
                const tTk = totalTenagaKerjaProvinsi(provinsi);
                window.mainChart.data.labels = Object.keys(kMap);
                window.mainChart.data.datasets[0].label =
                    "Total " +
                    getLabelJenis() +
                    " - " +
                    provinsi +
                    " (" +
                    tTk.toLocaleString("id-ID") +
                    " orang)";
                window.mainChart.data.datasets[0].data = Object.values(kMap);
            }
            window.mainChart.update();
        });
    }

    // B. Filter Kabupaten Dropdown
    const dropdownKab = document.getElementById("kabupatenSelect");
    if (dropdownKab) {
        dropdownKab.addEventListener("change", function () {
            const kota = this.value;
            if (!kota) {
                updateKabChartSummary(null);
                window.kabChart.data.datasets[0].label =
                    "Tenaga Kerja - Pilih Kab/Kota";
                window.kabChart.data.datasets[0].data = [0, 0, 0, 0, 0];
                window.kabChart.update();
                return;
            }

            const mikro = sumBySkalaKab("Mikro", kota);
            const besar = sumBySkalaKab("Besar", kota);
            const menengah = sumBySkalaKab("Menengah", kota);
            const kecil = sumBySkalaKab("Kecil", kota);
            const tidakTeridentifikasi = sumTidakTeridentifikasiKab(kota);
            const total =
                mikro + besar + menengah + kecil + tidakTeridentifikasi;

            window.kabChart.data.datasets[0].label = "Tenaga Kerja - " + kota;
            window.kabChart.data.datasets[0].data = [
                tidakTeridentifikasi,
                mikro,
                kecil,
                menengah,
                besar,
            ];
            window.kabChart.update();
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
    }

    // C. Filter Jenis & Perjanjian
    ["jenisTenagaKerja", "jenisKelamin", "perjanjianKerja"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", function () {
                // Logic disable fields jika PKWT/PKWTT
                if (id === "perjanjianKerja") {
                    const val = this.value.toLowerCase();
                    const jt = document.getElementById("jenisTenagaKerja");
                    const jk = document.getElementById("jenisKelamin");
                    if (val === "pkwt" || val === "pkwtt") {
                        if (jt) {
                            jt.value = "wni";
                            jt.disabled = true;
                        }
                        if (jk) {
                            jk.value = "all";
                            jk.disabled = true;
                        }
                    } else {
                        if (jt) jt.disabled = false;
                        if (jk) jk.disabled = false;
                    }
                }
                // Trigger update chart utama via provinsi select
                if (dropdownProvinsi)
                    dropdownProvinsi.dispatchEvent(new Event("change"));
            });
        }
    });

    // --- 4. TABLE RENDER LOGIC ---
    const tableFilter = document.getElementById("tableFilter");
    if (tableFilter) {
        tableFilter.addEventListener("change", function () {
            const val = this.value;
            const provWrap = document.getElementById("tableProvinsiWrapper");
            const kabWrap = document.getElementById("tableKabupatenWrapper");

            if (provWrap) provWrap.style.display = "none";
            if (kabWrap) kabWrap.style.display = "none";

            if (val === "provinsi") {
                renderTableProvinsi();
                if (provWrap) provWrap.style.display = "block";
            } else if (val === "kabupaten") {
                renderTableKabupaten();
                if (kabWrap) kabWrap.style.display = "block";
            }
        });
        // Init state
        tableFilter.dispatchEvent(new Event("change"));
    }

    // --- 5. THEME TOGGLE ---
    const toggleBtn = document.getElementById("themeToggle");

    if (toggleBtn) {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "light");
        }

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
        }

        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");

            const isLight = document.body.classList.contains("light-mode");

            toggleBtn.innerHTML = isLight ? "☀ Light" : "🌙 Dark";
            localStorage.setItem("theme", isLight ? "light" : "dark");

            applyChartTheme(window.upahChart);
            applyChartTheme(window.mainChart);
            applyChartTheme(window.kabChart);
            applyChartTheme(window.bpjsMainChart);
            applyChartTheme(window.kbliChart);
        });
        if (window.upahChart) {
            window.upahChart.options.scales.x.ticks.color = getChartTextColor();
            window.upahChart.options.scales.y.ticks.color = getChartTextColor();

            if (window.upahChart.options.plugins.legend) {
                window.upahChart.options.plugins.legend.labels.color =
                    getChartTextColor();
            }

            window.upahChart.update();
        }
    }

    // --- 6. CHART BPJS (JAMINAN SOSIAL) ---
    if (window.chartJaminanData) {
        const ctxBpjs = document.getElementById("provinsiLineChartJaminan");
        if (ctxBpjs) {
            window.bpjsMainChart = new Chart(ctxBpjs, {
                type: "bar",
                data: {
                    labels: window.chartJaminanData.labels,
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
                    interaction: { mode: "index", axis: "x", intersect: false },
                    plugins: {
                        title: {
                            display: true,
                            text: "Perbandingan Status BPJS Provinsi per Provinsi",
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
                        x: { ticks: { maxRotation: 45, minRotation: 45 } },
                        y: { beginAtZero: true },
                    },
                },
            });

            // Filter BPJS Logic
            const provBpjsSelect =
                document.getElementById("provinsiBpjsSelect");
            if (provBpjsSelect) {
                provBpjsSelect.addEventListener("change", function () {
                    const p = this.value;
                    // Simulasi fetch atau filter lokal (disesuaikan dengan logic aslimu)
                    fetch(`/filter/bpjs?provinsi=${p}`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (p === "all") {
                                window.bpjsMainChart.data.labels =
                                    window.chartJaminanData.labels;
                                window.bpjsMainChart.data.datasets[0].data =
                                    window.chartJaminanData.jkk;
                                window.bpjsMainChart.data.datasets[1].data =
                                    window.chartJaminanData.jht;
                                window.bpjsMainChart.data.datasets[2].data =
                                    window.chartJaminanData.jkm;
                                window.bpjsMainChart.data.datasets[3].data =
                                    window.chartJaminanData.jp;
                            } else {
                                const r = data[0];
                                window.bpjsMainChart.data.labels = [r.provinsi];
                                window.bpjsMainChart.data.datasets[0].data = [
                                    r.jkk,
                                ];
                                window.bpjsMainChart.data.datasets[1].data = [
                                    r.jht,
                                ];
                                window.bpjsMainChart.data.datasets[2].data = [
                                    r.jkm,
                                ];
                                window.bpjsMainChart.data.datasets[3].data = [
                                    r.jp,
                                ];
                            }
                            window.bpjsMainChart.update();
                        });

                    // Filter Table Rows
                    const rows = document.querySelectorAll(
                        "#bpjsTable .bpjs-row",
                    );
                    rows.forEach((row) => {
                        if (p === "all" || row.dataset.provinsi === p)
                            row.style.display = "block";
                        else row.style.display = "none";
                    });
                });
            }
        }
    }

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

    // --- 7. CHART KBLI (PAGINATION) ---
    if (window.chartData && window.chartData.kbliLabels) {
        const fullLabels = window.chartData.kbliLabels;
        const fullValues = window.chartData.kbliValues;
        let currentPage = 0;
        const itemsPerPage = 10;
        const totalPages = Math.ceil(fullLabels.length / itemsPerPage);

        // Kita tidak lagi butuh variabel global 'kbliChartInstance' yang rentan error
        const ctxKbli = document.getElementById("kbliList");

        if (ctxKbli) {
            function renderKBLIPage(page) {
                const start = page * itemsPerPage;
                const end = start + itemsPerPage;
                const labelsSubset = fullLabels.slice(start, end);
                const valuesSubset = fullValues.slice(start, end);

                // 🔥 PERBAIKAN UTAMA DI SINI 🔥
                // Cek langsung ke Canvas: "Hei, ada chart nyangkut gak di sini?"
                const existingChart = Chart.getChart("kbliList");
                if (existingChart) {
                    existingChart.destroy(); // Hancurkan chart lama secara paksa
                }

                // Baru buat chart baru
                new Chart(ctxKbli, {
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
                            legend: { display: true },
                            datalabels: {
                                anchor: "end",
                                align: "top",
                                formatter: (val) => val.toLocaleString("id-ID"),
                            },
                        },
                        scales: {
                            y: { beginAtZero: true },
                            x: { grid: { display: false } },
                        },
                    },
                    plugins: [ChartDataLabels],
                });

                // Update UI tombol & halaman
                const indicator = document.getElementById("pageIndicatorKBLI");
                if (indicator)
                    indicator.innerText = `Halaman ${page + 1} dari ${totalPages}`;

                const btnPrev = document.getElementById("prevBtnKBLI");
                const btnNext = document.getElementById("nextBtnKBLI");
                if (btnPrev) {
                    btnPrev.disabled = page === 0;
                    btnPrev.style.opacity = page === 0 ? "0.5" : "1";
                }
                if (btnNext) {
                    btnNext.disabled = page === totalPages - 1;
                    btnNext.style.opacity =
                        page === totalPages - 1 ? "0.5" : "1";
                }
            }

            // Jalankan pertama kali
            renderKBLIPage(0);

            // Listener tombol
            // (Kita pakai replace logic agar tidak menumpuk event listener jika re-render)
            const nextBtn = document.getElementById("nextBtnKBLI");
            const prevBtn = document.getElementById("prevBtnKBLI");

            if (nextBtn) {
                nextBtn.replaceWith(nextBtn.cloneNode(true)); // Reset listener lama
                document
                    .getElementById("nextBtnKBLI")
                    .addEventListener("click", () => {
                        if (currentPage < totalPages - 1) {
                            currentPage++;
                            renderKBLIPage(currentPage);
                        }
                    });
            }

            if (prevBtn) {
                prevBtn.replaceWith(prevBtn.cloneNode(true)); // Reset listener lama
                document
                    .getElementById("prevBtnKBLI")
                    .addEventListener("click", () => {
                        if (currentPage > 0) {
                            currentPage--;
                            renderKBLIPage(currentPage);
                        }
                    });
            }
        }
    }

    // --- 8. CHART UPAH MINIMUM ---
    const getChartTextColor = () => {
        const isLight = document.body.classList.contains("light-mode");
        return isLight ? "#000000" : "#ffffff";
    };

    const totalUpah = window.chartUpahMinimumData.values.reduce(
        (sum, val) => sum + (val || 0),
        0,
    );

    if (window.chartUpahMinimumData) {
        const upahCanvas = document.getElementById("upahMinimumChart");

        if (upahCanvas) {
            const config = {
                type: "bar",
                data: {
                    labels: window.chartUpahMinimumData.labels,
                    datasets: [
                        {
                            label:
                                "Upah Minimum (Total: " +
                                totalUpah.toLocaleString("id-ID") +
                                ")",
                            data: window.chartUpahMinimumData.values,
                            backgroundColor: "#0d6efd",
                            borderRadius: 5,
                            maxBarThickness: 100,
                        },
                    ],
                },
                plugins: [ChartDataLabels],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: { top: 30 },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                color: getChartTextColor(),
                            },
                            grid: {
                                color: document.body.classList.contains(
                                    "light-mode",
                                )
                                    ? "rgba(0,0,0,0.1)"
                                    : "rgba(255,255,255,0.2)",
                            },
                        },
                        x: {
                            ticks: {
                                color: getChartTextColor(),
                            },
                            grid: {
                                color: () =>
                                    document.body.classList.contains(
                                        "light-mode",
                                    )
                                        ? "rgba(0,0,0,0.1)"
                                        : "rgba(255,255,255,0.2)",
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            labels: {
                                color: () => getChartTextColor(),
                            },
                        },
                        datalabels: {
                            anchor: "end",
                            align: "top",

                            // 🔥 INI KUNCI UTAMA
                            color: (ctx) => {
                                return getChartTextColor();
                            },

                            font: { weight: "bold", size: 11 },

                            formatter: (value) => {
                                return value
                                    ? new Intl.NumberFormat("id-ID").format(
                                          value,
                                      )
                                    : 0;
                            },
                        },
                    },
                },
            };

            window.upahChart = new Chart(upahCanvas, config);

            const upahSelect = document.getElementById("provinsiUpahSelect");

            if (upahSelect) {
                upahSelect.addEventListener("change", function () {
                    const p = this.value;
                    const selectedText = this.options[this.selectedIndex].text;

                    fetch(
                        `/filter/upah-minimum?provinsi=${encodeURIComponent(p)}`,
                    )
                        .then((res) => res.json())
                        .then((data) => {
                            const chartInner =
                                document.querySelector(".chart-inner");

                            if (p === "all") {
                                window.upahChart.data.labels =
                                    window.chartUpahMinimumData.labels;

                                window.upahChart.data.datasets[0].data =
                                    window.chartUpahMinimumData.values;

                                // ✅ HITUNG TOTAL DI SINI
                                const total =
                                    window.chartUpahMinimumData.values.reduce(
                                        (sum, val) => sum + (val || 0),
                                        0,
                                    );

                                window.upahChart.data.datasets[0].label =
                                    "Upah Minimum (Total: " +
                                    total.toLocaleString("id-ID") +
                                    ")";

                                if (chartInner)
                                    chartInner.style.maxWidth = "100%";
                            } else if (data && data.length > 0) {
                                window.upahChart.data.labels = [
                                    data[0].provinsi,
                                ];

                                window.upahChart.data.datasets[0].data = [
                                    data[0].total,
                                ];

                                // ✅ TOTAL UNTUK 1 PROVINSI
                                const total = data[0].total || 0;

                                window.upahChart.data.datasets[0].label =
                                    "Upah Minimum " +
                                    data[0].provinsi +
                                    " (Total: " +
                                    total.toLocaleString("id-ID") +
                                    ")";

                                if (chartInner) {
                                    chartInner.style.maxWidth = "400px";
                                    chartInner.style.margin = "0 auto";
                                }
                            }

                            window.upahChart.update();
                        })
                        .catch((err) => console.error("Filter Error:", err));
                });
            }
        }
    }

    const themeObserver = new MutationObserver(() => {
        if (window.upahChart) window.upahChart.update();
        if (window.mainChart) window.mainChart.update();
        if (window.kabChart) window.kabChart.update();
        if (window.kbliChart) window.KbliChart.update();
    });

    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
    });

    renderKBLIChart();
}); // END DOMContentLoaded

/* ==========================================================================
   BAGIAN 4: RENDER FUNCTIONS (Dipanggil oleh Logic di atas)
   ========================================================================== */

function renderKBLIChart() {
    const barChart = document.getElementById("barChartKbli");
    const title = document.getElementById("kbliChartTitle");
    const provinsi = document.getElementById("provinsiSelect")?.value;

    if (!barChart || !title) return;
    barChart.innerHTML = "";

    if (!provinsi) {
        title.innerText =
            "Laporan Sebaran Tenaga Kerja Berdasarkan KBLI (Semua Provinsi)";
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

function updateKabupatenDropdown(provinsi) {
    const kabSelect = document.getElementById("kabupatenSelect");
    if (!kabSelect) return;

    kabSelect.innerHTML = '<option value="">-- Pilih Kab/Kota --</option>';
    if (!provinsi || !window.kabData) return;

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

function renderTableProvinsi() {
    const tbody = document.getElementById("tableProvinsiBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const provinsiSelected = document.getElementById("provinsiSelect")?.value;
    const provMap = totalProvinsi();

    if (provinsiSelected) {
        const total = provMap[provinsiSelected] || 0;
        tbody.innerHTML = `<tr><td>${provinsiSelected}</td><td>${total.toLocaleString("id-ID")}</td></tr>`;
        return;
    }

    Object.keys(provMap).forEach((prov) => {
        const total = provMap[prov];
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${prov}</td><td>${total.toLocaleString("id-ID")}</td>`;
        tbody.appendChild(tr);
    });
}

function renderTableKabupaten() {
    const tbody = document.getElementById("tableKabupatenBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    const provinsi = document.getElementById("provinsiSelect")?.value;
    if (!window.kabData) return;

    let kotaList = window.kabData;
    if (provinsi) {
        kotaList = kotaList.filter((d) => d.provinsi === provinsi);
    }

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
