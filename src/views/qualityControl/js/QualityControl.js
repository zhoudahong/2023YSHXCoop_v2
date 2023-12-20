import { BaseChart } from "@dper/helper/src/echarts";
import * as echarts from "echarts"

export default class QualityControl extends BaseChart {
  constructor(el) {
    super(el, echarts);
    this.option = {}
  }
  render(data) {
    (!this.myChart) && this.initEchart();
    this.option = data;
    this.myChart.setOption(this.option);
  }
}
