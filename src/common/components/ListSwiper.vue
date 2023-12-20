<template>
  <div
    ref="swiper"
    class="ListSwiper swiper-container"
  >
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div
      ref="scroll-bar"
      v-show="false"
      class="swiper-scrollbar"
    ></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { assignDeep } from "@dper/helper/src/objectHelper";

export default {
  name: "ListSwiper",
  props: {
    swiperOpt: {
      type: Object,
      default: () => ({
        direction: "vertical",
        slidesPerView: 6,
        autoplay: { delay: 5e3 }
      })
    },
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      swiper: null
    };
  },
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(this.swiperHandle.bind(this));
      }
    }
  },
  updated(){
    this.updateSwiper();
  },
  methods: {
    swiperHandle() {
      if (this.swiper) {
        this.swiper.destroy();
        this.swiper = null;
      }
      this.swiper = new Swiper(this.$refs.swiper, assignDeep({
        scrollbar: {
          el: this.$refs["scroll-bar"],
          draggable: true,
          snapOnRelease: false,
          hide: false
        },
        // mousewheel: false
      }, this.swiperOpt));
      this.$once("hook:beforeDestroy", () => this.swiper.destroy());
    },
    updateSwiper() {
      this.swiper.update(true);
    }
  }
};
</script>

<style lang="scss" scoped>
.ListSwiper {
  height: 100%;
}
</style>
