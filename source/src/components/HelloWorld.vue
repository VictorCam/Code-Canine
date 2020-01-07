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
      <li v-for="post in posts" :key="post.id" v-text="post.title"></li>
    </ul>
  </div>
</template>


<script>
import axios from "axios";
export default {
  mounted: function() {
    axios
      .get("http://localhost:4000/")
      .then(function(res) {
        console.log(res.data.data);
      })
      .then(function(res) {
        this.posts = res.data.data;
      });
  },
  data: function() {
    return {
      posts: {}
    };
  }
};
</script>
