<script setup>
import { onMounted, ref, watch, reactive, provide, computed, inject } from "vue"
import axios from "axios"
import debounce from "lodash.debounce"

import CardList from "../components/CardList.vue"

const { cart, addToCart, removeFromCart } = inject("cart")
const addToFavorite = inject("addToFavorite")
const addToCartPlus = inject("addToCartPlus")
const items = ref([])
const filters = reactive({
  sortBy: "title",
  searchQuery: "",
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 300)

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get("https://8fb2ce8dc0a90345.mokky.dev/favorites")

    items.value = items.value.map((item) => {
      const favorite = favorites.find((fav) => fav.item_id === item.id)

      if (!favorite) {
        return item
      }
      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (e) {
    console.error(e)
  }
}
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
      // searchQuery: filters.searchQuery,
    }
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }
    const { data } = await axios.get("https://8fb2ce8dc0a90345.mokky.dev/items", { params })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem("cart")
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }))
})
watch(filters, fetchItems)
</script>

<template>
  <div class="mx-12 mt-5 flex flex-col items-center justify-between sm:flex-row lg:mx-28">
    <h2 class="mb-5 text-3xl font-bold leading-8 md:mb-0">Все кроссовки</h2>

    <div class="flex flex-col gap-5 md:flex-row">
      <select
        @change="onChangeSelect"
        class="rounded-md border px-3 py-2 outline-none dark:-bg--dark"
      >
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="" />
        <input
          @input="onChangeSearchInput"
          class="rounded-md border py-2 pl-12 pr-4 outline-none focus:border-gray-400 dark:-bg--dark"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <div class="mt-5">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart-plus="addToCartPlus" />
  </div>
</template>
