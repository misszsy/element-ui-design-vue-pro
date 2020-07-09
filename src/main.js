import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/";
import elementUI from "element-ui";
import { message } from "@/utils/message/resetMessage";

Vue.config.productionTip = false;

Vue.use(elementUI);
Vue.prototype.$message = message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
