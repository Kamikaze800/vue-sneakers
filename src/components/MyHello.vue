<script setup>
// import { ref } from 'vue'
defineProps({
  title: String,
  price: Number,
  isAdded: Boolean,
})
</script>
<template>
  <div class="product">
    <h2>Товар: {{ title }}</h2>
    <h3>Цена? {{ price }}</h3>
    <h4>ДОбавлен? {{ isAdded }}</h4>
    <slot></slot>
  </div>
</template>
<style scoped>
.product {
  border: 1px solid blue;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
