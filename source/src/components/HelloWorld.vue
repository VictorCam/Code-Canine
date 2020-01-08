`<template>
  <div class="menu" id="menu">
    <h2>Sup</h2>
    <!--<p>First: {{ this.posts }}</p>-->
    <p>Last:</p>
    <p>Age:</p>

    <ul>
      <li>Hello</li>
      <li>World!</li>
    </ul>

    <ul>
      <li v-for="name in names" :key="name.id" v-text="name.Name"></li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted: function() {
    axios.get("http://localhost:11889/").then(res => {
      console.log(res.data);
      this.names = res.data;
    });
  },
  data: function() {
    return {
      names: {}
    };
  }
};
</script>
