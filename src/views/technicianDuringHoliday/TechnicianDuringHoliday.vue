<template>
  <div class="TechnicianDuringHoliday">
    <div class="accepts-info">
      <p><span>12月24日</span></p>
      <p>是您 <span>36</span> 岁生日</p>
      <p>生日这天做检查/阅片 <span>12</span> 位/次</p>
      <p>今天需要上 <span>夜班</span></p>
    </div>
    <div class="accepts-info">
      <p>2023年</p>
      <p>节假日做检查/阅片<span>92</span> 位/次</p>
    </div>
    <img class="cake" src="@/common/assets/img/technician_cake.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "TechnicianDuringHoliday",
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

<style scoped lang="scss">
.TechnicianDuringHoliday {
  position: relative;
  height: calc(100% - 110px);
  padding: 0 20px;
  box-sizing: border-box;
  .accepts-info {
    position: relative;
    z-index: 3;
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

  .cake {
    position: absolute;
    width: 220px;
    height: 207px;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
}
</style>
