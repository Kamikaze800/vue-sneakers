<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  removeFromCart: Function,
})
</script>

<template>
  <div class="flex items-center border border-slate-200 rounded-xl p-4 gap-4">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-1 flex-col justify-between">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ price }} руб</b>
        <img
          @click="removeFromCart"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
