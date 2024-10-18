<template>
  <div class="flex items-center justify-center ">
    <div class="w-full max-w-md p-8 space-y-6 bg-white border-4 border-black-800 rounded-lg shadow-xl">
      <h2 class="text-3xl font-bold text-center">Create an Account</h2>
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label for="username" class="block mb-2 text-sm font-medium">Username</label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            :class="{'border-red-500': errors.username}"
            class="w-full px-4 py-2 text-sm border-2 rounded-md focus:outline-none focus:ring-2"
            placeholder="Enter your username"
          />
          <p v-if="errors.username" class="mt-2 text-sm text-red-500">{{ errors.username }}</p>
        </div>
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
          {{ loading ? 'Signing Up...' : 'Sign Up' }}
        </button>
      </form>

      <p class="text-sm text-center text-gray-600">
        Already have an account?
        <router-link to="/signin" class="text-blue-500 hover:underline">
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

const router = useRouter()

const initialState = {
  username: '',
  emailid: '',
  password: '',
}

const validations = {
  username: commonValidations.required('Username'),
  emailid: (value) => commonValidations.required('Email')(value) || commonValidations.email(value),
  password: (value) => commonValidations.required('Password')(value) || commonValidations.minLength('Password', 6)(value),
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