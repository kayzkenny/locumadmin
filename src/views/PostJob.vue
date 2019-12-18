<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
        <v-alert type="success" v-if="success">{{ success }}</v-alert>
      </v-col>
    </v-row>
    <v-col cols="12">
      <v-card flat color="transparent" class="display-1 mx-auto"
        >Post a Job</v-card
      >

      <v-card class="px-4">
        <v-form class="mx-auto my-4" @submit.prevent="postJob">
          <v-container>
            <v-row>
              <v-col cols="12" lg="3" md="6" sm="6">
                <v-text-field
                  v-model="position"
                  label="Position"
                ></v-text-field>
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
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(deadline)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-text-field
                  v-model="dateRangeText"
                  label="Pick a date range for the job below"
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
            <v-row>
              <p class="title ml-4 mt-4">Enter Job Description</p>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <vue-editor v-model="job_desc" />
              </v-col>
            </v-row>
            <v-row justify="center" dense>
              <v-btn class="mr-4 primary" @click="postJob" :loading="loading"
                >Post Job</v-btn
              >
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
import { VueEditor } from "vue2-editor";
export default {
  name: "PostJob",
  components: { VueEditor },
  data: () => ({
    feedback: null,
    success: null,
    position: "",
    loading: false,
    dates: [],
    menu: false,
    deadline: null,
    avatar: null,
    job_desc:
      "<h4><u>We are looking For</u></h4><br><h4><u>Key Responsibilities</u></h4><br><h4><u>Required Skills</u></h4><br><h4><u>About Us</u></h4>"
  }),
  methods: {
    postJob() {
      this.loading = true;
      let vacRef = db
        .collection("clinic")
        .doc(this.user.email)
        .collection("vacancies");
      vacRef
        .add({
          avatar: this.avatar,
          clinic_name: this.bio.clinic_name,
          position: this.position,
          date_posted: new Date(),
          email: this.user.email,
          job_desc: this.job_desc,
          start_date: new Date(this.dates[0]),
          end_date: new Date(this.dates[1]),
          deadline: new Date(Date.parse(this.deadline))
        })
        .then(() => {
          this.loading = false;
          this.$router.push({ name: "dashboard" });
        })
        .catch(error => {
          alert("Error writing document: ", error);
        });
    }
  },
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
    // this.$store.dispatch("loadBioAction"); // get bio state
  },
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    bio() {
      return this.$store.state.bio; //get user bio
    }
  }
};
</script>
