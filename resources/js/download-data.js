document.addEventListener("DOMContentLoaded", function () {
    const { jsPDF } = window.jspdf;

    async function exportMultipleSections(selector, fileName) {
        const pdf = new jsPDF("l", "mm", "a4");
        const sections = document.querySelectorAll(selector);

        let pageCount = 0;

        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();

            // SKIP kalau section tidak terlihat / tinggi 0
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

                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

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

        const timestamp = `Dicetak: ${tanggal} ${jam} WIB`;

        function addHeader() {
            const pageWidth = pdf.internal.pageSize.getWidth();
            pdf.setFontSize(9);
            pdf.setTextColor(100);
            pdf.text(timestamp, pageWidth - 10, 8, {
                align: "right",
            });
        }

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
        const pageHeight = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // HALAMAN PERTAMA
        addHeader();
        pdf.addImage(imgData, "PNG", 0, 15, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // HALAMAN BERIKUTNYA
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            addHeader();
            pdf.addImage(imgData, "PNG", 0, position + 15, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(fileName);
    }

    const btnPPPKB = document.getElementById("downloadPdf");
    if (btnPPPKB) {
        btnPPPKB.addEventListener("click", function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            const now = new Date();
            const tanggal = now.toLocaleDateString("id-ID");
            const jam = now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            const timestamp = `Dicetak: ${tanggal} ${jam}`;

            function addHeader() {
                const pageWidth = pdf.internal.pageSize.getWidth();
                pdf.setFontSize(9);
                pdf.setTextColor(100);
                pdf.text(timestamp, pageWidth - 10, 8, { align: "right" });
            }

            // =========================
            // HALAMAN 1 - CHART PPPKB
            // =========================
            addHeader();

            const chart = Chart.getChart("chartPPPKB");
            const chartImg = chart.toBase64Image();

            pdf.addImage(chartImg, "PNG", 10, 15, 277, 120);

            // =========================
            // HALAMAN 2 - TABEL PPPKB
            // =========================
            pdf.addPage();
            addHeader();

            pdf.autoTable({
                html: "#tableProvinsiPPPKBWrapper table",
                startY: 15,
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
    document
        .getElementById("downloadPdfTenagaKerja")
        .addEventListener("click", async function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            // =========================
            // BUAT TANGGAL & JAM
            // =========================
            const now = new Date();

            const tanggal = now.toLocaleDateString("id-ID");
            const jam = now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            const timestamp = `Dicetak: ${tanggal} ${jam}`;

            // =========================
            // FUNCTION HEADER
            // =========================
            function addHeader() {
                const pageWidth = pdf.internal.pageSize.getWidth();
                pdf.setFontSize(9);
                pdf.setTextColor(100);
                pdf.text(timestamp, pageWidth - 10, 8, {
                    align: "right",
                });
            }

            // =========================
            // HALAMAN 1 - CHART PROVINSI
            // =========================
            addHeader();

            const provChart = Chart.getChart("tenagaKerjaProvChart");
            const provImg = provChart.toBase64Image();
            pdf.addImage(provImg, "PNG", 10, 15, 277, 120);

            // =========================
            // HALAMAN 2 - TABEL PROVINSI
            // =========================
            pdf.addPage();
            addHeader();

            const tableProv = document.querySelector(
                "#tableProvinsiWrapper table",
            );

            if (tableProv) {
                pdf.autoTable({
                    html: tableProv,
                    startY: 15,
                });
            } else {
                console.warn("Tabel provinsi tidak ditemukan");
            }
            // =========================
            // HALAMAN - CHART KABUPATEN + RINGKASAN
            // =========================
            pdf.addPage();
            addHeader();

            // Judul Chart
            pdf.setFontSize(14);
            pdf.text("Grafik Tenaga Kerja per Kabupaten", 10, 15);

            // Chart
            const kabChart = Chart.getChart("tenagaKerjaKabChart");
            const kabImg = kabChart.toBase64Image();

            // Chart ditaruh agak ke bawah sedikit
            pdf.addImage(kabImg, "PNG", 10, 20, 277, 60);

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

                pdf.addImage(imgData, "PNG", 10, 135, imgWidth, imgHeight);

                document.body.removeChild(clone);
            }
            // =========================
            // HALAMAN 5 - TABEL KABUPATEN
            // =========================
            pdf.addPage();
            addHeader();

            pdf.autoTable({
                html: "#tableKabupatenWrapper table",
                startY: 15,
                styles: {
                    fontSize: 8,
                },
            });
            // =========================
            // HALAMAN 6 - CHART KBLI
            // =========================
            pdf.addPage();
            addHeader();

            const kbliChart = document.getElementById("barChartKbli");

            if (kbliChart) {
                const clone = kbliChart.cloneNode(true);

                // Hitung estimasi lebar berdasarkan jumlah bar (asumsi 1 bar butuh min 60px agar label muat)
                const barCount = clone.querySelectorAll(".bar").length;
                const estimatedWidth = Math.max(1600, barCount * 65);

                Object.assign(clone.style, {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    width: `${estimatedWidth}px`, // Lebar dinamis sesuai jumlah data
                    height: "700px", // Tinggi cukup untuk bar + label miring
                    padding: "100px 50px 250px 50px", // Padding bawah extra besar untuk teks miring
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
                        // Memaksa canvas mengambil ukuran penuh clone meskipun di luar layar
                        width: estimatedWidth,
                        windowWidth: estimatedWidth,
                        logging: false,
                    });

                    const imgData = canvas.toDataURL("image/png");
                    const imgProps = pdf.getImageProperties(imgData);

                    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
                    const pdfHeight =
                        (imgProps.height * pdfWidth) / imgProps.width;

                    // Jika pdfHeight melebihi sisa halaman, Anda mungkin perlu mengecilkan margin
                    pdf.addImage(imgData, "PNG", 10, 30, pdfWidth, pdfHeight);
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
        btnJaminan.addEventListener("click", function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            const now = new Date();
            const tanggal = now.toLocaleDateString("id-ID");
            const jam = now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            const timestamp = `Dicetak: ${tanggal} ${jam}`;

            function addHeader() {
                const pageWidth = pdf.internal.pageSize.getWidth();
                pdf.setFontSize(9);
                pdf.setTextColor(100);
                pdf.text(timestamp, pageWidth - 10, 8, { align: "right" });
            }

            // =========================
            // HALAMAN 1 - CHART
            // =========================
            addHeader();

            const chart = Chart.getChart("provinsiLineChartJaminan");
            const chartImg = chart.toBase64Image();

            pdf.addImage(chartImg, "PNG", 10, 15, 277, 120);

            // =========================
            // HALAMAN 2 - TABEL PROVINSI
            // =========================
            pdf.addPage();
            addHeader();

            const rows = [];
            const bpjsRows = document.querySelectorAll("#bpjsTable .bpjs-row");

            bpjsRows.forEach((row) => {
                // ✅ SKIP kalau tidak terlihat (terfilter)
                if (row.offsetParent === null) return;

                const provinsi = row.querySelector(".provinsi-name").innerText;
                const values = row.querySelectorAll(".provinsi-values span");

                rows.push([
                    provinsi,
                    values[0].innerText.replace("JKK: ", ""),
                    values[1].innerText.replace("JHT: ", ""),
                    values[2].innerText.replace("JKM: ", ""),
                    values[3].innerText.replace("JP: ", ""),
                ]);
            });

            pdf.autoTable({
                head: [["Provinsi", "JKK", "JHT", "JKM", "JP"]],
                body: rows,
                startY: 15,
                styles: { fontSize: 8 },
                headStyles: { fillColor: [220, 53, 69] },
            });

            pdf.save("laporan-jaminan-sosial.pdf");
        });
    }
    // ===============================
    // 📄 DOWNLOAD PDF KLASIFIKASI
    // ===============================
    const btnKlasifikasi = document.getElementById("downloadPdfKlasifikasi");

    if (btnKlasifikasi) {
        btnKlasifikasi.addEventListener("click", function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            const now = new Date();
            const tanggal = now.toLocaleDateString("id-ID");
            const jam = now.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            });

            const timestamp = `Dicetak: ${tanggal} ${jam}`;

            function addHeader() {
                const pageWidth = pdf.internal.pageSize.getWidth();
                pdf.setFontSize(9);
                pdf.setTextColor(100);
                pdf.text(timestamp, pageWidth - 10, 8, { align: "right" });
            }

            // ====================================
            // HALAMAN 1 - CHART PROVINSI
            // ====================================
            addHeader();

            const provChart = Chart.getChart("provinsiChart");
            const provImg = provChart.toBase64Image("image/png", 3);

            pdf.addImage(provImg, "PNG", 10, 15, 260, 110);

            // ====================================
            // HALAMAN 2 - CHART KLASIFIKASI
            // ====================================
            pdf.addPage();
            addHeader();

            const klasChart = Chart.getChart("klasifikasiChart");
            const klasImg = klasChart.toBase64Image("image/png", 3);

            pdf.addImage(klasImg, "PNG", 10, 15, 277, 120);

            // ====================================
            // HALAMAN 3 - CHART KOTA (JIKA ADA)
            // ====================================
            const kotaSection = document.getElementById("kotaChartSection");

            if (kotaSection && kotaSection.style.display !== "none") {
                pdf.addPage();
                addHeader();

                const kotaChart = Chart.getChart("kotaChart");
                const kotaImg = kotaChart.toBase64Image("image/png", 3);

                pdf.addImage(kotaImg, "PNG", 10, 15, 277, 120);
            }

            // ====================================
            // HALAMAN 4 - TABEL HASIL FILTER
            // ====================================
            // ====================================
            // HALAMAN 4 - TABEL HASIL FILTER (DARI HTML)
            // ====================================
            pdf.addPage();
            addHeader();

            // ambil tabel dari DOM
            const table = document.getElementById("tableKlasifikasi");

            if (!table) {
                alert("Tabel tidak ditemukan");
                return;
            }

            // pakai autoTable dari HTML langsung
            pdf.autoTable({
                html: "#tableKlasifikasi",
                startY: 15,
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

    //andri
    // ==========================================
    // DOWNLOAD PDF - BAR CHART HTML (FINAL)
    // ==========================================
    const btnBar = document.getElementById("downloadBarPdf");

    if (btnBar) {
        btnBar.addEventListener("click", function () {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF("l", "mm", "a4");

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            function addHeader() {
                const now = new Date();
                const tanggal = now.toLocaleDateString("id-ID");
                const jam = now.toLocaleTimeString("id-ID");

                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(16);
                pdf.text("LAPORAN PROVINSI", pageWidth / 2, 14, {
                    align: "center",
                });

                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(9);
                pdf.text(`Dicetak: ${tanggal} ${jam}`, pageWidth - 10, 10, {
                    align: "right",
                });
            }

            const originalChart = document.getElementById("barChart");

            if (!originalChart) {
                alert("Chart tidak ditemukan");
                return;
            }

            // =========================
            // 🔥 CLONE UNTUK RESOLUSI BESAR
            // =========================
            const clone = originalChart.cloneNode(true);

            clone.style.width = "2800px"; // 🔥 tambah lebar
            clone.style.height = "1500px"; // 🔥 tambah tinggi
            clone.style.padding = "60px";
            clone.style.paddingBottom = "250px"; // 🔥 ruang label
            clone.style.background = "#ffffff";
            clone.style.overflow = "visible";

            clone.style.position = "absolute";
            clone.style.left = "-9999px";
            clone.style.top = "0";

            document.body.appendChild(clone);

            // pastikan bar tidak hidden
            clone.querySelectorAll(".bar").forEach((bar) => {
                bar.style.overflow = "visible";
            });

            // 🔥 PENTING: paksa tinggi sesuai konten
            clone.style.height = clone.scrollHeight + "px";

            setTimeout(() => {
                html2canvas(clone, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                }).then((canvas) => {
                    const imgData = canvas.toDataURL("image/png");

                    pdf.setFillColor(240, 240, 240);
                    pdf.rect(0, 0, pageWidth, pageHeight, "F");

                    addHeader();

                    const marginTop = 25;
                    const marginSide = 10;

                    const canvasRatio = canvas.height / canvas.width;
                    const imgWidth = pageWidth - marginSide * 2;
                    const imgHeight = imgWidth * canvasRatio;

                    pdf.addImage(
                        imgData,
                        "PNG",
                        marginSide,
                        marginTop,
                        imgWidth,
                        imgHeight,
                    );

                    pdf.save("laporan-provinsi.pdf");

                    // Hapus clone setelah selesai
                    document.body.removeChild(clone);
                });
            }, 500);
        });
    }
});
