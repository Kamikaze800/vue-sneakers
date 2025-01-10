<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  images: Array,
  title: String,
  price: Number,
  amount: Number,
  description: String,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
console.log(props.images[0].url)
</script>

<template>
  <div class="">
    <div
      class="relative w-40 lg:w-80 p-2 lg:p-4 bg-white border border-slate-100 rounded-3xl cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
    >
      <div class="absolute">
        <div class="flex">
          <div class="bg-green-400 text-white rounded-full text-xs px-3 py-1 lg:text-base">
            Лучшая цена
          </div>
          <!-- сюда будут добавляться ещё теги, если есть. В мобилке наверн просто многоточние на месте второго тега вставлять. в десктопе
            можно все теги оставлять -->
        </div>
      </div>
      <img
        @click="onClickFavorite"
        :src="!isFavorite ? '/like_1.svg' : '/like_2.svg'"
        alt="Like 1"
        class="absolute w-5 right-3 top-3 lg:w-7 lg:right-6 lg: lg:top-6"
      />
      <img
        class="absolute hidden lg:block w-7 right-16 top-6"
        @click="onClickAdd"
        :src="!isAdded ? '/bug_1.svg' : '/bug_2.svg'"
        alt=""
      />
      <RouterLink :to="{ name: 'Product', params: { id } }">
        <div class="aspect-square max-h-64"><img :src="images[0].url" alt="" /></div>
        <p class="line-clamp-2 text-sm lg:text-xl">{{ title }}</p>
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span class="font-bold text-sm lg:font-semibold lg:text-2xl">{{ price }} ₽</span>
          </div>
        </div>
      </RouterLink>
    </div>
    <button class="z-10 py-2 px-4 -bg--dark rounded-lg text-white sm:hidden">В корзину</button>
  </div>
</template>
