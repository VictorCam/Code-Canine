<template>
  <div class="login">
    <h1>Login</h1>

    <form @submit.prevent="login">
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
import { mapState } from "vuex";
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
    login() {
        console.log(this.user);
        this.$store.dispatch("m_login/loadLogin", this.user);
    }
  },
  created() {
  },
    computed: {
    ...mapState(["ID"])
  }
};
</script>
