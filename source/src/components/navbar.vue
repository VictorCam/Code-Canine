<template>
  <div id="main">
    <h1>CodeCanine</h1>
    <!-- <div class="routing" v-if="this.$route.path !== '/signup'"> -->

<!-- {{auth}} -->
    <router-link id="link" to="/">Home</router-link>
    <router-link v-if="auth=='true'" id="link" to="/profile/1">Profile 1</router-link>
    <router-link v-if="auth=='true'" id="link" to="/profile/2">Profile 2</router-link>
    <router-link v-if="auth=='true'" id="link" to="/profile/3">Profile 3</router-link>
    <router-link v-if="auth!='true'" id="link" to="/login">Login</router-link>
    <router-link v-if="auth!='true'" id="link" to="/signup">Sign Up</router-link>
    <router-link v-if="auth=='true'" id="link" to="/upload">Upload</router-link>
    <router-link v-if="auth=='true'" id="link" to="/post">Post</router-link>
    <router-view :key="$route.name + ($route.params.id || '')"></router-view>
    <!-- </div> -->
    <cfooter></cfooter>
  </div>
</template>

<script>
import cfooter from "./footer";
// import basket from "../store";
import EventBus from './EventBus';
import Cookies from "js-cookie";
export default {
  components: {
    cfooter: cfooter
  },
     data () {
         return {
             auth: this.checkIfIsLogged(),
         }
     },
     mounted () {
    EventBus.$on('logged-in', status => { //disgusting poopoo method
      console.log("checking")
      if(status != null) {
      this.auth = status
      }
      else {
        this.auth = this.checkIfIsLogged()
      }
    })
     },
     methods: {
        checkIfIsLogged() {
          return Cookies.get("access") //getters from store would be optimal
        }
     }
};
</script>

<style scoped>
h1 {
  color: black;
}

#link {
  padding: 5px;
}
</style>
