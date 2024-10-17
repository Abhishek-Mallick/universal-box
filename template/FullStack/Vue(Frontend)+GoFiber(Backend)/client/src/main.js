
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Import Prism.js CSS
import 'prismjs/themes/prism-tomorrow.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

//  Vue Toastification
const toastOptions = {
    position: "top-left",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
}

app.use(MotionPlugin)
app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')