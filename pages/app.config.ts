// https://github.com/nuxt-themes/docus/blob/main/nuxt.schema.ts
export default defineAppConfig({
  docus: {
    title: 'Universal-Box',
    description: 'package for starter template for projects',
    image: './assets/images/4470006.webp',
    socials: {
      github: 'Abhishek-Mallick/universal-box',
    },
    
    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: false,
      showLinkIcon: false,
      exclude: [],
      fluid: true
    }
  }
})
