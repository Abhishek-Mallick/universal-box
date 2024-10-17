<template>
  <div class="container mx-auto px-4 py-8 bg-gray-900">

    <div v-if="loading" class="flex items-center justify-center">
      <Spinner />
    </div>
    <div v-else>
      <div v-if="error" class="text-center text-red-500 mb-4">{{ error }}</div>
      <SnippetForm
        v-else
        :initial-snippet="snippet"
        :languages="languages"
        title="Add New Snippet"
        submit-button-text="Add Snippet"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSnippetStore } from '../stores/snippet'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { getLanguages } from '../api'
import Spinner from '../components/Spinner.vue'
import SnippetForm from '../components/SnippetForm.vue'

const snippetStore = useSnippetStore()
const toast = useToast()
const router = useRouter()

const snippet = ref({
  name: '',
  language: '',
  description: '',
  code: '',
  tags: '',
  visibility: true,
})

const languages = ref([])
const error = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await getLanguages()
    languages.value = response.data.languages
  } catch (err) {
    error.value = 'Failed to load languages. Please try refreshing the page.'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
})

async function handleSubmit(newSnippet) {
  try {
    loading.value = true
    await snippetStore.addSnippet(newSnippet)
    toast.success('Snippet added successfully')
    await router.push('/snippets')
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to add snippet. Please try again.'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}
</script>
