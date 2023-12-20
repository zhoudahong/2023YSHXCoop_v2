import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "swiper/swiper.scss";
import "./common/assets/css/font.css";
//适配
import "../src/config/rem.js";
//存储挂载到原型，通过this调用
import local from "./lib/local"

import 'echarts'
import VECharts from 'vue-echarts'
Vue.component('v-chart', VECharts)

import './lib/filters'

Vue.prototype.local = local;
//vantui
import 'vant/lib/index.css';
import Vant from "vant";
import {Toast} from 'vant';

Vue.use(Vant, Toast);

//引入全局函数
import myFunc from '@/lib/funcUtil.js';

Vue.use(myFunc);

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
