<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
        <v-alert type="success" v-if="success">{{ success }}</v-alert>
      </v-col>
    </v-row>
    <v-col cols="10">
      <v-card flat color="transparent" class="display-1 mx-auto"
        >Post a Job</v-card
      >

      <v-form class="mx-auto my-4" @submit.prevent="update">
        <v-container>
          <v-row dense>
            <v-col cols="12" lg="3" md="6" sm="6">
              <v-text-field v-model="position" label="Position"></v-text-field>
            </v-col>
            <v-col cols="12" lg="3" md="6" sm="6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="deadline"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="deadline"
                    label="Pick a deadline"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="deadline"
                  no-title
                  scrollable
                  color="primary"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu.save(date)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6">
              <v-text-field
                v-model="dateRangeText"
                label="Pick a date range below"
                prepend-icon="mdi-calendar"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-date-picker
                full-width
                v-model="dates"
                color="primary"
                range
              ></v-date-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "Dashboard",
  data: () => ({
    feedback: null,
    success: null,
    position: "",
    loading: false,
    dates: [],
    menu: false,
    deadline: new Date().toISOString().substr(0, 10),
    job_desc: null
  }),
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    }
  }
};
</script>
