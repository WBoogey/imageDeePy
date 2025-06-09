import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Analyse from '../views/Analyse.vue'
import History from '../views/History.vue'
import Profile from '../views/Profile.vue'
import Layout from '../components/Layout/Layout.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'


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
      { path: '/analyser', name: 'Analyse', component: Analyse },
      { path: '/historique', name: 'History', component: History },
      { path: '/profil', name: 'Profile', component: Profile },
    ],
  },
  ],
})

export default router
