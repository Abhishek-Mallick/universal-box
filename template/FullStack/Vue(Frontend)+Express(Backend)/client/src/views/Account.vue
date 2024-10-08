<template>
    <div class="container mx-auto px-4 py-8">
      <div class="user-panel max-w-md mx-auto bg-black p-6 rounded-lg shadow-md">
        <h1 class="text-3xl font-bold text-white text-center mb-8">Account Page</h1>
        <div class="text-white">
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.emailid }}</p>
        </div>
        <button
        @click="handleSignOut"
        class="w-full mt-6 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-700 rounded-md transition-all duration-300 ease-in-out transform hover:from-red-600 hover:to-red-800 hover:shadow-lg focus:outline-none focus:ring-2"
        >
            Sign Out
        </button>

      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import { useRouter } from 'vue-router'
  import { useToast } from 'vue-toastification'
  
  const authStore = useAuthStore()
  const user = computed(() => authStore.user)
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