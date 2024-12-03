<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Card from './components/Card.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
import Button from './components/Emits/Button.vue'
import Text from './components/Emits/Text.vue'
import EmitWrapper from './components/Emits/EmitWrapper.vue'

const items = ref([])
const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((sum, item) => sum + item.price, 0))
const vatPrice = computed(() => Math.round(totalPrice.value / 100 * 5))

const isCreatingOrder = ref(false)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://8fb2ce8dc0a90345.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value,
    })
    console.log(data)
    cart.value = []
    return data
  } catch (e) {
    console.log(e)
  }
  isCreatingOrder.value = false
}
const cartIsEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const drawerOpen = ref(false)

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}
const onChangeSelect = event => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = event => {
  filters.searchQuery = event.target.value
}
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})
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


const addToCartPlus = item => {
  if (item.isAdded) {
    removeFromCart(item)
  } else {
    addToCart(item)
  }
}
const addToFavorite = async item => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true
      const obj = {
        parentId: item.id,
      }
      const { data } = await axios.post(
        'https://8fb2ce8dc0a90345.mokky.dev/favorites',
        obj,
      )
      item.favoriteId = data.id
      console.log(data)
    } else {
      item.isFavorite = false
      await axios.delete(
        `https://8fb2ce8dc0a90345.mokky.dev/favorites/${item.favoriteId}`,
      )

      item.favoriteId = null
    }
  } catch (e) {
    console.log(e)
  }
}
onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})
watch(filters, fetchItems)
watch(cart, () =>{
  items.value = items.value.map(
    (item) => ({
    ...item,
    isAdded: false
  })
)
})

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  removeFromCart,
  addToCartPlus
})
</script>

<template>
  <Drawer :vat-price="vatPrice" :total-price="totalPrice" @create-order="createOrder"
    :is-creating-order="isCreatingOrder" :cart-button-disabled="cartButtonDisabled" v-if="drawerOpen" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex gap-5">
          <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="" />
            <input @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400" placeholder="Поиск..." />
          </div>
        </div>
      </div>

      <!-- <EmitWrapper></EmitWrapper> -->

      <div class="mt-10">
        <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart-plus="addToCartPlus" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
