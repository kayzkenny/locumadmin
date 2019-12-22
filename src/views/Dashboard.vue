<template>
  <v-container>
    <v-row justify="center" v-if="!vacancies">
      <v-col cols="11">
        <p class="display-1 text-center">You haven't posted any vacancies</p>
      </v-col>
      <v-col cols="11">
        <v-img
          :src="require('../assets/no_data.svg')"
          max-height="400"
          max-width="400"
          contain
          class="mx-auto"
        ></v-img>
      </v-col>
    </v-row>
    <v-row dense justify="center" class="mt-6" v-if="vacancies">
      <v-col cols="11" sm="6" md="7" lg="8">
        <v-card flat color="transparent" class="display-1 mx-auto"
          >Posted Jobs</v-card
        >
      </v-col>
      <v-col cols="11" sm="5" md="4" lg="3">
        <v-form>
          <v-text-field
            solo
            clearable
            label="Search"
            prepend-inner-icon="mdi-sort-variant"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row dense justify="center" v-if="vacancies">
      <v-col cols="11">
        <v-card
          color="white"
          class="display-1 mx-auto mb-4"
          v-for="vac in vacancies"
          :key="vac.id"
          max-width="1400"
        >
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="body-1">
                {{ vac.position }}
                <v-spacer></v-spacer>
                {{ vac.date_posted }}
              </v-card-title>
              <v-card-subtitle
                v-line-clamp:20="4"
                class="mt-1 body-2 text-left"
              >
                <div v-html="vac.job_desc"></div>
              </v-card-subtitle>
            </div>
          </div>
          <v-card-actions>
            <v-btn
              text
              class="pl-2"
              color="primary"
              :to="{
                name: 'applications',
                params: { vac_id: vac.id }
              }"
              >View Applications</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "Dashboard",
  data: () => ({}),
  created() {
    if (this.user) {
      this.$store.dispatch("loadVacanciesAction"); // get xp state
    }
    // console.log(this.vacancies);
  },
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    },
    vacancies() {
      return this.$store.state.vacancies; // get all vacancies state
    }
  }
};
</script>
