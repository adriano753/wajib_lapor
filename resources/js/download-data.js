let cachedLogoKiri = null;
let cachedLogoKanan = null;

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// preload logo saat halaman dibuka
async function preloadLogos() {
    if (!cachedLogoKiri) {
        cachedLogoKiri = await loadImage("/images/kemnaker_logo.png");
    }

    if (!cachedLogoKanan) {
        cachedLogoKanan = await loadImage("/images/binwas.png");
    }
}

window.addKop = async function (pdf) {
    const pageWidth = pdf.internal.pageSize.getWidth();

    // pastikan logo sudah siap
    await preloadLogos();

    pdf.addImage(cachedLogoKiri, "PNG", 10, 5, 18, 18);
    pdf.addImage(cachedLogoKanan, "PNG", pageWidth - 28, 5, 18, 18);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("KEMENTERIAN KETENAGAKERJAAN", pageWidth / 2, 12, {
        align: "center",
    });

    pdf.setFontSize(11);
    pdf.text("LAPORAN DATA KETENAGAKERJAAN", pageWidth / 2, 18, {
        align: "center",
    });

    pdf.setLineWidth(0.7);
    pdf.line(10, 28, pageWidth - 10, 28);
};
window.addTimestamp = function (pdf) {
    const pageWidth = pdf.internal.pageSize.getWidth();

    const now = new Date();
    const tanggal = now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const jam = now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    pdf.setFontSize(9);
    pdf.setTextColor(100);
    pdf.text(`Dicetak: ${tanggal} ${jam} WIB`, pageWidth - 10, 35, {
        align: "right",
    });
};
document.addEventListener("DOMContentLoaded", async function () {
    await preloadLogos();
    const { jsPDF } = window.jspdf;

    async function exportMultipleSections(selector, fileName) {
        const pdf = new jsPDF("l", "mm", "a4");
        const sections = document.querySelectorAll(selector);

        let pageCount = 0;

        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();

            if (rect.height === 0) {
                continue;
            }

            try {
                const canvas = await html2canvas(sections[i], {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                });

                if (canvas.height === 0) continue;

                const imgData = canvas.toDataURL("image/png");
                const imgWidth = 297;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (pageCount > 0) {
                    pdf.addPage();
                }

                await addKop(pdf);
                addTimestamp(pdf);
                pdf.addImage(imgData, "PNG", 0, 45, imgWidth, imgHeight);

                pageCount++;
            } catch (error) {
                continue;
            }
        }

        if (pageCount === 0) {
            alert("Tidak ada data untuk di-download");
            return;
        }

        pdf.save(fileName);
    }

    async function exportSingleContainer(containerId, fileName) {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("l", "mm", "a4");

        // =========================
        // TIMESTAMP
        // =========================

        // =========================
        // RENDER HTML
        // =========================
        const element = document.getElementById(containerId);

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const imgWidth = 297;
        const pageHeight = 165;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // HALAMAN PERTAMA
        await addKop(pdf);
        addTimestamp(pdf);
        pdf.addImage(imgData, "PNG", 0, 45, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // HALAMAN BERIKUTNYA
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);
            pdf.addImage(imgData, "PNG", 0, position + 45, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(fileName);
    }

    const btnPPPKB = document.getElementById("downloadPdf");
    if (btnPPPKB) {
        btnPPPKB.addEventListener("click", async function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            // =========================
            // HALAMAN 1 - CHART PPPKB
            // =========================
            await addKop(pdf);
            addTimestamp(pdf);

            const chart = Chart.getChart("chartPPPKB");
            const chartImg = chart.toBase64Image();

            pdf.addImage(chartImg, "PNG", 10, 45, 277, 120);

            // =========================
            // HALAMAN 2 - TABEL PPPKB
            // =========================
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);

            pdf.autoTable({
                html: "#tableProvinsiPPPKBWrapper table",
                startY: 45,
                styles: {
                    fontSize: 8,
                },
                headStyles: {
                    fillColor: [13, 110, 253],
                },
            });

            pdf.save("laporan-pppkb.pdf");
        });
    }

    //DATA TENAGA KERJA
    function prepareChartForPdf(chart) {
        if (!chart) return () => {};

        const oldBg = chart.canvas.style.backgroundColor;
        chart.canvas.style.backgroundColor = "#ffffff";

        const oldTickColors = {};

        if (chart.options.scales) {
            Object.keys(chart.options.scales).forEach((key) => {
                const scale = chart.options.scales[key];
                oldTickColors[key] = scale.ticks?.color;

                if (scale.ticks) {
                    scale.ticks.color = "#111827";
                }
            });
        }

        chart.update("none");

        return function restoreChart() {
            chart.canvas.style.backgroundColor = oldBg;

            if (chart.options.scales) {
                Object.keys(chart.options.scales).forEach((key) => {
                    const scale = chart.options.scales[key];

                    if (scale.ticks) {
                        scale.ticks.color = oldTickColors[key];
                    }
                });
            }

            chart.update("none");
        };
    }
    document
        .getElementById("downloadPdfTenagaKerja")
        .addEventListener("click", async function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            // =========================
            // BUAT TANGGAL & JAM
            // =========================

            // =========================
            // FUNCTION HEADER
            // =========================

            // =========================
            // HALAMAN 1 - CHART PROVINSI
            // =========================
            await addKop(pdf);
            addTimestamp(pdf);

            const provChart = Chart.getChart("tenagaKerjaProvChart");
            const restoreProv = prepareChartForPdf(provChart);

            const provImg = provChart.toBase64Image();
            restoreProv();
            pdf.addImage(provImg, "PNG", 10, 45, 277, 120);

            // =========================
            // HALAMAN 2 - TABEL PROVINSI
            // =========================
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);

            const tableProv = document.querySelector(
                "#tableProvinsiWrapper table",
            );

            if (tableProv) {
                pdf.autoTable({
                    html: tableProv,
                    startY: 45,
                });
            } else {
                console.warn("Tabel provinsi tidak ditemukan");
            }
            // =========================
            // HALAMAN - CHART KABUPATEN + RINGKASAN
            // =========================
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);

            // Judul Chart
            pdf.setFontSize(14);
            pdf.text("Grafik Tenaga Kerja per Kabupaten", 10, 42);

            // Chart
            const kabChart = Chart.getChart("tenagaKerjaKabChart");
            const restoreKab = prepareChartForPdf(kabChart);

            const kabImg = kabChart.toBase64Image();
            restoreKab();

            // Chart ditaruh agak ke bawah sedikit
            pdf.addImage(kabImg, "PNG", 10, 50, 277, 60);

            // =========================
            // RINGKASAN DI BAWAH CHART
            // =========================

            // =========================
            // RINGKASAN (TAMPILAN HTML ASLI)
            // =========================

            const summaryElement = document.getElementById("dataSummary");

            if (summaryElement) {
                // clone supaya tidak ganggu layout asli
                const clone = summaryElement.cloneNode(true);
                clone.querySelectorAll("*").forEach((el) => {
                    el.style.color = "#111827";
                });
                clone.style.width = "1000px"; // biar proporsional
                clone.style.background = "#ffffff";
                clone.style.padding = "40px";
                clone.style.position = "absolute";
                clone.style.left = "-9999px";

                document.body.appendChild(clone);

                const canvas = await html2canvas(clone, {
                    scale: 2,
                    backgroundColor: "#ffffff",
                });

                const imgData = canvas.toDataURL("image/png");

                const imgWidth = 277;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, "PNG", 10, 115, imgWidth, imgHeight);

                document.body.removeChild(clone);
            }
            // =========================
            // HALAMAN 5 - TABEL KABUPATEN
            // =========================
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);

            pdf.autoTable({
                html: "#tableKabupatenWrapper table",
                startY: 45,
                styles: {
                    fontSize: 8,
                },
            });
            // =========================
            // HALAMAN 6 - CHART KBLI
            // =========================
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);

            const kbliChart = document.getElementById("barChartKbli");

            if (kbliChart) {
                const clone = kbliChart.cloneNode(true);
                clone
                    .querySelectorAll(".bar-label, .bar-value")
                    .forEach((label) => {
                        label.style.color = "#111827";
                    });
                clone
                    .querySelectorAll(".bar-label, .bar-value")
                    .forEach((label) => {
                        label.style.color = "#111827";
                    });

                // Hitung estimasi lebar berdasarkan jumlah bar (asumsi 1 bar butuh min 60px agar label muat)
                const barCount = clone.querySelectorAll(".bar").length;
                const estimatedWidth = Math.max(1600, barCount * 65);

                Object.assign(clone.style, {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    width: `${estimatedWidth}px`,
                    height: "700px",
                    padding: "100px 50px 250px 50px",
                    background: "#ffffff",
                    position: "absolute",
                    left: "-10000px",
                    top: "0",
                    overflow: "visible",
                });

                document.body.appendChild(clone);

                try {
                    const canvas = await html2canvas(clone, {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: "#ffffff",
                        width: estimatedWidth,
                        windowWidth: estimatedWidth,
                        logging: false,
                    });

                    const imgData = canvas.toDataURL("image/png");
                    const imgProps = pdf.getImageProperties(imgData);

                    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
                    const pdfHeight =
                        (imgProps.height * pdfWidth) / imgProps.width;

                    pdf.addImage(imgData, "PNG", 10, 45, pdfWidth, pdfHeight);
                } catch (error) {
                    console.error("Gagal export chart:", error);
                } finally {
                    document.body.removeChild(clone);
                }
            }

            pdf.save("laporan-tenaga-kerja.pdf");
        });

    // JAMINAN SOSIAL
    const btnJaminan = document.getElementById("downloadPdfJaminan");

    if (btnJaminan) {
        btnJaminan.addEventListener("click", async function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            // =========================
            // HALAMAN 1 - CHART
            // =========================
            await addKop(pdf);
            addTimestamp(pdf);

            const chart = Chart.getChart("provinsiLineChartJaminan");

            if (!chart) {
                alert("Chart tidak ditemukan!");
                return;
            }

            const chartImg = chart.toBase64Image();
            pdf.addImage(chartImg, "PNG", 10, 45, 277, 120);

            // =========================
            // HALAMAN 2 - TABEL (SORTED)
            // =========================
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);

            const dataRows = [];
            const bpjsRows = document.querySelectorAll("#bpjsTable .bpjs-row");

            bpjsRows.forEach((row) => {
                // skip kalau row tidak terlihat
                if (row.offsetParent === null) return;

                const provinsi =
                    row.querySelector(".provinsi-name")?.innerText || "-";
                const values = row.querySelectorAll(".provinsi-values span");

                // ambil angka bersih (hapus titik, huruf, dll)
                const jkk =
                    parseInt(values[0]?.innerText.replace(/\D/g, "")) || 0;
                const jht =
                    parseInt(values[1]?.innerText.replace(/\D/g, "")) || 0;
                const jkm =
                    parseInt(values[2]?.innerText.replace(/\D/g, "")) || 0;
                const jp =
                    parseInt(values[3]?.innerText.replace(/\D/g, "")) || 0;

                dataRows.push({
                    provinsi,
                    jkk,
                    jht,
                    jkm,
                    jp,
                });
            });

            // =========================
            // 🔥 SORT TERBESAR (JKK)
            // =========================
            dataRows.sort((a, b) => b.jkk - a.jkk);

            // =========================
            // CONVERT KE FORMAT TABLE
            // =========================
            const rows = dataRows.map((d) => [
                d.provinsi,
                d.jkk.toLocaleString("id-ID"),
                d.jht.toLocaleString("id-ID"),
                d.jkm.toLocaleString("id-ID"),
                d.jp.toLocaleString("id-ID"),
            ]);

            // =========================
            // RENDER TABLE PDF
            // =========================
            pdf.autoTable({
                head: [["Provinsi", "JKK", "JHT", "JKM", "JP"]],
                body: rows,
                startY: 45,
                styles: {
                    fontSize: 8,
                    halign: "center",
                },
                columnStyles: {
                    0: { halign: "left" }, // provinsi rata kiri
                },
                headStyles: {
                    fillColor: [220, 53, 69],
                    halign: "center",
                },
            });

            // =========================
            // SAVE FILE
            // =========================
            pdf.save("laporan-jaminan-sosial.pdf");
        });
    }
    // ===============================
    // DOWNLOAD PDF KLASIFIKASI
    // ===============================
    const btnKlasifikasi = document.getElementById("downloadPdfKlasifikasi");

    if (btnKlasifikasi) {
        btnKlasifikasi.addEventListener("click", async function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            // ====================================
            // HALAMAN 1 - CHART PROVINSI
            // ====================================
            await addKop(pdf);
            addTimestamp(pdf);
            const provChart = Chart.getChart("provinsiChart");
            const provImg = provChart.toBase64Image("image/png", 3);

            pdf.addImage(provImg, "PNG", 10, 45, 260, 110);

            // ====================================
            // HALAMAN 2 - CHART KLASIFIKASI
            // ====================================
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);
            const klasChart = Chart.getChart("klasifikasiChart");
            const klasImg = klasChart.toBase64Image("image/png", 3);

            pdf.addImage(klasImg, "PNG", 10, 45, 277, 110);

            // ====================================
            // HALAMAN 3 - CHART KOTA (JIKA ADA)
            // ====================================
            const kotaSection = document.getElementById("kotaChartSection");

            if (kotaSection && kotaSection.style.display !== "none") {
                pdf.addPage();
                await addKop(pdf);
                addTimestamp(pdf);

                const kotaChart = Chart.getChart("kotaChart");
                const kotaImg = kotaChart.toBase64Image("image/png", 3);

                pdf.addImage(kotaImg, "PNG", 10, 45, 277, 120);
            }
            // ====================================
            // HALAMAN 4 - TABEL HASIL FILTER (DARI HTML)
            // ====================================
            pdf.addPage();
            await addKop(pdf);
            addTimestamp(pdf);
            // ambil tabel dari DOM
            const table = document.getElementById("tableKlasifikasi");

            if (!table) {
                alert("Tabel tidak ditemukan");
                return;
            }

            pdf.autoTable({
                html: "#tableKlasifikasi",
                startY: 45,
                styles: {
                    fontSize: 8,
                    cellPadding: 2,
                },
                headStyles: {
                    fillColor: [66, 165, 245],
                    textColor: 255,
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240],
                },
            });

            pdf.save("laporan-klasifikasi.pdf");
        });
    }

    // ==========================================
    // DOWNLOAD PDF - BAR CHART HTML
    // ==========================================

    const btnBar = document.getElementById("downloadBarPdf");

    if (btnBar) {
        btnBar.onclick = async function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const originalChart = document.getElementById("barChart");

            if (!originalChart) {
                alert("Chart tidak ditemukan");
                return;
            }

            // =========================
            // CLONE CHART
            // =========================
            const clone = originalChart.cloneNode(true);
            clone
                .querySelectorAll(".bar-label, .bar-value")
                .forEach((label) => {
                    label.style.color = "#111827";
                });
            clone
                .querySelectorAll(".bar-label, .bar-value")
                .forEach((label) => {
                    label.style.color = "#111827";
                });

            Object.assign(clone.style, {
                width: "2800px",
                height: "1500px",
                padding: "60px",
                paddingBottom: "250px",
                background: "#ffffff",
                overflow: "visible",
                position: "absolute",
                left: "-9999px",
                top: "0",
            });

            document.body.appendChild(clone);

            clone.querySelectorAll(".bar").forEach((bar) => {
                bar.style.overflow = "visible";
            });

            clone.style.height = clone.scrollHeight + "px";

            try {
                await new Promise((resolve) => setTimeout(resolve, 500));

                const canvas = await html2canvas(clone, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                });

                const imgData = canvas.toDataURL("image/png");

                // =========================
                // PAGE 1 = CHART
                // =========================
                await addKop(pdf);
                addTimestamp(pdf);

                const marginTop = 45;
                const marginSide = 10;

                const imgWidth = pageWidth - marginSide * 2;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(
                    imgData,
                    "PNG",
                    marginSide,
                    marginTop,
                    imgWidth,
                    imgHeight,
                );

                // =========================
                // PAGE 2 = TABEL
                // =========================
                const table = document.querySelector(
                    "#tableProvinsilprWrapper table",
                );

                if (table) {
                    pdf.addPage();
                    await addKop(pdf);
                    addTimestamp(pdf);

                    pdf.autoTable({
                        html: "#tableProvinsilprWrapper table",
                        startY: 45,
                        styles: {
                            fontSize: 8,
                        },
                        headStyles: {
                            fillColor: [66, 165, 245],
                            textColor: 255,
                        },
                    });
                }

                pdf.save("laporan-provinsi.pdf");
            } catch (error) {
                console.error("Gagal export PDF:", error);
            } finally {
                document.body.removeChild(clone);
            }
        };
    }
});
