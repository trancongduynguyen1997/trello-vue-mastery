import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/tailwind.css";
import AppDrag from "./components/AppDrag";
import AppDrop from "./components/AppDrop";

Vue.config.productionTip = false;

Vue.component('AppDrag',AppDrag);
Vue.component('AppDrop',AppDrop);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
