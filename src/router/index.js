/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../pages/MainPage.vue")
  },
  {
    path: "/addTheme",
    component: () => import("../pages/AddThemePage.vue")
  },
  {
    path: '/theme/:nom',
    name: 'theme-details',
    component: () => import("../pages/ThemePage.vue"),
    props: true
  },
  {
    path: '/theme/:nom/revision',
    name: 'start-revision',
    component: () => import("../pages/RevisionPage.vue"),
    props: true
  },
  {
    path: '/theme/:nom/addCard',
    name: 'add-card',
    component: () => import("../pages/AddCardPage.vue"),
    props: true
  },
]

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;