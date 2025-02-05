<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  images: Array,
  title: String,
  price: Number,
  amount: Number,
  description: String,
  tag: String,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
})
// console.log(props.images[0].url)
const tag = props.tag

const colorMap = {
  'Лучшая цена': 'bg-green-400',
  'Хит сезона': 'bg-[#F15D5D]',
  'Топ продаж': 'bg-blue-400',
}
</script>

<template>
  <div class="cursor-pointer hover:scale-110 transition-transform duration-300">
    <div class="relative w-40 lg:w-auto p-2 border hover:shadow-xl border-slate-100 rounded-3xl">
      <div class="absolute w-10/12">
        <div class="flex justify-between">
          <div
            class="text-white rounded-xl text-xs px-3 py-1 lg:text-base"
            :class="colorMap[props.tag]"
          >
            {{ props.tag }}
          </div>
          <div class="flex items-center gap-2">
            <img
              @click="onClickFavorite"
              :src="!isFavorite ? '/like_1.svg' : '/like_2.svg'"
              alt="Like 1"
              class="w-5 lg:w-7"
            />
            <img
              class="hidden lg:block w-7"
              @click="onClickAdd"
              :src="!isAdded ? '/bug_1.svg' : '/bug_2.svg'"
              alt=""
            />
          </div>
          <!-- сюда будут добавляться ещё теги, если есть. В мобилке наверн просто многоточние на месте второго тега вставлять. в десктопе
            можно все теги оставлять -->
        </div>
      </div>

      <RouterLink :to="{ name: 'Product', params: { id } }">
        <div class="">
          <img :src="images[0].url" class="rounded-xl" alt="" />
        </div>
        <p class="line-clamp-2 text-sm lg:text-xl">{{ title }}</p>
        <div class="flex justify-between">
          <div class="flex flex-row gap-2">
            <span class="font-bold text-sm lg:font-semibold lg:text-2xl">{{ price }} ₽</span>

            <div class="flex flex-row gap-1 items-center self-start">
              <p class="text-xs line-through text-[#716969] lg:text-lg">{{ price }} ₽</p>
              <p
                class="-text--red text-[10px] font-semibold lg:text-sm lg:-bg--yellow_dark lg:text-white lg:rounded-lg lg:font-normal lg:px-2 lg:py-1"
              >
                -18%
              </p>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
    <button
      class="z-10 py-2 px-4 -bg--dark rounded-lg text-white text-xs hover:shadow-xl lg:hidden"
    >
      В корзину
    </button>
  </div>
</template>

<style scoped>
.best_price {
}
</style>
