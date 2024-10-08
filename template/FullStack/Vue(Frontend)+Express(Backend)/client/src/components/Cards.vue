<template>
  <div class="max-w-5xl mx-auto px-0 xs:px-8">
    <CardsListingHover :items="projects" />
  </div>
</template>

<script setup>
import CardsListingHover from './CardsListingHover.vue'

const projects = [
  {
    title: "Stripe",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "stripe.com",
  },
  {
    title: "Netflix",
    description: "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "netflix.com",
  },
  {
    title: "Google",
    description: "A multinational technology company that specializes in Internet-related services and products.",
    link: "google.com",
  },
  {
    title: "Meta",
    description: "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "meta.com",
  },
  {
    title: "Amazon",
    description: "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "amazon.com",
  },
  {
    title: "Microsoft",
    description: "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "microsoft.com",
  },
]
</script>