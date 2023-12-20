<template>
  <div class="OutpatientService">
    <NavSwitch pointer="门诊" v-if="false" />

    <div class="accepts-info" v-if="isNotNull(pageData.VISITS_NUM)">
      <p v-if="isNotNull(pageData.CLINIC_DAYS)">
        您总共出诊了<span>{{ pageData.CLINIC_DAYS }}</span
        >天
      </p>
      <p v-if="isNotNull(pageData.VISITS_NUM)">
        接诊了 <span>{{ pageData.VISITS_NUM }}</span> 位门诊患者
      </p>
      <!--<p v-if="isNotNull(pageData.VISITS_NUM_LAST)">上年度门诊量 <span>{{pageData.VISITS_NUM_LAST}}</span> 人次</p>-->
      <p v-if="percentGreaterThanZero(pageData.OUTPATIENT_RATE)">
        门诊增长率
        <span>{{ pageData.OUTPATIENT_RATE }}</span>
      </p>
      <p v-if="pageData.DAY_HIGHEST_OUTPATIENTS">
        在
        <span>{{ getTime(pageData.DAY_HIGHEST_OUTPATIENTS) }}</span>
        这一天，接诊最高为<span> {{ pageData.MAXIMUM_VISITS }}</span> 人次
      </p>

      <p v-if="isNotNull(pageData.OLDEST_OUTPATIENT)">
        患者最大年龄 <span>{{ pageData.OLDEST_OUTPATIENT }}</span
        >，最小年龄 <span>{{ pageData.YOUNGEST_OUTPATIENT }}</span>
      </p>
      <p v-if="isNotNull(pageData.CLINIC_DIAGNOSIS_TOP3)">
        门诊诊断数量前三的疾病 <span>{{ pageData.CLINIC_DIAGNOSIS_TOP3 }}</span
        >,最小年龄<span>{{ pageData.CLINIC_DIAGNOSIS_TOP3 }}</span>
      </p>
    </div>

    <PatientsAccount
      class="percent-person"
      :list="circleList"
      v-if="isNotNull(pageData.OUTPATIENTS_NUM_IN_CITY)"
    />

    <!--<CircleChart :circleList="circleList"></CircleChart>-->

    <div class="person-from">
      <!--<div v-if="pageData.FARTHEST_OUTPATIENT_FROM"></div>-->
      <div v-if="handleProvinceTotal(pageData.PROVINCES_OUTPATIENTS_FROM)">
        您的患者来自天南地北：总计来自
        <span>{{
          pageData.PROVINCES_OUTPATIENTS_FROM | handleProvinceTotal
        }}</span>
        个省
      </div>
      <div v-if="pageData.FARTHEST_OUTPATIENT_FROM">
        最远的门诊患者来自 <span>{{ pageData.FARTHEST_OUTPATIENT_FROM }}</span>
      </div>
    </div>

    <RegionList
      class="region-list"
      :list="regionList"
      v-if="pageData.PROVINCES_OUTPATIENTS_FROM"
    />

    <!--<rank-bar :pageData="pageData" :listDataType="listDataType"/>-->
    <!--<word-cloud/>-->
    <div
      class="person-from"
      style="margin-top: 32px"
      v-if="pageData.CLINIC_DIAGNOSIS_TOP"
    >
      门诊诊断疾病排行：
    </div>
    <rank-bar :pageData="pageData" :listDataType="listDataType" />
    <BaseText  text="您医学精湛，帮助他们解除痛苦。"/>
  </div>
</template>

<script>
import NavSwitch from "@/common/components/NavSwitch/NavSwitch.vue";
import BaseText from "@/common/components/BaseText/BaseText.vue";
import RegionList from "@/common/components/RegionList/RegionList.vue";
import PatientsAccount from "@/common/components/PatientsAccount/PatientsAccount.vue";
import CirclePie from "../../common/components/CirclePie/CirclePie";
import BarChart from "../../common/components/BarChart/BarChart";
import PieChart from "../../common/components/PieChart/PieChart";
import CircleChart from "../../common/components/CircleChart/CircleChart";
import getTime from "@/lib/utils";
import RankBar from "../../common/components/RankBar/RankBar";

