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

document.addEventListener("DOMContentLoaded", function () {
    if (typeof Chart === "undefined") {
        console.error("Chart.js belum ke-load");
        return;
    }

    if (!window.chartData || !window.kabData) {
        console.error("Data chart tidak lengkap");
        return;
    }

    /* ===============================
       1️⃣ LINE CHART UTAMA (SEMUA KOTA)
    =============================== */
    const mainChart = new Chart(document.getElementById("tenagaKerjaChart"), {
        type: "line",
        data: {
            labels: window.chartData.kota,
            datasets: [
                { label: "Mikro", data: window.chartData.mikro, tension: 0.4 },
                { label: "Kecil", data: window.chartData.kecil, tension: 0.4 },
                {
                    label: "Menengah",
                    data: window.chartData.menengah,
                    tension: 0.4,
                },
                { label: "Besar", data: window.chartData.besar, tension: 0.4 },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });

    /* ===============================
       2️⃣ BAR CHART FULL (KANAN)
    =============================== */
    const fullChart = new Chart(
        document.getElementById("tenagaKerjaFullChart"),
        {
            type: "line",
            data: {
                labels: window.chartData.kota,
                datasets: [
                    {
                        label: "Mikro",
                        data: window.chartData.mikro,
                        tension: 0.4,
                    },
                    {
                        label: "Kecil",
                        data: window.chartData.kecil,
                        tension: 0.4,
                    },
                    {
                        label: "Menengah",
                        data: window.chartData.menengah,
                        tension: 0.4,
                    },
                    {
                        label: "Besar",
                        data: window.chartData.besar,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        }
    );

    /* ===============================
   3️⃣ LINE CHART FILTER (KIRI)
=============================== */
    const kabChart = new Chart(document.getElementById("tenagaKerjaKabChart"), {
        type: "line",
        data: {
            labels: ["Mikro", "Besar", "Menengah", "Kecil"],
            datasets: [
                {
                    label: "Pilih Kab/Kota",
                    data: [0, 0, 0, 0],
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "nearest",
                intersect: false,
            },

            plugins: {
                tooltip: {
                    enabled: true,
                    mode: "nearest",
                    intersect: false,
                },
                legend: {
                    display: true,
                },
            },

            elements: {
                point: {
                    radius: 5,
                    hoverRadius: 8,
                    hitRadius: 20, // 👈 bikin area hover lebih luas
                },
                line: {
                    borderWidth: 3,
                },
            },

            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    /* ===============================
       4️⃣ FILTER DROPDOWN
    =============================== */
    document
        .getElementById("kabupatenSelect")
        .addEventListener("change", function () {
            const kota = this.value;
            if (!kota) return;

            const mikro = sumBySkala("Mikro", kota);
            const besar = sumBySkala("Besar", kota);
            const menengah = sumBySkala("Menengah", kota);
            const kecil = sumBySkala("Kecil", kota);

            kabChart.data.datasets[0].label = kota;
            kabChart.data.datasets[0].data = [mikro, besar, menengah, kecil];

            kabChart.update();
        });

    /* ===============================
       HELPER FUNCTION
    =============================== */
    function sumBySkala(skala, kota = null) {
        return window.kabData
            .filter(
                (d) =>
                    d.skala_objek_pengawasan === skala &&
                    (!kota || d.kota === kota)
            )
            .reduce((sum, d) => sum + Number(d.total), 0);
    }

    function lineFilter(skala, kota) {
        return window.chartData.kota.map((k) => {
            if (k !== kota) return 0;

            return window.kabData
                .filter(
                    (d) => d.kota === kota && d.skala_objek_pengawasan === skala
                )
                .reduce((sum, d) => sum + Number(d.total), 0);
        });
    }
});

    /* ===============================
       1️⃣ CHART PROVINSI
    =============================== */

    const chartProvinsi = new Chart(
    document.getElementById("provinsiChart"),
    {
        type: "bar",
        data: {
            labels: window.chartData.provinsi,
            datasets: [
                {
                    data: window.chartData.totalProvinsi,
                    backgroundColor: '#42A5F5',
                    // --- PENGATURAN LEBAR DAN MARGIN ---
                    barPercentage: 0.9,      // Mengatur lebar bar (0.1 - 1.0). Semakin dekat ke 1, semakin lebar.
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
                top:40,
                bottom: 30 // Tambah ruang di bawah agar tulisan tidak kepotong
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    anchor: "end",
                    align: "top",
                    formatter: value => value.toLocaleString("id-ID"),
                    font: {
                        weight: "bold",
                        size: 11,
                    },
                    color: 'white'
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value =>
                            value.toLocaleString("id-ID"),
                        color: 'white'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' // Garis grid tipis transparan
                    }
                },
               x: {
                    ticks: {
                        autoSkip: false, // Jangan ada yang disembunyikan
                        maxRotation: 45, // Paksa miring 45 derajat
                        minRotation: 45, // Paksa miring 45 derajat
                        font: {
                            size: 10
                        },
                        color: 'white'
                    },
                    grid: {
                        display: false
                    }
                }
            },
        },
        plugins: [ChartDataLabels],
    });


const chartKlasifikasi = new Chart(
    document.getElementById("klasifikasiChart"),
    {
        type: "bar",
        data: {
            labels: ["Mikro", "Kecil", "Menengah", "Besar", "Tidak Teridentifikasi"],
            datasets: [
                {
                    data: 
                    window.chartData.klasifikasi,
                    backgroundColor: '#42A5F5', // ✅ WARNA: Sama dengan chart provinsi
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
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {       
                    anchor: "end",
                    align: "top",
                    formatter: value => value.toLocaleString("id-ID"),
                    font: {
                        weight: "bold",
                        size: 11,
                    },
                    color: 'white'  // Atau sesuaikan dengan tema background (misal: black/white)
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => value.toLocaleString("id-ID"),
                        color: '#e0e0e0', // Warna teks sumbu Y
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)' // Grid tipis transparan
                    }
                },
                x: {
                    ticks: {
                        autoSkip: false,
                        color: '#e0e0e0',
                        font: {
                            size: 11
                        }
                    },
                    grid: {
                        display: false // Grid vertikal hilang biar bersih
                    }
                },
            },
        },
        plugins: [ChartDataLabels], // Jangan lupa plugin ini harus sudah di-load
    });


    const chartKota = new Chart(document.getElementById("kotaChart"), {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            label: "Jumlah Perusahaan",
            data: [],
            backgroundColor: '#66BB6A', // Warna Hijau (Biar beda dengan Provinsi)
            maxBarThickness: 80, // Agar bar tidak raksasa saat cuma 1 kota
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            datalabels: {
                anchor: "end",
                align: "top",
                formatter: value => value.toLocaleString("id-ID"),
                font: { weight: "bold", size: 10 },
                color: 'white'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { color: '#e0e0e0', callback: v => v.toLocaleString("id-ID") },
                grid: { color: 'rgba(255, 255, 255, 0.1)' }
            },
            x: {
                ticks: { color: '#e0e0e0', autoSkip: false, maxRotation: 90, minRotation: 45 },
                grid: { display: false }
            }
        },
        layout: { padding: { top: 30 } }
    },
    plugins: [ChartDataLabels]
});


    
// 1. AMBIL DATA DARI WINDOW (Global Variable dari Blade)
const masterData = window.chartMasterData;      // Pastikan nama ini sama dengan di Blade
const listProvinsiLabel = window.listProvinsiLabel;

// 2. AMBIL ELEMENT DOM
const filterTahun = document.getElementById('tahunSelect');
const filterBulan = document.getElementById('bulanSelect');
const filterProvinsi = document.getElementById('provinsiSelect');
const filterKabupaten = document.getElementById('kabupatenSelect');
const filterKlasifikasi = document.getElementById('klasifikasiSelect');

// 3. FUNGSI UTAMA: UPDATE DASHBOARD
function updateDashboard() {
    // A. Ambil value dropdown
    const valTahun = filterTahun.value;
    const valBulan = filterBulan.value;
    const valProv = filterProvinsi.value;
    const valKab = filterKabupaten.value;
    const valKlas = filterKlasifikasi.value;

    // B. Filter Data
    const filteredData = masterData.filter(row => {
        return (valTahun === "" || String(row.tahun) === valTahun) &&
               (valBulan === "" || String(row.bulan) === valBulan) &&
               (valProv  === "" || row.provinsi === valProv) &&
               (valKab   === "" || row.kota === valKab) &&
               (valKlas  === "" || (row.skala_objek_pengawasan || "").toLowerCase() === valKlas.toLowerCase());
    });

    // C. Hitung Ulang Data (SUM Total)
    
    const chartContainer = document.getElementById('provinsiChartContainer');

    // --- Chart Provinsi ---
    let chartProvinsiLabels = [];
    let chartProvinsiData = [];

    if (valProv !== "") {
        // === MODE 1 PROVINSI ===
        
        // 1. Ubah Style Container: Hapus lebar 2000px, jadikan 100%
        // Ini otomatis MENGHILANGKAN Scrollbar & membuat chart ke tengah
        if(chartContainer) chartContainer.style.width = "100%";

        // 2. Set Data & Label Single
        chartProvinsiLabels = [valProv];
        const totalOneProv = filteredData.reduce((sum, row) => sum + parseInt(row.total), 0);
        chartProvinsiData = [totalOneProv];

    } else {
        // === MODE SEMUA PROVINSI ===

        // 1. Ubah Style Container: Kembalikan ke 2000px (atau lebih)
        // Ini memunculkan Scrollbar agar muat 38 provinsi
        if(chartContainer) chartContainer.style.width = "2000px";

        // 2. Set Data & Label Full
        chartProvinsiLabels = listProvinsiLabel; 
        chartProvinsiData = listProvinsiLabel.map(namaProv => {
            const dataProv = filteredData.filter(r => r.provinsi === namaProv);
            return dataProv.reduce((sum, row) => sum + parseInt(row.total), 0);
        });
    }
    chartProvinsi.data.datasets[0].maxBarThickness = 100;

    // --- Chart Klasifikasi ---
    const sumByKategori = (namaKategori) => {
        return filteredData
            .filter(r => (r.skala_objek_pengawasan || "").toLowerCase() === namaKategori)
            .reduce((sum, row) => sum + parseInt(row.total), 0);
    };

    const sumNull = filteredData
        .filter(r => !r.skala_objek_pengawasan)
        .reduce((sum, row) => sum + parseInt(row.total), 0);

    const dataKlasifikasiBaru = [
        sumByKategori("mikro"),
        sumByKategori("kecil"),
        sumByKategori("menengah"),
        sumByKategori("besar"),
        sumNull
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
    
    const sectionKota = document.getElementById('kotaChartSection');
    const containerKota = document.getElementById('kotaChartContainer');

    // Cek apakah user sudah memilih Wilayah (Provinsi ATAU Kota)
    if (valProv === "" && valKab === "") {
        // KASUS 1: Belum pilih wilayah apapun -> Sembunyikan Chart
        if(sectionKota) sectionKota.style.display = "none";
        
    } else {
        // KASUS 2: Sudah pilih wilayah -> Tampilkan Chart & Olah Data
        if(sectionKota) sectionKota.style.display = "block";

        // 1. Siapkan Label & Data
        // Ambil list nama kota unik dari data yang sudah terfilter
        // ( filteredData otomatis isinya cuma kota-kota di provinsi yg dipilih )
        const listKotaUnik = [...new Set(filteredData
            .map(r => r.kota)
            .filter(k => k) // hapus null
            .sort()
        )];

        // Hitung total per kota
        const dataKota = listKotaUnik.map(namaKota => {
            return filteredData
                .filter(r => r.kota === namaKota)
                .reduce((sum, r) => sum + parseInt(r.total), 0);
        });

        // 2. Atur Style Container (Scroll vs Tengah)
        // Jika kotanya banyak (> 15), lebarkan container biar bisa scroll
        // Jika kotanya sedikit (atau cuma 1), bikin 100% biar ketengah
        if (listKotaUnik.length > 15) {
            containerKota.style.width = "2500px"; // Paksa lebar biar scroll
        } else {
            containerKota.style.width = "100%";   // Fit screen (ketengah)
        }

        // 3. Update Chart
        chartKota.data.labels = listKotaUnik;
        chartKota.data.datasets[0].data = dataKota;
        chartKota.update();
    }
}

// 4. FUNGSI BANTUAN: UPDATE DROPDOWN KOTA
// (Ditaruh DI LUAR updateDashboard agar rapi)
function updateKabupatenOptions(selectedProv) {
    let sourceData = masterData;

    // Jika ada provinsi yang dipilih, filter data berdasarkan provinsi itu
    if (selectedProv !== "") {
        sourceData = masterData.filter(r => r.provinsi === selectedProv);
    }
    // Jika selectedProv == "" (Reset), maka sourceData tetap masterData (SEMUA)

    // 2. Ambil List Kota Unik dari sourceData
    const availableCities = [...new Set(sourceData
        .map(r => r.kota)
        .filter(k => k) // Hapus null
        .sort()
    )];
    
    // 3. Simpan nilai kota saat ini (jika ada)
    const currentCity = filterKabupaten.value;

    // 4. Reset & Isi Ulang Dropdown
    filterKabupaten.innerHTML = '<option value="">-- Pilih Kab/Kota --</option>';
    
    availableCities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.text = city;
        
        // Cek apakah kota yang dipilih sebelumnya masih valid ada di list baru?
        if(city === currentCity) option.selected = true;
        
        filterKabupaten.appendChild(option);
    });
}

// 5. PASANG EVENT LISTENER (DI LUAR FUNGSI APAPUN)
// A. Event Listener: TAHUN, BULAN, KLASIFIKASI (Standar)
[filterTahun, filterBulan, filterKlasifikasi].forEach(f => {
    if (f) {
        f.addEventListener('change', updateDashboard);
    }
});

// B. Event Listener: PROVINSI (Reset Kota)
if (filterProvinsi) {
    filterProvinsi.addEventListener('change', () => {
        // 1. Reset Nilai Kota karena provinsi berubah
        if (filterKabupaten) filterKabupaten.value = "";
        
        // 2. Update List Opsi Kota sesuai provinsi baru
        updateKabupatenOptions(filterProvinsi.value);
        
        // 3. Update Chart
        updateDashboard();
    });
}

// ====================
// KBLI FILTER + CHART 
// ====================
console.log(window.chartData.kbliLabels)
console.log(window.chartData.kbliValues)
document.addEventListener("DOMContentLoaded", function () {

    if (typeof Chart === "undefined") {
        console.error("Chart.js belum ke-load");
        return;
    }

    if (!window.chartData) {
        console.error("chartData kosong");
        return;
    }

    /* ===============================
       CHART PROVINSI
    =============================== */
    const provCanvas = document.getElementById("provinsiChart");
    if (provCanvas) {
        window.chartProvinsi = new Chart(provCanvas, {
            type: "bar",
            data: {
                labels: window.chartData.provinsi,
                datasets: [{
                    data: window.chartData.totalProvinsi
                }]
            },
            options: { responsive: true }
        });
    }

    /* ===============================
       CHART KBLI (FIX FINAL)
    =============================== */
    console.log('KBLI Labels:', window.chartData.kbliLabels);
    console.log('KBLI Values:', window.chartData.kbliValues);

    if (window.chartData.kbliLabels?.length) {
        const ctxKBLI = document.getElementById("kbliList");

        if (ctxKBLI) {
            new Chart(ctxKBLI, {
                type: "bar",
                data: {
                    labels: window.chartData.kbliLabels,
                    datasets: [{
                        label: "Jumlah Perusahaan",
                        data: window.chartData.kbliValues
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        } else {
            console.warn("Canvas KBLI tidak ditemukan");
        }
    }

});


// C. Event Listener: KABUPATEN (Auto-Select Provinsi)
if (filterKabupaten) {
    filterKabupaten.addEventListener('change', () => {
        const selectedCity = filterKabupaten.value;
        const currentProv = filterProvinsi.value;

        // Cek: Jika user pilih kota, tapi provinsi masih kosong/salah
        if (selectedCity !== "") {
            // 1. Cari data baris pertama yang kotanya sama dengan yang dipilih
            const matchedRow = masterData.find(row => row.kota === selectedCity);

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

updateDashboard();