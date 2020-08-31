import vuex from "vuex"
import Vue from "vue"
import axios from "axios"
// import Cookies from 'js-cookie'
// import {router} from "../src/main"
import m_login from "./modules/m_login"
import createPersistedState from "vuex-persistedstate"
Vue.use(vuex, axios)

// const config = axios.create({
//   withCredentials:true,
//   headers: {
//     "Access-Control-Allow-Origin": 'http://localhost:8080',
//     "Access-Control-Allow-Credentials": true,
//     'Content-Type': 'application/json'
//     }
// });
// let config = {
//   // headers: {
//   //   cookie: 'value',
//   // }
// }

// let data = {
//   'HTTP_CONTENT_LANGUAGE': self.language
// }


export default new vuex.Store({
  modules: {
    m_login: m_login
  },
  plugins: [createPersistedState({
    paths: ['m_login'],
  })],
  state: {
    tmp: [],
    ID: 0,
    users: [],
    user: [],
    register: [],
    posts: [],
    newpost: []
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
        console.log(res.data)
        commit("SET_POSTS", res.data);
      })
    },
    createPost({ commit }, payload) {
      var bodyFormData = new FormData()
      bodyFormData.append('info', payload.content)

      axios.all([
          axios.get("http://localhost:13377/username", {withCredentials:true}),
          axios.post("http://localhost:13377/create_post", bodyFormData, {withCredentials:true})
      ])
      .then(axios.spread(function (res1, res2) {
        var data = {...res1.data, ...res2.data}
        commit("SET_NEW_POST", data);
      }))
      .catch(function (error) {
        console.log(error)
      })
    },
    updatePost({ commit }, payload) {
      // console.log(payload)
      console.log(payload)
      console.log("payload is:", payload)

      var bodyFormData = new FormData()
      bodyFormData.append('info', payload.content)
      bodyFormData.append('info', payload.ID)

      axios.post("http://localhost:13377/update_post",bodyFormData, {withCredentials:true}).then(res => {
        console.log("payload is:", payload)
        console.log(res.data)
        commit("SET_TMP");
      })
    },
    deletePost({ commit }, payload) {
      console.log("payload is:", payload)
      var bodyFormData = new FormData();
      bodyFormData.append('post', payload);

      axios.post(`http://localhost:13377/delete_post`, bodyFormData, {withCredentials:true}).then(res => {
        console.log(res.data)
      commit("SET_TMP")
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
    },
    SET_CREATE_POST(state, posts) {
      state.posts.push(posts)
    },
    SET_TMP() {
    },
    SET_NEW_POST(state, post) {
      state.posts.push(post) 
    }
  }
})
