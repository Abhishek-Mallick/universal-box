import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getPublicSnippets,
  getUserSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
} from '../api'

export const useSnippetStore = defineStore(
  'snippet',
  () => {
    const snippets = ref([])
    const userSnippets = ref([])

    // error handling helper
    const withErrorHandling = (fn, errorMessage) => {
      return async (...args) => {
        try {
          return await fn(...args)
        } catch (error) {
          console.error(`${errorMessage}`, error)
          throw error
        }
      }
    }

    const fetchPublicSnippets = withErrorHandling(async () => {
      const { data } = await getPublicSnippets()
      snippets.value = data.snippets
    }, 'Error fetching public snippets:')

    const fetchUserSnippets = withErrorHandling(async () => {
      const { data } = await getUserSnippets()
      userSnippets.value = data.snippets
    }, 'Error fetching user snippets:')

    const addSnippet = withErrorHandling(async (snippetData) => {
      const { data } = await createSnippet(snippetData)
      const newSnippet = data.snippet
      userSnippets.value.push(newSnippet)
      if (newSnippet.visibility) {
        snippets.value.push(newSnippet)
      }
    }, 'Error adding snippet:')

    const editSnippet = withErrorHandling(async (id, snippetData) => {
      const { data } = await updateSnippet(id, snippetData)
      const updatedSnippet = data.snippet

      // Update userSnippets
      const updateArray = (array) => {
        const index = array.findIndex((s) => s.id === id)
        if (index !== -1) {
          array[index] = updatedSnippet
          return true
        }
        return false
      }

      updateArray(userSnippets.value)

      // Update public snippets
      if (updatedSnippet.visibility) {
        if (!updateArray(snippets.value)) {
          snippets.value.push(updatedSnippet)
        }
      } else {
        snippets.value = snippets.value.filter((s) => s.id !== id)
      }
    }, 'Error editing snippet:')

    const removeSnippet = withErrorHandling(async (id) => {
      await deleteSnippet(id)
      const removeFromArray = (array) => {
        const index = array.findIndex((s) => s.id === id)
        if (index !== -1) {
          array.splice(index, 1)
        }
      }
      removeFromArray(userSnippets.value)
      removeFromArray(snippets.value)
    }, 'Error removing snippet:')

    const clearSnippets = () => {
      snippets.value = []
      userSnippets.value = []
    }

    return {
      snippets,
      userSnippets,
      fetchPublicSnippets,
      fetchUserSnippets,
      addSnippet,
      editSnippet,
      removeSnippet,
      clearSnippets,
    }
  },
  {
    persist: {
      paths: ['userSnippets'],
    },
  }
)
