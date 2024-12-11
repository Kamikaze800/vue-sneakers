<script setup>
</script>
<template>
  <Drawer :vat-price="vatPrice" :total-price="totalPrice" @create-order="createOrder"
    :is-creating-order="isCreatingOrder" :cart-button-disabled="cartButtonDisabled" v-if="drawerOpen" />

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
        <input @input="onChangeSearchInput" class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
          placeholder="Поиск..." />
      </div>
    </div>
  </div>

  <!-- <EmitWrapper></EmitWrapper> -->

  <div class="mt-10">
    <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart-plus="addToCartPlus" />
  </div>
</template>
