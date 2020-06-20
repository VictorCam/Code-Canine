<template>
  <div class="hello">
    <h1>Sign Up</h1>
    <form @submit.prevent="addPost">
      UserName:
      <br />
      <input type="text" name="username" v-model="user.username" />
      <br />Password:
      <br />
      <input type="password" name="password" v-model="user.password" />
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
      user: {
          username: '',
          password: ''
      }
    };
  },
  methods: {
    
    addPost() {
      console.log(this.user);
      this.$store.dispatch("loadRegister", this.user);
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
