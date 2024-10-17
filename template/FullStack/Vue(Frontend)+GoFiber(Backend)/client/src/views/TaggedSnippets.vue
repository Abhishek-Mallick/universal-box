<template>
  <PageContainer :title="`Snippets tagged with #${tag}`">
    <LoadingWrapper :loading="loading" :error="error">
      <SnippetsList :snippets="filteredSnippets" />
    </LoadingWrapper>
  </PageContainer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSnippetStore } from '../stores/snippet'
import { useToast } from 'vue-toastification'
import SnippetsList from '../components/SnippetsList.vue'
import PageContainer from '../components/PageContainer.vue'
import LoadingWrapper from '../components/LoadingWrapper.vue'

const route = useRoute()
const snippetStore = useSnippetStore()
const loading = ref(true)
const error = ref(null)
const toast = useToast()

const tag = computed(() => route.params.tag)

const filteredSnippets = computed(() => {
  return snippetStore.snippets.filter(snippet => 
    snippet.tags.split(',').map(t => t.trim().toLowerCase()).includes(tag.value.toLowerCase())
  )
})

onMounted(async () => {
  try {
    if (snippetStore.snippets.length === 0) {
      await snippetStore.fetchPublicSnippets()
    }
    if (filteredSnippets.value.length === 0) {
      toast.info(`No snippets found with tag #${tag.value}`)
    }
  } catch (err) {
    error.value = 'Failed to load snippets'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
})
</script>