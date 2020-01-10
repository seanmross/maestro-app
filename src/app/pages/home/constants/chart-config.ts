export class ChartConfig {
    constructor(episodeDuration: number, data: any[]) {
        this.chartJSConfig.options.scales.xAxes[0].ticks.max = episodeDuration;
        // this.chartJSConfig.data.datasets[0].fillColor = fillColor;
        this.chartJSConfig.options.plugins.zoom.pan.rangeMax.x = episodeDuration;
        this.chartJSConfig.options.plugins.zoom.zoom.rangeMax.x = episodeDuration;
        this.chartJSConfig.data.datasets[0].data = data;
    }

    get config() {
        return this.chartJSConfig;
    }

    updateData(data: any[]) {
        this.chartJSConfig.data.datasets[0].data = data;
    }

    chartJSConfig = {
        type: 'scatter',
        data: {
            datasets: [{
                data: [],
                fillColor: '',
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: 'hsla(200, 50%, 70%, 0.4)'
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
                        max: null,
                        precision: 0,
                        display: false
                    },
                    gridLines: {
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
                            x: null,
                        },
                    },
                    zoom: {
                        enabled: true,
                        mode: 'x',
                        rangeMin: {
                            x: 0,
                        },
                        rangeMax: {
                            x: null,
                        },
                        speed: 0.05
                    }
                }
            },
        },
    }
}
