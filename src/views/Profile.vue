<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-alert type="error" v-if="feedback">{{ feedback }}</v-alert>
        <v-alert type="success" v-if="success">{{ success }}</v-alert>
      </v-col>

      <v-col cols="10">
        <v-card flat color="transparent" class="display-1 mx-auto"
          >Your Profile</v-card
        >

        <v-form class="mx-auto my-4" @submit.prevent="update">
          <v-container>
            <v-row dense>
              <v-col cols="12" lg="3" md="6" sm="6">
                <v-text-field
                  v-model="bio.first_name"
                  label="First Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="3" md="6" sm="6">
                <v-text-field
                  v-model="bio.last_name"
                  label="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="3" md="6" sm="6">
                <v-text-field
                  v-model="bio.phone_number"
                  type="number"
                  label="Phone Number"
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="3" md="6" sm="6">
                <v-text-field
                  v-model="bio.zip_code"
                  type="number"
                  label="Zip Code"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" dense>
              <v-col cols="12" lg="12">
                <v-textarea
                  auto-grow
                  v-model="bio.address"
                  label="Address"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row justify="center" dense>
              <v-btn
                class="mr-4 primary"
                @click="
                  update(
                    bio.first_name,
                    bio.last_name,
                    bio.phone_number,
                    bio.zip_code,
                    bio.address
                  )
                "
                :loading="loading"
                >Update</v-btn
              >
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center" dense>
      <v-col cols="10">
        <v-row justify="center" dense>
          <v-col cols="6">
            <v-avatar size="108" tile class="mx-auto">
              <img :src="avatar" :alt="bio.first_name" />
            </v-avatar>
          </v-col>

          <v-col cols="8">
            <v-btn
              tile
              outlined
              color="primary"
              @click="uploadAvatar"
              @change="onFilePicked"
              :loading="loading3"
            >
              <v-icon left>mdi-cloud-upload</v-icon>Upload Avatar
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center" dense>
      <v-col cols="10">
        <v-file-input
          class="mt-4 mx-auto"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
          v-model="image"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row justify="center" dense>
      <v-col cols="10">
        <v-card flat color="transparent" class="display-1 mx-auto"
          >Experience</v-card
        >
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="xp in exp"
            :key="xp.id"
            color="primary"
            icon="mdi-briefcase-check"
          >
            <template v-slot:opposite>
              <span :class="`headline font-weight-bold primary--text`">
                {{ xp.start_date.toDate().getFullYear() }} -
                {{ xp.end_date.toDate().getFullYear() }}
              </span>
            </template>
            <v-card>
              <v-card-title class="title">{{ xp.job_title }}</v-card-title>
              <v-card-text class="white text--primary">
                <p class="pt-4">Clinic: {{ xp.clinic_name }},</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="primary"
                  :to="{ name: 'edit-xp', params: { xp_id: xp.id } }"
                  >Edit</v-btn
                >
                <v-btn text color="primary" @click="deleteExp(xp.id)"
                  >Delete</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-4" dense>
      <v-btn tile outlined color="primary" to="/add-xp">
        <v-icon left>mdi-file-document</v-icon>Add Experience
      </v-btn>
    </v-row>
    <v-row justify="center" class="my-4" dense>
      <v-btn
        tile
        outlined
        color="primary"
        :href="resume"
        download
        target="_blank"
      >
        <v-icon left>mdi-cloud-download</v-icon>Download Resume
      </v-btn>
    </v-row>
    <v-row justify="center" dense>
      <v-col cols="6">
        <v-file-input
          multiple
          label="Choose File"
          v-model="files"
        ></v-file-input>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-4" dense>
      <v-btn
        tile
        outlined
        color="primary"
        @click="uploadResume"
        :loading="loading2"
        @change="onFilePicked"
      >
        <v-icon left>mdi-cloud-upload</v-icon>Upload Resume
      </v-btn>
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
  name: "Profile",
  data: () => ({
    feedback: null,
    success: null,
    loading: false,
    loading2: false,
    loading3: false,
    snackbar: false,
    resume: null,
    text: "Profile Updated",
    timeout: 2000,
    files: null,
    avatar: null,
    image: null,
    dates: ["2019-09-10", "2019-09-20"]
  }),
  methods: {
    onFilePicked() {
      console.log("File picked");
    },
    deleteExp(id) {
      this.$store.dispatch("deleteXpAction", id);
      this.$store.dispatch("loadXpAction"); // get latest xp state
    },
    update(first_name, last_name, phone_number, zip_code, address) {
      this.loading = true;
      if (first_name && last_name && phone_number && address && zip_code) {
        // update user data with the values provided in the form
        let params = { first_name, last_name, phone_number, address, zip_code };
        // vuex actions allows only one parameter
        this.$store.dispatch("updateBioAction", params).then(() => {
          this.loading = false;
          this.snackbar = true;
        }); // get xp state
      } else {
        this.feedback = "You must enter all fields";
      }
    },
    deleteResume() {
      let resume = this.resume;
      let resRef = fb.storage().refFromURL(resume);
      resRef
        .delete()
        .then(function() {
          // File deleted successfully
          console.log("File deleted successfully");
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    },
    deleteAvatar() {
      let avatar = this.avatar;
      let avaRef = fb.storage().refFromURL(avatar);
      avaRef
        .delete()
        .then(function() {
          // File deleted successfully
          console.log("File deleted successfully");
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log(error);
        });
    },
    uploadResume() {
      this.loading2 = true;
      let resume = this.resume;
      let file = this.files[0];
      let storageRef = fb.storage().ref("resumes/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            // resume = downloadURL;
            console.log("File available at ", downloadURL);
            db.collection("provider")
              .doc(this.user.email)
              .update({
                resume: downloadURL
              })
              .then(() => {
                this.loading2 = false;
                // this.snackbar = true;
                console.log("updated resume on firebase " + downloadURL);
              })
              .catch(error => {
                console.log("Error writing document: ", error);
              });
          });
        }
      );
      this.deleteResume();
      this.files = [];
    },
    uploadAvatar() {
      this.loading3 = true;
      let avatar = this.avatar;
      let file = this.image;
      let storageRef = fb.storage().ref("avatars/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            // resume = downloadURL;
            console.log("File available at ", downloadURL);
            db.collection("provider")
              .doc(this.user.email)
              .update({
                avatar: downloadURL
              })
              .then(() => {
                this.loading3 = false;
                // this.snackbar = true;
                console.log("updated resume on firebase " + downloadURL);
              })
              .catch(error => {
                console.log("Error writing document: ", error);
              });
          });
        }
      );
      this.deleteAvatar();
      this.image = [];
    }
  },
  created() {
    // populate the data properties with firestore user data
    db.collection("provider")
      .doc(this.user.email)
      .get()
      .then(snapshot => {
        this.resume = snapshot.data().resume;
        this.avatar = snapshot.data().avatar;
      })
      .catch(error => {
        alert(error);
      });
    this.$store.dispatch("loadBioAction"); // get bio state
  },
  computed: {
    user() {
      return this.$store.state.user; // get the current user state
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    exp() {
      return this.$store.state.xp; // get user xp
    },
    bio() {
      return this.$store.state.bio; //get user bio
    }
  }
};
</script>
