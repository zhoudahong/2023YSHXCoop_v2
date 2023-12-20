import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nav: "门诊"
  },
  mutations: {
    changeNav(state,nav) {
      state.nav = nav
    }
  },
  actions: {
    changeNav(commit,nav) {
      commit("changeNav",nav)
    }
  },
  modules: {
  }
})
