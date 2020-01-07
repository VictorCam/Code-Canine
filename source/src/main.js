import Vue from "vue";
import VueRouter from "vue-router";
import main from "./main.vue";
import Bye from "./components/ByeWorld.vue";
import Hello from "./components/HelloWorld.vue"; //this
import NotFound from "./components/404.vue";

import VueAxios from "vue-axios";
import Axios from "axios";

Vue.config.productionTip = false;

Vue.use(VueRouter, VueAxios, Axios);

const routes = [
  { path: "*", name: "404", component: NotFound },
  { path: "/", name: "Hello", component: Hello },
  { path: "/bye/:uid", name: "profile", component: Bye }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: "#main",
  router,
  render: h => h(main)
});
