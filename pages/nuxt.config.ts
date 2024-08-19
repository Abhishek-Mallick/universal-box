export default defineNuxtConfig({
  extends: ['@nuxt-themes/docus'],

  devtools: { enabled: false },

  modules: [
    '@nuxtjs/plausible'
  ],

  compatibilityDate: '2024-08-18',

  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css']
})
