<template>
  <div id="main">
    <h1>CodeCanine</h1>
    <p>Key: {{user_auth}}</p>
    <router-link v-if="user_auth.bool==true" id="link" to="/">Home</router-link>
    <!-- <router-link v-if="login==false" id="link" to="/profile/1">Profile 1</router-link> -->
    <!-- <router-link v-if="login==false" id="link" to="/profile/2">Profile 2</router-link> -->
    <router-link v-if="user_auth.bool==true" id="link" to="/upload">Upload</router-link>
    <router-link v-if="user_auth.bool==false" id="link" to="/login">Login</router-link>
    <router-link v-if="user_auth.bool==false" id="link" to="/signup">Sign Up</router-link>
    <router-link v-if="user_auth.bool==true"  id="link" to="/post">Post</router-link>
    <router-link v-if="user_auth.bool==true"  id="link" :to="'/profile/' + user_auth.id">My Profile</router-link>
    <router-view :key="$route.name + ($route.params.id || '')"></router-view>
    <cfooter></cfooter>
  </div>
</template>

<script>
import cfooter from "./footer";
import { mapState } from "vuex";
export default {
  components: {
    cfooter: cfooter
  },
  mounted() {
    // this.$store.dispatch("loadData");
    this.$store.dispatch("m_login/loadKey") 

    //I'm dumb I don't even need persist state if I can 
    //use another dispatch for checking if user is logged im
    //or do I? If I log in then this state does not change!
    //but if we wait until all components load then it's fine (I think)
    //there is also the issue where the router-view key is giving an issue
    //specifically when doing /1 /2 because of the router-view key in this vue
    //firstly I should see if lazy loading avoid this issue with the key
  },
    computed: {
    ...mapState({user_auth: state => state.m_login.user_auth}),
  }
}
</script>

<style scoped>
h1 {
  color: black;
}

#link {
  padding: 5px;
}
</style>
