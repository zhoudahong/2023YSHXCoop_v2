<template>
    <div class="ServiceMilitary">
        <!-- <NavSwitch pointer="为军服务" v-if="false" /> -->
        <div class="serice-millitary-wrap">
            <!--<div class="network-check" v-if="isNotNull(pageData.ONLINE_EXAMINATION)">-->
            <div class="network-check">
                <div class="title">网络检查数量</div>
                <div class="value">{{pageData.ONLINE_EXAMINATION}}</div>
            </div>
            <!--<div class="network-cases" v-if="isNotNull(pageData.ONLINE_CASE_HISTORY)">-->
            <div class="network-cases">
                <div class="title">网络病例数量</div>
                <div class="value">{{pageData.ONLINE_CASE_HISTORY}}</div>
            </div>
            <!--<div class="network-consultation" v-if="isNotNull(pageData.ONLINE_CONSULTATION)">-->
            <div class="network-consultation">
                <div class="title">网络接诊数量</div>
                <div class="value">{{pageData.ONLINE_CONSULTATION}}</div>
            </div>
            <!--<div class="network-prescription" v-if="isNotNull(pageData.ONLINE_PRESCRIPTION)">-->
            <div class="network-prescription">
                <div class="title">网络处方数量</div>
                <div class="value">{{pageData.ONLINE_PRESCRIPTION}}</div>
            </div>
            <div class="icon01"></div>
            <div class="icon02"></div>
            <div class="icon03"></div>
            <div class="bg"></div>
        </div>
        <!--<BarChart :xData="xData" :xValues="xValues"></BarChart>-->
        <!-- <BarChart :pageData="pageData"></BarChart> -->

        <!--<div class="space-box" />
            <div class="top1 vci-bg-fill" v-if="value1">
              {{ year }}年门诊接诊量
              <div class="number font-din-bold">{{ value1 }}</div>
            </div>
            &lt;!&ndash;<span>{{pageData.MILITARY_VISITS_NUM}}</span>&ndash;&gt;
            <CustomNumber :icon="icon1" :value="value1" :max="max" v-if="value1" />

            <div class="top2 vci-bg-fill" v-if="value2">
              {{ year }}年收治住院患者数量
              <div class="number font-din-bold">{{ value2 }}</div>
            </div>
            &lt;!&ndash;<span>{{pageData.MILITARY_INPATIENTS_NUM}}</span>&ndash;&gt;
            <CustomNumber :icon="icon1" :value="value2" :max="max" v-if="value2" />-->

        <BaseText text="您姓军为战，让亲爱的战友保持战斗力。"/>
    </div>
</template>

<script>
    import NavSwitch from "../../common/components/NavSwitch/NavSwitch.vue";
    import BaseText from "../../common/components/BaseText/BaseText.vue";
    import CustomNumber from "./components/CustomNumber/CustomNumber.vue";
    import icon1 from "./img/icon.1.png";
    import icon2 from "./img/icon.2.png";
    import BarChart from "../../common/components/BarChart/BarChart";

    export default {
        name: "ServiceMilitary",
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
                    };
                },
            },
        },
        components: {BarChart, CustomNumber, BaseText, NavSwitch},
        data() {
            return {
                year: "2023",
                osList: [],
                ihList: [],
                icon1: "image://" + icon1,
                value1: "",
                icon2: "image://" + icon2,
                value2: "",
                max: "",
            };
        },
        watch: {
            pageData: {
                handler: "dataHandle",
                immediate: true,
                // deep: true,
            },
        },
        mounted() {
            this.dataHandle();
        },
        methods: {
            dataHandle() {
                this.value1 = this.pageData.MILITARY_VISITS_NUM;
                this.value2 = this.pageData.MILITARY_INPATIENTS_NUM;
                this.max =
                    parseInt(this.value1) > parseInt(this.value2)
                        ? this.value1
                        : this.value2;

                this.osList = [];
                this.ihList = [];
                let num = 1;
                while (num < 13) {
                    this.osList.push({
                        name: `${num}月`,
                        value: Math.round(Math.random() * 500),
                        percent: 0,
                    });
                    this.ihList.push({
                        name: `${num}月`,
                        value: Math.round(Math.random() * 500),
                        percent: 0,
                    });
                    num++;
                }
                let osMax = Math.max(...this.osList.map((item) => item.value)) + 10;
                let ihMax = Math.max(...this.ihList.map((item) => item.value)) + 10;
                this.osList.map((item) => {
                    item.percent = (item.value / osMax) * 100;
                });
                this.ihList.map((item) => {
                    item.percent = (item.value / ihMax) * 100;
                });
            },
        },
    };
</script>

