<template>
  <div class="CirclePie" ref="chart"></div>
</template>

<script>
import CirclePie from "./js/CirclePie";

export default {
  name: "CirclePie",
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data: {
      handler: "dataHandle",
      immediate: true,
      deep: true
    }
  },
  methods: {
    dataHandle(data) {
      if(data.length === 0) return false
      this.chart = new CirclePie(this.$refs.chart);
      let chartOpt = {
        series: [
          {
            name: "pie",
            type: "pie",
            z: 10,
            radius: ["18%","55%"],
            center: ["50%","50%"],
            roseType: 'area',
            label: {show: false},
            labelLine: {show: false},
            data: data
          },
          {
            name: "sunburst",
            type: "sunburst",
            z:9,
            radius: ["18%","100%"],
            center: ["50%","50%"],
            label: {},
            data: data.map(item => ({
              value: 1,
              children: [{
                value: 1,
                name: item.name,
                children: [
                  {
                    value: 1,
                    name: item.percent + "%"
                  }
                ]
              }]
            })),
            silent: true,
            levels: [
              {},
              {
                radius: ["18%","60%"],
                itemStyle: {
                  color: "#d8e8de",
                  borderColor: "#6eac84"
                },
              },
              {
                radius: ["60%","75%"],
                itemStyle: {
                  color: "#fff",
                  borderColor: "#6eac84"
                },
                label: {
                  color:"#3f3f3f",
                  rotate: "tangential"
                }
              },
              {
                radius: ["75%","100%"],
                itemStyle: {
                  color: "transparent",
                  borderColor: "transparent"
                },
                label: {
                  color:"#02e372",
                  rotate: 0,
                  fontSize: 14,
                  fontFamily: "din-bold"
                }
              },
            ]
          }
        ]
      }
      this.chart.render(chartOpt);
    },
  }
}
</script>

<style scoped lang="scss">
.CirclePie {
  height: 310px;
}
</style>
