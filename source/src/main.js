import Vue from "vue";
import VueRouter from "vue-router";
import main from "./main.vue";
import profile from "./components/profile.vue";
import login from "./components/login.vue";
import signup from "./components/signup.vue";
import home from "./components/home.vue"; //this
import NotFound from "./components/404.vue";
import upload from "./components/upload.vue";
import post from "./components/post.vue";

import VueAxios from "vue-axios";
import Axios from "axios";
import store from "./store"; //I'm mad because this is lower cased


Vue.config.productionTip = false;

Vue.use(VueRouter, VueAxios, Axios);

const routes = [
  { path: "*", name: "404", component: NotFound },
  { path: "/", name: "home", component: home },
  { path: "/profile/:id", name: "profile", component: profile },
  { path: "/login", name: "login", component: login },
  { path: "/signup", name: "signup", component: signup },
  { path: "/upload", name: "upload", component: upload },
  { path: "/post", name: "post", component: post, }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

new Vue({
  el: "#main",
  router,
  store,
  render: h => h(main)
});
