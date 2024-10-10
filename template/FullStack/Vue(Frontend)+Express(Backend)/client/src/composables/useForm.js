import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'

// regex to check if an email is in valid format
const validEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Composable function to manage form state, validation, and submission
export const useForm = (initialState, validations, submitAction) => {
  
  const formData = reactive({ ...initialState })
  const errors = reactive({})
  const serverError = ref('')
  const successMessage = ref('')
  const loading = ref(false)
  const toast = useToast()

  // Validates the form fields using the provided validation rules
  const validateForm = () => {
    let isValid = true
    Object.keys(validations).forEach(field => {
      const error = validations[field](formData[field])
      if (error) {
        errors[field] = error
        isValid = false
      } else {
        errors[field] = ''
      }
    })
    return isValid
  }

  // Handles form submission logic: validation, API requests, and error/success
  const handleSubmit = async () => {
    serverError.value = ''
    successMessage.value = ''

    if (!validateForm()) return

    try {
      loading.value = true
      const message = await submitAction(formData)
      loading.value = false
      successMessage.value = message
      toast.success(message)
      if (handleSubmit.onSuccess) handleSubmit.onSuccess()
    } catch (error) {
      loading.value = false
      serverError.value = error.response?.data?.message || error.message || 'An error occurred'
      toast.error(serverError.value)
    }
  }

  return {
    formData,
    errors,
    serverError,
    successMessage,
    loading,
    handleSubmit,
    validateForm,
  }
}

// Common validation helper
export const commonValidations = {
  required: (fieldName) => (value) => 
    value ? '' : `${fieldName} is required`,
  minLength: (fieldName, minLength) => (value) => 
    value.length >= minLength ? '' : `${fieldName} must be at least ${minLength} characters`,
  email: (value) => 
    validEmail(value) ? '' : 'Invalid email format',
}