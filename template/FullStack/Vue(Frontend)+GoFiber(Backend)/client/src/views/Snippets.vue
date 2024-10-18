<template>
  <PageContainer title="My Snippets">
    <router-link
      to="/add-snippet"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
    >Add New Snippet</router-link>
    <LoadingWrapper :loading="loading" :error="error">
      <SnippetsList
        :snippets="snippets"
        :editable="true"
        @delete-snippet="deleteSnippet"
      />
    </LoadingWrapper>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSnippetStore } from '../stores/snippet'
import { useToast } from 'vue-toastification'
import SnippetsList from '../components/SnippetsList.vue'
import PageContainer from '../components/PageContainer.vue'
import LoadingWrapper from '../components/LoadingWrapper.vue'

const snippetStore = useSnippetStore()
const loading = ref(true)
const error = ref(null)
const toast = useToast()

const snippets = computed(() => snippetStore.userSnippets)

onMounted(async () => {
  try {
    await snippetStore.fetchUserSnippets()
  } catch (err) {
    error.value = 'Failed to load your snippets'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
})

const deleteSnippet = async (id) => {
  try {
    await snippetStore.removeSnippet(id)
    toast.success('Snippet deleted successfully')
  } catch (err) {
    toast.error('Failed to delete snippet')
  }
}
</script>
