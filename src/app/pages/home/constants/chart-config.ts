export const chartConfig = {
    type: 'scatter',
    data: {
        datasets: [{
            data: [{
                x: 12,
                y: 1
            }, 
            {
                x: 24,
                y: 1
            }, 
            {
                x: 72,
                y: 1
            }],
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: 'hsla(130, 70%, 70%, 0.4)'
        }]
    },
    options: {
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                ticks: {
                    min: 0,
                    max: 4333,
                    precision: 0,
                    display: false
                },
                gridLines: {
                    // display: false,
                    drawTicks: false,
                    drawBorder: false
                },
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 2,
                    stepSize: 2,
                    display: false
                },
                gridLines: {
                    display: false,
                    drawTicks: false,
                    drawBorder: false
                },
            }]
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    rangeMin: {
                        x: 0,
                    },
                    rangeMax: {
                        x: 4333,
                    },
                },
                zoom: {
                    enabled: true,
                    mode: 'x',
                    rangeMin: {
                        x: 0,
                    },
                    rangeMax: {
                        x: 4333,
                    },
                    speed: 0.05
                }
            }
        },  
    },
}