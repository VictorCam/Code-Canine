<template>
  <div id="main">
    <h1>CodeCanine</h1>
    <router-link id="link" to="/">Home</router-link>
    <router-link id="link" to="/profile/1">Profile 1</router-link>
    <router-link id="link" to="/profile/2">Profile 2</router-link>
    <router-link id="link" to="/profile/3">Profile 3</router-link>
    <router-link id="link" to="/login">Login</router-link>
    <router-link id="link" to="/signup">Sign Up</router-link>
    <router-link id="link" to="/upload">Upload</router-link>
    <router-link id="link" to="/post">Post</router-link>
    <router-view :key="$route.name + ($route.params.id || '')"></router-view>
    <cfooter></cfooter>
  </div>
</template>

<script>
import cfooter from "./footer";

export default {
  components: {
    cfooter: cfooter
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
