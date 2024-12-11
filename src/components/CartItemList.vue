<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const { cart, removeFromCart } = inject('cart')
</script>
<template>
  <div class="flex flex-col gap-4 mb-8" v-auto-animate>
    <CartItem v-for="item in cart" :key="item.id" :title="item.title" :imageUrl="item.imageUrl" :price="item.price"
      :removeFromCart="() => removeFromCart(item)" />
  </div>
</template>
