<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  removeFromCart: Function,
})
</script>

<template>
  <div class="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
    <img class="h-16 w-16 rounded-xl" :src="imageUrl" :alt="title" />
    <div class="flex flex-1 flex-col justify-between">
      <p class="">{{ props.title }}</p>
      <div class="mt-2 flex justify-between">
        <b>{{ price }} руб</b>
        <img
          @click="removeFromCart"
          class="cursor-pointer opacity-40 transition hover:opacity-100"
          src="/close.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
