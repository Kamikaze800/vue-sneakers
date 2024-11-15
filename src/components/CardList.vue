<script setup>
import { inject } from 'vue'
import Card from './Card.vue'
defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorite']);


</script>
<template>
  <div class="grid grid-cols-4 gap-5 mb-8">
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :isFavorite="item.isFavorite"

    />
  </div>
</template>
