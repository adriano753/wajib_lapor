document.addEventListener('DOMContentLoaded', () => {

    const ctx = document.getElementById('bpjsBarChart');
    if (!ctx) return;

    let bpjsChart = null;

    async function fetchBpjsData() {
        const provinsi = document.getElementById('filterProvinsi').value;
        const satuan   = document.getElementById('filterSatuan').value;

        const url = `${BPJS_FILTER_URL}?provinsi=${provinsi}&satuan=${satuan}`;

        const res = await fetch(url);
        return await res.json();
    }

    function buildDatasets(data) {
        if (!data.length) return [];

        const keys = ['jkk', 'jht', 'jkm', 'jp'];
        const labelsMap = {
            jkk: 'JKK',
            jht: 'JHT',
            jkm: 'JKM',
            jp: 'JP'
        };

        return keys
            .filter(k => data[0][k] !== undefined)
            .map(k => ({
                label: labelsMap[k],
                data: data.map(d => Number(d[k])),
                barThickness: 28,
                maxBarThickness: 40,
            }));
    }

    function renderChart(data) {
        const labels = data.map(d => d.provinsi);
        const datasets = buildDatasets(data);

        if (bpjsChart) {
            bpjsChart.destroy();
        }

        bpjsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: ctx =>
                                `${ctx.dataset.label}: ${ctx.raw.toLocaleString()}`
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 30
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false
                        }
                    }
                }
            }
        });
    }

    async function applyFilter() {
        const data = await fetchBpjsData();
        renderChart(data);
    }

    document.getElementById('filterProvinsi').addEventListener('change', applyFilter);
    document.getElementById('filterSatuan').addEventListener('change', applyFilter);

    // LOAD AWAL
    applyFilter();
});
