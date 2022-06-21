import { createWebHistory, createRouter } from "vue-router";

// layout

import authenticate from "../helpers/authenticate"
const SignIn = () => import("../pages/auth/SignIn.vue");
const SignUp = () => import("../pages/auth/SignUp.vue");
const SignUpContinue = () => import("../pages/auth/Register-Cont.vue");
const ChangePassword = () => import("../pages/auth/ChangePassword.vue");
const ForgotPasswordInit = () => import("../pages/auth/ForgotPasswordInit.vue");
const ForgotPasswordComplete = () => import("../pages/auth/ForgotPasswordComplete.vue");
const VerifyEmail = () => import("../pages/VerifyEmail.vue");
const NotFoundPage = () => import("../pages/NotFound.vue");
const Home = () => import("../pages/Home.vue");



// import store
// import store from "./store/index.js";

const routes = [
  {
    path: "/",
    name: "page.home",
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
    path: "/auth/verify-email/:token",
    name: "page.verify.email",
    component: VerifyEmail,
  },
  {
    path: "/auth/sign-up",
    name: "page.auth.signup",
    component: SignUp,
  },
  {
    path: "/auth/sign-up/continue",
    name: "page.auth.signup.continue",
    component: SignUpContinue,
  },
  {
    path: "/chat-home",
    name: "page.chat.home",
    component: Home,
    meta: { requireAuth: true }
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

router.beforeEach((route) => {
  if (route.meta && route.meta.requireAuth == true) {
    const isAuth = authenticate()
    if (isAuth == true) { return }
    else { return route.path = "/auth/login" }

  } else {
    return
  }
})
export default router;
