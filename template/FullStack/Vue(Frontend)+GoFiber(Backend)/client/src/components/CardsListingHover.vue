<template>
  <div class="max-w-5xl mx-auto md:px-8">
    <div :class="['grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 cursor-pointer', className]">
      <div
        v-for="(item, idx) in items"
        :key="item.link"
        class="relative group block p-2 h-full w-full"
        @mouseenter="setHoveredIndex(idx)"
        @mouseleave="setHoveredIndex(null)"
        @click="navigate(item.link)"
      >
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :enter="{ 
            opacity: 1, 
            scale: .99, 
            transition: { 
              type: 'spring', 
              stiffness: 300, 
              damping: 30, 
              opacity: { duration: 0.2 } 
            } 
          }"
          :leave="{ 
            opacity: 0, 
            scale: 0.95, 
            transition: { 
              type: 'spring', 
              stiffness: 300, 
              damping: 30, 
              opacity: { duration: 0.2 } 
            } 
          }"
          :style="{ 
            position: 'absolute', 
            inset: '-5px', 
            zIndex: 0,
            pointerEvents: 'none' 
          }"
          class="bg-neutral-200 dark:bg-slate-800/[0.8] rounded-3xl"
          v-if="hoveredIndex === idx"
        ></div>
        <div class="rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] relative z-10">
          <div class="p-4">
            <h4 class="text-zinc-100 font-bold tracking-[1px] mt-4 uppercase text-center">
              {{ item.title }}
            </h4>
            <p class="mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm text-center">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})

const hoveredIndex = ref(null)

const setHoveredIndex = (idx) => {
  hoveredIndex.value = idx
}

const navigate = (link) => {
  const url = link.startsWith('https://') ? link : `https://${link}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>