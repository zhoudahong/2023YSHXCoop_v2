<template>
  <div class="TechnicianService">
    <div class="accepts-info">
      <p>2023年，您总共</p>
      <p>做了 <span>2189</span> 次检查</p>
      <p>为军文做了 <span>29</span> 次检查</p>
      <p>为军文做了 <span>29</span> 次检查</p>
    </div>
    <div class="result">
      <div class="title">检查结果阳性率</div>
      <div class="progress">
        <div class="progress-inner" :style="{ width: '79%' }"></div>
      </div>
      <div class="value">79%</div>
    </div>
    <div class="desc">
      <p>检查最大年龄 <span>81</span> 岁，最小年龄 <span>2</span> 岁</p>
      <p>做检查最晚在 <span>8</span>月<span>21</span>日 <span>18:24</span></p>
      <p>做的检查数量TOP前3：</p>
      <p class="red-btn btn-group"><i>血常规</i><i>尿常规</i><i>尿常规</i></p>
      <p>做的检查部位TOP前3：</p>
      <p class="yellow-btn btn-group"><i>胃部</i><i>心脏</i><i>口腔</i></p>
      <p>申请检查科室数量TOP前3：</p>
      <p class="blue-btn btn-group"><i>内科</i><i>普外科</i><i>口腔科</i></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "TechnicianService",
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
.TechnicianService {
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
  .desc {
    position: relative;
    z-index: 2;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #444444;
    p {
      span {
        color: #4891ff;
        font-size: 20px;
      }
    }
    .btn-group {
      display: flex;
      justify-content: center;
      i {
        padding: 8px;
        font-size: 16px;
        display: block;
        border: 1px solid #ee6665;
        color: #ee6665;
        border-radius: 8px 8px 8px 8px;
        margin: 0 4px;
        font-weight: 600;
        font-style: normal;
      }
      &.yellow-btn {
        i {
          border: 1px solid #f6bc3e;
          color: #f6bc3e;
        }
      }
      &.blue-btn {
        i {
          border: 1px solid #6c93e0;
          color: #6c93e0;
        }
      }
    }
  }
}
</style>
