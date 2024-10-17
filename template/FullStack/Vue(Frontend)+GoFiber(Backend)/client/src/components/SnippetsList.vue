<template>
  <div class="min-h-[300px] flex flex-col">
    <div v-if="snippets.length === 0" class="flex-grow flex items-center justify-center">
      <p class="text-xl text-gray-200">No snippets available.</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="snippet in snippets"
        :key="snippet.id"
        class="bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-semibold text-white">{{ snippet.name }}</h3>
          <span 
            v-if="!snippet.visibility" 
            class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded"
          >
            Private
          </span>
        </div>
        <div class="space-y-2 text-sm">
      
          <p>
            <span class="text-gray-400 font-semibold mr-1">Author:</span>
            <span class="text-gray-200">{{ snippet.user ? snippet.user.username : 'Unknown' }}</span>
          </p>
          <p>
            <span class="text-gray-400 font-semibold mr-1">Lang:</span>
            <span class="text-gray-200">{{ snippet.language }}</span>
          </p>
          <p>
            <span class="text-gray-400 font-semibold mr-1">Info:</span>
            <span class="text-gray-200">{{ snippet.description }}</span>
          </p>
        </div>
        <div class="mt-2 mb-4 bg-gray-700 rounded">
          <vue3-code-block 
            :code="snippet.code" 
            :lang="snippet.language.toLowerCase()"
            :prismjs="true"
          ></vue3-code-block>
        </div>
        <div class="mt-2">
          <router-link
            v-for="tag in parseTags(snippet.tags)"
            :key="tag"
            :to="{ name: 'TaggedSnippets', params: { tag: tag } }"
            class="inline-block bg-gray-700 text-gray-300 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 hover:bg-gray-600 transition-colors duration-200"
          >
            #{{ tag }}
          </router-link>
        </div>
        <div v-if="editable" class="mt-2">
          <router-link
            :to="`/edit-snippet/${snippet.id}`"
            class="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-500 transition-colors duration-200"
          >
            Edit
          </router-link>
          <button
            @click="confirmDelete(snippet.id)"
            class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {  defineEmits } from 'vue'
import Vue3CodeBlock from 'vue3-code-block'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-clojure'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-elixir'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-haskell'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-julia'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-nim'
import 'prismjs/components/prism-php-extras'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-toml'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-zig'

const props = defineProps({
  snippets: {
    type: Array,
    required: true
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete-snippet'])

const parseTags = (tagsString) => {
  return tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
}

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this snippet?')) {
    emit('delete-snippet', id)
  }
}
</script>

<style scoped>
.vue3-code-block {
  max-height: 300px;
  overflow-y: auto;
}

.vue3-code-block pre {
  margin: 0;
  background-color: transparent !important;
}

.vue3-code-block code {
  background-color: transparent !important;
}
</style>