



// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('provinsiLineChartJaminan');
//     const select = document.getElementById('provinsi');

//     if (!canvas || !select) return;

//     let chart;

//     function loadChart(provinsi = 'all') {
//         fetch(`/wlkp?provinsi=${provinsi}`, {
//             headers: { 'X-Requested-With': 'XMLHttpRequest' }
//         })
//         .then(res => res.json())
//         .then(data => {
//             if (chart) chart.destroy();

//             chart = new Chart(canvas, {
//                 type: 'line',
//                 data: {
//                     labels: data.labels,
//                     datasets: [
//                         { label: 'JKK', data: data.jkk },
//                         { label: 'JHT', data: data.jht },
//                         { label: 'JKM', data: data.jkm },
//                         { label: 'JP',  data: data.jp },
//                     ]
//                 },
//                 options: {
//                     responsive: true,
//                     scales: { y: { beginAtZero: true } }
//                 }
//             });
//         });
//     }

//     loadChart();

//     select.addEventListener('change', () => {
//         loadChart(select.value);
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('provinsiLineChartJaminan');
//     const select = document.getElementById('provinsi');

//     if (!canvas || !select) return;

//     let chart;

//     function loadChart(provinsi = 'all') {
//         fetch(`/wlkp?provinsi=${provinsi}`, {
//             headers: { 'X-Requested-With': 'XMLHttpRequest' }
//         })
//         .then(res => res.json())
//         .then(data => {
//             if (chart) chart.destroy();

//             chart = new Chart(canvas, {
//                 type: 'line',
//                 data: {
//                     labels: data.labels,
//                     datasets: [
//                         { label: 'JKK', data: data.jkk },
//                         { label: 'JHT', data: data.jht },
//                         { label: 'JKM', data: data.jkm },
//                         { label: 'JP',  data: data.jp },
//                     ]
//                 },
//                 options: {
//                     responsive: true,
//                     scales: { y: { beginAtZero: true } }
//                 }
//             });
//         });
//     }

//     // LOAD AWAL
//     loadChart();

//     select.addEventListener('change', () => {
//         loadChart(select.value);
//     });
// });




// document.addEventListener('DOMContentLoaded', () => {

//     /* ================= INIT CHART ================= */
//     if (!window.chartJaminanData) return;

//     const canvas = document.getElementById('provinsiLineChartJaminan');
//     if (!canvas) return;

//     window.jaminanChart = new Chart(canvas, {
//         type: 'line',
//         data: {
//             labels: window.chartJaminanData.labels,
//             datasets: [
//                 { label: 'JKK', data: window.chartJaminanData.jkk },
//                 { label: 'JHT', data: window.chartJaminanData.jht },
//                 { label: 'JKM', data: window.chartJaminanData.jkm },
//                 { label: 'JP',  data: window.chartJaminanData.jp },
//             ]
//         },
//         options: {
//             responsive: true,
//             scales: { y: { beginAtZero: true } }
//         }
//     });

//     /* ================= FILTER PROVINSI (AJAX) ================= */
//     const provinsiSelect = document.getElementById('provinsi');

//     if (provinsiSelect) {
//         provinsiSelect.addEventListener('change', function () {

//             const provinsi = this.value;

//             fetch(`/wlkp?provinsi=${provinsi}`, {
//                 headers: {
//                     'X-Requested-With': 'XMLHttpRequest'
//                 }
//             })
//             .then(res => res.json())
//             .then(data => {

//                 if (!window.jaminanChart) return;

//                 window.jaminanChart.data.labels = data.labels;
//                 window.jaminanChart.data.datasets[0].data = data.jkk;
//                 window.jaminanChart.data.datasets[1].data = data.jht;
//                 window.jaminanChart.data.datasets[2].data = data.jkm;
//                 window.jaminanChart.data.datasets[3].data = data.jp;

//                 window.jaminanChart.update();
//             })
//             .catch(err => console.error('AJAX Error:', err));
//         });
//     }

// });





// document.addEventListener('DOMContentLoaded', () => {
//     if (!window.chartJaminanData) return;

//     const canvas = document.getElementById('provinsiLineChart');
//     if (!canvas) return;

//     // 🔥 KONVERSI STRING → NUMBER
//     const labels = window.chartJaminanData.labels;
//     const jkk = window.chartJaminanData.jkk.map(Number);
//     const jht = window.chartJaminanData.jht.map(Number);
//     const jkm = window.chartJaminanData.jkm.map(Number);
//     const jp  = window.chartJaminanData.jp.map(Number);

//     console.log('JKK:', jkk); // pastikan number

//     new Chart(canvas, {
//         type: 'line',
//         data: {
//             labels: labels,
//             datasets: [
//                 { label: 'JKK', data: jkk },
//                 { label: 'JHT', data: jht },
//                 { label: 'JKM', data: jkm },
//                 { label: 'JP',  data: jp },
//             ]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: { position: 'bottom' }
//             },
//             scales: {
//                 y: { beginAtZero: true }
//             }
//         }
//     });
// });



// document.addEventListener('DOMContentLoaded', () => {
//     if (!window.chartJaminanData) return;

//     const canvas = document.getElementById('provinsiLineChart');
//     if (!canvas) return;

//     new Chart(canvas, {
//         type: 'line',
//         data: {
//             labels: window.chartJaminanData.labels,
//             datasets: [
//                 { label: 'JKK', data: window.chartJaminanData.jkk },
//                 { label: 'JHT', data: window.chartJaminanData.jht },
//                 { label: 'JKM', data: window.chartJaminanData.jkm },
//                 { label: 'JP',  data: window.chartJaminanData.jp },
//             ]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: { position: 'bottom' }
//             },
//             scales: {
//                 y: { beginAtZero: true }
//             }
//         }
//     });
// });

