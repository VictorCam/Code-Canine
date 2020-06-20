`<template>
  <div class="post" id="post">
    <h1>Post</h1>
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
