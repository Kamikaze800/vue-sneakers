<script setup>
import { onMounted, ref, inject, watch } from "vue"
import axios from "axios"

import CardList from "../components/CardList.vue"
const addToFavorite = inject("addToFavorite")
const addToCartPlus = inject("addToCartPlus")
const favorites = ref([])
const { cart, addToCart, removeFromCart } = inject("cart")
onMounted(async () => {
  const localCart = localStorage.getItem("cart")
  cart.value = localCart ? JSON.parse(localCart) : []
  try {
    const { data } = await axios.get(
      "https://8fb2ce8dc0a90345.mokky.dev/favorites?_relations=items",
    )
    favorites.value = data.map((obj) => ({
      ...obj.item,
      isFavorite: true,
      isAdded: cart.value.some((cartItem) => cartItem.id === obj.item.id),
      favoriteId: obj.id,
    }))
    console.log(data)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <h2 class="mb-8 text-3xl font-bold">Мои закладки</h2>
  <CardList :items="favorites" @add-to-favorite="addToFavorite" @add-to-cart-plus="addToCartPlus" />
</template>

<style lang="scss" scoped></style>
