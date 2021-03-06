import vuex from "vuex"
import Vue from "vue"
import axios from "axios"
// import Cookies from 'js-cookie'
import m_login from "./modules/m_login"
import createPersistedState from "vuex-persistedstate"
import { router } from "../src/main"
import SecureLS from "secure-ls";
var ls = new SecureLS({isCompression:true});
Vue.use(vuex, axios)

// const config = axios.create({
//   withCredentials:true,
//   headers: {
//     "Access-Control-Allow-Origin": 'http://localhost:8080',
//     "Access-Control-Allow-Credentials": true,
//     'Content-Type': 'application/json'
//     }
// });

export default new vuex.Store({
  modules: {
    m_login: m_login
  },
  plugins: [createPersistedState({
    paths: ['m_login'],
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    }
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
        console.log("backend res.data:", res.data)
        if(res.data == 0) {
          commit("m_login/RESET_STATE") //bad for guests but it's for security measures
          commit("CLEAR_ALL")
          //if this WAS a personal feed then you should redirect users
        }
        else {
        commit("SET_ID", res.data);
        }
      })
    },
    loadPosts({ commit }) {
      axios.get("http://localhost:13377/posts", {withCredentials:true}).then(res => {
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
      console.log(payload)
      console.log("payload is:", payload)

      var bodyFormData = new FormData()
      bodyFormData.append('info', payload.content)
      bodyFormData.append('info', payload.ID)
      bodyFormData.append('info', payload.p_index)

      axios.post("http://localhost:13377/update_post",bodyFormData, {withCredentials:true}).then(res => {
        console.log("payload is:", payload)
        // console.log(res.data.post)
        commit("SET_UPDATE_POST", res.data);
      })
    },
    deletePost({ commit }, payload) {
      console.log("payload is:", payload)
      var bodyFormData = new FormData();
      bodyFormData.append('info', payload.ID);
      bodyFormData.append('info', payload.p_index);

      axios.post(`http://localhost:13377/delete_post`, bodyFormData, {withCredentials:true}).then(res => {
      commit("SET_DELETE_POST", res.data)
      })
    },
    logout({ commit }) {
      axios.get("http://localhost:13377/logout", {withCredentials:true}).then(res => {
        console.log("LOGOUT HAS BEEN CALLED")
        console.log("res", res)
        commit("m_login/RESET_STATE")
        commit("CLEAR_ALL")
        router.push('/login')
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
    SET_ID(state, ID) {
      state.ID = ID;
    },
    SET_POSTS(state, posts) {
      state.posts = posts.slice().reverse();
    },
    SET_TMP() {
    },
    SET_NEW_POST(state, post) {
      state.posts.unshift(post) 
    },
    SET_DELETE_POST(state, index) {
      state.posts.splice(index,1)
    },
    SET_UPDATE_POST(state, payload) {
      state.posts[payload.index].post = payload.post
    },
    CLEAR_ALL(state) {
      state.ID = 0
    }
  }
})
