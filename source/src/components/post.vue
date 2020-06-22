`<template>
  <div class="post" id="post">
    <h1>Post</h1>
    <p>Hello World</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {}
  },
  mounted() {
    console.log("loading data now");
    this.$store.dispatch("loadData");
  },
  methods: {
    ...mapState(["data"])
  }
};
</script>
