<template>
    <div class="container mx-auto px-4 py-8 bg-gray-900">
      <h1 v-if="title" class="text-3xl font-bold mb-8 text-white">{{ title }}</h1>
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String
  })
  </script>