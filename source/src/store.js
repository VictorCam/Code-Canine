import vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import router from "router";
import Cookies from 'js-cookie';

Vue.use(vuex, axios, router);

export default new vuex.Store({
  getters: {},
  state: {
    users: [],
    user: [],
    register: [],
    login: [],
    data: []
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
      axios.post("http://localhost:13377/login", user).then(res => {
        // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
        console.log("logging in: ", user);
        console.log("jwt token:", res.data);
        var now = new Date();
        var minutes = 2;
        now.setTime(now.getTime() + (minutes * 60 * 1000));

        Cookies.set('Authorization', res.data, {expires: now, SameSite: 'Strict' })
        // window.localStorage.setItem('Authorization', res.data)
        // console.log(window.localStorage.getItem('Authorization'));
        this.login = res.data;
        commit("SET_LOGIN", this.login);
      });
    },
    loadData({ commit }) {
      axios.get("http://localhost:13377/post").then(res => {
        console.log("COokie!", Cookies.get("Authorization"));
        console.log("logging in:", "hello");
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
    SET_LOGIN(state, data) {
      state.data = data;
    }
  }
});
