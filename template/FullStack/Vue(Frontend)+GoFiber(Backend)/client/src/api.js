import axios from 'axios'
const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      return Promise.reject(error)
    }
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Snippet endpoints
export const getPublicSnippets = () => api.get('/api/snippets')
export const getUserSnippets = () => api.get('/api/snippets/user')
export const getSnippet = (id) => api.get(`/api/snippets/${id}`)
export const createSnippet = (snippetData) => api.post('/api/snippets', snippetData)
export const updateSnippet = (id, snippetData) => api.put(`/api/snippets/${id}`, snippetData)
export const deleteSnippet = (id) => api.delete(`/api/snippets/${id}`)

// Language endpoints
export const getLanguages = () => api.get('/api/snippets/languages')

// Auth endpoints
export const signin = (credentials) => api.post('/api/auth/signin', credentials)
export const signup = (userData) => api.post('/api/auth/signup', userData)
export const signout = () => api.post('/api/user/signout')
export const getProfile = () => api.get('/api/user/profile')

export default api