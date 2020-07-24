<template>
  <div class="profile">
    <h1>Profile</h1>
    <button v-if="ID == user.ID">EDIT PROFILE</button>
    <div v-if="user.ID">
    <img width="100px" height="100px" :src="userWithIcon.icon">
    <p> {{ user.Name }} </p>
    <p> {{ user.icon}} </p>
    </div>
    <div v-else>LOADING</div>

  </div>
</template>


<script>
import { mapState } from "vuex"
export default {
  created() {
    this.$store.dispatch("loadUser", Number(this.$route.params.id));
    this.$store.dispatch("loadID")
  },
  computed: {
    ...mapState(['user','ID']),
    userWithIcon () {
     return {
       ...this.user, 
        icon: this.user.icon && require(`../assets/imgs/${this.user.icon}`)
     }
    }
  }
};
</script>