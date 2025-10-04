export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'Universal-Box',
      description: 'Universal-Box is your all-in-one solution for rapid code scaffolding and streamlined development. With a wide range of pre-built templates, this npm package simplifies the process of setting up boilerplate code for any project and offers single-command deployment.',
    },
    theme: {
      customizable: true,
      color: 'slate',
      radius: 0.75,
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
        'icon': 'i-simple-icons-discord',
        'to': 'https://discord.gg/Ebusy32ctb',
        'target': '_blank',
        'aria-label': 'Universal-Box on Discord'
      },{
        icon: 'lucide:github',
        to: 'https://github.com/Abhishek-Mallick/universal-box',
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
      'icon': 'lucide:box',
      'to': 'https://universal-box.vercel.app/',
      'target': '_blank',
      'aria-label': 'Universal-Box Website'
    }, {
      'icon': 'i-simple-icons-discord',
      'to': 'https://discord.gg/Ebusy32ctb',
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
        to: 'https://github.com/Abhishek-Mallick/universal-box',
        target: '_blank',
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://github.com/Abhishek-Mallick/universal-box/issues',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    }
  }
});