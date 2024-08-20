export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    }
  },
  seo: {
    siteName: 'Universal-Box - Docs'
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Abhishek-Mallick/universal-box',
      'target': '_blank',
      'aria-label': 'Universal-Box'
    }]
  },
  footer: {
    credits: 'Copyright © 2024 Universal-Box',
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-nuxtdotjs',
      'to': 'https://universal-box.co/',
      'target': '_blank',
      'aria-label': 'Universal-Box Website'
    }, {
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.gg/NBR9JmWys4',
      'target': '_blank',
      'aria-label': 'Universal-Box on Discord'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/Abhishek-Mallick/universal-box',
      'target': '_blank',
      'aria-label': 'Universal-Box on GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/Abhishek-Mallick/universal-box/edit/main/content',
      links: [{
        icon: 'i-heroicons-star',
        label: 'Star on GitHub',
        to: 'https://github.com/Abhishek-Mallick/universal-box',
        target: '_blank'
      }]
    }
  }
})
