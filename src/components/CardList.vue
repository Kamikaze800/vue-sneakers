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
    class="flex flex-wrap place-content-center gap-x-4 gap-y-8 rounded-lg -bg--gray_white_white pt-5 lg:gap-4 dark:bg-transparent"
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
      :tag="item.tag"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdd="() => emit('addToCartPlus', item)"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
    />
  </div>
</template>
