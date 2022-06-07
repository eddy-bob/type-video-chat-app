import { createWebHistory, createRouter } from "vue-router";

// layout


const SignIn = () => import("../pages/auth/SignIn.vue");
const SignUp = () => import("../pages/auth/SignUp.vue");
const ChangePassword = () => import("../pages/auth/ChangePassword.vue");
const ForgotPasswordInit = () => import("../pages/auth/ForgotPasswordInit.vue");
const ForgotPasswordComplete = () => import("../pages/auth/ForgotPasswordComplete.vue");
const NotFoundPage = () => import("../pages/NotFound.vue");

// import store
// import store from "./store/index.js";

const routes = [

  {
    path: "/",
    name: "page.login",
    component: SignIn,
  },
  {
    path: "/auth/login",
    name: "page.auth.login",
    component: SignIn,
  },
  {
    path: "/auth/change-password",
    name: "page.auth.changePassword",
    component: ChangePassword,
  },
  {
    path: "/auth/forgot-password",
    name: "page.auth.forgotPasswordInit",
    component: ForgotPasswordInit,
  },
  {
    path: "/auth/forgot-password/:resetToken",
    name: "page.auth.forgotPasswordComplete",
    component: ForgotPasswordComplete,
  },
  {
    path: "/auth/checkin/sign-up",
    name: "page.auth.signup",
    component: SignUp,
  },

  //add sellers routes below-------
  {
    path: "/:catchAll(.*)",
    component: NotFoundPage,
  },

];

const history = createWebHistory();

// create router instance
const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
