---
title: Home
navigation: false
---

::hero
---
announcement:
  title: 'Release v2.4.1'
  icon: 'noto:party-popper'
  to: https://www.npmjs.com/package/universal-box
actions:
  - name: Get Started
    to: /getting-started
  - name: Star this repo
    variant: outline
    to: https://github.com/ZTL-UwU/shadcn-docs-nuxt
    leftIcon: 'lucide:github'
---



#title
Effortless and Beautiful :br Docs Template.

#description
Beautifully designed Nuxt Content template built with shadcn-vue. :br Customizable. Compatible. Open Source.




::code-group
  ```bash [npm]
  npm run dev
  ```

  ```bash [pnpm]
  pnpm dev
  ```

  ```bash [yarn]
  yarn dev
  ```
::

::code-group
  ```bash [Terminal]
  # get list of available options
universal-box --help

# scaffold a new project
universal-box init
  ``` 

::




::





::card-group
  ::card
  ---
  title: Components
  icon: i-heroicons-cube
  to: https://nuxt.com/docs/api/components/client-only
  target: _blank
  ---
  Explore Nuxt built-in components for pages, layouts, head, and more.
  ::
  ::card
  ---
  title: Composables
  icon: i-heroicons-arrows-right-left
  to: https://nuxt.com/docs/api/composables/use-app-config
  target: _blank
  ---
  Discover Nuxt composable functions for data-fetching, head management and more.
  ::
  ::card
  ---
  title: Utils
  icon: i-heroicons-scissors
  to: https://nuxt.com/docs/api/utils/dollarfetch
  target: _blank
  ---
  Learn about Nuxt utility functions for navigation, error handling and more.
  ::
  ::card
  ---
  title: Commands
  icon: i-heroicons-command-line
  to: https://nuxt.com/docs/api/commands/add
  target: _blank
  ---
  List of Nuxt CLI commands to init, analyze, build, and preview your application.
  ::
::

::accordion{default-value="first-item" collapsible}
  ::accordion-item{value="first-item"}
  #title
  Is it accessible?

  #content
  Yes. It adheres to the WAI-ARIA design pattern.
  ::
  ::accordion-item
  #title
  Is it unstyled?

  #content
  Yes. It's unstyled by default, giving you freedom over the look and feel.
  ::
  :accordion-item{title="Can it be animated?" content="Yes! You can use the transition prop to configure the animation."}
::

