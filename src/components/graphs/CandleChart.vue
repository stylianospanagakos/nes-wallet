<template>
    <vue-apex-charts
        type="candlestick"
        :options="options"
        :series="series"
    >
    </vue-apex-charts>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts';

    export default {
        props: {
            label: {
                type: String,
                default: 'Total'
            },
            data: {
                type: Array,
                default: () => []
            },
            upColor: {
                type: String,
                default: '#5578EB'
            },
            downColor: {
                type: String,
                default: '#E1EDD9'
            },
            formatter: {
                type: [Function, null],
                default: null
            }
        },
        data() {
            return {
                options:  {
                    chart: {
                        toolbar: {
                            show: false
                        },
                        sparkline: {
                            enabled: true
                        }
                    },
                    candlestick: {
                        colors: {
                            upward: this.upColor,
                            downward: this.downColor
                        }
                    },
                    stroke: {
                        width: 2
                    },
                    tooltip: {
                        enabled: true,
                        custom: function({ seriesIndex, dataPointIndex, w }) {
                            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
                            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
                            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
                            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
                            return (
                            '<div class="apexcharts-tooltip-candlestick" style="font-size:0.7rem;">' +
                            '<div>O: <span class="value">' +
                            o +
                            '</span></div>' +
                            '<div>H: <span class="value">' +
                            h +
                            '</span></div>' +
                            '<div>L: <span class="value">' +
                            l +
                            '</span></div>' +
                            '<div>C: <span class="value">' +
                            c +
                            '</span></div>' +
                            '</div>'
                            )
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    grid: {
                        show: false,
                        padding: {
                            bottom: 3,
                            top: 5
                        }
                    },
                    xaxis: {
                        labels: {
                            show: false
                        },
                        tooltip: {
                            enabled: false
                        },
                        crosshairs: {
                            show: true
                        }
                    },
                    yaxis: {
                        tooltip: {
                            enabled: false
                        },
                        labels: {
                            show: false
                        }
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '20%'
                        }
                    }
                },
                series: [{
                    data: this.data
                }]
            }
        },
        components: {
            VueApexCharts
        }
    }
</script>

<style>
    .apexcharts-tooltip.apexcharts-theme-light {
        box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
        border: 0!important;
    }
    .apexcharts-tooltip-title {
        background: #f3f6f9!important;
    }
    .apexcharts-tooltip-title, .apexcharts-tooltip-text {
        border: 0!important;
        color: #48465b;
        font-weight: 400;
    }
</style>
