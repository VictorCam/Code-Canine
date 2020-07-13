import axios from "axios";
// import Cookies from 'js-cookie'; 
import {router} from "../../src/main";
  
export default {


    namespaced: true, //need module name then the action name
    state: {
      user_auth: {id:null, bool:false} //need to set the state
    },
    actions: {
      loadLogin({ commit }, user) {
        axios.post("http://localhost:13377/login", user).then(res => {
          // res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
          console.log("STORE USER: ", user);
          console.log("STORE STATUS:", res.data);
          commit("SET_KEY", res.data);
          return axios.get("http://localhost:13377/auth", {withCredentials:true})})
          .then(res => {
          console.log("STORE AUTH:", res.data);
          if(res.data == "SUCCESS") {
            console.log("key set")
            // var now = new Date();
            // var minutes = 1;
            // now.setTime(now.getTime() + (minutes * 60 * 1000));
            router.push("/post") //since user is logged in then we will push /post route
            // Cookies.set('access', 'true', {/*expires: 'Session',*/ SameSite: 'Strict' })
          }
        });
      },
      loadKey({ commit }) {
        axios.get("http://localhost:13377/post", {withCredentials:true}).then(res => {
          console.log("logging in:", res.data);
          console.log(res.data.id); //yay no need to parse :D
          console.log(res.data.bool);
          this.key = res.data;
          commit("SET_KEY", this.key);
        });
      }
     },
     mutations: {
      SET_LOGIN(state, login) {
        state.login = login; //we can use this.state to access the root state
      },
      SET_KEY(state, key) {
        state.user_auth = key;
      }
     },
     getters: {},
  }