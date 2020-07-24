import vuex from "vuex"
import Vue from "vue"
import axios from "axios"
import Cookies from 'js-cookie'
// import {router} from "../src/main"
import m_login from "./modules/m_login"
import createPersistedState from "vuex-persistedstate"
Vue.use(vuex, axios)

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
  plugins: [createPersistedState({
    paths: ['m_login'],
    storage: {
      getItem: (key) => Cookies.get(key),
      removeItem: (key) => Cookies.remove(key),
      setItem: (key, value) =>
      Cookies.set(key, value, { secure: true, SameSite:'Strict' }),
    }
  })],
  state: {
    ID: 0,
    users: [],
    user: [],
    register: [],
    posts: []
  },
  getters: {
  },
  actions: {
    loadUsers({ commit }) {
      axios.get("http://localhost:13377/").then(res => {
        commit("SET_USERS", res.data);
      })
    },
    loadUser({ commit }, payload) {
      axios.get(`http://localhost:13377/profile/${payload}`).then(res => {
        commit("SET_USER", res.data);
      })
    },
    loadRegister({ commit }, user) {
      axios.post("http://localhost:13377/signup", user).then(res => {
        commit("SET_REGISTER", res.data);
      })
    },
    loadID({ commit }) {
      axios.get("http://localhost:13377/loadID", {withCredentials:true}).then(res => {
        commit("SET_ID", res.data);
      })
    },
    loadPosts({ commit }) {
      axios.get("http://localhost:13377/posts", {withCredentials:true}).then(res => {
        commit("SET_POSTS", res.data);
      })
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
    SET_ID(state, ID) {
      state.ID = ID;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    }
  }
})
