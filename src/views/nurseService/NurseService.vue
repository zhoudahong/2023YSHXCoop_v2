<template>
  <div class="NurseService">
    <div class="accepts-info">
      <p>2023年，您总共</p>
      <p>护理患者了 <span>289</span> 位门诊患者</p>
      <p>护理军文患者 <span>29</span> 人次</p>
      <p>护理病重患者 <span>32</span> 天</p>
      <p>护理病危患者 <span>28</span> 天</p>
    </div>
    <div class="nurse-level">
      <div
        class="nurse-level-item"
        v-for="(item, index) in nurseLevel"
        :key="index"
      >
        <div class="top">
          <span class="name">{{ item.name }}</span>
          <span class="day">{{ item.day }}天</span>
        </div>
        <div class="progress">
          <div
            class="progress-inner"
            :style="{ width: getProgress(item) }"
          ></div>
        </div>
      </div>
    </div>
    <div class="desc">
      <p>护理最大年龄 <span>94</span> 岁，最小年龄 <span>3</span> 岁</p>
      <p>参与三四级手术 <span>9</span> 台</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NurseService",
  props: {
    pageData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      nurseLevel: [
        { name: "特级护理", day: 120 },
        { name: "一级护理", day: 102 },
        { name: "二级护理", day: 76 },
        { name: "三级护理", day: 42 },
      ],
    };
  },
  methods: {
    getProgress(item) {
      let max = this.getMaxValue(this.nurseLevel);
      return (item.day / max) * 100 + "%";
    },
    getMaxValue(nurseLevel) {
      return Math.max(...nurseLevel.map((obj) => obj.day));
    },
  },
};
</script>
<style lang="scss" scope>
.NurseService {
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
        color: #ff6969;
        font-size: 18px;
      }
      & + p {
        margin-top: 14px;
      }
    }
  }
  .nurse-level {
    position: relative;
    z-index: 2;
    padding-top: 24px;
    &-item {
      padding: 0 48px 12px;
      .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 8px;
      }
      .name {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #444444;
      }
      .day {
        font-size: 16px;
        font-family: DIN, Arial, Helvetica, sans-serif;
        font-weight: 500;
        color: #444444;
      }
      .progress {
        &-inner {
          height: 8px;
          background: linear-gradient(90deg, #ffcbb4 0%, #ff7269 100%);
          border-radius: 4px 4px 4px 4px;
        }
      }
    }
  }
  .desc {
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #444444;
    p {
      span {
        color: #ff6969;
        font-size: 20px;
        font-weight: 500;
      }
    }
  }
}
</style>