export default {
  name: "OutpatientService",
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
  components: {
    RankBar,
    CircleChart,
    PieChart,
    BarChart,
    CirclePie,
    PatientsAccount,
    RegionList,
    BaseText,
    NavSwitch,
  },
  data() {
    return {
      year: "2023",
      outPerson: 418,
      person: 300,
      rateGrowth: "20%",
      old: 60,
      young: 10,
      list: [],
      pieList: [],
      circleData: ["1", "2"],
      regionList: [], //环形图数据
      provinceNum: 20,
      region: "北京市",
      date: "10月20日",
      max: 500,
      listDataType: "menzhen", //排行榜为门诊
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
    /*dataHandle() {
                this.circleList.push(this.pageData.OUTPATIENTS_NUM_IN_CITY).push(this.pageData.OUTPATIENTS_NUM_IN_CITY)
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
            },*/

    //判断百分比字符串是否大于0，例如-20%返回false，15%返回true。如果大于600%也返回false
    percentGreaterThanZero(val) {
      var result = 0;
      if (val) {
        var arr = val.toString().split("%");
        result = parseFloat(arr[0]);

        if (result > 600) {
          return false;
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
          result = arr.length;
        } else {
          return result;
        }
      }
      return result;
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
              value: arr[i].split(",")[1],
            });
          }
        } else {
          return result;
        }
      }
      return result;
    },

    dataHandle() {
      /*this.list = [
                  {
                    name: "市内门诊患者数量",
                    value: Math.round(Math.random()*500),
                    unit: "人次"
                  },
                  {
                    name: "医保患者占比",
                    value: Math.round(Math.random()*100),
                    unit: "%"
                  },
                  {
                    name: "市外门诊患者数量",
                    value: Math.round(Math.random()*500),
                    unit: "人次"
                  }
                ];*/
      //环形图数据，顺序为
      // this.circleList.push(this.pageData.OUTPATIENTS_NUM_IN_CITY).push(this.pageData.INSURANCE_OUTPATIENTS).push(this.pageData.OUTPATIENTS_NUM_OUTSIDE_CITY)
      this.circleList = [
        {
          name: "市内门诊\n患者占比",
          value: this.pageData.OUTPATIENTS_NUM_IN_CITY,
          unit: "",
        },
        {
          name: "门诊医保\n患者占比",
          value: this.pageData.INSURANCE_OUTPATIENTS,
          // unit: "%"
          unit: "",
        },
        {
          name: "市外门诊\n患者占比",
          value: this.pageData.OUTPATIENTS_NUM_OUTSIDE_CITY,
          unit: "",
        },
      ];

      const arr = [
        "浙江",
        "福州",
        "南京",
        "上海",
        "丽江",
        "乐山",
        "简阳",
        "成都",
        "石家庄",
        "辽宁",
        "重庆",
        "北京",
        "浙江",
        "福州",
        "南京",
        "上海",
        "丽江",
        "乐山",
        "简阳",
        "成都",
        "石家庄",
        "辽宁",
        "重庆",
        "北京",
      ].map((item) => ({
        name: item,
        value: Math.round(Math.random() * 100),
      }));
      // this.regionList = this.grpArray(arr,12)

      this.regionList = this.grpArray(
        this.handleProvinceDetail(this.pageData.PROVINCES_OUTPATIENTS_FROM),
        12
      );
    },
    grpArray(array, size) {
      const grp = [[]];
      size = Math.max(size, 1);
      if (Array.isArray(array))
        for (let i = 0; i < array.length; i++) {
          if (grp[grp.length - 1].length >= size) grp[grp.length] = [];
          grp[grp.length - 1].push(array[i]);
        }
      return grp;
    },
  },
};
</script>

<style scoped lang="scss">
.OutpatientService {
  padding: 0 20px;
  box-sizing: border-box;

  .accepts-info {
    margin-top: 12px;
    /*text-align: center;*/

    > p {
      height: 10px;
      padding: 0;
      margin: 0;
      font-size: 16px;
      font-family: "ss-r", sans-serif;

      > span {
        margin-left: 2px;
        margin-right: 2px;
        font-family: "din-bold", sans-serif;
        /*color: #1d953f;*/
        color: #1d953f;
        font-size: 18px;
      }

      & + p {
        margin-top: 16.5px;
      }
    }
  }

  .percent-person {
    margin-top: 18px;
  }

  .person-from {
    margin-top: 8px;
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
        margin-top: 3px;
      }
    }
  }

  .region-list {
    margin-top: 8px;
  }

  .BaseText {
    margin: 10px 0 80px;
    padding-top: 2px;
  }
}
</style>
