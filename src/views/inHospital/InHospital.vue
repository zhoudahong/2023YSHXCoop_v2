<template>
    <div class="InHospital">
        <NavSwitch pointer="住院" v-if="false"/>
        <div class="patients-info" v-if="isNotNull(pageData.INPATIENTS_NUM)">
            <!--<div>您本年度</div>-->
            <div v-if="isNotNull(pageData.CONSULTATIONS_NUM)">接收会诊有<span> {{ pageData.CONSULTATIONS_NUM }} </span>次
            </div>
            <div v-if="isNotNull(pageData.INPATIENTS_NUM)">收治住院患者合计 <span> {{ pageData.INPATIENTS_NUM }} </span>人</div>
            <!--<div v-if="isNotNull(pageData.INPATIENTS_NUM_LAST)">-->
                <!--上年度收治住院患者合计 <span>{{ pageData.INPATIENTS_NUM_LAST }}</span> 人次-->
            <!--</div>-->
            <div v-if="percentGreaterThanZero(pageData.INPATIENT_RATE)">
                收治住院患者增长率 <span>{{ pageData.INPATIENT_RATE }}</span>
            </div>


            <div v-if="isNotNull(pageData.TOTAL_HOSPITALIZATION)">
                患者住院总天数 <span>{{ pageData.TOTAL_HOSPITALIZATION }}</span> 天
            </div>
            <div v-if="isNotNull(pageData.AVERAGE_PATIENT_STAY)">
                患者平均住院天数 <span>{{ pageData.AVERAGE_PATIENT_STAY }}</span> 天
            </div>
            <!--<div v-if="isNotNull(pageData.MAXIMUM_HOSPITALIZATION)">-->
                <!--患者住院最多天数 <span>{{ pageData.MAXIMUM_HOSPITALIZATION }}</span> 天-->
            <!--</div>-->

            <!--<div></div>-->
            <div v-if="isNotNull(pageData.OLDEST_INPATIENT)">住院患者最大
                <span> {{ pageData.OLDEST_INPATIENT }} </span>,最小<span> {{ pageData.YOUNGEST_INPATIENT }} </span>
            </div>
        </div>

        <PatientsAccount :list="circleList" v-if="isNotNull(pageData.INPATIENTS_NUM_IN_CITY)"/>

        <div class="person-from" v-if="handleProvinceTotal(pageData.PROVINCES_INPATIENTS_FROM)">
            <div>
                您的住院患者来自五湖四海：总计来自<span> {{pageData.PROVINCES_INPATIENTS_FROM | handleProvinceTotal}} </span>个省，最远来自<span> {{ pageData.FARTHEST_INPATIENT_FROM }} </span>
            </div>
            <!--<div v-if="handleProvinceTotal(pageData.PROVINCES_INPATIENTS_FROM)">-->
            <!--</div>-->
        </div>

        <RegionList :list="regionList" :name="name"
                    v-if="pageData.PROVINCES_INPATIENTS_FROM"/>


        <!--<div class="disease-info" v-if="pageData.FIRST_DISEASES">
            <div v-if="pageData.FIRST_DISEASES">本年度，您救治最多的疾病是 <span>{{ pageData.FIRST_DISEASES }}</span></div>
            &lt;!&ndash;<div v-if="pageData.FIRST_DISEASES">您救治最多的疾病是 <span>{{ pageData.FIRST_DISEASES }}</span></div>&ndash;&gt;
            <div v-if="pageData.SECOND_DISEASES">救治第二的疾病是 <span>{{ pageData.SECOND_DISEASES }}</span></div>
            <div v-if="pageData.THIRD_DISEASES">救治第三的疾病是 <span>{{ pageData.THIRD_DISEASES }}</span></div>
        </div>-->
        <div class="person-from" style="margin-top: 15px" v-if="handleProvinceTotal(pageData.FIRST_DISEASES)">
            <div>住院救治疾病排行：</div>
        </div>

        <!--救治疾病Top3-->
        <!--<PieChart :pageData="pageData"></PieChart>-->
        <rank-bar :pageData="pageData" :listDataType="listDataType" />

        <BaseText class="base-text" text="您精心呵护，帮助他们祛病除魔。"/>
    </div>
</template>

