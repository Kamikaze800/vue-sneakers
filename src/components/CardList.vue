<script setup>
import Card from './Card.vue'
defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorite', 'addToCartPlus'])
</script>
<template>
  <div class="grid grid-cols-4 gap-5 mb-8" v-auto-animate>
    <Card v-for="item in items" :key="item.id" :id="item.id" :title="item.title" :imageUrl="item.imageUrl"
      :price="item.price" :onClickFavorite="() => emit('addToFavorite', item)" :isFavorite="item.isFavorite"
      :onClickAdd="() => emit('addToCartPlus', item)" :isAdded="item.isAdded" />
  </div>
</template>
