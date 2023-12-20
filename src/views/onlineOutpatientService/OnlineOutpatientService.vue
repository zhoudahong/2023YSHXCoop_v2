<template>
    <div class="ServiceMilitary">
        <div class="space-box2"/>
        <div class="top1 vci-bg-fill" v-if="value1">门诊接诊军人数量：
            <div class="number font-din-bold color1">{{ value1 }}</div>
        </div>
        <CustomNumber :icon="icon1" :value="value1" :max="max" v-if="value1"/>

        <div class="top1 vci-bg-fill" v-if="value2">收治住院军人数量：
            <div class="number font-din-bold color2">{{ value2 }}</div>
        </div>
        <CustomNumber :icon="icon1" :value="value2" :max="max" v-if="value2"/>

        <div class="top1 vci-bg-fill" v-if="value3">网络接诊军人数量：
            <div class="number font-din-bold color3">{{ value3 }}</div>
        </div>
        <CustomNumber :icon="icon1" :value="value3" :max="max" v-if="value3"/>

        <!--<div class="top1 vci-bg-fill" v-if="value4">{{ year }}年网络病例数量
            <div class="number font-din-bold color4">{{ value4 }}</div>
        </div>
        <CustomNumber :icon="icon1" :value="value4" :max="max" v-if="value4"/>-->

        <BaseText text="世界正是因您的默默奉献，才更加缤纷多彩！"/>
    </div>
</template>

<script>
    import BaseText from "../../common/components/BaseText/BaseText.vue";
    import CustomNumber from "../serviceMilitary/components/CustomNumber/CustomNumber.vue";
    import icon1 from "./img/icon.2.png";
    import icon2 from "./img/icon.1.png";

    export default {
        name: "OnlineOutpatientService",
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
        components: {CustomNumber, BaseText},
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
                deep: true,
            },
        },
        mounted() {
            this.dataHandle();
        },
        methods: {
            dataHandle() {
                this.value1 = this.pageData.MILITARY_VISITS_NUM;//门诊接诊量(为军)
                this.value2 = this.pageData.MILITARY_INPATIENTS_NUM;//收治住院患者数量（为军）
                this.value3 = this.pageData.ONLINE_CONSULTATION_JR;//网络接诊军人数量（为军）
                // this.value3 = this.pageData.ONLINE_EXAMINATION;//年网络检查数量
                // this.value4 = this.pageData.ONLINE_CASE_HISTORY;//年网络病例数量


                var valueArr = [parseInt(this.value1), parseInt(this.value2), parseInt(this.value3), parseInt(this.value4)];
                //排序找最大值
                for (let i = 0; i < valueArr.length - 1; i++) {
                    for (let j = 0; j < valueArr.length - 1 - i; j++) {
                        if (valueArr[j] < valueArr[j + 1]) {
                            [valueArr[j], valueArr[j + 1]] = [valueArr[j + 1], valueArr[j]]
                        }
                    }
                }
                this.max = valueArr[0].toString()

                /*this.max =
                    parseInt(this.value1) > parseInt(this.value2)
                        ? this.value1
                        : this.value2;*/

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

        .space-box2 {
            height: 40px;
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
            width: 333px;
            height: 20px;
            padding-left: 6px;
            background-image: url("./img/top.1.png");
            text-align: left;
            font-size: 17px;
            line-height: 18px;

            .number {
                position: absolute;
                top: 50%;
                left: 300px;
                color: #02e372;
                font-size: 18px;
                transform: translate(0, -50%);

                &.color1 {
                    color: #9a00fe;
                }

                &.color2 {
                    color: #0f62fe;
                }

                &.color3 {
                    color: #00fe3a;
                }

                &.color4 {
                    color: #fe9303;
                }
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

                &.color4 {
                    color: #f8b03f;
                }
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
            margin-top: 90px;
        }
    }
</style>