<script>
    import NavSwitch from "../../common/components/NavSwitch/NavSwitch.vue";
    import PatientsAccount from "../../common/components/PatientsAccount/PatientsAccount.vue";
    import RegionList from "../../common/components/RegionList/RegionList.vue";
    import BaseText from "../../common/components/BaseText/BaseText.vue";
    import CirclePie from "../../common/components/CirclePie/CirclePie.vue";
    import PieChart from "../../common/components/PieChart/PieChart";
    import RankBar from "../../common/components/RankBar/RankBar";

    export default {
        name: "InHospital",
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
        components: {RankBar, PieChart, CirclePie, BaseText, RegionList, PatientsAccount, NavSwitch},
        data() {
            return {
                year: "2023",
                level: "经管医生",
                outPerson: 348,
                person: 348,
                rateGrowth: "20%",
                old: 56,
                young: 12,
                total: 800,
                max: 100,
                average: 1.4,
                list: [],
                circleList: [],//环形图数据
                provinceNum: 100,
                one: "心力衰竭",
                two: "支气管炎",
                three: "支气管哮喘",
                region: "山东省",
                regionList: [],
                pieList: [],
                name: "住院患者",
                listDataType: "zhuyuan",//排行榜为住院
                unit: "例",//排行榜的数值单位
            }
        },
        watch: {
            pageData: {
                handler: "dataHandle",
                immediate: true,
                deep: true
            }
        },
        mounted() {
            this.dataHandle()
        },
        methods: {
            //判断百分比字符串是否大于0，例如-20%返回false，15%返回true。如果大于600%也返回false
            percentGreaterThanZero(val) {
                var result = 0;
                if (val) {
                    var arr = val.toString().split("%");
                    result = parseFloat(arr[0]);

                    if (result > 600) {
                        return false
                    }
                    return result > 0;
                }
            },
            //处理来自多少个省，获得总数
            handleProvinceTotal(val) {
                var result = 0;
                if (val) {
                    var arr = val.toString().split("|");
                    if (arr.length > 0) {
                        result = arr.length
                    } else {
                        return result
                    }
                }
                return result
            },

            //处理来自多少个省，获得明细
            handleProvinceDetail(val) {
                var result = [];
                if (val) {
                    var arr = val.toString().split("|");
                    if (arr.length > 0) {
                        for (let i = 0; i < arr.length; i++) {
                            result.push({
                                name: arr[i].split(",")[0],
                                value: arr[i].split(",")[1]
                            })
                        }
                    } else {
                        return result
                    }
                }
                return result
            },

            dataHandle() {
                /*this.list = [
                  {
                    name: "市内患者数量",
                    value: Math.round(Math.random() * 500),
                    unit: "人次/天"
                  },
                  {
                    name: "医保患者占比",
                    value: Math.round(Math.random() * 100),
                    unit: "%"
                  },
                  {
                    name: "市外门诊患者数量",
                    value: Math.round(Math.random() * 500),
                    unit: "人次/天"
                  }
                ];*/
                this.circleList = [
                    {
                        name: "市内住院\n患者占比",
                        value: this.pageData.INPATIENTS_NUM_IN_CITY,
                        unit: ""
                    },
                    {
                        name: "住院医保\n患者占比",
                        value: this.pageData.INSURANCE_INPATIENTS,
                        unit: ""
                        // unit: "%"
                    },
                    {
                        name: "市外住院\n患者占比",
                        value: this.pageData.INPATIENTS_NUM_OUTSIDE_CITY,
                        unit: ""
                    }
                ];
                const arr = ["浙江", "福州", "南京", "上海", "丽江", "乐山", "简阳", "成都", "石家庄", "辽宁", "重庆", "北京", "浙江", "福州", "南京", "上海", "丽江", "乐山", "简阳", "成都", "石家庄", "辽宁", "重庆", "北京"].map(item => ({
                    name: item,
                    value: Math.round(Math.random() * 100)
                }));
                // this.regionList = this.grpArray(arr,12);

                this.regionList = this.grpArray(this.handleProvinceDetail(this.pageData.PROVINCES_INPATIENTS_FROM), 12)
            },

            grpArray(array, size) {
                const grp = [[]];
                size = Math.max(size, 1);
                if (Array.isArray(array)) for (let i = 0; i < array.length; i++) {
                    if (grp[grp.length - 1].length >= size) grp[grp.length] = [];
                    grp[grp.length - 1].push(array[i]);
                }
                return grp;
            }
        }
    }
</script>

<style scoped lang="scss">
    .InHospital {
        padding: 0 20px;
        box-sizing: border-box;

        .patients-info {
            margin-top: 7px;
            text-align: center;

            > div {
                height: 10px;
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
                    margin-top: 15px;
                }
            }
        }

        .PatientsAccount {
            margin-top: 13px;
        }

        .person-from {
            margin-top: 1px;
            color: #3f3f3f;
            text-align: center;
            font-size: 16px;
            font-family: "ss-r", sans-serif;

            > div {
                span {
                    margin-left: 2px;
                    margin-right: 2px;
                    color: #1d953f;
                    font-size: 18px;
                }

                & + div {
                    margin-top: 2px;
                }
            }
        }

        .RegionList {
            margin-top: 1px;
        }

        .disease-info {
            margin-top: 10px;
            text-align: center;
            font-family: "ss-r", sans-serif;
            font-size: 16px;

            > div {
                > span {

                }

                & + div {
                    margin-top: 2px;
                }

                /*&:nth-child(1) {
                    > span {
                        color: crimson;
                    }
                }

                &:nth-child(2) {
                    > span {
                        color: crimson;
                    }
                }

                &:nth-child(3) {
                    > span {
                        color: deepskyblue;
                    }
                }

                &:nth-child(4) {
                    > span {
                        color: #6950a1;
                    }
                }*/
                &:nth-child(1) {
                    > span {
                        color: crimson;
                    }
                }

                &:nth-child(2) {
                    > span {
                        color: deepskyblue;
                    }
                }

                &:nth-child(3) {
                    > span {
                        color: #6950a1;
                    }
                }

            }
        }

        .base-text {
            margin-top: 7px;
            /*margin-bottom: 7px;*/
        }
    }
</style>
