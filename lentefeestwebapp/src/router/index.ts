import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Stream from "../views/Stream.vue";
import LoginCallback from "../views/LoginCallback.vue";

import Login from "../views/auth/account.vue";
import Register from "../views/auth/register.vue";

Vue.use(VueRouter);

const routes: any[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/stream",
    name: "stream",
    component: Stream
  },
  {
    path: "/logincallback",
    name: "logincallback",
    component: LoginCallback
  },
  {
    path: "/account",
    name: "Account",
    component: Login
  },
  {
    path: "/register",
    name: "register",
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
