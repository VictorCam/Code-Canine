import axios from "axios";
// import Cookies from 'js-cookie'; 
import {router} from "../../src/main";
  
export default {


    namespaced: true, //need module name then the action name
    state: {
      login: false
    },
    actions: {
      loadLogin({ commit }, payload) {

      console.log("payload init", payload)
      var bodyFormData = new FormData()
      bodyFormData.append('username', payload.username)
      bodyFormData.append('password', payload.password)
      console.log("payload", payload.username, payload.password)

        axios.post("http://localhost:13377/login", bodyFormData, {withCredentials:true}).then(res => {
          console.log("STORE STATUS:", res.data);
          this.login = res.data;
          commit("SET_LOGIN", this.login); //add {root: true} as it's own param (but not ideal)
          if(res.data == true) {
            router.push("/post")
          }
        });
      },
      logout({ commit }) {
        axios.get("http://localhost:13377/logout", {withCredentials:true}).then(res => {
          commit("SET_LOGIN", res.data); //just gets set false
          // replaceState({login})
          router.push("/login")
        });
      }
     },
     mutations: {
      SET_LOGIN(state, login) {
        state.login = login; //we can use this.state to access the root state
      }
     },
     getters: {},
  }