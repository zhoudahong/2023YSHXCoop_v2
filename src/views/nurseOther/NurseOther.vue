<template>
  <div class="NurseOther">
    <div class="accepts-info">
      <p>护理文书编辑 <span>20</span> 次</p>
      <p>查房巡视患者 <span>189</span> 次</p>
      <p>护理计划表记录 <span>210</span> 次</p>
      <p>体温单记录 <span>365</span> 次</p>
      <p>体征信息录入 <span>675</span> 次</p>
      <p>输血 <span>20</span> 次</p>
      <p>患者(液体)出入量记录 <span>20</span> 次</p>
      <p>医嘱执行 <span>130</span> 次</p>
      <p>PDA扫描转入转出 <span>231</span> 次</p>
      <p>护理不良事件上报 <span>20</span> 次</p>
      <p>夜班 <span>80</span> 次</p>
      <p>输液反应登记 <span>17</span> 次</p>
      <p>输血反应登记 <span>20</span> 次</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "NurseOther",
  props: {
    pageData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scope>
.NurseOther {
  position: relative;
  height: calc(100% - 110px);
  padding: 0 20px;
  box-sizing: border-box;
  .accepts-info {
    position: relative;
    z-index: 2;
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
        color: #ff6969;
        font-size: 18px;
      }
      & + p {
        margin-top: 14px;
      }
    }
  }
}
</style>
