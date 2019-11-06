import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Stream from "../views/Stream.vue";

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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
