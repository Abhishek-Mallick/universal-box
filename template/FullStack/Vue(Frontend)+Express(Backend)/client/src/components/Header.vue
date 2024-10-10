<template>
  <nav class="bg-gradient-to-r from-gray-800 to-black p-4 shadow-lg">
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <router-link to="/" class="flex items-center space-x-3">
          <img src="/logo.webp" alt="Logo" class="w-12 h-12 object-cover rounded-full" />
          <span class="text-white text-2xl font-bold hidden xs:blcok">Universal-Box</span>
        </router-link>
      </div>
      <div class="flex items-center space-x-6">
        <template v-if="isAuthenticated">
          <router-link to="/account" class="text-white hover:text-gray-300 transition duration-200">
            Account
          </router-link>
          <button @click="handleSignOut" class="text-white hover:text-gray-300 transition duration-200">
            Sign Out
          </button>
          <img
            src="https://via.placeholder.com/40"
            alt="User DP"
            class="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
        </template>
        <template v-else>
          <router-link to="/signin" class="text-white hover:text-gray-300 transition duration-200">
            Sign In
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const router = useRouter()
const toast = useToast()

const handleSignOut = async () => {
  try {
    await authStore.signout()
    router.push('/signin')
    toast.success('Sign out successful!')
  } catch (error) {
    toast.error(`Error: ${error.response?.data?.message || error.message}`)
  }
}
</script>
