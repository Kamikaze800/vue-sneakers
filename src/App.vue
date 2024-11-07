<script setup>
import { onMounted } from 'vue';

import Header from './components/Header.vue'
import Card from './components/Card.vue';
import CardList from './components/CardList.vue';
import Drawer from './components/Drawer.vue';

onMounted(() => {

});
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />
    <!-- <Drawer/> -->
    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex gap-5">
          <select class="py-2 px-3 border rounded-md outline-none">
            <option>По названию</option>
            <option>По цене (дешевые)</option>
            <option>По цене (дорогие)</option>
          </select>
          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="">
            <input class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400" placeholder="Поиск..." >
          </div>
        </div>

      </div>

      <div class="mt-10">
        <CardList :items="items"/>
      </div>
    </div>

  </div>

</template>

<style scoped></style>
