<template>
  <div class="flex items-center justify-center py-8 bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
      <h2 class="text-3xl font-bold text-center text-white">Create an Account</h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          id="username"
          label="Username"
          v-model="formData.username"
          :error="errors.username"
          type="text"
          placeholder="Enter your username"
        />
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
        
        <p v-if="serverError" class="mt-2 text-sm text-red-500">{{ serverError }}</p>
        <p v-if="successMessage" class="mt-2 text-sm text-green-500">{{ successMessage }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ loading ? 'Signing Up...' : 'Sign Up' }}
        </button>
      </form>

      <p class="text-sm text-center text-gray-400">
        Already have an account?
        <router-link to="/signin" class="text-blue-400 hover:underline">
          Sign in
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useForm, commonValidations } from '../composables/useForm'
import api from '../api'
import { useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'

const router = useRouter()

const initialState = {
  username: '',
  emailid: '',
  password: '',
}

const validations = {
  username: commonValidations.required('Username'),
  emailid: (value) => commonValidations.required('Email')(value) || commonValidations.email(value),
  password: commonValidations.required('Password'),
}

const submitAction = async (formData) => {
  await api.post('/api/auth/signup', formData)
  return 'Signup successful! Please sign in.'
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
  router.push('/signin')
}
</script>
