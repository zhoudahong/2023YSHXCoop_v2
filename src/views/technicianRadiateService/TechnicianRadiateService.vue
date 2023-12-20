<template>
  <div class="TechnicianRadiateService">
    <div class="accepts-info">
      <p>2023年，您总共</p>
      <p>阅片报告 <span>2189</span> 次</p>
      <p>检查最大年龄 <span>81</span> 岁，最小年龄 <span>2</span> 岁</p>
      <p>做检查最晚在 <span>8</span>月<span>21</span>日 <span>18:24</span></p>
      <p>阅片部位TOP前3：</p>
      <div class="pie" ref="chart"></div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "TechnicianRadiateService",
  props: {
    pageData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      labelStyle: {
        formatter: "{name|{b}}{percent|{d}%}",

        rich: {
          percent: {
            fontSize: 16,
            color: "#4891FF",
          },
          name: {
            fontSize: 16,
            color: "#666666",
          },
        },
      },
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      this.chart = echarts.init(this.$refs.chart);
      const chartOpt = {
        color: ["#ee6666", "#f6bc3e", "#6b93e0"],
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: "阅片部位",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["35%", "50%"],
            avoidLabelOverlap: false,
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            data: [
              { value: 1048, name: "口腔", label: this.labelStyle },
              { value: 735, name: "心脏", label: this.labelStyle },
              { value: 580, name: "胃部", label: this.labelStyle },
              {
                value: 4000,
                name: "",
                itemStyle: {
                  color: "#dde5f6",
                },
                labelLine: {
                  show: false,
                },
              },
            ],
          },
        ],
      };
      this.chart.setOption(chartOpt);
    },
  },
};
</script>
<style lang="scss" scope>
.TechnicianRadiateService {
  position: relative;
  height: calc(100% - 110px);
  padding: 0 20px;
  box-sizing: border-box;
  .accepts-info {
    margin-top: 46px;
    text-align: center;
    > p {
      height: 32px;
      padding: 0;
      margin: 0;
      font-size: 16px;
      font-family: "ss-r", sans-serif;
      > span {
        margin-left: 2px;
        margin-right: 2px;
        font-family: "din-bold", sans-serif;
        color: #4891ff;
        font-size: 18px;
      }
      & + p {
        margin-top: 14px;
      }
    }
  }
  .result {
    display: flex;
    justify-content: space-around;
    padding: 16px 0 8px;
    .title {
      font-family: PingFang SC;
      font-weight: 500;
      color: #444444;
    }
    .progress {
      flex: 1;
      height: 12px;
      border-radius: 4px 4px 4px 4px;
      opacity: 1;
      border: 1px solid #e3f2ff;
      margin: 0 4px;
      &-inner {
        height: 12px;
        background: linear-gradient(90deg, #93beff 0%, #3a89ff 100%);
        border-radius: 8px;
      }
    }
    .value {
      font-family: DIN, Helvetica, Arial, sans-serif;
      font-weight: 500;
      color: #4891ff;
    }
  }
  .pie {
    height: 200px;
  }
}
</style>
