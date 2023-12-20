<template>
    <div class="TheDgr">
        <NavSwitch pointer="DRG" v-if="true"/>

        <div class="text">
            <div v-if="isNotNull(pageData.MR_TOTAL)">您负责的总病案数 <span>{{pageData.MR_TOTAL}}</span> 例</div>
            <div v-if="isNotNull(pageData.MR_GROUPS)">入组病案数 <span>{{pageData.MR_GROUPS}}</span> 例，入组率 <span>{{pageData.MR_GROUPS_RATE}}%</span>
            </div>
            <div v-if="isNotNull(pageData.DRG_GROUPS)">DRG组数<span> {{pageData.DRG_GROUPS}}</span> 组，总权重 <span>{{pageData.TOTAL_WEIGHT}}</span>
            </div>
            <div v-if="isNotNull(pageData.TIME_CONSUME)"> 时间消耗指数 <span>{{pageData.TIME_CONSUME}}</span>，费用消耗指数 <span>{{pageData.COST_CONSUME}}</span>
            </div>
            <!--<div>例均费用<span>{{pageData.AVERAGE_COST}}</span>元</div>-->
        </div>

        <div class="cmi-title" v-if="isNotNull(pageData.CMI)">{{year}}年CMI <span>{{pageData.CMI}}</span> ，月CMI趋势图：</div>
        <!--<div class="chart-t" v-if="pageData.CMI">月CMI趋势图：</div>-->

        <div class="chart" ref="chart" v-if="chart_show"/>

        <!--<BaseText text="您规范诊疗，帮助他们节约开支。"/>-->
    </div>
</template>

<script>
    import NavSwitch from "../../common/components/NavSwitch/NavSwitch.vue";
    import TheDgr from "./js/TheDgr";
    import BaseText from "../../common/components/BaseText/BaseText.vue";
    import {handleYearAndMonth} from "@/lib/utils";

    export default {
        name: "TheDgr",
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
            }
        },
        watch: {
            drg_month: {
                handler: "dataHandle",
                immediate: true,
                deep: true
            }
        },
        components: {BaseText, NavSwitch},
        data() {
            return {
                year: "2023",
                total: 4182,
                illNum: 2778,
                illPercent: "70.6%",
                dgrNum: 32,
                dgrPercent: "20.3%",
                time: 8.3,
                money: 7.9,
                cost: 1056,
                cmiPercent: "11.5%",
                chart: null,
                chart_show: true
            }
        },
        mounted() {
            this.dataHandle()
        },
        methods: {
            dataHandle() {
                if (this.drg_month.CMI) {
                    // console.log("this.drg_month.CMI.length",this.drg_month.CMI)
                    this.chart_show = this.drg_month.CMI.length > 0;
                    if (this.chart_show) {
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
                                        color: "#04e355",
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
                                                offset: 0, color: '#04e34f' // 0% 处的颜色
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
        }
    }
</script>

<style scoped lang="scss">
    %baseStyle {
        text-align: center;

        > div {
            height: 14px;
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
                margin-top: 16px;
            }
        }
    }

    .TheDgr {
        padding: 0 20px;
        box-sizing: border-box;

        .text {
            margin-top: 10px;
            @extend %baseStyle;
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

        .chart-t {
            margin-top: 5px;
            font-size: 16px;
            font-family: "ss-r", sans-serif;
            transform: scale(.8);
        }

        .chart {
            height: 150px;
        }

        .BaseText {
            margin-top: 16px;
        }
    }
</style>
