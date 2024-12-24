<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})
const onChangeSelect = event => {
  filters.sortBy = event.target.value
}
const onChangeSearchInput = event => {
  filters.searchQuery = event.target.value
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
</script>
<template>
  <Drawer
    :vat-price="vatPrice"
    :total-price="totalPrice"
    @create-order="createOrder"
    :is-creating-order="isCreatingOrder"
    :cart-button-disabled="cartButtonDisabled"
    v-if="drawerOpen"
  />

  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

    <div class="flex gap-5">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border rounded-md outline-none"
      >
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <img class="absolute left-4 top-3" src="/search.svg" alt="" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>

  <!-- <EmitWrapper></EmitWrapper> -->

  <div class="mt-10">
    <CardList
      :items="items"
      @add-to-favorite="addToFavorite"
      @add-to-cart-plus="addToCartPlus"
    />
  </div>
</template>
