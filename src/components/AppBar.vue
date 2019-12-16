<template>
  <div>
    <v-app-bar color="white" light app clipped-left>
      <v-btn icon text to="/" color="white" class="ml-1">
        <v-img
          :src="require('../assets/locum-logo.svg')"
          max-height="40"
          max-width="40"
          contain
        ></v-img>
      </v-btn>

      <v-toolbar-title>LocumHire</v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn text icon color="primary" v-if="user" to="/account">
        <v-icon color="white">mdi-account</v-icon>
      </v-btn>

      <v-btn text small v-if="user" @click="logOut">Log Out</v-btn>

      <v-btn text small v-if="!user" to="/login">Log In</v-btn>

      <v-btn text small to="/signup" v-if="!user">Sign Up</v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { fb } from "../db.js";
export default {
  name: "AppBar",
  methods: {
    logOut() {
      fb.auth()
        .signOut()
        .then(() => {
          // Sign-out successful. set the user state to null
          this.$store.dispatch("resetUserAction");
          this.$router.push({ name: "login" });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  },
  computed: {
    user() {
      return this.$store.state.user; // get the user state
    }
  }
};
</script>
