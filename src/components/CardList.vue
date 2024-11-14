<script setup>
import { inject } from 'vue'
import Card from './Card.vue'
defineProps({
  items: Array,
})
const onClickAdd = () => {
  console.log("item")
}
const addToFavorite = inject('addToFavorite')

// const onClickFavorite = () => {
//   const obj = {
//     ...props,
//     parentId: props.id,
//   }
//   addToFavorite(obj)
// }
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
      :onClickFavorite="() => addToFavorite(item)"
      :isFavorite="item.isFavorite"
      :onClickAdd="onClickAdd"
    />
  </div>
</template>
