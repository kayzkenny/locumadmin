<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-card class="mx-auto" max-width="340">
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="primary"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>

        <v-form @submit.prevent="signUp">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-img
                class="px-4"
                :src="require('../assets/doctor(2).svg')"
                max-height="400"
                max-width="600"
                contain
              ></v-img>
              <v-card-text>
                <v-text-field
                  label="Email"
                  v-model="email"
                  type="email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <span class="caption grey--text text--darken-1">
                  This is the email you will use to login to your LocumHire
                  account
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-img
                class="px-4"
                :src="require('../assets/doctor(3).svg')"
                max-height="400"
                max-width="600"
                contain
              ></v-img>
              <v-card-text>
                <v-text-field
                  label="Password"
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
                <v-text-field
                  label="Confirm Password"
                  v-model="confirmPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  @click:append="show2 = !show2"
                ></v-text-field>
                <span class="caption grey--text text--darken-1"
                  >Please enter a password for your account</span
                >
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  :src="require('../assets/locum-logo.svg')"
                ></v-img>
                <h3 class="title font-weight-light mb-2">
                  Welcome to LocumHire
                </h3>
                <span class="caption grey--text">Thanks for signing up!</span>
              </div>
            </v-window-item>
          </v-window>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="step === 1" text @click="step--">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="step === 3"
            color="primary"
            depressed
            @click="signUp"
            >Next</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { db, fb } from "../db.js";
export default {
  name: "SignUp",
  data: () => ({
    step: 1,
    user: null,
    email: "",
    password: "",
    confirmPassword: "",
    feedback: null,
    show1: false,
    show2: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Sign-up";
        case 2:
          return "Create a password";
        default:
          return "Account created";
      }
    }
  },

  methods: {
    signUp() {
      switch (this.step) {
        case 1:
          if (this.email) {
            this.step++;
            this.feedback = null;
          } else {
            this.feedback = "Please enter a valid email";
          }
          break;
        case 2:
          if (this.password && this.password == this.confirmPassword) {
            this.feedback = null;
            // this.loading = true;
            let ref = db.collection("clinic").doc(this.email);
            // set the email as the doc id
            ref.get().then(doc => {
              if (doc.exists) {
                this.feedback = "This email is already taken";
                // this.loading = false;
              } else {
                this.step++;
                fb.auth()
                  .createUserWithEmailAndPassword(this.email, this.password)
                  .then(cred => {
                    ref.set({
                      email: this.email,
                      user_id: cred.user.uid
                    });
                  })
                  .then(() => {
                    // this.loading = false;
                    // this.success = "this username is avaliable";
                    this.$router.push({ name: "dashboard" });
                  })
                  .catch(error => {
                    // alert(error);
                    // this.loading = false;
                    this.feedback = error.message;
                  });
              }
            });
          } else {
            this.feedback = "Passwords must match";
          }
          break;
        default:
          break;
      }
    }
  }
};
</script>
