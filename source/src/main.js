import Vue from "vue";
import VueRouter from "vue-router";
import VueAxios from "vue-axios";
import Axios from "axios";
import Cookies from "js-cookie";

import main from "./main.vue";
import profile from "./components/profile.vue";
import login from "./components/login.vue";
import signup from "./components/signup.vue";
import home from "./components/home.vue"; //this
import notFound from "./components/404.vue";
import upload from "./components/upload.vue";
import post from "./components/post.vue";

import store from "./store";


//NOTES:
//getters from store would be optimal
//I think there is a better way to do beforeEnter without doing each one individually


Vue.config.productionTip = false;

Vue.use(VueRouter, VueAxios, Axios);

const routes = [
  { path: "*", name: "404", component: notFound },
  { path: "/", name: "home", component: home },
  { path: "/profile/:id", name: "profile", component: profile },
  { path: "/login", name: "login", component: login, beforeEnter: (to, from, next) => {
    if(Cookies.get("access") != null) {
      console.log("should not access this");
      next("/");
    }
    else {
      console.log("you do not have access");
      next();
    }
  } },
  { path: "/signup", name: "signup", component: signup, beforeEnter: (to, from, next) => {
    if(Cookies.get("access") != null) {
      console.log("should not access this");
      next("/");
    }
    else {
      console.log("you do not have access");
      next();
    }
  } },
  { path: "/upload", name: "upload", component: upload },
  { path: "/post", name: "post", component: post, beforeEnter: (to, from, next) => {
    if(Cookies.get("access") != null) {
      console.log("you have access");
      next();
    }
    else {
      console.log("you do not have access");
      next("/login");
    }
  }
}
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
