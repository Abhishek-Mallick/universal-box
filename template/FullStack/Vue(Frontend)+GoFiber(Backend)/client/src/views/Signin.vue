

<template>
  <div class="flex items-center justify-center py-8 bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-8 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      <h2 class="text-3xl font-bold text-center text-white">Sign In</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          id="emailid"
          label="Email Address"
          v-model="formData.emailid"
          :error="errors.emailid"
          type="email"
          placeholder="Enter your email"
        />
        <BaseInput
          id="password"
          label="Password"
          v-model="formData.password"
          :error="errors.password"
          type="password"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>
      <p class="mt-4 text-sm text-center text-gray-400">
        Don't have an account?
        <router-link to="/signup" class="text-blue-400 hover:underline">
          Sign Up
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { commonValidations } from '../composables/useForm'
import BaseInput from '../components/BaseInput.vue'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

const formData = ref({
  emailid: '',
  password: '',
})

const errors = ref({})
const loading = ref(false)

const validateForm = () => {
  errors.value = {
    emailid: commonValidations.required('Email')(formData.value.emailid) || commonValidations.email(formData.value.emailid),
    password: commonValidations.required('Password')(formData.value.password),
  }
  return Object.values(errors.value).every(error => !error)
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await authStore.signin(formData.value)
    await router.push('/snippets')
    toast.success('Signed in successfully!')
  } catch (error) {
    toast.error(`Error: ${error.response?.data?.message || error.message}`)
  } finally {
    loading.value = false
  }
}
</script>