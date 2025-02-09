<script setup>
import { onMounted, ref, watch, reactive, provide, computed, inject } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')
const items = ref([])
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 300)
const addToCartPlus = (item) => {
  if (item.isAdded) {
    removeFromCart(item)
  } else {
    addToCart(item)
  }
}
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const obj = {
        item_id: item.id,
      }
      const { data } = await axios.post('https://8fb2ce8dc0a90345.mokky.dev/favorites', obj)
      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://8fb2ce8dc0a90345.mokky.dev/favorites/${item.favoriteId}`)

      item.favoriteId = null
    }
  } catch (e) {
    console.log(e)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://8fb2ce8dc0a90345.mokky.dev/favorites')

    items.value = items.value.map((item) => {
      {
        const favorite = favorites.find((fav) => fav.item_id === item.id)

        if (!favorite) {
          return item
        }
        return {
          ...item,
          isFavorite: true,
          favoriteId: favorite.id,
        }
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
    const { data } = await axios.get('https://8fb2ce8dc0a90345.mokky.dev/items', { params })

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
  const localCart = localStorage.getItem('cart')
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
  <div class="flex flex-col sm:flex-row justify-between items-center mx-12 lg:mx-28 mt-5">
    <h2 class="text-3xl leading-8 font-bold mb-5 md:mb-0">Все кроссовки</h2>

    <div class="flex flex-col md:flex-row gap-5">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none dark:-bg--dark"
      >
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400 dark:-bg--dark"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart-plus="addToCartPlus" />
  </div>
</template>
