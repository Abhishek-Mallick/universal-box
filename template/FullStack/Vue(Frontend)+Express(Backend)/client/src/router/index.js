import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Account from '../views/Account.vue'
import { useAuthStore } from '../stores/auth'

// routes with route guards
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: { requiresGuest: true }  // Only for non-authenticated users
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresGuest: true }  // Only for non-authenticated users
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }  // Only for authenticated users
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard to check authentication before navigating
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

// Fetch user data if not already available
  if (authStore.user === null) {
    await authStore.fetchUser()  
  }

  // Redirect based on authentication and route meta properties
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/signin') 
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/account')  
  } else {
    next()  
  }
})

export default router