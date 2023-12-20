<template>
    <div class="CustomNumber" ref="chart"></div>
</template>

<script>
    import CustomNumber from "./js/CustomNumber";

    export default {
        name: "CustomNumber",
        props: {
            icon: {
                type: String,
                default: ""
            },
            value: {
                type: String,
                default: ""
            },
            max: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.dataHandle()
        },
        watch: {
            value: {
                handler: "dataHandle",
                // immediate: true,
                // deep: true
            }
        },
        methods: {
            dataHandle() {
                this.chart = new CustomNumber(this.$refs.chart);
                // const max = this.value + Math.pow(0,this.value.toString().length);
                const max = this.max;
                // console.log("max",max);
                const chartOpt = {
                    max,
                    series: [
                        {
                            // current data
                            data: [this.value],

                            type: 'pictorialBar',
                            symbol: this.icon,
                            symbolRepeat: 'fixed',
                            symbolMargin: '20%',
                            symbolClip: true,
                            symbolSize: [13, 32],
                            symbolPosition: 'center',
                            symbolOffset: [0, '30%'],
                            symbolBoundingData: max,
                            markLine: {
                                symbol: 'none',
                                label: {
                                    formatter: 'max: {c}',
                                    position: 'start',
                                    show: false
                                },
                                lineStyle: {
                                    color: 'green',
                                    type: 'dotted',
                                    opacity: 0.2,
                                    width: 0
                                },
                                data: [
                                    {
                                        type: 'max'
                                    }
                                ]
                            },
                            z: 10
                        },
                        /*{
                          // full data
                          type: 'pictorialBar',
                          itemStyle: {
                            opacity: 0.2
                          },
                          label: {
                            show: false,
                            position: 'right',
                            offset: [10, 0],
                            color: 'green',
                            fontSize: 18
                          },
                          animationDuration: 0,
                          symbolRepeat: 'fixed',
                          symbolMargin: '20%',
                          symbol: this.icon,
                          symbolSize: [13,27],
                          symbolBoundingData: max,
                          data: [this.value],
                          z: 5
                        }*/
                    ]
                }
                this.chart.render(chartOpt)
            }
        }
    };
</script>

<style lang="scss" scoped>
    .CustomNumber {
        height: 66px;
    }
</style>
