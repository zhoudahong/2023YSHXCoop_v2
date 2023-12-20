<template>
  <div class="NurseDuringHoliday">
    <div class="accepts-info">
      <p><span>12月24日</span></p>
      <p>是您 <span>28</span> 岁生日</p>
      <p>生日这天护理患者 <span>12</span> 位</p>
      <p>生日这天需要上 <span>夜班</span></p>
    </div>
    <div class="accepts-info">
      <p>2023年</p>
      <p>节假日护理患者一共 <span>112</span> 位</p>
    </div>
    <img class="cake" src="@/common/assets/img/nurse_cake.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "NurseDuringHoliday",
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
.NurseDuringHoliday {
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
        color: #ff6969;
        font-size: 18px;
      }
      & + p {
        margin-top: 14px;
      }
    }
  }

  .cake {
    position: absolute;
    width: 264px;
    height: 239px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
}
</style>
