<template>
  <div class="profile">
    <h1>Profile</h1>

    <div v-if="user.ID">
    <img width="100px" height="100px" :src="userWithIcon.icon">
    <p> {{ user.Name }} </p>
    <p> {{ user.icon}} </p>
    </div>
    <div v-else>USER HAS BEEN TERMINATED FOR VIOLATING THE TERMS OF SERVICE</div>

  </div>
</template>


<script>

import { mapState } from "vuex"

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
    'user'
    ]),
    userWithIcon () {
     return {
       ...this.user, 
        icon: this.user.icon && require(`../assets/imgs/${this.user.icon}`)
     }
    }
  },
  watch: {
    id() {
      this.fetchUser();
    }
  },
  created() {
    this.fetchUser();
  },

  methods: {
    fetchUser() {
      this.$store.dispatch("loadUser", Number(this.$route.params.id));
    }
  }
};
</script>