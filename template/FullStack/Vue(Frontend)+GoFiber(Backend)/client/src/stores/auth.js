//client/src/stores/auth.js

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { signin as apiSignin, signout as apiSignout, getProfile } from '../api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const hasCheckedAuth = ref(false)

  const signin = async (credentials) => {
    const response = await apiSignin(credentials)
    user.value = response.data.user
    hasCheckedAuth.value = true
    return response.data.user
  }

  const signout = async () => {
    await apiSignout()
    user.value = null
    hasCheckedAuth.value = true
  }

  const fetchUser = async () => {
    if (hasCheckedAuth.value) return

    try {
      const response = await getProfile()
      user.value = response.data.user
    } catch (error) {
      user.value = null
    } finally {
      hasCheckedAuth.value = true
    }
  }

  return {
    user,
    isAuthenticated,
    hasCheckedAuth,
    signin,
    signout,
    fetchUser
  }
}, {
  persist: true
})