<template>
  <div id="main">
    <h1>CodeCanine</h1>
    <router-link id="link" to="/">Home</router-link>
    <router-link id="link" to="/bye/10">Bye</router-link>
    <router-view></router-view>
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
