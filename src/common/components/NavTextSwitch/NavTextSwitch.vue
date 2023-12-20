<template>
  <div class="NavSwitch font-ss-r">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="[item.name, { active: item.name === pointer }]"
      :style="{ color: item.name === pointer ? activeColor : '#333' }"
      @click="navClick(item)"
      class="the_nav"
    >
      <span class="text">{{ item.name }}</span>
      <div class="line" :style="{ backgroundColor: lineColor }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavTextSwitch",
  props: {
    pointer: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: null,
    },
    lineColor: {
      type: String,
      default: "#ffffff",
    },
    activeColor: {
      type: String,
      default: "#333333",
    },
  },
  methods: {
    navClick(item) {
      this.$store.commit("changeNav", item.name);
    },
  },
};
</script>

<style scoped lang="scss">
.NavSwitch {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 44px 20px 0;
  box-sizing: border-box;
  .the_nav {
    text-align: center;
    padding-right: 24px;
    &:last-child {
      padding-left: 0;
    }
    .line {
      opacity: 0;
    }
    &.active {
      position: relative;
      .text {
        position: relative;
        z-index: 2;
        font-size: 24px;
        font-family: PingFang SC, PingFang SC;
        font-weight: bold;
      }
      .line {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 6px;
        border-radius: 20px;
        z-index: 1;
        width: calc(100% - 24px);
        transition: 0.3s;
        opacity: 1;
      }
    }
    .text {
      font-size: 18px;
      font-family: PingFang SC, PingFang SC;
      font-weight: bold;
    }
  }
}
</style>
