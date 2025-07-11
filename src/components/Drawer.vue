<script setup>
import { ref, inject, computed } from "vue"
import axios from "axios"

import DrawerHead from "./DrawerHead.vue"
import CartItem from "./CartItem.vue"
import CartItemList from "./CartItemList.vue"
import InfoBlock from "./InfoBlock.vue"

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
})
const { cart, closeDrawer } = inject("cart")
const orderId = ref(null)
const isCreating = ref(false)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`https://8fb2ce8dc0a90345.mokky.dev/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice.value,
    })

    cart.value = []
    orderId.value = data.id
    return data
  } catch (e) {
    console.log(e)
  } finally {
    isCreating.value = false
  }
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>
<template>
  <div @click="closeDrawer" class="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-70"></div>
  <div class="fixed right-0 top-0 z-20 h-full w-96 bg-white p-8 dark:-bg--dark">
    <DrawerHead />

    <div class="flex h-full items-center" v-if="!totalPrice || orderId">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        image-url="/package-icon.png"
        title="Корзина пуста"
        description="Добавьте хотя бы одну пару кросовок, чтобы сделать заказ."
      />
      <InfoBlock
        v-if="orderId"
        image-url="/order-success-icon.png"
        title="Заказ оформлен!"
        :description="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
      />
    </div>

    <CartItemList />

    <div v-if="totalPrice" class="my-7 mb-5 flex flex-col gap-4">
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
      <button
        :disabled="buttonDisabled"
        @click="createOrder"
        class="mt-4 w-full cursor-pointer rounded-xl bg-lime-500 py-3 text-white transition hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300"
      >
        Оформить закакз
      </button>
    </div>
  </div>
</template>
