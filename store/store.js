import vuex from "vuex";
import Vue from "vue";
import axios from "axios";
// import Cookiesfrom 'js-cookie'; 
// import {router} from "../src/main";
import m_login from "./modules/m_login"
// import createPersistedState from "vuex-persistedstate"
Vue.use(vuex, axios);
// import SecureLS from "secure-ls";
// var ls = new SecureLS({ isCompression: false });

// const config = axios.create({
//   withCredentials:true,
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8',
//     "Access-Control-Allow-Origin": 'http://localhost:8080',
//     "Access-Control-Allow-Credentials": true,
//     }
// });

export default new vuex.Store({
  modules: {
    m_login: m_login
  },
  // plugins: [createPersistedState({
  //   paths: ['m_login'],
  //   storage: {
  //     getItem: (key) => Cookies.get(key),
  //     removeItem: (key) => Cookies.remove(key),
  //     setItem: (key, value) => Cookies.set(key, value, { secure: true, SameSite:'Strict' }),
  //   }
  // })],
  state: {
    users: [],
    user: [],
    register: [],
  },
  getters: {
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
  }
});
