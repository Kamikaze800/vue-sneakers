<script setup>
defineProps({
  imageUrl: String,
  title: String,
  description: String
})
</script>

<template>

  <div class="flex flex-col items-center text-center">
    <img class="w-32" :src="imageUrl" alt="">
    <h2 class="text-xl font-medium text-gray-600">{{ title }}</h2>
    <p class="text-gray-500 mt-2">{{ description }}</p>
  </div>
</template>
