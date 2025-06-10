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
      { path: '/Dashboard/analyser', name: 'Analyse', component: Analyse,  meta: { requiresAuth: false }, },
      { path: '/Dashboard/historique', name: 'History', component: History , meta: { requiresAuth: true }, },
      { path: '/Dashboard/profil', name: 'Profile', component: Profile , meta: { requiresAuth: true }, },
    ],
  },
  ],
})

router.beforeEach( async (to, from) => {
  const auth = useAuthStore()
  if (to.path === '/Dashboard/analyser' && auth.isAuthenticated) {
    return { path: '/analyser' }
  }
  if (to.meta.requiresAuth && !auth.token) {
    return {
      path: '/auth/login',
      query: { redirect: to.fullPath },
    }
  }
})


export default router
