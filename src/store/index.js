import Vue from "vue";
import Vuex from "vuex";
import { db, fb } from "../db.js";

Vue.use(Vuex);

function formatDate(date) {
  return date.toDate().toDateString();
}

export default new Vuex.Store({
  state: {
    user: {},
    applications: [],
    bio: {},
    vacancies: {},
    vacancy: {}
  },
  mutations: {
    loadUser(state) {
      state.user = fb.auth().currentUser;
      // console.log(state.user.email);
    },
    resetUser(state) {
      state.user = {};
    },
    loadBio(state) {
      let bio = {};
      db.collection("clinic")
        .doc(state.user.email)
        .get()
        .then(snapshot => {
          bio.clinic_name = snapshot.data().clinic_name;
          bio.address = snapshot.data().address;
          bio.phone_number = snapshot.data().phone_number;
          bio.email = snapshot.data().email;
        })
        .catch(error => {
          alert(error);
        });
      state.bio = bio;
      // console.log(state.bio);
    },
    updateBio(state, params) {
      // console.log(params.zip_code);
      db.collection("provider")
        .doc(state.user.email)
        .update({
          first_name: params.first_name,
          last_name: params.last_name,
          address: params.address,
          phone_number: params.phone_number,
          zip_code: params.zip_code
        })
        .then(() => {
          // this.loading = false;
          // this.snackbar = true;
        })
        .catch(error => {
          alert("Error writing document: ", error);
        });
    },
    loadVacancies(state) {
      let vacancies = [];
      db.collection("clinic")
        .doc(state.user.email)
        .collection("vacancies")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let vac = doc.data();
            vac.id = doc.id;
            vac.date_posted = formatDate(vac.date_posted);
            vacancies.push(vac);
          });
        });
      state.vacancies = vacancies;
    },
    loadVacancy(state, params) {
      let vacRef = db
        .collection("clinic")
        .doc(params.clinic_email)
        .collection("vacancies");
      let query = vacRef.where("id", "==", params.vac_id);
      query
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            state.vacancy = doc.data();
            state.vacancy.date_posted = formatDate(state.vacancy.date_posted);
            state.vacancy.deadline = formatDate(state.vacancy.deadline);
            state.vacancy.start_date = formatDate(state.vacancy.start_date);
            state.vacancy.end_date = formatDate(state.vacancy.end_date);
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    loadApplications(state, payload) {
      let appls = [];
      let applRef = db
        .collection("clinic")
        .doc(state.user.email)
        .collection("vacancies")
        .doc(payload.vac_id)
        .collection("applicants");
      applRef
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            let appl = doc.data();
            // appl.application_date = formatDate(appl.application_date);
            appls.push(appl);
          });
        })
        .catch(error => {
          alert("Error writing document: ", error);
        });
      state.applications = appls;
      // console.log(state.applications);
    }
  },
  actions: {
    loadUserAction(context) {
      context.commit("loadUser");
    },
    resetUserAction(context) {
      context.commit("resetUser");
    },
    loadBioAction(context) {
      context.commit("loadBio");
    },
    updateBioAction(context, params) {
      context.commit("updateBio", params);
    },
    loadVacanciesAction(context) {
      context.commit("loadVacancies");
    },
    loadVacancyAction(context, params) {
      context.commit("loadVacancy", params);
    },
    applyAction(context, payload) {
      context.commit("apply", payload);
    },
    loadApplicationsAction(context, payload) {
      context.commit("loadApplications", payload);
    }
  },
  modules: {}
});
