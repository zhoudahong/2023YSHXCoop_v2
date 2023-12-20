<template>
  <div class="m-progress">
    <div class="inner" :style="calcStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'm-progress',
  props: {
    percentage: {
      type: [Number, String],
      default: 0
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    calcStyle() {
      let style = ''
      if (typeof this.percentage === 'number') {
        style += `width:${this.percentage}%;`
      }
      if (typeof this.percentage === 'string') {
        style += `width:${parseFloat(this.percentage)}%;`
      }
      if (this.color) {
        style += `background:${this.color};`
      } else {
        style += `background: linear-gradient(90deg, #00BEC8, #FE864C);`
      }
      return style
    }
  }
}
</script>

<style lang="scss">
.m-progress {
  width: 100%;
  height: 5px;
  background: #f2f2f2;
  border-radius: 3px;
  .inner {
    height: 5px;
    background: linear-gradient(90deg, #00bec8, #fe864c);
    border-radius: 3px;
    transition: 0.3s;
  }
}
</style>
