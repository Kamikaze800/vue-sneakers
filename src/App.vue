<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'

import Header from './components/Header.vue'
import Home from './pages/Home.vue'
import Drawer from './components/Drawer.vue'

const darkTheme = ref(localStorage.getItem('darkTheme') === 'true' || false)

const toggleTheme = () => {
  darkTheme.value = !darkTheme.value

  document.body.classList.toggle('darkTheme', darkTheme.value)
}
provide('darkTheme', { darkTheme, toggleTheme })

watch(darkTheme, (newValue) => {
  localStorage.setItem('darkTheme', newValue)
})
/* Корзина (start) */

const cart = ref([])
const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0))
const vatPrice = computed(() => Math.round((totalPrice.value / 100) * 5))

const drawerOpen = ref(false)

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

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
  addToCart,
})

/* Корзина (end) */

onMounted(() => {
  if (darkTheme.value) {
    document.body.classList.add('darkTheme')
  }
})
</script>

<template>
  <div class="container bg-white bg-black sm:mt-5 m-auto rounded-xl shadow-xl">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-1">
      <Drawer :vat-price="vatPrice" :total-price="totalPrice" v-if="drawerOpen" />
      <RouterView />
    </div>
  </div>
</template>

<style></style>
