<template>
  <div class="login">
    <h1>Login</h1>
    <!-- <form @submit.prevent="addPost">
      UserName:
      <br />
      <input type="text" name="username" v-model="post.username" />
      <br />Password:
      <br />
      <input type="password" name="password" v-model="post.password" />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      //post: {}
    };
  },
  methods: {
    addPost() {
      //console.log(this.post);
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
