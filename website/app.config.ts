export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'Universal-Box',
      description: 'Beautifully designed Nuxt Content template built with shadcn-vue. Customizable. Compatible. Open Source.',
    },
    theme: {
      customizable: true,
      color: 'blue',
      radius: 0.5,
    },
    header: {
      title: 'Universal-Box',
      showTitle: true,
      darkModeToggle: true,
      logo: {
        light: '/logo.webp',
        dark: '/logo.webp',
      },
      nav: [],
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt',
        target: '_blank',
      }],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
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
      enable: true,
      title: 'On This Page',
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt',
        target: '_blank',
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt/issues',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    }
  }
});