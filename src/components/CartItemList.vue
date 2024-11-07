<script setup>
import CartItem from './CartItem.vue';
const onClickAdd = () => {
  alert('add');
}
</script>
<template>
 <div class="flex flex-col gap-4 mb-8">
        <CartItem/>
        <CartItem/>
        <CartItem/>
      </div>
</template>
