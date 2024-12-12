/**
* Rule the words! KKuTu Online
* Copyright (C) 2024~ Studio Moremi(op@kkutu.store)
**/
let currentChartType = 'win';
let chartInstance = null;

async function renderChart(type) {
    const userId = document.getElementById('user-id').dataset.userId;
    const response = await fetch(`/api/chart-data?user_id=${userId}&type=${type}`);

    if (!response.ok) {
        console.error('Failed to fetch chart data');
        return;
    }

    const data = await response.json();
    const ctx = document.getElementById('chart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: type === 'win' ? '월당 승률 (%)' : '월당 패률 (%)',
                data: data.values,
                borderColor: type === 'win' ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)',
                backgroundColor: type === 'win' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

document.getElementById('toggle-chart').addEventListener('click', () => {
    currentChartType = currentChartType === 'win' ? 'lose' : 'win';
    renderChart(currentChartType);

    document.getElementById('toggle-chart').textContent = 
        currentChartType === 'win' ? '패률 그래프 보기' : '승률 그래프 보기';
});

document.addEventListener('DOMContentLoaded', () => {
    renderChart(currentChartType);
});
