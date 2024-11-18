<script setup>
defineProps({
  size: Number,
})
</script>
<template>
  <p :style="{ fontSize: size + 'px' }">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium,
    accusantium at officiis unde totam dolorum molestiae. Sed consequuntur,
    consequatur impedit, iusto perferendis eveniet facilis vel deserunt
    doloribus laudantium, eaque quod?
  </p>
  <p>Нам пршли данные: {{ size }}</p>
</template>
