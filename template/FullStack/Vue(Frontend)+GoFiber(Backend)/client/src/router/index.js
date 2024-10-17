import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Account from '../views/Account.vue'
import Snippets from '../views/Snippets.vue'
import AddSnippet from '../views/AddSnippet.vue'
import EditSnippet from '../views/EditSnippet.vue'
import TaggedSnippets from '../views/TaggedSnippets.vue'
import { useAuthStore } from '../stores/auth'

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
    meta: { requiresGuest: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { requiresGuest: true }
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }
  },
  {
    path: '/snippets',
    name: 'Snippets',
    component: Snippets,
    meta: { requiresAuth: true }
  },
  {
    path: '/add-snippet',
    name: 'AddSnippet',
    component: AddSnippet,
    meta: { requiresAuth: true, transition: 'slide-fade' }
  },
  {
    path: '/edit-snippet/:id',
    name: 'EditSnippet',
    component: EditSnippet,
    meta: { requiresAuth: true }
  },
  {
    path: '/tag/:tag',
    name: 'TaggedSnippets',
    component: TaggedSnippets
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  if (!authStore.hasCheckedAuth) {
    await authStore.fetchUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/signin')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/account')
  } else {
    next()
  }
})

export default router