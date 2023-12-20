<template>
    <div class="DuringHoliday">
        <NavSwitch pointer="特别的日子" v-if="false"/>

        <i class="bg-img vci-bg-fill" v-if="user_info.BIRTHDAY"/>

        <div class="text">
            <div v-if="user_info.BIRTHDAY"><span>{{ user_info.BIRTHDAY | handleBirthday }}</span> ，是您 <span>{{ user_info.AGE }}</span>
                岁生日
            </div>
            <div v-if="isNotNull(pageData.BIRTHDAY_VISITS_NUM)">您依然忙碌在一线</div>
            <div v-if="isNotNull(pageData.BIRTHDAY_VISITS_NUM)"> 这一天您一共接诊了
                <span>{{ pageData.BIRTHDAY_VISITS_NUM }}</span>位门诊患者
            </div>
            <div v-if="isNotNull(pageData.BIRTHDAY_SURGERY_NUM)"> 主刀了 <span>{{ pageData.BIRTHDAY_SURGERY_NUM }}</span>
                台手术
            </div>
            <div v-if="isNotNull(pageData.BIRTHDAY_VISITS_NUM)| isNotNull(pageData.BIRTHDAY_SURGERY_NUM)">
                这一定是个很有意义的生日
            </div>
        </div>

        <div class="bar-t" v-if="isNotNull(pageData.HOLIDAYS_VISITS_NUM )">{{ year
            }}年，您节假日共接诊了 <span>{{ pageData.HOLIDAYS_VISITS_NUM }}</span> 人
        </div>
        <div class="bar-t" v-if="isNotNull(pageData.HOLIDAYS_SURGERY_NUM )">{{ year
            }}年，您节假日手术总量 <span>{{ pageData.HOLIDAYS_SURGERY_NUM }}</span> 台
        </div>

        <!--<div class="list-frame">
          <div
            v-for="(item,index) in list"
            :key="index"
            class="the-column"
          >
            <div class="person">
              <div class="value-unit"><span class="value font-din-bold">{{ item.person }}</span>{{ item.personUnit }}</div>
              <div class="bar" >
                <div class="in-bar" :style="{width: item.personPercent + '%'}"></div>
              </div>
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="plat">
              <div class="bar">
                <div class="in-bar" :style="{width: item.platPercent + '%'}"></div>
              </div>
              <div class="value-unit"><span class="value font-din-bold">{{ item.plat }}</span>{{ item.platUnit }}</div>
            </div>
          </div>
        </div>-->

        <BaseText text="世界正是因您的默默奉献，"/>
        <BaseText text="才更缤纷多彩！" style="margin-top: 10px"/>
    </div>
</template>

<script>
    import NavSwitch from "../../common/components/NavSwitch/NavSwitch.vue";
    import BaseText from "../../common/components/BaseText/BaseText.vue";

    export default {
        name: "DuringHoliday",
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
            user_info: {
                type: Object,
                default: () => {
                    return {}
                }
            },
        },
        components: {BaseText, NavSwitch},
        data() {
            return {
                year: "2023",
                birthday: "5月1日",
                old: "50",
                person: 100,
                plat: 90,
                dh: 18,
                list: []
            }
        },
        mounted() {
            this.dataHandle()
        },
        watch: {
            user_info: {
                handler: "dataHandle",
                immediate: true,
                deep: true
            }
        },
        methods: {
            dataHandle() {
                this.list = [
                    {
                        name: "元旦",
                        person: Math.round(Math.random() * 20),
                        personUnit: "人",
                        plat: Math.round(Math.random() * 40),
                        platUnit: "台"
                    },
                    {
                        name: "春节",
                        person: Math.round(Math.random() * 20),
                        personUnit: "人",
                        plat: Math.round(Math.random() * 40),
                        platUnit: "台"
                    },
                    {
                        name: "清明节",
                        person: Math.round(Math.random() * 20),
                        personUnit: "人",
                        plat: Math.round(Math.random() * 40),
                        platUnit: "台"
                    },
                    {
                        name: "劳动节",
                        person: Math.round(Math.random() * 20),
                        personUnit: "人",
                        plat: Math.round(Math.random() * 40),
                        platUnit: "台"
                    },
                    {
                        name: "端午节",
                        person: Math.round(Math.random() * 20),
                        personUnit: "人",
                        plat: Math.round(Math.random() * 40),
                        platUnit: "台"
                    },
                    {
                        name: "中秋节",
                        person: Math.round(Math.random() * 20),
                        personUnit: "人",
                        plat: Math.round(Math.random() * 40),
                        platUnit: "台"
                    },
                    {
                        name: "国庆节",
                        person: Math.round(Math.random() * 20),
                        personUnit: "人",
                        plat: Math.round(Math.random() * 40),
                        platUnit: "台"
                    },
                ]
                let maxP = Math.max(...this.list.map(item => (item.person))) * 1.5;
                let maxT = Math.max(...this.list.map(item => (item.plat))) * 1.5;
                this.list.map(item => {
                    item.personPercent = item.person / maxP * 100;
                    item.platPercent = item.plat / maxT * 100;
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    %flexmbt {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .DuringHoliday {
        padding: 0 20px;
        box-sizing: border-box;

        .bg-img {
            position: absolute;
            top: 58px;
            left: 0;
            width: 100%;
            height: 195px;
            background-image: url("./img/bg.png");
        }

        .text {
            margin-top: 280px;

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

        .bar-t {
            margin-top: 16px;
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
        }

        .list-frame {
            margin-top: 50px;

            .the-column {
                @extend %flexmbt;

                .bar {
                    position: relative;
                    width: 80px;
                    height: 8px;

                    .in-bar {
                        position: absolute;
                        height: 100%;
                        border-radius: 2px;
                    }
                }

                .value {
                    font-size: 18px;
                }

                .name {
                    font-size: 16px;
                }

                .person {
                    width: 130px;
                    @extend %flexmbt;

                    .value-unit {
                        margin-left: 10px;
                    }

                    .value {
                        color: #0ae476;
                    }

                    .in-bar {
                        right: 0;
                        background: linear-gradient(to left, rgba(10, 228, 118, 0.07), #0ae476);
                    }
                }

                .plat {
                    width: 130px;
                    @extend %flexmbt;

                    .value-unit {
                        margin-right: 10px;
                    }

                    .value {
                        color: #fe8b5d;
                    }

                    .in-bar {
                        left: 0;
                        background: linear-gradient(to right, rgba(254, 139, 93, 0.07), #fe8b5d);
                    }
                }

                & + .the-column {
                    margin-top: 12px;
                }
            }
        }

        .BaseText {
            margin-top: 25px;
            /*margin-bottom: 100px;*/
        }
    }
</style>
