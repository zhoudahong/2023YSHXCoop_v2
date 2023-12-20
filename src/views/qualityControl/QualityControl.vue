<template>
    <!--<TheDgr></TheDgr>-->
    <div class="QualityControl">
        <NavSwitch pointer="质控" v-if="false"/>

        <!--:style="{'visibility':chart_show?'visible':'hidden'}"-->
        <div class="cmi-title" v-if="chart_show">核心制度落实：</div>
        <!--<div class="drg-info" v-if="chart_show"><span>核心制度落实</span></div>-->

        <div class="chart-frame" :style="{'visibility':chart_show?'visible':'hidden'}">
            <div class="chart" ref="chart"/>
            <i class="icon-hart vci-bg-fill"/>
        </div>

        <BaseText text="您质量为本，始终坚守生命底线。"/>
    </div>

</template>

<script>
    import NavSwitch from "../../common/components/NavSwitch/NavSwitch.vue";
    import QualityControl from "./js/QualityControl"
    import BaseText from "../../common/components/BaseText/BaseText.vue";
    import TheDgr from "../theDgr/TheDgr";

    export default {
        name: "QualityControl",
        props: {
            pageData: {
                type: Object,
                default: () => {
                    return {
                        AVERAGE_COST: null,
                        AVERAGE_PATIENT_STAY: null,
                        BIRTHDAY_SURGERY_NUM: null,
                        BIRTHDAY_VISITS_NUM: null,
                        CMI: null,
                        COST_CONSUME: null,
                        DAY_HIGHEST_OUTPATIENTS: null,
                        DRG_GROUPS: null,
                        EARLIEST_SURGERY: null,
                        FARTHEST_INPATIENT_FROM: null,
                        FARTHEST_OUTPATIENT_FROM: null,
                        FIRST_DISEASES: null,
                        FIRST_SURGERY: null,
                        HOLIDAYS_SURGERY_NUM: null,
                        HOLIDAYS_VISITS_NUM: null,
                        INPATIENTS_NUM: null,
                        INPATIENTS_NUM_IN_CITY: null,
                        INPATIENTS_NUM_LAST: null,
                        INPATIENTS_NUM_OUTSIDE_CITY: null,
                        INPATIENT_RATE: null,
                        INSURANCE_INPATIENTS: null,
                        INSURANCE_OUTPATIENTS: null,
                        LATEEST_SURGERY: null,
                        MAIN_SURGERY_VOLUME: null,
                        MAXIMUM_HOSPITALIZATION: null,
                        MAXIMUM_VISITS: null,
                        MILITARY_INPATIENTS_NUM: null,
                        MILITARY_VISITS_NUM: null,
                        MOST_OPERATED_DAY: null,
                        MOST_SURGERY_VOLUME: null,
                        MR_GROUPS: null,
                        MR_GROUPS_RATE: null,
                        MR_TOTAL: null,
                        MZCYZDFHL: null,
                        OLDEST_INPATIENT: null,
                        OLDEST_OUTPATIENT: null,
                        OUTPATIENTS_NUM_IN_CITY: null,
                        OUTPATIENTS_NUM_OUTSIDE_CITY: null,
                        OUTPATIENT_RATE: null,
                        PROVINCES_INPATIENTS_FROM: null,
                        PROVINCES_OUTPATIENTS_FROM: null,
                        RYCYDYZDFHL: null,
                        SECOND_DISEASES: null,
                        SECOND_SURGERY: null,
                        SQZDSHZDFHL: null,
                        SRQZL: null,
                        SURGERY_NAME_AND_DURATION: null,
                        THIRD_AND_FOURTH_SURGERIES: null,
                        THIRD_DISEASES: null,
                        THIRD_SURGERY: null,
                        TIME_CONSUME: null,
                        TOTAL_HOSPITALIZATION: null,
                        TOTAL_SURGERY_VOLUME: null,
                        TOTAL_WEIGHT: null,
                        VISITS_NUM: null,
                        VISITS_NUM_LAST: null,
                        YNWZL: null,
                        YOUNGEST_INPATIENT: null,
                        YOUNGEST_OUTPATIENT: null,
                        ZYHZL: null,
                    }
                }
            },
            drg_month: {
                type: Object,
                default: () => {
                    return {
                        STATISTICAL_DATE: [],
                        CMI: [],
                    }
                }
            },
            noHexinzhiduDataJudge: {
                type: Boolean,
                default: () => {
                    return false
                }
            }
        },
        components: {TheDgr, BaseText, NavSwitch},
        data() {
            return {
                chart: null,
                chart_show: true,
                cmi_chart_show: true,
                year: '2023',
            }
        },
        mounted() {
            this.dataHandle()
        },
        watch: {
            pageData: {
                handler: "dataHandle",
                immediate: true,
                deep: true
            }
        },
        methods: {
            //将百分比字符串转换为纯数字，例如15%，结果为15
            handleFloatStrPercent(str) {
                if (str) {
                    /*if(str == 'None'){
                        return 0;
                    }*/
                    var result = 0;
                    result = parseFloat(str.toString().split("%")[0])
                    return result
                }
            },

            judgeIsNotNull(val) {
                return val !== "0" & val !== "0%" & val != null & val !== "null" & val !== ""
            },

            dataHandle() {
                // this.chart_show = this.pageData.SQZDSHZDFHL != '0%' & this.pageData.SQZDSHZDFHL != null;
                /*this.chart_show =
                    this.pageData.SQZDSHZDFHL != '0%' & this.pageData.RYCYDYZDFHL != '0%' & this.pageData.SRQZL != '0%' & this.pageData.ZYHZL != '0%' & this.pageData.MZCYZDFHL != '0%'
                    & (this.pageData.SQZDSHZDFHL != null & this.pageData.RYCYDYZDFHL != null & this.pageData.SRQZL != null & this.pageData.ZYHZL != null & this.pageData.MZCYZDFHL != null)*/
                console.log("this.judgeIsNotNull(this.pageData.MZCYZDFHL)" + this.judgeIsNotNull(this.pageData.MZCYZDFHL))
                this.chart_show =
                    this.judgeIsNotNull(this.pageData.MZCYZDFHL) & this.judgeIsNotNull(this.pageData.SRQZL) & this.judgeIsNotNull(this.pageData.RYCYDYZDFHL) & this.judgeIsNotNull(this.pageData.SQZDSHZDFHL) & this.judgeIsNotNull(this.pageData.YNWZL) & this.judgeIsNotNull(this.pageData.ZYHZL)
                if (this.chart_show) {
                    console.log("进入了this.chart_show")
                    this.chart = new QualityControl(this.$refs.chart);
                    const data = [
                        {
                            name: "术前诊断与术后诊断符合率",
                            // value: this.pageData.SQZDSHZDFHL.toFixed(1)
                            value: this.pageData.SQZDSHZDFHL ? this.handleFloatStrPercent(this.pageData.SQZDSHZDFHL) : "0"
                        },
                        {
                            name: "入院与出院第一诊断符合率",
                            value: this.pageData.RYCYDYZDFHL ? this.handleFloatStrPercent(this.pageData.RYCYDYZDFHL) : "0"
                        },
                        {
                            name: "三日确诊率",
                            value: this.pageData.SRQZL ? this.handleFloatStrPercent(this.pageData.SRQZL) : "0"
                        },
                        {
                            name: "治愈好转率",
                            value: this.pageData.ZYHZL ? this.handleFloatStrPercent(this.pageData.ZYHZL) : "0"
                        },
                        /*{
                          name: "疑难危重率",
                          value: this.pageData.YNWZL ? this.handleFloatStrPercent(this.pageData.YNWZL): "0"
                        },*/
                        {
                            name: "门诊与出院诊断符合率",
                            value: this.pageData.MZCYZDFHL ? this.handleFloatStrPercent(this.pageData.MZCYZDFHL) : "0"
                        },
                    ].map(item => {
                        item.split = (() => {
                            let str;
                            if (item.name.length > 9) {
                                str = `${item.value}%a${item.name.substring(0, Math.ceil(item.name.length / 2))}\n${item.name.substring(Math.ceil(item.name.length / 2), item.name.length)}`;
                            } else str = `${item.value}%a${item.name}`;
                            return str;
                        })()
                        return item
                    }).reverse();
                    let max = Math.max(...data.map(item => item.value)) * 1.05;
                    const chartOpt = {
                        radar: {
                            center: ["50%", "50%"],
                            radius: "50%",
                            // startAngle: 180,
                            nameGap: 10,
                            splitNumber: 7,
                            indicator: data.map(item => ({
                                name: item.split,
                                max
                            })),
                            axisLine: {
                                lineStyle: {
                                    color: "#6feaac"
                                }
                            },
                            axisTick: {show: false},
                            splitLine: {
                                lineStyle: {
                                    color: [
                                        "rgba(111,234,172,0)"
                                        , "rgba(111,234,172,0)"
                                        , "rgba(111,234,172,1)"
                                        , "rgba(111,234,172,0)"
                                        , "rgba(111,234,172,0)"
                                        , "rgba(111,234,172,1)"
                                    ]
                                }
                            },
                            splitArea: {
                                areaStyle: {
                                    color: [
                                        "rgba(111,234,172,0.4)"
                                        , "rgba(111,234,172,0)"
                                        , "rgba(111,234,172,0)"
                                        , "rgba(111,234,172,0.4)"
                                        , "rgba(111,234,172,0)"
                                        , "rgba(111,234,172,0)"
                                        , "rgba(111,234,172,0.4)"
                                    ]
                                }
                            },
                            axisName: {
                                formatter: params => {
                                    let percent = params.split("a")[0];
                                    let name = params.split("a")[1];
                                    return `{p| ${percent}}\n{n|${name}}`
                                },
                                rich: {
                                    p: {
                                        fontFamily: "din-bold",
                                        color: "#02e372",
                                        fontSize: 16,
                                    },
                                    n: {
                                        color: "#3f3f3f",
                                        fontSize: 12,
                                        fontFamily: "ss-r",
                                    }
                                }
                            }
                        },
                        series: {
                            type: "radar",
                            data: [
                                {
                                    value: data.map(item => (item.value)),
                                }
                            ],
                            symbolSize: 4,
                            itemStyle: {
                                color: "#fff",
                                borderColor: "#ff635b"
                            },
                            lineStyle: {
                                color: "#f95d5a"
                            },
                            areaStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#ff5252' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#ffab68' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }
                        }
                    };
                    this.chart.render(chartOpt)
                }


                if (this.drg_month.CMI) {
                    // console.log("this.drg_month.CMI.length",this.drg_month.CMI)
                    this.cmi_chart_show = this.drg_month.CMI.length > 0;
                    if (this.cmi_chart_show) {
                        this.chart = new TheDgr(this.$refs.chart);
                        const data = [];
                        /*let num = 1;
                        while(num < 13) {
                          data.push({
                            name: `${num}月`,
                            value: (Math.random()*20).toFixed(1),
                          })
                          num ++
                        }*/
                        var STATISTICAL_DATE = [];
                        var CMI = [];

                        var drg_month = this.drg_month;
                        STATISTICAL_DATE = drg_month.STATISTICAL_DATE;
                        CMI = drg_month.CMI;

                        if (STATISTICAL_DATE.length > 0) {
                            for (let i = 0; i < STATISTICAL_DATE.length; i++) {
                                var item = STATISTICAL_DATE[i];
                                data.push({
                                    name: handleYearAndMonth(item) + '月',
                                    value: CMI[i],
                                })
                            }
                        }

                        let max = Math.max(...data.map(item => (item.value))) * 1.4;

                        const chartOpt = {
                            grid: {
                                top: -10,
                                left: 0,
                                right: 0,
                                bottom: 30
                            },
                            xAxis: {
                                type: "category",
                                axisLabel: {
                                    fontSize: 12,
                                    interval: 0,
                                    color: "#3f3f3f",
                                    fontFamily: "ss-r"
                                },
                                axisLine: {show: false},
                                axisTick: {show: false},
                                data: data.map(item => item.name)
                            },
                            yAxis: {
                                splitLine: {show: false},
                                axisLabel: {show: false}
                            },
                            series: [
                                {
                                    type: "line",
                                    symbol: "circle",
                                    symbolSize: 0,
                                    itemStyle: {opacity: 0},
                                    label: {
                                        show: true,
                                        position: "inside",
                                        fontSize: 11.5,
                                        color: "#3f3f3f",
                                        fontFamily: "ss-r",
                                        opacity: 1
                                    },
                                    lineStyle: {
                                        color: "#02e372",
                                        width: 2,
                                        shadowColor: "#fff",
                                        shadowBlur: 2,
                                        shadowOffsetY: 2
                                    },
                                    areaStyle: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#02e372' // 0% 处的颜色
                                            }, {
                                                offset: 1, color: 'rgba(2,227,114,0)' // 100% 处的颜色
                                            }],
                                            global: false // 缺省为 false
                                        }
                                    },
                                    data: data
                                },
                                {
                                    type: "bar",
                                    itemStyle: {
                                        color: "rgba(2,227,114,0.11)"
                                    },
                                    barWidth: 16,
                                    data: data.map(item => ({
                                        name: item.name,
                                        value: max
                                    }))
                                }
                            ]
                        }
                        this.chart.render(chartOpt)
                    }
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .QualityControl {
        padding: 0 20px;
        box-sizing: border-box;

        .drg-info {
            margin-top: 3px;
            text-align: center;

            > div {
                height: 12px;
                font-size: 16px;
                font-family: "ss-r", sans-serif;

                > span {
                    margin-left: 2px;
                    margin-right: 2px;
                    font-family: "din-bold", sans-serif;
                    color: #1d953f;
                    font-size: 18px;

                    &.level {
                        font-size: 16px;
                    }
                }

                & + div {
                    margin-top: 5px;
                }
            }
        }

        .cmi-title {
            margin-top: 10px;
            text-align: center;
            font-size: 16px;
            font-family: "ss-r", sans-serif;

            > span {
                margin-left: 2px;
                margin-right: 2px;
                font-family: "din-bold", sans-serif;
                color: #1d953f;
                font-size: 18px;
            }
        }

        .chart-frame {
            position: relative;
            margin-top: 7px;
            /*margin-bottom: 50px;*/
            height: 240px;

            .chart {
                height: 100%;
            }

            .icon-hart {
                position: absolute;
                top: 48%;
                left: 50%;
                width: 23px;
                height: 18px;
                transform: translate(-50%, -50%);
                background-image: url("./img/icon.hart.png");
            }
        }
    }

    .BaseText {
        margin-top: 5px;
    }
</style>
