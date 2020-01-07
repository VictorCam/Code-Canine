<template>
  <div id="main">
    <navbar></navbar>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";

export default {
  components: {
    navbar: navbar
  }
};
</script>

<style>
/* PERSISTENT THORUGHOUT WHOLE PAGE */
* {
  margin: 0em;
}

#main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: black;
}
</style>
