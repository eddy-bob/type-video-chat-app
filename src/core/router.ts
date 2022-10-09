import { createWebHistory, createRouter } from "vue-router";

// layout

import authenticate from "../helpers/authenticate"
const SignIn = () => import("../pages/auth/Sign-In.vue");
const SignUp = () => import("../pages/auth/Sign-Up.vue");
const ChangePassword = () => import("../pages/auth/Change-Password.vue");
const ForgotPasswordInit = () => import("../pages/auth/Forgot-Password-Init.vue");
const ForgotPasswordComplete = () => import("../pages/auth/Forgot-Password-Complete.vue");
const VerifyEmail = () => import("../pages/Verify-Email.vue");
const NotFoundPage = () => import("../pages/Not-Found.vue");
const PrivateChat = () => import("../pages/PrivateChat/Private-Chat.vue");
const SideNav = () => import("../components/sideNav.vue");
const GroupChat = () => import("../pages/GroupChat/Group-Chat.vue");

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
    path: "/private-chat",
    name: "page.privateChat",
    components: {
      default: PrivateChat,
      leftNav: SideNav
    },
    meta: { requireAuth: true }
  },
  {
    path: "/group-chat/:groupId",
    name: "page.GroupChat",
    components: {
      default: GroupChat,
      leftNav: SideNav
    },
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
