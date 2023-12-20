<template>
    <div style="width:100%">
        <v-chart autoresize :option="option_column" class="bar-chart"></v-chart>
    </div>
</template>

<script>
    export default {
        name: 'BarChart',
        data() {
            return {
                xData: [],
                // xValues: [75, 20, 16],
                xValues: [],
                option_column: {
                    title: {text: ""},
                    color: ['#439554'],
                    barWidth: 20,//柱子宽度
                    barGap: 100,//柱子间距,
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                    toolbox: {                        //工具栏
                        show: false,
                        feature: {
                            dataView: {readOnly: true},
                            magicType: {type: ["line", "bar"]},
                            saveAsImage: {},
                        },
                    },
                    grid: {
                        // left: "2.8%",
                        // right: "0.5%",
                        // bottom: "6%",
                    },
                    xAxis: {
                        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                        data: [],
                        axisLabel: {
                            interval: '0',
                            // margin:'10',
                            // rotate: '30',//显示不完整的解决办法1
                            formatter: function (value) {  //设置标签显示格式，显示不完整的解决办法2
                                var arr = value.split("");  //标签内容拆分数组
                                var str = "";
                                for (var i = 0; i < arr.length; i++) { //循环遍历
                                    if (i !== 0 && i % 4 == 0) {  //隔3换行
                                        str = str + "\n";
                                    }
                                    str = str + arr[i]; //字符叠加
                                }
                                return str;
                            }
                        }
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "人次",
                            type: "bar",
                            // data: [5, 20, 36, 10, 10, 20],
                            data: [],
                            itemStyle: {//柱状图上方显示数值
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: 'top', //在上方显示
                                        textStyle: { //数值样式
                                            color: 'black',
                                            fontSize: 16
                                        }
                                    }
                                }
                            },
                        },
                    ],
                },
            };
        },
        props: {
            pageData: {
                type: Object,
                default: () => [],
            },
        },
        watch: {
            pageData: {
                // eslint-disable-next-line prettier/prettier
                handler: function () {
                    this.init()
                },
                immediate: true
            }
        },
        methods: {
            init() {
                this.xData = [];
                this.xValues = [];
                this.xData = ["为军服务门诊接诊数量", "为军服务住院收治数量", "为军服务网络接诊数量"];
                this.xValues = [this.pageData.MILITARY_VISITS_NUM, this.pageData.MILITARY_INPATIENTS_NUM, this.pageData.ONLINE_CONSULTATION_JR];
                this.option_column.xAxis.data = this.xData;
                this.option_column.series[0].data = this.xValues;

            },

            handleOperationName(val) {
                var arr = [""];
                if (val) {
                    if (val.toString().split("|").length == 2) {
                        arr = val.split("|")
                    } else {
                        return ""
                    }
                }

                return arr[0]
            },
            handleOperationNum(val) {
                var arr = [""];
                if (val) {
                    if (val.toString().split("|").length == 2) {
                        arr = val.split("|")
                    }
                }
                return arr[1]
            }
        }
    };
</script>

<style scoped lang="scss">
    .bar-chart {
        height: 420px;
        width: 100%;
        color: #ffffff !important;
    }
</style>
