<script setup>
import Card from './Card.vue'
const props = defineProps({
  items: Array,
  isFavorites: Boolean,
})
const emit = defineEmits(['addToFavorite', 'addToCartPlus'])
</script>
<template>
  <div
    class="flex flex-wrap gap-y-8 gap-x-4 lg:gap-4 place-content-center rounded-lg"
    v-auto-animate
  >
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :amount="item.amount"
      :description="item.description"
      :images="item.images"
      :price="item.price"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCartPlus', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
