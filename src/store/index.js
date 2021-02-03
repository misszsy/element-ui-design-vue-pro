import Vue from "vue";
import Vuex from "vuex";
import setting from "./modules/setting";
import user from "./modules/user";
import form from "./modules/form";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    setting,
    user,
    form
  },
  state: {},
  mutations: {},
  actions: {},
  getters: getters
});
