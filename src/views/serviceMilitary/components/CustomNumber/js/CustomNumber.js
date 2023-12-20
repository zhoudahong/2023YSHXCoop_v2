import { BaseChart } from "@dper/helper/src/echarts";
import * as echarts from "echarts"

export default class CustomNumber extends BaseChart {
  constructor( el ) {
    super(el,echarts);
    this.option = {
      grid: {
        top: 20,
        left: 0,
        right: 0
      },
      xAxis: {
        max: 0,
        show: false,
        splitLine: { show: false },
        offset: 10,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          margin: 10
        },
        label: {
          show: false
        }
      },
      yAxis: {
        data: ['2013'],
        show: false,
        inverse: true,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          margin: 10,
          color: '#999',
          fontSize: 16
        }
      },
      series: {}
    }
  }
  render(data) {
    (!this.myChart) && this.initEchart();
    this.option.xAxis.max = data.max
    this.option.series = data.series;
    this.myChart.setOption(this.option)
  }
}
