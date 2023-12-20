<template>
  <list-swiper ref="list-swiper" :swiper-opt="swiperOptOut" :list="list">
    <div class="swiper-slide">
      <TheMain :pageData="pageData" :user_info="user_info" :urlUserInfo="urlUserInfo" />
    </div>
    <div class="swiper-slide">
      <NavSwitch :pointer="$store.state.nav" :list="inList" />
      <list-swiper ref="list-swiper-in" :swiper-opt="swiperOpt" :list="inList">
        <div class="swiper-slide swiper-in">
          <list-swiper ref="list-swiper" :swiper-opt="swiperOptOut" :list="list">
            <div class="swiper-slide">
              <OutpatientService :pageData="pageData" />
            </div>
          </list-swiper>
        </div>
        <div class="swiper-slide swiper-in" v-if="pageData.INPATIENTS_NUM">
          <InHospital :pageData="pageData" />
        </div>
        <div class="swiper-slide swiper-in"  v-if="pageData.TOTAL_SURGERY_VOLUME">
          <TheSurgery :pageData="pageData" />
        </div>
        <div class="swiper-slide swiper-in">
        <!--<div class="swiper-slide swiper-in" v-if="!noOnlineDataJudge">-->
          <!--实际是为军服务-->
          <OnlineOutpatientService :pageData="pageData" />
        </div>
        <div class="swiper-slide swiper-in">
          <TheDgr :pageData="pageData" :drg_month="drg_month" />
          <QualityControl :pageData="pageData" :noHexinzhiduDataJudge="noHexinzhiduDataJudge" />
          <!--<QualityControl :pageData="pageData"/>-->
        </div>

        <div class="swiper-slide swiper-in">
          <!--实际是网络门诊-->
          <ServiceMilitary :pageData="pageData" />
        </div>

        <div class="swiper-slide swiper-in" v-if="pageData.HOLIDAYS_VISITS_NUM">
          <DuringHoliday :pageData="pageData" :user_info="user_info" />
        </div>
      </list-swiper>
    </div>
    <div class="swiper-slide">
      <TheEnd />
    </div>
    <!--<div>
                  <router-view></router-view>
                </div>-->
  </list-swiper>
</template>
<script>
import ListSwiper from "@/common/components/ListSwiper.vue"
import TheMain from "@/views/theMain/TheMain.vue" //  首页
import OutpatientService from "@/views/outpatientService/OutpatientService.vue" //  门诊
import InHospital from "@/views/inHospital/InHospital.vue" // 住院
import TheSurgery from "@/views/theSurgery/TheSurgery.vue" // 手术
import ServiceMilitary from "@/views/serviceMilitary/ServiceMilitary.vue" //  为军服务
import TheDgr from "@/views/theDgr/TheDgr.vue" // DGR
import QualityControl from "@/views/qualityControl/QualityControl.vue" // 质控
import OnlineOutpatientService from "@/views/onlineOutpatientService/OnlineOutpatientService.vue" // 网络门诊
import DuringHoliday from "@/views/duringHoliday/DuringHoliday.vue" // 生日与节假日
import TheEnd from "@/views/theEnd/TheEnd.vue"
import NavSwitch from "@/common/components/NavSwitch/NavSwitch.vue"

export default {
  name: "Doctor",
  components: {
    NavSwitch,
    TheEnd,
    DuringHoliday,
    QualityControl,
    TheDgr,
    ServiceMilitary,
    TheSurgery,
    InHospital,
    OutpatientService,
    OnlineOutpatientService,
    TheMain,
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
    noOnlineDataJudge: {
      type: Boolean,
      default: () => false,
    },
    noHexinzhiduDataJudge: {
      type: Boolean,
      default: () => false,
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
              let nav = this.inList[this.$refs["list-swiper-in"].swiper.activeIndex].name
              this.$store.commit("changeNav", nav)
            }
          },
        },
        // initialSlide: 0
      },
    }
  },
  mounted() {
    this.$watch(
      "$store.state.nav",
      (nav) => {
        const slideTo = this.inList.find((t) => t.name === nav)
        if (slideTo) this.$refs["list-swiper-in"].swiper.slideTo(slideTo.index)
      },
      {
        immediate: false,
        deep: true,
      }
    )
  },
}
</script>
<style lang="scss"></style>
