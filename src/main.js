import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/tailwind.css";
import AppButton from "./components/AppButton.vue"

Vue.config.productionTip = false;

Vue.component(AppButton)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
