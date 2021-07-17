import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

export const routes = [
  {
    path: "/",
    name: "/",
    component: Home,
  },
  {
    path: "/a",
    name: "a",
    component: () => import("../views/pages/a.vue"),
  },
  {
    path: "/b",
    name: "b",
    component: () => import("../views/pages/b.vue"),
  },
  {
    path: "/c",
    name: "c",
    component: () => import("../views/pages/c.vue"),
  },
  {
    path: "/d",
    name: "d",
    component: () => import("../views/pages/d.vue"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
