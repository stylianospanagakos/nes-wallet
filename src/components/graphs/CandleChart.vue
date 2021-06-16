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
    import moment from 'moment';

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
                        width: 1,
                    },
                    tooltip: {
                        enabled: true,
                        custom: function({ seriesIndex, dataPointIndex, w }) {
                            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
                            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
                            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
                            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
                            return (
                                `<div class="apexcharts-tooltip-candlestick">
                                    <div class="apexcharts-tooltip-candlestick__header apexcharts-tooltip-title p-2">
                                        ${w.globals.categoryLabels[dataPointIndex]}
                                    </div>
                                    <div class="apexcharts-tooltip-candlestick__body p-2">
                                        <div class="apexcharts-tooltip-text">Open: <span>${o}</span></div>
                                        <div class="apexcharts-tooltip-text">High: <span>${h}</span></div>
                                        <div class="apexcharts-tooltip-text">Low: <span>${l}</span></div>
                                        <div class="apexcharts-tooltip-text">Close: <span>${c}</span></div>
                                    </div>
                                </div>`
                            );
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
                            formatter: function(val) {
                                return moment(val).format("DD MMM 'YY");
                            }
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
    .apexcharts-tooltip-candlestick__header, .apexcharts-tooltip-candlestick__body {
        font-size: 12px;
    }
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
