document.addEventListener("DOMContentLoaded", function () {
    const btnAll = document.getElementById("downloadPdfAll");

    if (!btnAll) return;

    function setChartThemeForPDF(chart) {
        if (!chart) return;

        const isDark =
            document.documentElement.classList.contains("dark") ||
            document.body.classList.contains("dark");

        const textColor = isDark ? "#ffffff" : "#111827";
        const gridColor = isDark
            ? "rgba(255,255,255,0.15)"
            : "rgba(0,0,0,0.08)";

        // legend
        if (chart.options.plugins?.legend?.labels) {
            chart.options.plugins.legend.labels.color = textColor;
        }

        // title
        if (chart.options.plugins?.title) {
            chart.options.plugins.title.color = textColor;
        }

        // scales
        if (chart.options.scales) {
            Object.keys(chart.options.scales).forEach((key) => {
                const scale = chart.options.scales[key];

                if (scale.ticks) {
                    scale.ticks.color = textColor;
                }

                if (scale.grid) {
                    scale.grid.color = gridColor;
                }

                if (scale.title) {
                    scale.title.color = textColor;
                }
            });
        }

        chart.update("none");
    }

    btnAll.addEventListener("click", async function () {
        try {
            const { jsPDF } = window.jspdf;

            if (!jsPDF) {
                alert("jsPDF belum load");
                return;
            }

            const pdf = new jsPDF("l", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();

            let isP2K3Download = true;
            let isSerikatDownload = true;
            let isSusuDownload = true;
            let isBipartitDownload = true;
            let isRencanaTKDownload = true;
            let isDisabilitasDownload = true;
            let isAhliK3Download = true;
            let isKBLIDownload = true;
            // 🔥 loading button
            btnAll.innerText = "Generating PDF...";
            btnAll.disabled = true;

            const now = new Date();
            const tanggal = now.toLocaleDateString("id-ID");
            const jam = now.toLocaleTimeString("id-ID");

            // =========================
            // KOP SURAT
            // =========================
            async function addKop() {
                const loadImage = (src) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => resolve(img);
                    });
                };

                const imgKiri = await loadImage("/images/kemnaker_logo.png");
                const imgKanan = await loadImage("/images/binwas.png");

                const imgWidth = 18;
                const imgHeight = 18;

                // kiri
                pdf.addImage(imgKiri, "PNG", 10, 5, imgWidth, imgHeight);

                // kanan
                pdf.addImage(
                    imgKanan,
                    "PNG",
                    pageWidth - 28,
                    5,
                    imgWidth,
                    imgHeight,
                );

                // text
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(14);
                pdf.text("KEMENTERIAN KETENAGAKERJAAN", pageWidth / 2, 12, {
                    align: "center",
                });

                pdf.setFontSize(11);
                pdf.text("LAPORAN DATA KETENAGAKERJAAN", pageWidth / 2, 18, {
                    align: "center",
                });

                // garis (lebih bawah biar ga nabrak)
                pdf.setLineWidth(0.7);
                pdf.line(10, 28, pageWidth - 10, 28);
            }

            function addFooter() {
                pdf.setFontSize(8);
                pdf.text(`Dicetak: ${tanggal} ${jam}`, pageWidth - 10, 200, {
                    align: "right",
                });
            }

            function addNarasi(judul) {
                const text = `Berdasarkan data yang tersedia, berikut merupakan visualisasi ${judul}. 
Data ini menggambarkan kondisi perusahaan terkait indikator tersebut sebagai bahan evaluasi.`;

                pdf.setFontSize(10);
                pdf.setFont("helvetica", "normal");
                pdf.text(text, 10, 40, { maxWidth: 270 });
            }

            // =========================
            // COVER
            // =========================
            await addKop();

            pdf.setFontSize(16);
            pdf.text("LAPORAN ANALISIS KETENAGAKERJAAN", pageWidth / 2, 60, {
                align: "center",
            });

            pdf.setFontSize(11);
            pdf.text(`Tanggal Cetak: ${tanggal} ${jam}`, pageWidth / 2, 70, {
                align: "center",
            });

            pdf.text(
                "Laporan ini berisi hasil visualisasi data ketenagakerjaan berdasarkan sistem WLKP. Data yang disajikan mencerminkan kondisi aktual perusahaan terkait berbagai indikator ketenagakerjaan secara komprehensif. Informasi ini diharapkan dapat menjadi dasar dalam pengambilan kebijakan serta evaluasi kinerja di bidang ketenagakerjaan.",
                pageWidth / 2,
                85,
                { align: "center", maxWidth: 200 },
            );

            await new Promise((r) => setTimeout(r, 800));

            // =========================
            // MAPPING CHART + TABEL
            // =========================
            const chartTableMap = [
                {
                    chartId: "barChart",
                    title: "Perusahaan",
                },
                { chartId: "provinsiChart", title: "Klasifikasi Perusahaan" },
                {
                    chartId: "klasifikasiChart",
                    title: "Klasifikasi Jenis Perusahaan",
                    table: "#tableKlasifikasi",
                    mode: "full",
                },
                {
                    chartId: "kbliChartCanvas",
                    title: "Data Lapangan Usaha",
                },
                {
                    chartId: "barChartKbli",
                    title: "Sebaran Tenaga Kerja Berdasarkan KBLI",
                    table: "#tableWrapperKbli",
                    mode: "full",
                },
                {
                    chartId: "tenagaKerjaProvChart",
                    title: "Data Tenaga Kerja per Provinsi",
                    table: "#tableProvinsiWrapper",
                    mode: "full",
                },
                {
                    chartId: "provinsiLineChartJaminan",
                    title: "Perusahaan",
                    table: "#bpjsTable",
                },
                {
                    chartId: "chartPPPKB",
                    title: "PPPKB",
                    table: "#tableProvinsiPPPKBWrapper",
                    mode: "full",
                    KBLIOnly: true,
                },
                // {
                //     chartId: "upahMinimumChart",
                //     title: "Upah Minimum",
                //     table: "#tableWrapperUpah",
                // },
                {
                    chartId: "barP2K3",
                    title: "P2K3",
                    table: "#tableP2K3Wrapper",
                    p2k3Only: true,
                },
                {
                    chartId: "barAhliK3",
                    title: "Ahli K3",
                    table: "#tableAhliK3Wrapper",
                    AhliK3Only: true,
                },
                {
                    chartId: "barDisabilitas",
                    title: "Tenaga Kerja Disabilitas",
                    table: "#tableDisabilitasWrapper",
                    DisabilitasOnly: true,
                },
                {
                    chartId: "barSusu",
                    title: "Struktur Skala Upah",
                    table: "#tableSusuWrapper",
                    SusuOnly: true,
                },
                {
                    chartId: "barSerikatPekerja",
                    title: "Serikat Pekerja",
                    table: "#tableSerikatWrapper",
                    SerikatOnly: true,
                },
                {
                    chartId: "barBipartitPekerja",
                    title: "LKS Bipartit",
                    table: "#tableBipartitWrapper",
                    BipartitOnly: true,
                },
                { chartId: "barWkwi", title: "Waktu Kerja & Istirahat" },
                {
                    chartId: "barPerencanaanTk",
                    title: "Perencanaan Tenaga Kerja",
                    table: "#tableRencanaTKWrapper",
                    RencanaTKOnly: true,
                },
            ];

            // =========================
            // LOOP CHART + TABEL
            // =========================
            for (let item of chartTableMap) {
                if (item.p2k3Only && !isP2K3Download) continue;
                if (item.SusuOnly && !isSusuDownload) continue;
                if (item.SerikatOnly && !isSerikatDownload) continue;
                if (item.BipartitOnly && !isBipartitDownload) continue;
                if (item.RencanaTKOnly && !isRencanaTKDownload) continue;
                if (item.DisabilitasOnly && !isDisabilitasDownload) continue;
                if (item.AhliK3Only && !isAhliK3Download) continue;
                if (item.KBLIOnly && !isKBLIDownload) continue;

                await new Promise((r) => setTimeout(r, 300));
                if (item.table === "#tableKlasifikasi") {
                    renderTabelKlasifikasi(
                        window.chartMasterData,
                        item.mode || "single",
                    );
                }

                pdf.addPage();
                await addKop();
                addFooter();

                pdf.setFontSize(12);
                pdf.text(item.title, 10, 35);

                addNarasi(item.title);

                const chart = Chart.getChart(item.chartId);

                if (chart) {
                    setChartThemeForPDF(chart);
                    const oldBg = chart.canvas.style.backgroundColor;
                    chart.canvas.style.backgroundColor = "#ffffff";
                    try {
                        const img = chart.toBase64Image("image/png", 1.5);
                        pdf.addImage(img, "PNG", 10, 70, 270, 90);
                    } catch (err) {
                        console.error("Error chart:", item.chartId, err);
                    } finally {
                        chart.canvas.style.backgroundColor = oldBg;
                    }
                } else {
                    const el = document.getElementById(item.chartId);

                    if (!el) {
                        console.warn("Element tidak ditemukan:", item.chartId);
                    } else {
                        try {
                            const clone = el.cloneNode(true);
                            clone
                                .querySelectorAll(".bar-label, .bar-value")
                                .forEach((label) => {
                                    label.style.color = "#111827";
                                });
                            const barCount =
                                clone.querySelectorAll(".bar").length;
                            const estimatedWidth = Math.max(
                                1600,
                                barCount * 65,
                            );

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

                            const canvas = await html2canvas(clone, {
                                scale: 2,
                                useCORS: true,
                                backgroundColor: "#ffffff",
                                width: estimatedWidth,
                                windowWidth: estimatedWidth,
                            });

                            const img = canvas.toDataURL("image/png");

                            pdf.addImage(img, "PNG", 10, 60, 270, 90);

                            document.body.removeChild(clone);
                        } catch (err) {
                            console.error(
                                "HTML chart error:",
                                item.chartId,
                                err,
                            );
                        }
                    }
                }
                let finalY;

                // 🔥 hitung posisi dari chart
                let chartBottomY = 70 + 90; // posisi chart kamu
                finalY = chartBottomY + 10;

                // =========================
                // TABEL DI BAWAH CHART
                // =========================
                if (item.table) {
                    if (item.table === "#tableProvinsiWrapper") {
                        renderTableProvinsi(item.mode || "full");
                    }
                    if (item.table === "#tableProvinsiPPPKBWrapper") {
                        renderTablePPPKB("full");
                    }
                    if (item.table === "#tableWrapperKbli") {
                        const tahun =
                            document.getElementById("filterKbliTahun")?.value ||
                            "";
                        const bulan =
                            document.getElementById("filterKbliBulan")?.value ||
                            "";
                        const prov =
                            document.getElementById("filterKbliProvinsi")
                                ?.value || "";
                        const kota =
                            document.getElementById("filterKbliKota")?.value ||
                            "";

                        const resTop = await fetch(
                            `/kbli/top-provinsi?tahun=${tahun}&bulan=${bulan}&provinsi=${prov}&kota=${kota}`,
                        );

                        const dataTop = await resTop.json();

                        renderTabelKbli(dataTop, "full");
                    }

                    const el = document.querySelector(item.table);

                    if (!el) {
                        console.warn(
                            "Tabel/Element tidak ditemukan:",
                            item.table,
                        );
                    } else {
                        // =========================
                        // KHUSUS BPJS TABLE
                        // =========================
                        if (item.table === "#bpjsTable") {
                            const rows = [];
                            const temp = [];

                            const bpjsRows = document.querySelectorAll(
                                "#bpjsTable .bpjs-row",
                            );

                            bpjsRows.forEach((row) => {
                                // skip yang ke-filter
                                if (row.offsetParent === null) return;

                                const provinsi =
                                    row.querySelector(".provinsi-name")
                                        ?.innerText || "";

                                const values = row.querySelectorAll(
                                    ".provinsi-values span",
                                );

                                // 🔥 ambil angka bersih
                                const jkk =
                                    parseInt(
                                        values[0]?.innerText.replace(/\D/g, ""),
                                    ) || 0;
                                const jht =
                                    parseInt(
                                        values[1]?.innerText.replace(/\D/g, ""),
                                    ) || 0;
                                const jkm =
                                    parseInt(
                                        values[2]?.innerText.replace(/\D/g, ""),
                                    ) || 0;
                                const jp =
                                    parseInt(
                                        values[3]?.innerText.replace(/\D/g, ""),
                                    ) || 0;

                                // 🔥 hitung total (buat sorting)
                                const total = jkk + jht + jkm + jp;

                                temp.push({
                                    provinsi,
                                    jkk,
                                    jht,
                                    jkm,
                                    jp,
                                    total,
                                });
                            });

                            // =========================
                            // 🔥 SORT TERBESAR → TERKECIL
                            // =========================
                            temp.sort((a, b) => b.total - a.total);

                            // =========================
                            // 🔥 CONVERT KE TABLE
                            // =========================
                            temp.forEach((item) => {
                                rows.push([
                                    item.provinsi,
                                    item.jkk.toLocaleString("id-ID"),
                                    item.jht.toLocaleString("id-ID"),
                                    item.jkm.toLocaleString("id-ID"),
                                    item.jp.toLocaleString("id-ID"),
                                ]);
                            });

                            // =========================
                            // 🔥 RENDER PDF TABLE
                            // =========================

                            pdf.autoTable({
                                head: [["Provinsi", "JKK", "JHT", "JKM", "JP"]],
                                body: rows,
                                startY: finalY,
                                margin: { top: 35 },
                                styles: {
                                    fontSize: 7,
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
                        }

                        // =========================
                        // TABLE HTML NORMAL
                        // =========================
                        else if (el.tagName === "TABLE") {
                            pdf.autoTable({
                                html: el,
                                startY: finalY,
                                margin: { top: 35 },
                                styles: { fontSize: 6 },
                            });
                        }

                        // =========================
                        // ADA TABLE DI DALAM DIV
                        // =========================
                        else {
                            const tableInside = el.querySelector("table");

                            if (tableInside) {
                                // 🔥 khusus title KBLI
                                if (item.table === "#tableWrapperKbli") {
                                    const judulText =
                                        document.getElementById(
                                            "judulTabelKbli",
                                        )?.innerText ||
                                        "TABEL DATA LAPANGAN KERJA BERDASARKAN KBLI";

                                    const lines = pdf.splitTextToSize(
                                        judulText,
                                        250,
                                    );

                                    // 🔥 cek kalau ruang halaman tidak cukup
                                    if (finalY > 165) {
                                        pdf.addPage();
                                        await addKop();
                                        addFooter();
                                        finalY = 40;
                                    }

                                    // 🔥 judul tepat di atas tabel
                                    pdf.setFontSize(11);
                                    pdf.setFont("helvetica", "bold");
                                    pdf.text(lines, 148, finalY, {
                                        align: "center",
                                    });

                                    finalY += lines.length * 6 + 4;
                                }

                                pdf.autoTable({
                                    html: tableInside,
                                    startY: finalY,
                                    margin: { top: 35 },
                                    styles: { fontSize: 6 },
                                    headStyles: { halign: "center" },
                                    didParseCell: function (data) {
                                        if (
                                            data.section === "body" &&
                                            data.row.index === 0
                                        ) {
                                            const text = data.cell.text
                                                .join("")
                                                .toLowerCase();

                                            if (
                                                text.includes("no") ||
                                                text.includes("tahun")
                                            ) {
                                                data.cell.text = "";
                                            }
                                        }
                                    },
                                });
                            }
                        }
                    }
                }
            }

            // =========================
            // SAVE
            // =========================
            const totalPages = pdf.internal.getNumberOfPages();

            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                await addKop();
                addFooter();
            }
            pdf.save("laporan-lengkap-ketenagakerjaan.pdf");
        } catch (err) {
            console.error("FATAL ERROR:", err);
            alert("Terjadi error, cek console!");
        } finally {
            btnAll.innerText = "Download full";
            btnAll.disabled = false;
        }
    });
});