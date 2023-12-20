<template>
    <div style="width:100%">
        {{circleList}}
        <v-chart autoresize :option="option_column" class="ciecle-chart"></v-chart>
    </div>
</template>

<script>
    import {fontChart, fontChartDpr, transformDigital} from '@/lib/utils'

    const setLabel = (bgcolor = '#60C2D1') => {
        return {
            formatter: '  {b|{b} }{n|{c}}',
            height: fontChartDpr(24),
            // backgroundColor: '#F2F2F2',
            borderWidth: 0,
            borderRadius: fontChart(12),
            padding: 0,
            align: 'left',
            backgroundColor: '#F2F2F2',
            rich: {
                b: {
                    fontSize: fontChartDpr(12),
                    lineHeight: fontChartDpr(24),
                    height: fontChartDpr(24),
                    color: '#8B929E'
                },
                n: {
                    fontSize: fontChartDpr(16),
                    height: fontChartDpr(24),
                    lineHeight: fontChartDpr(24),
                    align: 'right',
                    color: '#fff',
                    backgroundColor: bgcolor,
                    padding: [0, fontChartDpr(9)],
                    borderWidth: 0,
                    borderRadius: fontChartDpr(12)
                }
            }
        }
    }
    export default {
        name: 'CircleChart',
        props: {
            circleList: {
                type: Array,
                default: () => {
                    return []
                    /*return {
                        OUTPATIENTS_NUM_IN_CITY: null,//市内门诊患者数量
                        OUTPATIENTS_NUM_OUTSIDE_CITY: null,//市外门诊患者数量,
                        INSURANCE_OUTPATIENTS: null,//门诊医保患者占比
                    }*/
                }
            }
        },
        data() {
            return {
                option_column: {
                    title: {
                        text: '',
                        left: 'center',
                        top: 'middle',
                        textVerticalAlign: 'top',
                        textStyle: {
                            color: '#556371',
                            fontSize: fontChartDpr(18),
                            lineHeight: fontChartDpr(18)
                        },
                        subtext: '门诊医保\n患者占比\n' + this.circleList[1],
                        subtextStyle: {
                            color: '#666666',
                            fontSize: fontChartDpr(12),
                            lineHeight: fontChartDpr(18)
                        }
                    },
                    color: ['#50CC88', '#FCC02E', '#60C2D1', '#C175F2'],
                    avoidLabelOverlap: true,
                    series: [
                        {
                            name: '', // formatter 中的a
                            type: 'pie',
                            radius: ['60%', '85%'],
                            center: ['50%', '50%'],
                            data: [
                                {value: this.circleList[0], name: '市内门诊患者占比', itemStyle: {color: '#50CC88'}},
                                {value: this.circleList[2], name: '市外门诊患者占比', itemStyle: {color: '#FCC02E'}},
                            ], // data 中的name为formatter中的 b；data中的value呢就是formatter中c；至于d就是Echarts计算出来的百分比啦；itemStyle:为饼图每个扇形的颜色；label为指示线后面的文字的样式，labelLine为指示线的颜色
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
                    /*series: [
                        {
                            name: '门诊医保患者占比',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            silent: false, // 图形不响应和触发鼠标事件
                            animation: false,
                            // fontSize: 40,
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        fontWeight: 400,
                                        fontSize: 12 // 文字的字体大小
                                    },
                                    color: 'inherit',
                                    // formatter: '{b} \n {c}人({d}%)', // 这里为指示线后面的提示信息，这里的换行要用\n 与上面tooltips中的formatter换行不同滴
                                    // formatter: params => {
                                    //     // console.log(params)
                                    //     return `${params.name}\n{${params.value} 人}`
                                    // },
                                    formatter: (e) => {
                                        let newStr = " "
                                        let start = 0//开始截取位置
                                        let end = 0//截取结束位置
                                        const name_len = e.name.length //每个内容名称的长度
                                        const max_name = 3//每行显示的最大长度
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
                                    // length: -18, // 改变标示线的长度
                                    // length2: 20,
                                    smooth: 0.2,
                                }
                            },

                            data: [
                                {value: 5, name: '市内门诊患者占比', label: setLabel('#50CC88')},
                                {value: 2, name: '市外门诊患者占比', label: setLabel('#FCC02E')},
                            ],
                            // itemStyle:{ //设置饼图扇形区域样式,a=series.name值，b=series.data.name值，c=series.data.value值，d =该区域占比
                            //     normal:{
                            //
                            //         labelLine :{show:true} //扇形-标签的线显示
                            //     }
                            // }
                        }
                    ]*/
                },
            };
        },
    };
</script>

<style scoped lang="scss">
    .ciecle-chart {
        margin-top: 8px;
        height: 120px;
        /*width: 92%;*/
        color: #ffffff !important;
    }
</style>
