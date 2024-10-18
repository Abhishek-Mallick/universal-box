<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <slot :formData="formData" :errors="errors" :loading="loading"></slot>
    <div v-if="serverError" class="text-red-500">{{ serverError }}</div>
    <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
  </form>
</template>

<script setup>
import { useForm } from '../composables/useForm'

const props = defineProps({
  initialState: {
    type: Object,
    required: true,
  },
  validations: {
    type: Object,
    required: true,
  },
  submitAction: {
    type: Function,
    required: true,
  },
})

const {
  formData,
  errors,
  serverError,
  successMessage,
  loading,
  handleSubmit,
} = useForm(props.initialState, props.validations, props.submitAction)

defineExpose({
  formData,
  errors,
})
</script>