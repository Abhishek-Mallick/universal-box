<template>
  <div class="flex flex-col min-h-screen min-w-[320px]">
    <Header />
    <main class="flex-grow flex items-center justify-center">
      <router-view class="w-full" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style>
body, html {
  height: 100%;
  margin: 0;
}
</style>
