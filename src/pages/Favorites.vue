<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://8fb2ce8dc0a90345.mokky.dev/favorites?_relations=items',
    )
    favorites.value = data.map((obj) => ({ ...obj.item, isFavorite: true }))
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои закладки</h2>
  <CardList :items="favorites" isFavorites />
</template>

<style lang="scss" scoped></style>
