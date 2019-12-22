import Vue from "vue";
import VueRouter from "vue-router";
import { fb } from "../db.js";
import Dashboard from "../views/Dashboard.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import PostJob from "../views/PostJob.vue";
import Applications from "../views/Applications.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/postjob",
    name: "postjob",
    component: PostJob,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/applications/:vac_id",
    name: "applications",
    component: Applications,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // check if route requiresAuth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = fb.auth().currentUser;
    if (user) {
      // user signed in, proceed to route
      next();
    } else {
      // user not signed in, route to login
      next({ name: "login" });
    }
  } else {
    // route does not require auth
    next();
  }
});

export default router;
