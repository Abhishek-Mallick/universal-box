import axios from 'axios'
const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'

const api = axios.create({
  baseURL,
  withCredentials: true,  // Ensure credentials/cookies are sent with cross-origin requests
})

// Set up a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,  // return the response if no errors

  (error) => {
    // Check and reject 401 (Unauthorized) error
    if (error.response && error.response.status === 401) {
      return Promise.reject(error)
    }
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default api