<template>
  <div class="hello">
    <h1>Profile</h1>
    <div v-if="user.ID">{{ user.Name }} {{ user.ID }}</div>
    <div v-else>USER DOES NOT EXIST</div>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  mounted() {
    console.log(this.$route.params.id);
    //this.$store.dispatch("loadUser");
    this.$store.dispatch("loadUser", this.$route.params.id);
    //return this.$route.params.id;
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {
    //changes the state
    "$route.params.id": function() {
      null;
    }
  }
};
</script>
