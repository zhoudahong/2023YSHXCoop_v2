<template>
    <div style="width:100%">
        <v-chart autoresize :option="option_column" class="pie-chart"></v-chart>
    </div>
</template>

<script>
    export default {
        name: 'PieChart',
        data() {
            return {
                data: [],
                option_column: {
                    // title: {text: "本年度救治疾病分布"},
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)' // 具体a b c d 代表的属性看下面注释啦
                    },
                    grid: {
                        // left: "-2%",
                        // right: "2%",
                        // bottom: "2%",
                        // top: "2%"
                    },
                    series: [
                        {
                            name: '', // formatter 中的a
                            type: 'pie',
                            radius: '90%',
                            center: ['50%', '50%'],
                            /*data: [
                                {value: "", name: '', itemStyle: {color: '#5de38f'}},
                                {value: "", name: '', itemStyle: {color: '#67d7e3'}},
                                {value: "", name: '', itemStyle: {color: '#ff972d'}},
                            ], */
                            data: [],
                            // data 中的name为formatter中的 b；data中的value呢就是formatter中c；至于d就是Echarts计算出来的百分比啦；itemStyle:为饼图每个扇形的颜色；label为指示线后面的文字的样式，labelLine为指示线的颜色
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontWeight: 400,
                                        fontSize: 12 // 文字的字体大小
                                    },
                                    color: 'inherit',
                                    formatter: '{b} \n {c}人({d}%)', // 这里为指示线后面的提示信息，这里的换行要用\n 与上面tooltips中的formatter换行不同滴
                                    // formatter: params => {
                                    //     // console.log(params)
                                    //     return `${params.name}\n{${params.value} 人}`
                                    // },
                                    formatter: (e) => {
                                        let newStr = " "
                                        let start = 0//开始截取位置
                                        let end = 0//截取结束位置
                                        const name_len = e.name.length //每个内容名称的长度
                                        const max_name = 5//每行显示的最大长度
                                        const new_row = Math.ceil(name_len / max_name)//显示行数
                                        if (name_len > max_name) { //如果名称长度大于每行最大显示长度，则
                                            for (let i = 0; i < new_row; i++) { //循环行数
                                                let old = ''//每次截取的字符
                                                start = i * max_name//截取的起点
                                                end = start + max_name//截取的终点
                                                if (i == new_row - 1) { //如果是最后一行
                                                    old = e.name.substring(start)
                                                } else {
                                                    old = e.name.substring(start, end) + "\n"//截取内容加换行
                                                }
                                                newStr += old//拼接字符串
                                            }
                                        } else { //否则不变显示
                                            newStr = e.name
                                        }
                                        // return '' + newStr + '\n' + e.value + '%' + ''
                                        return '' + newStr + '： ' + e.value + '%' + ''
                                    },

                                    position: 'outer',
                                    alignTo: 'edge',
                                    margin: 2,
                                    padding: [0, 0],
                                    labelLayout: {
                                        hideOverlap: false
                                    },
                                }
                            },
                            labelLine: { //label线的长度
                                show: true, //数据标签引导线
                                normal: {
                                    show: true,
                                    length: -18, // 改变标示线的长度
                                    length2: 20,
                                    smooth: 0.2,
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
            };
        },
        props: {
            pageData: {
                type: Object,
                default: () => [],
            },
            chartType: {
                type: String,
                default: () => "",
            }
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
                /* this.data = [this.pageData.FIRST_DISEASES, this.pageData.SECOND_DISEASES, this.pageData.THIRD_DISEASES];
                 var dataArr;
                 for (let i = 0; i < this.data.length - 1; i++) {
                     dataArr[i] = {
                         name: this.data[i].split("|")[0],
                         value: this.data[i].split("|")[1],
                     }
                 }
                 console.log("dataArr",dataArr)
                 this.option_column.series[0].data = this.data;
 */


                if (this.chartType == "") {
                    var dataArr = [
                        {
                            name: this.pageData.FIRST_DISEASES.split("|")[0],
                            value: this.pageData.FIRST_DISEASES.split("|")[1]
                        },
                        {
                            name: this.pageData.SECOND_DISEASES.split("|")[0],
                            value: this.pageData.SECOND_DISEASES.split("|")[1]
                        },
                        {
                            name: this.pageData.THIRD_DISEASES.split("|")[0],
                            value: this.pageData.THIRD_DISEASES.split("|")[1]
                        }]
                    this.option_column.series[0].data = dataArr;
                } else if (this.chartType == 'surgeryRate') {
                    var dataArr = [
                        {
                            name: '一二级手术率',
                            value: (100 - parseFloat(this.pageData.THIRD_AND_FOURTH_SURGERIES)).toFixed(2)
                        },
                        {
                            name: '三四级手术率',
                            value: parseFloat(this.pageData.THIRD_AND_FOURTH_SURGERIES).toFixed(2)
                        },
                    ]
                    this.option_column.series[0].data = dataArr;
                }
            },
        }
    };
</script>

<style scoped lang="scss">
    .pie-chart {
        height: 110px;
        width: 100%;
        color: #ffffff !important;
    }
</style>
