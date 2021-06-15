<template>
    <vue-apex-charts
        :type="type"
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
            type: {
                type: String,
                default: 'area'
            },
            label: {
                type: String,
                default: 'Total'
            },
            data: {
                type: Array,
                default: () => []
            },
            mainColor: {
                type: String,
                default: '#5578EB'
            },
            altColor: {
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
                    dataLabels: {
                        enabled: false
                    },
                    colors: [this.mainColor],
                    stroke: {
                        curve: 'smooth'
                    },
                    grid: {
                        show: false,
                        padding: {
                            bottom: 3,
                            top: 5
                        }
                    },
                    tooltip: {
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Poppins'
                        },
                        x: {
                            formatter: (value, series) => {
                                return moment(this.data[series.dataPointIndex].x).format("MMM 'YY");
                            }
                        },
                        y: {
                            formatter: (value) => typeof this.formatter === 'function' ? this.formatter(value) : value
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
                            show: false
                        }
                    },
                    yaxis: {
                        labels: {
                            show: false
                        }
                    },
                    markers: {
                        size: 0.01,
                        colors: this.altColor,
                        strokeColors: this.mainColor,
                        strokeWidth: 3,
                        strokeOpacity: 1,
                        strokeDashArray: 10,
                        fillOpacity: 1,
                        discrete: [],
                        shape: "circle",
                        offsetX: 0,
                        offsetY: 0,
                        hover: {
                            sizeOffset: 6
                        }
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: '20%',
                            borderRadius: 15
                        }
                    }
                },
                series: [
                    {
                        name: this.label,
                        data: this.data
                    }
                ]
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
