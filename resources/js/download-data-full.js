document.addEventListener("DOMContentLoaded", function () {
    const btnAll = document.getElementById("downloadPdfAll");

    if (!btnAll) return;

    btnAll.addEventListener("click", async function () {
        try {
            const { jsPDF } = window.jspdf;

            if (!jsPDF) {
                alert("jsPDF belum load");
                return;
            }

            const pdf = new jsPDF("l", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();

            // 🔥 loading button
            btnAll.innerText = "Generating PDF...";
            btnAll.disabled = true;

            const now = new Date();
            const tanggal = now.toLocaleDateString("id-ID");
            const jam = now.toLocaleTimeString("id-ID");

            // =========================
            // 🏢 KOP
            // =========================
            function addKop() {
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(14);
                pdf.text("KEMENTERIAN KETENAGAKERJAAN", pageWidth / 2, 10, {
                    align: "center",
                });

                pdf.setFontSize(11);
                pdf.text("LAPORAN DATA KETENAGAKERJAAN", pageWidth / 2, 16, {
                    align: "center",
                });

                pdf.setLineWidth(0.5);
                pdf.line(10, 20, pageWidth - 10, 20);
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
                pdf.text(text, 10, 30, { maxWidth: 270 });
            }

            // =========================
            // 📄 COVER
            // =========================
            addKop();

            pdf.setFontSize(16);
            pdf.text("LAPORAN ANALISIS KETENAGAKERJAAN", pageWidth / 2, 60, {
                align: "center",
            });

            pdf.setFontSize(11);
            pdf.text(`Tanggal Cetak: ${tanggal} ${jam}`, pageWidth / 2, 70, {
                align: "center",
            });

            pdf.text(
                "Laporan ini berisi hasil visualisasi data ketenagakerjaan berdasarkan sistem WLKP.",
                pageWidth / 2,
                85,
                { align: "center", maxWidth: 200 },
            );

            // 🔥 tunggu chart siap
            await new Promise((r) => setTimeout(r, 800));

            // =========================
            // 🔥 MAPPING CHART + TABEL
            // =========================
            const chartTableMap = [
                {
                    chartId: "barChart",
                    title: "Perusahaan",
                    table: "#tableProvinsilprWrapper",
                },
                { chartId: "provinsiChart", title: "Klasifikasi Perusahaan" },
                {
                    chartId: "klasifikasiChart",
                    title: "Klasifikasi Jenis Perusahaan",
                    table: "#tableKlasifikasi",
                },
                {
                    chartId: "kbliChartCanvas",
                    title: "Data Lapangan Usaha",
                    table: "#tableWrapperKbli",
                },
                {
                    chartId: "tenagaKerjaProvChart",
                    title: "Data Tenaga Kerja per Provinsi",
                    table: "#tableProvinsiWrapper",
                },
                {
                    chartId: "barChartKbli",
                    title: "Sebaran Tenaga Kerja Berdasarkan KBLI",
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
                },
                {
                    chartId: "upahMinimumChart",
                    title: "Upah Minimum",
                    table: "#tableWrapperUpah",
                },
                { chartId: "barAhliK3", title: "Ahli K3" },
                {
                    chartId: "barDisabilitas",
                    title: "Tenaga Kerja Disabilitas",
                },
                { chartId: "barSusu", title: "Struktur Skala Upah" },
                { chartId: "barSerikatPekerja", title: "Serikat Pekerja" },
                { chartId: "barBipartitPekerja", title: "LKS Bipartit" },
                { chartId: "barWkwi", title: "Waktu Kerja & Istirahat" },
                {
                    chartId: "barPerencanaanTk",
                    title: "Perencanaan Tenaga Kerja",
                    table: "#tabelProvinsiKetenagakerjaan",
                },
            ];

            // =========================
            // 🔥 LOOP CHART + TABEL
            // =========================
            for (let item of chartTableMap) {
                // ⏳ delay biar smooth
                await new Promise((r) => setTimeout(r, 300));

                pdf.addPage();
                addKop();
                addFooter();

                pdf.setFontSize(12);
                pdf.text(item.title, 10, 25);

                addNarasi(item.title);

                const chart = Chart.getChart(item.chartId);

                // =========================
                // ✅ CASE 1: Chart.js
                // =========================
                if (chart) {
                    try {
                        const img = chart.toBase64Image("image/png", 1.5);
                        pdf.addImage(img, "PNG", 10, 60, 270, 90);
                    } catch (err) {
                        console.error("Error chart:", item.chartId, err);
                    }
                }

                // =========================
                // ✅ CASE 2: HTML (barChart kamu)
                // =========================
                else {
                    const el = document.getElementById(item.chartId);

                    if (!el) {
                        console.warn("Element tidak ditemukan:", item.chartId);
                    } else {
                        try {
                            const clone = el.cloneNode(true);

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

                // =========================
                // 📋 TABEL DI BAWAH CHART
                // =========================
                if (item.table) {
                    const el = document.querySelector(item.table);

                    if (!el) {
                        console.warn(
                            "Tabel/Element tidak ditemukan:",
                            item.table,
                        );
                    } else {
                        // =========================
                        // 🔥 KHUSUS BPJS TABLE
                        // =========================
                        if (item.table === "#bpjsTable") {
                            const rows = [];
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

                                rows.push([
                                    provinsi,
                                    values[0]?.innerText.replace("JKK: ", "") ||
                                        "0",
                                    values[1]?.innerText.replace("JHT: ", "") ||
                                        "0",
                                    values[2]?.innerText.replace("JKM: ", "") ||
                                        "0",
                                    values[3]?.innerText.replace("JP: ", "") ||
                                        "0",
                                ]);
                            });

                            pdf.autoTable({
                                head: [["Provinsi", "JKK", "JHT", "JKM", "JP"]],
                                body: rows,
                                startY: 155,
                                styles: { fontSize: 7 },
                                headStyles: { fillColor: [220, 53, 69] },
                            });
                        }

                        // =========================
                        // ✅ TABLE HTML NORMAL
                        // =========================
                        else if (el.tagName === "TABLE") {
                            pdf.autoTable({
                                html: el,
                                startY: 155,
                                styles: { fontSize: 6 },
                            });
                        }

                        // =========================
                        // ✅ ADA TABLE DI DALAM DIV
                        // =========================
                        else {
                            const tableInside = el.querySelector("table");

                            if (tableInside) {
                                pdf.autoTable({
                                    html: tableInside,
                                    startY: 155,
                                    styles: { fontSize: 6 },
                                });
                            } else {
                                // fallback (gambar)
                                try {
                                    const canvas = await html2canvas(el, {
                                        scale: 2,
                                        useCORS: true,
                                    });

                                    const img = canvas.toDataURL("image/png");
                                    pdf.addImage(img, "PNG", 10, 155, 270, 40);
                                } catch (err) {
                                    console.error(
                                        "Gagal render element:",
                                        item.table,
                                        err,
                                    );
                                }
                            }
                        }
                    }
                }
            }

            // =========================
            // 💾 SAVE
            // =========================
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
