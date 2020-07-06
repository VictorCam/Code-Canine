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
//getters from store would be optimal (I think)

Vue.config.productionTip = false;

Vue.use(VueRouter, VueAxios, Axios);


const routes = [
  { path: "*", name: "404", component: notFound },
  { path: "/", name: "home", component: home },
  { path: "/profile/:id", name: "profile", component: profile },
  { path: "/login", name: "login", component: login },
  { path: "/signup", name: "signup", component: signup },
  { path: "/upload", name: "upload", component: upload, meta: {requiresAuth: true} },
  { path: "/post", name: "post", component: post, meta: {requiresAuth: true}, children: [
    { path: 'home', component: home},
 ] }
];
const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach( async (to,from,next)=> {
  var AuthCheck = Cookies.get("access")

  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(AuthCheck) {
      next();
    }
    else {
      router.replace("/login")
    }
  }
  else {
    next();
  }
})

new Vue({
  el: "#main",
  router,
  store,
  render: h => h(main)
});