<style scoped lang="scss">
    .serice-millitary-wrap {
        position: relative;
        height: 470px;

        .network-check {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: absolute;
            z-index: 2;
            top: 50px;
            width: 171px;
            height: 171px;
            background: url("./img/inspectBg@2x.png") no-repeat;
            background-size: 100%;

            .title {
                width: 60px;
                margin-bottom: 4px;
                font-size: 16px;
                line-height: 1.2;
                font-weight: 400;
                color: #eda11e;
            }

            .value {
                font-size: 21px;
                font-weight: 400;
                line-height: 1;
                color: #eda11e;
            }
        }

        .network-cases {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: absolute;
            z-index: 2;
            top: 25px;
            right: 10px;
            width: 171px;
            height: 171px;
            background: url("./img/caseBg@2x.png") no-repeat;
            background-size: 100%;

            .title {
                width: 60px;
                margin-bottom: 4px;
                font-size: 16px;
                line-height: 1.2;
                font-weight: 400;
                color: #b374fa;
            }

            .value {
                font-size: 21px;
                font-weight: 400;
                line-height: 1;
                color: #b374fa;
            }
        }

        .network-prescription {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: absolute;
            z-index: 2;
            top: 298px;
            left: 68px;
            width: 171px;
            height: 171px;
            background: url("./img/prescriptionBg@2x.png") no-repeat;
            background-size: 100%;

            .title {
                width: 60px;
                margin-bottom: 4px;
                font-size: 16px;
                line-height: 1.2;
                font-weight: 400;
                color: #2ab0fd;
            }

            .value {
                font-size: 21px;
                font-weight: 400;
                line-height: 1;
                color: #2ab0fd;
            }
        }

        .network-consultation {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: absolute;
            z-index: 2;
            top: 170px;
            left: 98px;
            width: 230px;
            height: 181px;
            background: url("./img/totalBg@2x.png") no-repeat;
            background-size: 100%;
            box-sizing: border-box;
            padding-right: 80px;
            padding-bottom: 50px;

            .title {
                width: 60px;
                margin-bottom: 8px;
                font-size: 16px;
                line-height: 1.2;
                font-weight: 400;
                color: #34ca7f;
            }

            .value {
                font-size: 21px;
                font-weight: bold;
                line-height: 1;
                color: #34ca7f;
            }
        }

        .icon01 {
            position: absolute;
            z-index: 1;
            top: 50px;
            left: 50%;
            margin-left: -25px;
            width: 25px;
            height: 25px;
            background: url("./img/circleA@2x.png") no-repeat;
            background-size: 100%;
        }

        .icon02 {
            position: absolute;
            z-index: 1;
            top: 250px;
            left: 68px;
            margin-left: -25px;
            width: 25px;
            height: 25px;
            background: url("./img/circleB@2x.png") no-repeat;
            background-size: 100%;
        }

        .icon03 {
            position: absolute;
            z-index: 1;
            top: 290px;
            right: 80px;
            width: 25px;
            height: 25px;
            background: url("./img/circleC@2x.png") no-repeat;
            background-size: 100%;
        }

        .bg {
            position: absolute;
            z-index: 1;
            top: 340px;
            left: 0;
            width: 375px;
            height: 159px;
            background: url("./img/contentBg@2x.png") no-repeat;
            background-size: 100%;
        }
    }

    .ServiceMilitary {
        position: relative;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: center;

        > span {
            margin-left: 2px;
            margin-right: 2px;
            font-family: "din-bold", sans-serif;
            color: #1d953f;
            font-size: 18px;
        }

        .space-box {
            height: 140px;
        }

        .bg-hart {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 363px;
            height: 364px;
            background-image: url("./img/bg.png");
            transform: translate(-50%, -50%);
        }

        .top1 {
            position: relative;
            width: 303px;
            height: 16px;
            padding-left: 12px;
            background-image: url("./img/top.1.png");
            text-align: left;
            font-size: 12px;
            line-height: 16px;

            .number {
                position: absolute;
                top: 50%;
                left: 300px;
                color: #02e372;
                font-size: 16px;
                transform: translate(0, -50%);
            }
        }

        .top2 {
            position: relative;
            width: 303px;
            height: 16px;
            padding-left: 12px;
            background-image: url("./img/top.2.png");
            text-align: left;
            font-size: 12px;
            line-height: 16px;

            .number {
                position: absolute;
                top: 50%;
                left: 300px;
                color: #02e3d0;
                font-size: 16px;
                transform: translate(0, -50%);
            }
        }

        .outpatient-service-t {
            margin-top: 60px;
            font-size: 16px;
        }

        .in-hospital-t {
            margin-top: 54px;
            font-size: 16px;
        }

        .BaseText {
            margin-top: 20px;
        }
    }
</style>
