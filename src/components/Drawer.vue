<script setup>
import DrawerHead from './DrawerHead.vue';
import CartItem from './CartItem.vue';
import CartItemList from './CartItemList.vue';
import InfoBlock from './InfoBlock.vue';
import { inject } from 'vue';
const emit = defineEmits(['createOrder'])
defineProps({
  totalPrice: Number,
  vatPrice: Number,
  isCreatingOrder: Boolean,
  cartButtonDisabled: Boolean
})
const { closeDrawer } = inject('cart')
</script>
<template>
  <div @click="closeDrawer" class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHead />

    <div class="flex h-full  items-center" v-if="!totalPrice">
      <InfoBlock image-url="../public/package-icon.png" title="Корзина пуста"
        description="Добавьте хотя бы одну пару кросовок, чтобы сделать заказ." />
    </div>

    <CartItemList />

    <div v-if="totalPrice" class="flex flex-col gap-4 mb-5 my-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} руб</b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ vatPrice }} руб</b>
      </div>
      <button :disabled="cartButtonDisabled" @click="() => emit('createOrder')"
        class=" mt-4 bg-lime-500 w-full rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer">
        Оформить закакз
      </button>
    </div>


  </div>
</template>
