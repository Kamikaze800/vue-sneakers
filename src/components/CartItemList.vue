<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart } = inject('cart')
</script>
<template>
  <div class="mb-8 flex flex-col gap-4 " v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.images[0].url"
      :price="item.price"
      :removeFromCart="() => removeFromCart(item)"
    />
  </div>
</template>
