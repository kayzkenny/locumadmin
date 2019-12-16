import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import lineClamp from "vue-line-clamp";
import { fb } from "./db";
require("firebase/firestore");

Vue.config.productionTip = false;
Vue.use(lineClamp, {});

let app = null; // waiting for firebase auth to initialize before creating a vue instance

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    // initialize app if not already created
    app = new Vue({
      router,
      vuetify,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
