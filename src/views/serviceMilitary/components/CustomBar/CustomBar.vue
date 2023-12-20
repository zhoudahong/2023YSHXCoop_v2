<template>
  <div class="CustomBar">
    <div
        v-for="(item,index) in list"
        :key="index"
        class="the-column"
    >
      <div class="value font-din-bold">{{item.value}}</div>
      <div class="bar" >
        <div class="in-bar" :style="{height: `${item.percent}%`}"></div>
      </div>
      <div class="name">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomBar",
  props: {
    list: {
      type: Array,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.CustomBar {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10px;
  .the-column {
    width: 28px;
    height: 100px;
    .bar {
      position: relative;
      height: 80px;
      margin-top: 10px;
      .in-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        background:  linear-gradient(to bottom,#05e373,transparent);
        transition: all .3s;
      }
    }
    .value {
      color: #1d953f;
      font-size: 12px;
    }
    .name {
      font-size: 12px;
      transform: scale(.8);
    }
    &:hover {
      .bar {
        .in-bar {
          background: linear-gradient(to bottom,#ff8859,transparent);
        }
      }
    }
  }
}
</style>
