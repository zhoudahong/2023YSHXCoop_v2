<template>
    <div class="TheSurgery" v-if="isNotNull(pageData.TOTAL_SURGERY_VOLUME)">
        <NavSwitch pointer="手术" v-if="false"/>

        <div class="surgery-info" v-if="isNotNull(pageData.TOTAL_SURGERY_VOLUME)">
            <div v-if="pageData.TOTAL_SURGERY_VOLUME!='0'">您累计完成 <span>{{ pageData.TOTAL_SURGERY_VOLUME }}</span> 台手术
            </div>
            <!--<div v-if="pageData.MAIN_SURGERY_VOLUME!='0'">其中：</div>-->
            <!--<div v-if="pageData.MAIN_SURGERY_VOLUME!='0'">您主刀手术 <span>{{ pageData.MAIN_SURGERY_VOLUME }}</span>
                台，三四级手术主刀率 <span>{{ pageData.THIRD_AND_FOURTH_SURGERIES }}</span></div>-->

            <!--三四级手术率-->
            <pie-chart :pageData="pageData" :chartType="chartType"></pie-chart>

            <div v-if="isNotNull(pageData.FIRST_SURGERY)">您参与的手术排行：</div>

            <rank-bar :pageData="pageData"/>

            <!--<div v-if="pageData.FIRST_SURGERY!='|'">您参与的手术中，排名第一的是：</div>
            <div v-if="pageData.FIRST_SURGERY!='|'">
              <span class="rank rank-a">{{ pageData.FIRST_SURGERY  | handleOperationName}}</span>，有<span class="rank-a">{{ pageData.FIRST_SURGERY | handleOperationNum}}</span>台</div>
            <div v-if="pageData.SECOND_SURGERY!='|'">排名第二的是:</div>
            <div v-if="pageData.SECOND_SURGERY!='|'"><span class="rank rank-b">{{ pageData.SECOND_SURGERY | handleOperationName}}</span>，有<span class="rank-b">{{ pageData.SECOND_SURGERY | handleOperationNum}}</span>台</div>
            <div v-if="pageData.THIRD_SURGERY!='|'">排名第三的是:</div>
            <div v-if="pageData.THIRD_SURGERY!='|'"><span class="rank rank-c">{{ pageData.THIRD_SURGERY  | handleOperationName}}</span>，有<span class="rank-c">{{ pageData.THIRD_SURGERY | handleOperationNum}}</span>台</div>-->
        </div>

        <!--<CirclePie :data="pieList" />-->

        <div class="work-time" v-if="pageData.TOTAL_SURGERY_VOLUME">
            <div v-if="pageData.MOST_OPERATED_DAY | pageData.MOST_SURGERY_VOLUME">
                您在<span>{{ getTime(pageData.MOST_OPERATED_DAY ) }}</span>这天参与的手术最多，
            </div>
            <div v-if="pageData.MOST_OPERATED_DAY | pageData.MOST_SURGERY_VOLUME">一共有 <span>{{ pageData.MOST_SURGERY_VOLUME }}</span>
                台。
            </div>
            <!--<div v-if="isNotNull(pageData.THIRD_AND_FOURTH_SURGERIES)">三四级手术主刀率达到了<span>{{ pageData.THIRD_AND_FOURTH_SURGERIES }}</span>。
            </div>-->
            <div v-if="pageData.EARLIEST_SURGERY">今年最早开始手术时间在 <span>{{ pageData.EARLIEST_SURGERY }}</span></div>
            <div v-if="pageData.LATEEST_SURGERY">今年最晚结束手术时间在 <span>{{ pageData.LATEEST_SURGERY }}</span></div>
            <div v-if="isNotNull(pageData.SURGERY_NAME_AND_DURATION)">时间最长的一台手术是 <span class="surgeryName">{{ pageData.SURGERY_NAME_AND_DURATION  | handleOperationName}}</span>，耗时 <span>{{ pageData.SURGERY_NAME_AND_DURATION  | handleOperationNum}}</span>
                小时
            </div>
            <!--<div v-if="isNotNull(pageData.SURGERY_NAME_AND_DURATION)">耗时 <span>{{ pageData.SURGERY_NAME_AND_DURATION  | handleOperationNum}}</span>
                小时
            </div>-->
        </div>

        <BaseText text="您手到病除，让病患再次容光焕发。"/>
    </div>
</template>

<script>
    import NavSwitch from "../../common/components/NavSwitch/NavSwitch.vue";
    import CirclePie from "../../common/components/CirclePie/CirclePie.vue";
    import BaseText from "../../common/components/BaseText/BaseText.vue";
    import {handleOperation} from "@/lib/utils";
    import RankBar from "../../common/components/RankBar/RankBar";
    import PieChart from "../../common/components/PieChart/PieChart";


    export default {
        name: "TheSurgery",
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
            }
        },
        components: {PieChart, RankBar, BaseText, CirclePie, NavSwitch},
        data() {
            return {
                year: "2023",
                surgeryNum: 300,
                surgeryPlat: 100,
                percent: "57.8%",
                rank: "AAA",
                rankNum: 40,
                rankB: "BBB",
                rankBNum: 40,
                rankC: "CCC",
                rankCNum: 40,
                pieList: [],
                workDate: "5月11日",
                max: 8,
                startTime: "06:00",
                endTime: "23:00",
                surgeryName: "阑尾切除术",
                time: "2小时18分",
                chartType: "surgeryRate",
            }
        },
        mounted() {
            this.dataHandle()
        },
        methods: {
            dataHandle() {
                let data = [];
                let colors = ["#0bd26e", "#ecaa4c", "#ecdf4c",
                    "#a9db3c", "#7ece48", "#4cb954", "#2b73d5", "#0b8ed2",
                    "#057cb7", "#0bbdd2", "#0bd2a6"]
                let num = 0;
                while (num < 10) {
                    data.push({
                        name: "手术名称",
                        value: Math.round(Math.random() * 300),
                        percent: 0,
                        itemStyle: {
                            color: colors[(num) % colors.length]
                        }
                    })
                    num++
                }
                let sum = eval(data.map(item => (item.value)).join("+"));
                data.map(item => {
                    item.percent = (item.value / sum * 100).toFixed(0)
                })
                this.pieList = data
            }
        }
    }
</script>

<style scoped lang="scss">
    %baseStyle {
        text-align: center;
        font-size: 16px;

        > div {
            span {
                margin: 0 2px;
                color: #1d953f;
                font-size: 18px;
                font-family: "din-bold", sans-serif;

                &.surgeryName {
                    font-size: 16px;
                }

                &.rank {
                    font-size: 16px;
                    font-family: "ss-r", sans-serif;

                    &-a {
                        color: crimson;
                    }

                    &-b {
                        color: deepskyblue;
                    }

                    &-c {
                        color: #6950a1;
                    }
                }
            }

            & + div {
                margin-top: 4px;
            }
        }
    }

    .TheSurgery {
        padding: 0 20px;
        box-sizing: border-box;

        .surgery-info {
            margin-top: 10px;
            @extend %baseStyle;
        }

        .work-time {
            margin-top: 15px;
            @extend %baseStyle;
        }

        .BaseText {
            margin-top: 10px;
        }
    }


</style>
