<template>
  <div class="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div class="bg-white p-8 border-4 border-black-800 rounded-lg shadow-xl">
        <h2 class="text-3xl font-bold text-center mb-6">Sign In</h2>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="emailid" class="block mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              id="emailid"
              v-model="formData.emailid"
              :class="{'border-red-500': errors.emailid}"
              class="w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter your email"
            />
            <p v-if="errors.emailid" class="mt-2 text-sm text-red-500">{{ errors.emailid }}</p>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              :class="{'border-red-500': errors.password}"
              class="w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2"
              placeholder="Enter your password"
            />
            <p v-if="errors.password" class="mt-2 text-sm text-red-500">{{ errors.password }}</p>
          </div>
          <p v-if="serverError" class="mt-2 text-sm text-red-500">{{ serverError }}</p>
          <p v-if="successMessage" class="mt-2 text-sm text-green-500">{{ successMessage }}</p>
          <button
            type="submit"
            :disabled="loading"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 disabled:opacity-50"
          >
            {{ loading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>
        <p class="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <router-link to="/signup" class="text-blue-500 hover:underline">
            Sign Up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm, commonValidations } from '../composables/useForm'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const initialState = {
  emailid: '',
  password: '',
}

const validations = {
  emailid: (value) => commonValidations.required('Email')(value) || commonValidations.email(value),
  password: commonValidations.required('Password'),
}

const submitAction = async (formData) => {
  await authStore.signin(formData)
  return 'Signin successful!'
}

const {
  formData,
  errors,
  serverError,
  successMessage,
  loading,
  handleSubmit,
} = useForm(initialState, validations, submitAction)

handleSubmit.onSuccess = () => {
  router.push('/account')
}
</script>