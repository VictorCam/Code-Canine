import axios from "axios";
// import Cookies from 'js-cookie'; 
import {router} from "../../src/main";
  
export default {


    namespaced: true, //need module name then the action name
    state: {
      login: false
    },
    actions: {
      loadLogin({ commit }, user) {
        axios.post("http://localhost:13377/login", user).then(res => {
          // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
          console.log("STORE USER: ", user);
          console.log("STORE STATUS:", res.data);
          this.login = res.data;
          commit("SET_LOGIN", this.login); //add {root: true} as it's own param (but not ideal)
          return axios.get("http://localhost:13377/auth", {withCredentials:true})})
          .then(res => {
          console.log("STORE AUTH:", res.data);
          if(res.data == 'SUCCESS') {
            // var now = new Date();
            // var minutes = 1;
            // now.setTime(now.getTime() + (minutes * 60 * 1000));
            router.push("/post") //since user is logged in then we will push /post route
            // Cookies.set('access', 'true', {/*expires: 'Session',*/ SameSite: 'Strict' })
          }
        });
      },
      logout({ commit }) {
        axios.get("http://localhost:13377/logout", {withCredentials:true}).then(res => {
          console.log("logout:", res.data);
          commit("SET_LOGIN", false);
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