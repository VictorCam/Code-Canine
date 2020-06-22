`<template>
  <div class="menu" id="menu">
    <h1>Home</h1>
    <!--<p>First: {{ this.posts }}</p>-->
    <!--<ul>
      <li v-for="name in user" :key="name.id" v-text="name.Name"></li>
    </ul>-->

    <div v-for="name in users" :key="name.id">{{ name.Name }} {{ name.ID }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  mounted() {
    this.$store.dispatch("loadUsers");
  },
  computed: {
    ...mapState(["users"])
  }
};
</script>