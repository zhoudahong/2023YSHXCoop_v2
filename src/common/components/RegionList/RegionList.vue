<template>
  <list-swiper class="RegionList" :swiper-opt="swiperOpt" :list="list">
    <div
      v-for="(item,index) in list"
      :key="index"
      class="swiper-slide"
    >
      <div
        v-for="(itm,idx) in item"
        :key="idx"
        class="region_value_name"
      >
        <div class="value_name">
          <div class="value">{{ itm.value }}</div>
          <div class="name">{{ itm.name }}</div>
        </div>
      </div>
      <div class="bg-img vci-bg-fill" />
    </div>
  </list-swiper>
</template>

<script>
import ListSwiper from "@/common/components/ListSwiper.vue";

export default {
  name: "RegionList",
  components: { ListSwiper },
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      swiperOpt: {}
    };
  }
};
</script>

<style scoped lang="scss">
.RegionList {
  position: relative;
  height: 130px;
  .swiper-slide {
    .bg-img {
      position: absolute;
      top: 50%;
      left: 50%;
      /*width: 353px;*/
      width: 100%;
      height: 161px;
      background-image: url("./img/bg.png");
      transform: translate(-50%,-50%);
    }
    .region_value_name {
      position: absolute;
      width: 74px;
      height: 70px;
      border-radius: 50%;
      font-size: 16px;
      .value_name {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%,-50%);
      }
      &:nth-child(5n-4) {
        box-shadow: inset 0 0 20px #02e372;
      }
      &:nth-child(5n-3) {
        box-shadow: inset 0 0 20px #02e3cb;
      }
      &:nth-child(5n-2) {
        box-shadow: inset 0 0 20px #02b6e3;
      }
      &:nth-child(5n-1) {
        box-shadow: inset 0 0 20px #ffb675;
      }
      &:nth-child(5n) {
        box-shadow: inset 0 0 20px #ffa1b3;
      }
      $region: (28px, 130px,1),
        (0, 200px,.8),
        (62px, 194px,.6),
        (80px, 130px,.3),
        (66px, 68px,.7),
        (12px, 64px,.65),
        (6px, 260px,.5),
        (45px, 270px,.45),
        (80px, 242px,.48),
        (40px, 28px,.42),
        (8px, 6px,.52),
        (72px, 0,.64),;
      @for $i from 1 through length($region) {
        &:nth-child(#{$i}) {
          top: nth(nth($region, $i), 1);
          left: nth(nth($region, $i), 2);
          transform: scale(nth(nth($region, $i), 3));
        }
      }
    }
  }
  .region_text {
    position: absolute;

    &:nth-child(2n) {
      color: #3f3f3f;
    }
    &:nth-child(2n - 1) {
      color: #02e372;
    }
    $region: (0, 10px),
      (0, 80px),
      (20px, 40px),
      (40px, 50px),
      (64px, 20px),
      (64px, 80px),
      (0, 230px),
      (0, 300px),
      (20px, 270px),
      (40px, 250px),
      (64px, 240px),
      (64px, 300px),;
    @for $i from 1 through length($region) {
      &:nth-child(#{$i}) {
        top: nth(nth($region, $i), 1);
        left: nth(nth($region, $i), 2);
        transform: scale(1 - (random() * .1));
      }
    }
  }
  .radar-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 91px;
    height: 91px;
    transform: translate(-50%, -50%);
    .rotate-circle {
      width: 91px;
      height: 91px;
      background-image: url("./img/circle.png");
      animation: rotate 12s infinite linear;
      @keyframes rotate {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
    .name {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      color: #3f3f3f;
      text-align: center;
      font-size: 15px;
    }
  }
}
</style>
