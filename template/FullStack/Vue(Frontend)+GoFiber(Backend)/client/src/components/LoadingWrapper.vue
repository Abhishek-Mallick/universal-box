<template>
    <div>
      <div v-if="loading" class="flex items-center justify-center">
        <Spinner />
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>
      <slot v-else></slot>
    </div>
  </template>
  
  <script setup>
  import Spinner from './Spinner.vue'
  
  defineProps({
    loading: Boolean,
    error: String
  })
  </script>