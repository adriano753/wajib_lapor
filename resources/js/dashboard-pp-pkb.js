document.addEventListener('DOMContentLoaded', function () {
    // 1. Cek Data
    if (!window.chartData || !window.chartData.PPPKBValues) {
        console.warn('Data PP & PKB tidak ditemukan.');
        return;
    }

    const rawData = window.chartData.PPPKBValues;

    // 2. Mapping Data
    const categories = rawData.map(item => item.provinsi);
    const dataPPAda    = rawData.map(item => parseInt(item.pp_ada));
    const dataPPTidak  = rawData.map(item => parseInt(item.pp_tidak_ada));
    const dataPKBAda   = rawData.map(item => parseInt(item.pkb_ada));
    const dataPKBTidak = rawData.map(item => parseInt(item.pkb_tidak_ada));

    // 3. Konfigurasi Chart.js
    const ctx = document.getElementById('chartPPPKB').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [
                // --- GRUP 1: PP (Peraturan Perusahaan) ---
                {
                    label: 'PP - Ada',
                    data: dataPPAda,
                    backgroundColor: '#28a745', // Hijau
                    stack: 'Stack 0', // KUNCI: Grouping ID 0
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'PP - Belum Ada',
                    data: dataPPTidak,
                    backgroundColor: '#dc3545', // Merah
                    stack: 'Stack 0', // KUNCI: Gabung dengan ID 0
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },

                // --- GRUP 2: PKB (Perjanjian Kerja Bersama) ---
                {
                    label: 'PKB - Ada',
                    data: dataPKBAda,
                    backgroundColor: '#007bff', // Biru
                    stack: 'Stack 1', // KUNCI: Grouping ID 1 (Sebelahnya)
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                },
                {
                    label: 'PKB - Belum Ada',
                    data: dataPKBTidak,
                    backgroundColor: '#ffc107', // Kuning
                    stack: 'Stack 1', // KUNCI: Gabung dengan ID 1
                    barPercentage: 0.8,
                    categoryPercentage: 0.9
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Agar mengikuti tinggi div container
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Perbandingan Status Kepatuhan PP & PKB per Provinsi',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        footer: function(tooltipItems) {
                            let total = 0;
                            tooltipItems.forEach(function(tooltipItem) {
                                total += tooltipItem.parsed.y;
                            });
                            return 'Total: ' + total.toLocaleString('id-ID');
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: true, // Aktifkan tumpukan di sumbu X
                    ticks: {
                        autoSkip: false,
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    stacked: true, // Aktifkan tumpukan di sumbu Y
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Jumlah Perusahaan'
                    }
                }
            }
        }
    });
});