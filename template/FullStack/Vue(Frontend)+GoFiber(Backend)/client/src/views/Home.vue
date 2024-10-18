<template>
  <PageContainer title="Public Snippets">
    <LoadingWrapper :loading="loading" :error="error">
      <SnippetsList :snippets="snippets" />
    </LoadingWrapper>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSnippetStore } from '../stores/snippet'
import { useToast } from 'vue-toastification'
import SnippetsList from '../components/SnippetsList.vue'
import PageContainer from '../components/PageContainer.vue'
import LoadingWrapper from '../components/LoadingWrapper.vue'

const snippetStore = useSnippetStore()
const snippets = ref([])
const loading = ref(true)
const error = ref(null)
const toast = useToast()

onMounted(async () => {
  try {
    await snippetStore.fetchPublicSnippets()
    snippets.value = snippetStore.snippets
    if (snippets.value.length === 0) {
      toast.info('No public snippets available.')
    }
  } catch (err) {
    error.value = 'Failed to load public snippets'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
})
</script>