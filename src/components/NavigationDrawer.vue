<template>
  <v-navigation-drawer
    expand-on-hover
    permanent
    app
    clipped
    v-model="navDrawer"
  >
    <template v-slot:prepend>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link two-line>
          <v-list-item-content>
            <v-list-item-title class="title">{{
              bio.clinic_name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ bio.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link value="recent" to="/">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item link value="vacancies" to="/postjob">
        <v-list-item-icon>
          <v-icon>mdi-file-document</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Post a Job</v-list-item-title>
      </v-list-item>
      <v-list-item link value="profile" to="/profile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "NavigationDrawer",
  data: () => ({
    avatar: "",
    navDrawer: "recent"
  }),
  created() {
    // populate the data properties with firestore user data
    db.collection("clinic")
      .doc(this.user.email)
      .get()
      .then(snapshot => {
        this.avatar = snapshot.data().avatar;
      })
      .catch(error => {
        alert(error);
      });
    this.$store.dispatch("loadBioAction"); // get bio state
  },
  computed: {
    user() {
      return this.$store.state.user; // get the user state
    },
    bio() {
      return this.$store.state.bio; //get user bio
    }
  }
};
</script>
