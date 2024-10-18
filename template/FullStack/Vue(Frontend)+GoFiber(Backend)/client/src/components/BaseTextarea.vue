<template>
    <div>
      <label :for="id" class="block mb-2 text-sm font-medium text-gray-200">{{ label }}</label>
      <textarea
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{'border-red-500': error}"
        class="w-full px-3 py-2 text-sm bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :rows="rows"
        :placeholder="placeholder"
      ></textarea>
      <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  defineProps({
    id: String,
    label: String,
    modelValue: String,
    error: String,
    rows: {
      type: Number,
      default: 3
    },
    placeholder: String,
  })
  
  defineEmits(['update:modelValue'])
  </script>