`<template>
  <div class="post" id="post">
    <h1>Post</h1>
    <span v-if="ID || ID == 0">
    

    <form v-if="ID" @submit.prevent="cpost">
      Make a post:
      <br>
      <input type="text" v-model="addpost.content" />
      <input class="submitpost" type="submit" value="Submit" />
    </form>
    <br>

    <!-- Test: {{posts}} -->



    
    <div v-for="(post, index) in posts" :key="post.id"> <!--note to self: "post" can be whatever name I want but I must use the name below-->
    <div v-if="post.ID == ID">
      {{post.POST_ID}}
      {{index}}
      <router-link id="link" :to="'/profile/' + post.ID">{{post.Name}}</router-link>
      {{post.post}}
      <form @submit.prevent="upost(post.POST_ID, index)">
      <input type="text" v-model.lazy="conpost.ucontent" />
      <input class="editpost" type="submit" value="EDIT POST" />
    </form>
      <!-- <button v-on:click="upost(post.POST_ID)">EDIT POST</button> -->
      <button class="deletepost" v-on:click="dpost(post.POST_ID, index)">DELETE POST</button>
    </div>
    <div v-else>
      {{index}}
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
      addpost: {
          content: ''
      },
      conpost: {
          ucontent: ''
      }
    }
  },
  methods: {
    cpost() {
      this.$store.dispatch("createPost", this.addpost)
      this.addpost.content = '' //unoptimal I think
    },
    dpost(pID,index) {
      var deletepost = {ID: pID, p_index: index}
      this.$store.dispatch("deletePost", deletepost)
    },
    upost(uID,index) {
      var updatepost = {ID: uID, content: this.conpost.ucontent, p_index: index}
      this.$store.dispatch("updatePost", updatepost)
      this.conpost.ucontent = '' //unoptimal I think
    }
  },
  created() {
      this.$store.dispatch("loadID")
      this.$store.dispatch("loadPosts")
  },
  computed: {
    ...mapState(["ID", "posts", "newpost"])
  }
};
</script>

<style scoped>

.editpost {
  display: inline-block;
  padding: 5px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #eed253;
  border: none;
  border-radius: 5px;
}

.editpost:hover {
  background-color: #c5a92d;
}

.deletepost {
  display: inline-block;
  padding: 5px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #e24f4f;
  border: none;
  border-radius: 5px;
}

.deletepost:hover {
  background-color: #aa0c0c;
}

.submitpost {
  display: inline-block;
  padding: 5px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4cb84c;
  border: none;
  border-radius: 5px;
}

.submitpost:hover {
  background-color: #3c993c;
}
</style>