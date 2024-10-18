<template>
    <div>
      <label :for="id" class="block mb-2 text-sm font-medium text-gray-200">{{ label }}</label>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{'border-red-500': error}"
        class="w-full px-4 py-2 text-sm bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :placeholder="placeholder"
      />
      <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    id: String,
    label: String,
    modelValue: String,
    error: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
  })
  
  defineEmits(['update:modelValue'])
  </script>