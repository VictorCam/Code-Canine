<template>
  <div id="main">
    <h1>CodeCanine</h1>
    <div id="restricted">
    <!-- <div class="routing" v-if="$route.name !== 'signup'"> -->
    <router-link v-if="auth" id="link" to="/">Home</router-link>
    <router-link v-if="auth" id="link" to="/profile/1">Profile 1</router-link>
    <router-link v-if="!auth" id="link" to="/profile/2">Profile 2</router-link>
    <router-link v-if="auth!='true'" id="link" to="/profile/3">Profile 3</router-link>
    <router-link v-if="auth!='true'" id="link" to="/login">Login</router-link>
    <router-link v-if="auth!='true'" id="link" to="/signup">Sign Up</router-link>
    <!-- <router-link v-if="auth!='true'" id="link" to="/upload">Upload</router-link> -->
    <router-link v-if="auth!='true'" id="link" to="/post">Post</router-link>
    <router-view :key="$route.name + ($route.params.id || '')"></router-view>
    </div>
    <cfooter></cfooter>
  </div>
</template>

<script>
import cfooter from "./footer";
import Cookies from "js-cookie"; 
export default {
  data() {
    return {
      auth: Cookies.get("access")
    }
  },
  components: {
    cfooter: cfooter
  },
  methods: {
    isOnLoginPage: function() {
      if(Cookies.get("access")) {
        return true
      }
      else {
        return false
      }
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
