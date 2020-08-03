import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Register from '@/views/auth/Register'
import Login from '@/views/auth/Login'
import Dashboard from '@/views/Dashboard'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters['auth/loggedIn']

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/')
    } else {
      next ()
    }
  } else {
    next ()
  }
})

export default router
