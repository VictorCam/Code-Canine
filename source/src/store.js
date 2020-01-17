import vuex from "vuex";
import axios from "axios";
import Vue from "vue";
import router from "router";

Vue.use(vuex, axios, router);

export default new vuex.Store({
  getters: {
    // id: router.route.params.id
  },
  state: {
    users: [],
    user: []
  },
  actions: {
    loadUsers({ commit }) {
      axios.get("http://localhost:11889/").then(res => {
        console.log("home:", res.data);
        this.users = res.data;
        commit("SET_USERS", this.users);
      });
    },
    loadUser({ commit }, payload) {
      //dispatch(this.$route.params.id);
      //console.log("store:", this.$route.params.id);
      axios.get(`http://localhost:11889/profile/${payload}`).then(res => {
        console.log("profile:", res.data);
        this.user = res.data;
        commit("SET_USER", this.user);
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
    }
  }
});
