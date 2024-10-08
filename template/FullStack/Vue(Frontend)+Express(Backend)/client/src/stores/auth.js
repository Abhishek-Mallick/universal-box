import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api.js'

// Pinia setup store
export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)  
  const isAuthenticated = computed(() => !!user.value)
  const getUser = computed(() => user.value)

  // user sign-in with server API request
  const signin = async (credentials) => {
    try {
      const response = await api.post('/api/auth/signin', credentials)
      user.value = response.data.user
    } catch (error) {
      throw error 
    }
  }

  // user sign-out
  const signout = async () => {
    await api.post('/api/user/signout')
    user.value = null  
  }

  // fetch the current user profile from the server
  const fetchUser = async () => {
    try {
      const response = await api.get('/api/user/profile')
      user.value = response.data.user 
    } catch (error) {
      user.value = null
    }
  }
  return {
    user,
    isAuthenticated,
    getUser,
    signin,
    signout,
    fetchUser,
  }
}, {
  persist: true
})