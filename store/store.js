import vuex from "vuex";
import Vue from "vue";
import axios from "axios";
// import router from "router";
import Cookies from 'js-cookie'; 
import {router} from "../src/main";

Vue.use(vuex, axios);

const config = axios.create({
  withCredentials:true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": 'http://localhost:8080',
    "Access-Control-Allow-Credentials": true,
    }
});

export default new vuex.Store({
  getters: {},
  state: {
    users: [],
    user: [],
    register: [],
    login: false
  },
  actions: {
    loadUsers({ commit }) {
      axios.get("http://localhost:13377/").then(res => {
        console.log("home:", res.data);
        this.users = res.data;
        commit("SET_USERS", this.users);
      });
    },
    loadUser({ commit }, payload) {
      axios.get(`http://localhost:13377/profile/${payload}`).then(res => {
        console.log("profile:", res.data);
        this.user = res.data;
        commit("SET_USER", this.user);
      });
    },
    loadRegister({ commit }, user) {
      axios.post("http://localhost:13377/signup", user).then(res => {
        console.log("registering:", user);
        this.register = res.data;
        commit("SET_REGISTER", this.register);
      });
    },
    loadLogin({ commit }, user) {
      axios.post("http://localhost:13377/login", user, config).then(res => {
        // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
        console.log("STORE USER: ", user);
        console.log("STORE STATUS:", res.data);
        this.login = res.data;
        commit("SET_LOGIN", this.login);
        return axios.get("http://localhost:13377/auth", {withCredentials:true})})
        .then(res => {
        console.log("STORE AUTH:", res.data);
        if(res.data == 'SUCCESS') {
          // var now = new Date();
          // var minutes = 1;
          // now.setTime(now.getTime() + (minutes * 60 * 1000));
          router.push("/post") //since user is logged in then we will push /post route
          Cookies.set('access', 'true', {/*expires: 'Session',*/ SameSite: 'Strict' })
        }
      });
    },
    loadData({ commit }) {
      axios.get("http://localhost:13377/post", {withCredentials:true}).then(res => {
        console.log("logging in:", res.data);
        this.data = res.data;
        commit("SET_LOGIN", this.data);
      });
    }
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_USER(state, user, payload) {
      state.user = user;
      state.payload = payload;
    },
    SET_REGISTER(state, register) {
      state.register = register;
    },
    SET_LOGIN(state, login) {
      state.login = login;
    }
  }
});
