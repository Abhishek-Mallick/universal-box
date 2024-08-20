---
title: Home
navigation: false
---

::hero
---
announcement:
  title: 'Release v2.4.2'
  icon: 'noto:party-popper'
  to: https://www.npmjs.com/package/universal-box
actions:
  - name: Get Started
    to: /getting-started
  - name: Star this repo
    variant: outline
    to: https://github.com/Abhishek-Mallick/universal-box
    leftIcon: 'lucide:github'
---

#title
Universal-Box : Effortless Code Scaffolding.

#description
Rapid project setup made easy.
Pre-built templates. One-command deployment. Open Source.

<br></br>

::code-group
  ```bash [npm]
  npm i -g universal-box
  ```

  ```bash [pnpm]
  pnpm i universal-box
  ```

  ```bash [yarn]
  yarn add universal-box
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
  title: Prebuilt templates and Projects.
  icon: i-heroicons-cube
  to: https://nuxt.com/docs/api/components/client-only
  target: _blank
  ---
  Explore the [Docs](https://universal-box.co/templates) with 50+ project templates, select and download in 2 commands in your local machine for free.
  ::
  ::card
  ---
  title: Customizable
  icon: i-heroicons-arrows-right-left
  to: https://nuxt.com/docs/api/composables/use-app-config
  target: _blank
  ---
  Work on top of pre-built templates and customize them accordingly to fulfil your own buisness case.
  ::
  ::card
  ---
  title: Deploy project with CLI.
  icon: i-heroicons-scissors
  to: https://nuxt.com/docs/api/utils/dollarfetch
  target: _blank
  ---
  Comming soon....
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

<!-- ::accordion{default-value="first-item" collapsible}
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
:: -->

