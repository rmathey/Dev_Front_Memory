/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../pages/MainPage.vue")
  },
  {
    path: "/page1",
    component: () => import("../pages/MainPage.vue")
  },
  {
    path: "/page2",
    component: () => import("../pages/MainPage.vue")
  },
  {
    path: "/page3",
    component: () => import("../pages/MainPage.vue")
  }
]

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;