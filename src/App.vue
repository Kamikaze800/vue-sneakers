<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'

import Header from './components/Header.vue'
import Card from './components/Card.vue'

import Drawer from './components/Drawer.vue'
import Button from './components/Emits/Button.vue'
import Text from './components/Emits/Text.vue'
import EmitWrapper from './components/Emits/EmitWrapper.vue'

const items = ref([])
const cart = ref([])

const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price, 0),
)
const vatPrice = computed(() => Math.round((totalPrice.value / 100) * 5))

const isCreatingOrder = ref(false)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(
      `https://8fb2ce8dc0a90345.mokky.dev/orders`,
      {
        items: cart.value,
        totalPrice: totalPrice.value,
      },
    )
    console.log(data)
    cart.value = []
    return data
  } catch (e) {
    console.log(e)
  } finally {
    isCreatingOrder.value = false
  }
}
const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(
  () => isCreatingOrder.value || cartIsEmpty.value,
)

const drawerOpen = ref(false)

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(
      'https://8fb2ce8dc0a90345.mokky.dev/favorites',
    )

    items.value = items.value.map(item => {
      {
        const favorite = favorites.find(fav => fav.parentId === item.id)

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
    const { data } = await axios.get(
      'https://8fb2ce8dc0a90345.mokky.dev/items',
      { params },
    )
    items.value = data.map(obj => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (e) {
    console.log(e)
  }
}
const addToCart = item => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = item => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()
  items.value = items.value.map(item => ({
    ...item,
    isAdded: cart.value.some(cartItem => cartItem.id === item.id),
  }))
})
watch(filters, fetchItems)
watch(cart, () => {
  items.value = items.value.map(item => ({
    ...item,
    isAdded: false,
  }))
})

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)
provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  removeFromCart,
  addToCartPlus,
})
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10"></div>
  </div>
</template>

<style scoped></style>
