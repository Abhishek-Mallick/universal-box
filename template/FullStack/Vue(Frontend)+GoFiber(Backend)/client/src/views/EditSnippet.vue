<template>
  <div class="container mx-auto px-4 py-8 bg-gray-900">
    <div v-if="loading" class="flex items-center justify-center">
      <Spinner />
    </div>
    <div v-else>
      <div v-if="error" class="text-center text-red-500">{{ error }}</div>
      <SnippetForm
        v-else
        :initial-snippet="snippet"
        :languages="languages"
        title="Edit Snippet"
        submit-button-text="Update Snippet"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSnippetStore } from '../stores/snippet'
import { useToast } from 'vue-toastification'
import { useRouter, useRoute } from 'vue-router'
import { getSnippet, getLanguages } from '../api'
import Spinner from '../components/Spinner.vue'
import SnippetForm from '../components/SnippetForm.vue'

const snippetStore = useSnippetStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()

const snippet = ref(null)
const loading = ref(true)
const error = ref(null)
const languages = ref([])

onMounted(async () => {
  const snippetId = route.params.id
  try {
    const [snippetResponse, languagesResponse] = await Promise.all([
      getSnippet(snippetId),
      getLanguages(),
    ])
    snippet.value = snippetResponse.data.snippet
    languages.value = languagesResponse.data.languages
    snippet.value.visibility = !!snippet.value.visibility
  } catch (err) {
    error.value = 'Failed to load snippet'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
})

async function handleSubmit(updatedSnippet) {
  try {
    loading.value = true
    updatedSnippet.visibility = !!updatedSnippet.visibility
    await snippetStore.editSnippet(updatedSnippet.id, updatedSnippet)
    toast.success('Snippet updated successfully')
    router.push('/snippets')
  } catch (err) {
    toast.error('Failed to update snippet')
  } finally {
    loading.value = false
  }
}
</script>