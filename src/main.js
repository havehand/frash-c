import Vue from 'vue';
import App from './App.vue';
import "@/styles/global.less";
import 'lib-flexible';
import Vant from "vant";
import 'vant/lib/index.css';
import router from "@/router/index"
import store from "@/store"

Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
