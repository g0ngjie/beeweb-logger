import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import RoutesComponent from "./components/routes.vue";
Vue.component("routes-component", RoutesComponent);

import './loggerMount'
// import './vuelogger'


Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
