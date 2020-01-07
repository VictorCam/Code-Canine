<template>
  <div class="hello">
    <h1>Goodbye</h1>
    <p>your id is {{ $route.params.uid }}</p>

    <form @submit.prevent="addPost">
      First name:<br />
      <input type="text" name="firstname" v-model="post.first" />
      <br />
      Last name:<br />
      <input type="text" name="lastname" v-model="post.last" />
      <br /><br />
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    };
  },
  methods: {
    addPost() {
      console.log(this.post);
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
