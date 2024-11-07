<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <div class="bg-white w-4/5 h-screen m-auto rounded-xl shadow-xl mt-14">
    <Header />
    <div>
      <div
        class="relative m-10 border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2"
      >
        <img src="/like-2.svg" alt="Like 1" class="absolute left-8 top-8" />
        <img src="/sneakers/sneakers-1.jpg" alt="" />
        <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span class="text-slate-400">Цена:</span>
            <b>1205 руб.</b>
          </div>
          <img src="/plus.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <MyHello />
</template>

<style scoped></style>
