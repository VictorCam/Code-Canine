<template>
  <div class="hello">
    <h1>Sign Up</h1>
    <form @submit.prevent="addPost">
      UserName:
      <br />
      <input type="text" name="username" v-model="post.username" />
      <br />Password:
      <br />
      <input type="password" name="password" v-model="post.password" />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  data() {
    return {
      post: {}
    };
  },
  methods: {
    addPost() {
      console.log(this.post);
      console.log(this.post.password);
      console.log(this.post.username);
      /* axios.post("http://localhost:11889/").then(response => {
        console.log(response);
      });*/
      //console.log(this.post.usern
    }
  }
  /*
  watch: {
    $route(to) {
      alert(to.params.uid);
    }
  },
  created() {
    alert(this.$route.params.uid);
  }*/
};
</script>
