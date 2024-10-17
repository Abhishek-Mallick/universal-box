
<template>
  <nav class="bg-gradient-to-r from-gray-800 to-black p-4 shadow-lg">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <router-link to="/" class="flex items-center space-x-3">
          <img src="/logo.webp" alt="Logo" class="w-12 h-12 object-cover rounded-full" />
     
        </router-link>
      </div>
      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="/" class="text-white hover:text-gray-300 transition duration-200">
          Home
        </router-link>
        <template v-if="isAuthenticated">
          <router-link to="/snippets" class="text-white hover:text-gray-300 transition duration-200">
            My Snippets
          </router-link>
          <router-link to="/add-snippet" class="text-white hover:text-gray-300 transition duration-200">
            Add Snippet
          </router-link>
          <router-link to="/account" class="text-white hover:text-gray-300 transition duration-200">
            Account
          </router-link>
          <button @click="handleSignOut" class="text-white hover:text-gray-300 transition duration-200">
            Sign Out
          </button>
        </template>
        <template v-else>
          <router-link to="/signin" class="text-white hover:text-gray-300 transition duration-200">
            Sign In
          </router-link>
        </template>
      </div>
      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-white focus:outline-none">
  
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
  
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link to="/" class="block text-white hover:text-gray-300 transition duration-200">
          Home
        </router-link>
        <template v-if="isAuthenticated">
          <router-link to="/snippets" class="block text-white hover:text-gray-300 transition duration-200">
            My Snippets
          </router-link>
          <router-link to="/add-snippet" class="block text-white hover:text-gray-300 transition duration-200">
            Add Snippet
          </router-link>
          <router-link to="/account" class="block text-white hover:text-gray-300 transition duration-200">
            Account
          </router-link>
          <button @click="handleSignOut" class="block text-white hover:text-gray-300 transition duration-200 w-full text-left">
            Sign Out
          </button>
        </template>
        <template v-else>
          <router-link to="/signin" class="block text-white hover:text-gray-300 transition duration-200">
            Sign In
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useSnippetStore } from '../stores/snippet.js'

const authStore = useAuthStore()
const snippetStore = useSnippetStore()
const isAuthenticated = computed(() => authStore.isAuthenticated)
const router = useRouter()
const toast = useToast()


const isMobileMenuOpen = ref(false)

const handleSignOut = async () => {
  try {
    await authStore.signout()
    snippetStore.clearSnippets()
    router.push('/')
    toast.success('Sign out successful!')
    isMobileMenuOpen.value = false 
  } catch (error) {
    toast.error(`Error: ${error.response?.data?.message || error.message}`)
  }
}
</script>
