<template>
  <div id="main">
    <h1>CodeCanine</h1>
    <p>LOGIN: {{login}}</p>
    <!-- <p>SESSION: {{session}}</p> -->
    <p>USER ID: {{ID}}</p>
    <!-- <router-link v-if="login==true" id="link" to="/">Home</router-link> -->
    <!-- <router-link v-if="login==false" id="link" to="/profile/1">Profile 1</router-link> -->
    <!-- <router-link v-if="login==false" id="link" to="/profile/2">Profile 2</router-link> -->
    <!-- <router-link v-if="login==false" id="link" to="/profile/3">Profile 3</router-link> -->
    <router-link v-if="login==false" id="link" to="/login">Login</router-link>
    <router-link v-if="login==false" id="link" to="/signup">Sign Up</router-link>
    <router-link id="link" to="/post">Post</router-link>
    <router-link v-if="login==true"  id="link" :to="'/profile/' + ID">My Profile</router-link>
    <!-- <router-link v-if="login==true"  id="link" to="/profile/1">Profile test 1</router-link> -->
    <!-- <router-link v-if="login==true"  id="link" to="/profile/2">Profile test 2</router-link> -->
    <!-- <router-link v-if="login==false"  id="link" to="/profile/1">Profile test 1 (logout)</router-link> -->
    <button v-if="login==true" v-on:click="logout">LOGOUT</button>
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
  },
  computed: {
    ...mapState({login: state => state.m_login.login}),
    ...mapState(["ID"])
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout")
    }
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
