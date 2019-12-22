<template>
  <v-app>
    <AppBar />
    <NavigationDrawer />
    <v-content>
      <v-container fluid>
        <v-row dense align="center" justify="center">
          <v-col cols="9">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import NavigationDrawer from "./components/NavigationDrawer";
export default {
  name: "App",
  components: {
    AppBar,
    NavigationDrawer
  },
  created() {
    if (this.user) {
      this.$store.dispatch("loadUserAction"); // get user state
      this.$store.dispatch("loadBioAction"); // get bio state
    }
  },
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    }
  }
};
</script>
