`<template>
  <div class="post" id="post">
    <h1>Post</h1>
    <span v-if="ID">
    <form @submit.prevent="cpost">
      Make a post:
      <br>
      <input type="text" v-model="post.content" />
      <input type="submit" value="Submit" />
    </form>
    <br>
    <br>
    
    <div v-for="post in posts" :key="post.id"> <!--note to self: "post" can be whatever name I want but I must use the name below-->
    <div v-if="post.ID == ID">
      {{post.POST_ID}}
      <router-link id="link" :to="'/profile/' + post.ID">{{post.Name}}</router-link>
      {{post.post}}
      <button>EDIT POST</button>
    </div>
    <div v-else>
      <router-link id="link" :to="'/profile/' + post.ID">{{post.Name}}</router-link>
      {{post.post}}
    </div>
      <br>
      <br>
    </div>
    </span>
    <span v-else> LOADING </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
    return {
      post: {
          content: ''
      }
    };
  },
  methods: {
    cpost() {
      console.log(this.post);
      // this.$store.dispatch("m_login/loadLogin", this.user);
    }
  },
  created() {
    this.$store.dispatch("loadID")
    this.$store.dispatch("loadPosts")
  },
  computed: {
    ...mapState(["ID"]),
    ...mapState(["posts"])
  }
};
</script>
