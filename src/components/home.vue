`<template>
  <div class="menu" id="menu">
    <h1>Home</h1>
    <!--<p>First: {{ this.posts }}</p>-->
    <!--<ul>
      <li v-for="name in user" :key="name.id" v-text="name.Name"></li>
    </ul>-->

    <div v-for="name in users" :key="name.id">
    <div v-if="name.ID == ID">
    {{ name.Name }} {{ name.ID }} <button>EDIT POST</button>
    </div>
    <div v-else>
    {{ name.Name }} {{ name.ID }} 
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("loadUsers"),
    this.$store.dispatch("loadID")
  },
  computed: {
    ...mapState(["users"]),
    ...mapState(["ID"])
    // ...mapState({login: state => state.m_login.login}),
  }
};
</script>