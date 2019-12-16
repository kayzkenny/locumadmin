<template>
  <v-container>
    <v-row dense justify="center" class="mt-6">
      <v-col cols="11" sm="6" md="7" lg="8">
        <v-card flat color="transparent" class="display-1 mx-auto"
          >Vacancies</v-card
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
    <v-row dense justify="center">
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
              <v-card-title class="body-1">{{ vac.position }}</v-card-title>

              <v-card-subtitle
                v-line-clamp:20="2"
                class="mt-1 body-2 text-left"
                >{{ vac.job_desc }}</v-card-subtitle
              >
            </div>
          </div>
          <v-card-actions>
            <v-btn
              text
              class="pl-2"
              :to="{
                name: 'apply',
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
    this.$store.dispatch("loadVacanciesAction"); // get xp state
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
