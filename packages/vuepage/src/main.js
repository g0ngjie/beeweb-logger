import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import RoutesComponent from "./components/routes.vue";
import { mount, listener } from "@beeweb/logger";
import { Base64 } from "./secret";

mount({
  mapURI:
    "http://api.map.baidu.com/location/ip?ak=RD3fQS8GA1UeR4Ig10ejdEkTg1OfwuV3",
  serverURL: "http://localhost:12345",
});
listener(function ({ detail }) {
  const result = Base64.decode(detail);
  console.log("[debug]result:", JSON.parse(result));
});

Vue.component("routes-component", RoutesComponent);

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
