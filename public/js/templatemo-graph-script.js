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
    }
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
       START GRAFIK TENAGA KERJA 
    ==================================== */
document.addEventListener("DOMContentLoaded", function () {
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
                    legend: {
                        labels: {
                            color: "#fff",
                        },
                    },
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
                            color: "#fff",
                            maxRotation: 45,
                            minRotation: 45,
                        },
                    },
                    y: {
                        ticks: {
                            color: "#fff",
                        },
                    },
                },
            },
        }
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
                "Menengah",
                "Kecil",
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
                legend: {
                    labels: { color: "#fff" },
                },

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
                    ticks: { color: "#fff" },
                },
                y: {
                    ticks: { color: "#fff" },
                },
            },
        },
    });

    /* ===============================
   END CHART KABUPATEN (DEFAULT KOSONG)
=============================== */

    /* ===============================
       4️⃣ START FILTER DROPDOWN KABUPATEN
    =============================== */
    document
        .getElementById("kabupatenSelect")
        .addEventListener("change", function () {
            const kota = this.value;
            if (!kota) return;

            const mikro = sumBySkalaKab("Mikro", kota);
            const besar = sumBySkalaKab("Besar", kota);
            const menengah = sumBySkalaKab("Menengah", kota);
            const kecil = sumBySkalaKab("Kecil", kota);
            const tidakTeridentifikasi = sumTidakTeridentifikasiKab(kota);

            const total =
                mikro + besar + menengah + kecil + tidakTeridentifikasi;

            kabChart.data.datasets[0].label =
                "Tenaga Kerja - " +
                kota +
                " (" +
                total.toLocaleString("id-ID") +
                " Orang)";

            kabChart.data.datasets[0].data = [
                tidakTeridentifikasi,
                mikro,
                kecil,
                menengah,
                besar,
            ];

            kabChart.update();
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
            const labelJenis = getLabelJenis();

            // update dropdown kabupaten
            updateKabupatenDropdown(provinsi);

            // reset chart kabupaten
            kabChart.data.datasets[0].label = "Pilih Kab/Kota";
            kabChart.data.datasets[0].data = [0, 0, 0, 0, 0];
            kabChart.update();

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

    function sumTidakTeridentifikasiKab(kota = null) {
        return window.kabData
            .filter(
                (d) =>
                    (!d.skala_objek_pengawasan ||
                        d.skala_objek_pengawasan.trim() === "") &&
                    (!kota || d.kota === kota)
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
                    .map((d) => d.kota)
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
        START HELPER FUNCTION KABUPATEN
    =============================== */
    function sumBySkalaKab(skala, kota = null) {
        return window.kabData
            .filter(
                (d) =>
                    d.skala_objek_pengawasan === skala &&
                    (!kota || d.kota === kota)
            )
            .reduce((sum, d) => sum + getTotalByJenis(d), 0);
    }

    function lineFilterKab(skala, kota) {
        return window.chartData.kota.map((k) => {
            if (k !== kota) return 0;

            return window.kabData
                .filter(
                    (d) => d.kota === kota && d.skala_objek_pengawasan === skala
                )
                .reduce((sum, d) => sum + getTotalByJenis(d), 0);
        });
    }

    /* ===============================
        END HELPER FUNCTION KABUPATEN
    =============================== */

    /* ===============================
       START HELPER FUNCTION PROVINSI
    =============================== */

    function sumBySkalaProv(skala, provinsi = null) {
        return window.provData
            .filter(
                (d) =>
                    d.skala_objek_pengawasan === skala &&
                    (!provinsi || d.provinsi === provinsi)
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
                        d.skala_objek_pengawasan === skala
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
        const perjanjianKerja =
            document.getElementById("perjanjianKerja").value;

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

        let label = "Total " + labelTenaga;

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
        const perjanjianKerja =
            document.getElementById("perjanjianKerja").value; // all | pkwtt | pkwt

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
});
/* =================================
       END GRAFIK TENAGA KERJA 
    ==================================== */
