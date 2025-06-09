import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Analyse from '../views/Analyse.vue'
import History from '../views/History.vue'
import Profile from '../views/Profile.vue'
import Layout from '../components/Layout/Layout.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '@/stores/auth'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/auth/register',
      name: 'register',
      component: Register,
    },
    {
    path: '/Dashboard',
    component: Layout,
    children: [
      { path: '/analyser', name: 'Analyse', component: Analyse,  meta: { requiresAuth: false }, },
      { path: '/historique', name: 'History', component: History , meta: { requiresAuth: true }, },
      { path: '/profil', name: 'Profile', component: Profile , meta: { requiresAuth: true }, },
    ],
  },
  ],
})

router.beforeEach( async (to, from) => {
  const auth = useAuthStore()
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.token) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/auth/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }}
})


export default router
