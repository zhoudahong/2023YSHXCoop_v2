<template>
  <list-swiper ref="list-swiper" :swiper-opt="swiperOptOut" :list="list">
    <div class="swiper-slide">
      <NurseMain
        :pageData="pageData"
        :user_info="user_info"
        :urlUserInfo="urlUserInfo"
      />
    </div>
    <div class="swiper-slide">
      <NavTextSwitch
        :pointer="$store.state.nav"
        :list="inList"
        activeColor="#FF6969"
        lineColor="#FFF5F5"
      />
      <list-swiper ref="list-swiper-in" :swiper-opt="swiperOpt" :list="inList">
        <div class="swiper-slide swiper-in">
          <NurseService :pageData="pageData" />
        </div>
        <div class="swiper-slide swiper-in">
          <NurseOther :pageData="pageData" />
        </div>
        <div class="swiper-slide swiper-in">
          <NurseDuringHoliday :pageData="pageData" />
        </div>
      </list-swiper>
    </div>
    <div class="swiper-slide">
      <TheEnd />
    </div>
  </list-swiper>
</template>
<script>
import ListSwiper from "@/common/components/ListSwiper.vue";
import NurseMain from "@/views/nurseMain/NurseMain.vue"; //  首页
import NurseService from "@/views/nurseService/NurseService.vue"; //  门诊
import NurseOther from "@/views/nurseOther/NurseOther.vue"; // 住院
import NurseDuringHoliday from "@/views/nurseDuringHoliday/NurseDuringHoliday.vue"; // 生日与节假日
import NavTextSwitch from "@/common/components/NavTextSwitch/NavTextSwitch.vue";
import TheEnd from "@/views/theEnd/TheEnd.vue";
export default {
  name: "Nurse",
  components: {
    NavTextSwitch,
    NurseDuringHoliday,
    NurseOther,
    NurseService,
    NurseMain,
    TheEnd,
    ListSwiper,
  },
  props: {
    inList: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
    pageData: {
      type: Object,
      default: () => {},
    },
    user_info: {
      type: Object,
      default: () => {},
    },
    drg_month: {
      type: Object,
      default: () => {},
    },
    urlUserInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      swiperOptOut: {
        direction: "vertical",
        slidesPerView: "auto",
      },
      swiperOpt: {
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: 0,
        freeMode: true,
        on: {
          slideChange: () => {
            if (this.$refs["list-swiper-in"].swiper) {
              let nav =
                this.inList[this.$refs["list-swiper-in"].swiper.activeIndex]
                  .name;
              this.$store.commit("changeNav", nav);
            }
          },
        },
        // initialSlide: 0
      },
    };
  },
  mounted() {
    this.$watch(
      "$store.state.nav",
      (nav) => {
        const slideTo = this.inList.find((t) => t.name === nav);
        if (slideTo) this.$refs["list-swiper-in"].swiper.slideTo(slideTo.index);
      },
      {
        immediate: false,
        deep: true,
      }
    );
  },
};
</script>
<style lang="scss"></style>
