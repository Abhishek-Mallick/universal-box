<template>
    <div class="flex items-center justify-center h-full">
      <div class="loader"></div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .loader {
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-left-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  