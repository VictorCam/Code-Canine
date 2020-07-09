import Vue from "vue";
import VueRouter from "vue-router";
import VueAxios from "vue-axios";
import Axios from "axios";

import main from "./main.vue";
import profile from "./components/profile.vue";
import login from "./components/login.vue";
import signup from "./components/signup.vue";
import home from "./components/home.vue";
import notFound from "./components/404.vue";
import upload from "./components/upload.vue";
import post from "./components/post.vue";

import store from "../store/store";

Vue.config.productionTip = false;

Vue.use(VueRouter, VueAxios, Axios);

const routes = [
  { path: "*", name: "404", component: notFound, meta: {auth_require: false} },
  { path: "/", name: "home", component: home, meta: {auth_require: false} },
  { path: "/profile/:id", name: "profile", component: profile, meta: {auth_require: false} },
  { path: "/login", name: "login", component: login, meta: {auth_require: false, auth_restrict: true} },
  { path: "/signup", name: "signup", component: signup, meta: {auth_require: false, auth_restrict: true} },
  { path: "/upload", name: "upload", component: upload, meta: {auth_require: true} },
  { path: "/post", name: "post", component: post, meta: {auth_require: true} }
]

export const router = new VueRouter({
  routes,
  mode: "history"
})

router.beforeEach((to,from,next)=> {
  auth_require(to,from,next)
})

function check() {
  var AuthCheck = false

  if(store.state.m_login.login) { //needs improvement (can delete token and still access routes)
    AuthCheck = store.state.m_login.login
  }

  return AuthCheck
}

function auth_require(to,from,next) {

  var AuthCheck = check()

  //check if user is logged in if not restrict access to main part of the site
  if(to.matched.some(record => record.meta.auth_require)) { //add &&?

    if(AuthCheck) {
      next()
    }
    else {
      next("/login")
      return //no need to continue since user is not authenticated
    }
  }
  else {
    next()
  }

  // restrict auth users from accessing guest routes
  if(to.matched.some(record => record.meta.auth_restrict)) {

    if(AuthCheck) {
      next('/post')
    }
    else {
      next()
    }
  }
  else {
    next()
  }
}

new Vue({
  el: "#main",
  router,
  store,
  render: h => h(main)
});
