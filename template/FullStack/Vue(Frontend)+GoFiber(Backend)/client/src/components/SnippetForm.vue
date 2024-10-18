<template>
    <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto space-y-6">
      <h1 class="text-3xl font-bold mb-8 text-white">{{ title }}</h1>
      
      <BaseInput
        id="name"
        label="Name"
        v-model="snippetData.name"
        required
      />
  
      <div>
        <label for="language" class="block mb-2 text-sm font-medium text-gray-200">Language</label>
        <select
          v-model="snippetData.language"
          id="language"
          required
          class="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option v-for="lang in languages" :key="lang.id" :value="lang.name">{{ lang.name }}</option>
        </select>
      </div>
  
      <BaseTextarea
        id="description"
        label="Description"
        v-model="snippetData.description"
        :rows="3"
      />
  
      <BaseTextarea
        id="code"
        label="Code"
        v-model="snippetData.code"
        :rows="10"
        required
      />
  
      <BaseInput
        id="tags"
        label="Tags (comma-separated)"
        v-model="snippetData.tags"
      />
  
      <div class="flex items-center">
        <input
          v-model="snippetData.visibility"
          id="visibility"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="visibility" class="ml-2 block text-sm text-gray-200">
          Public Snippet
        </label>
      </div>
  
      <button
        type="submit"
        class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {{ submitButtonText }}
      </button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import BaseInput from './BaseInput.vue'
  import BaseTextarea from './BaseTextarea.vue'
  
  const props = defineProps({
    initialSnippet: {
      type: Object,
      required: true,
    },
    languages: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    submitButtonText: {
      type: String,
      required: true,
    },
  })
  
  const emit = defineEmits(['submit'])
  
  const snippetData = ref({ ...props.initialSnippet })
  
  const handleSubmit = () => {
    emit('submit', snippetData.value)
  }
  </script>