import vuex from "vuex";
import axios from "axios";
import Vue from "vue";

Vue.use(vuex, axios);

export default new vuex.Store({
  state: {
    users: []
  },
  actions: {
    loadUsers({ commit }) {
      axios.get("http://localhost:11889/").then(res => {
        console.log(res.data);
        this.user = res.data;
        commit("SET_USERS", this.user);
      });
    }
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    }
  }
});
