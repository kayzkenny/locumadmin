<template>
  <v-container>
    <v-row dense justify="center" class="mt-6">
      <v-col cols="11" sm="8" md="9" lg="10">
        <p class="title mx-auto">Applications</p>
      </v-col>
    </v-row>
    <v-row
      dense
      justify="center"
      v-for="applicant in applications"
      :key="applicant.vacancy_id"
    >
      <v-col cols="11" sm="8" md="9" lg="10">
        <v-card color="white" class="display-1 px-4 pt-4" max-width="1400">
          <v-row dense no-gutters>
            <v-col cols="3" sm="3" md="2" lg="1">
              <v-avatar size="72">
                <v-img
                  :src="applicant.avatar"
                  :alt="applicant.first_name"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="11" sm="9" md="10" lg="11">
              <div class="d-flex flex-no-wrap justify-space-between ml-2">
                <div>
                  <v-card-title class="pb-0 body-1">
                    {{ applicant.first_name }} {{ applicant.last_name }}
                    <!-- <v-spacer></v-spacer>
                    {{ applicant.application_date }}-->
                  </v-card-title>
                  <v-card-subtitle
                    v-line-clamp:20="3"
                    class="mt-1 body-2 text-left"
                  >
                    <span class="body-1">{{ applicant.headline }}</span>
                  </v-card-subtitle>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text class="pl-2" color="primary">Reject</v-btn>
            <v-btn text class="pl-2" color="primary">Accept</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="primary" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "Applications",
  data: () => ({
    loading: false,
    snackbar: false,
    text: "Application sent",
    timeout: 2000
  }),
  created() {
    let payload = {
      vac_id: this.$route.params.vac_id
    };
    this.$store.dispatch("loadApplicationsAction", payload); // get xp state
  },
  mounted() {
    console.log("position: ", this.position);
  },
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    },
    bio() {
      return this.$store.state.bio; //get user bio
    },
    applications() {
      return this.$store.state.applications; //get user bio
    }
  }
};
</script>
