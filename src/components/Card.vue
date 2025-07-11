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
  "Лучшая цена": "bg-green-400",
  "Хит сезона": "bg-[#F15D5D]",
  "Топ продаж": "bg-blue-400",
}
</script>

<template>
  <div
    class="relative w-[170px] rounded-xl border-t-0 border-slate-100 transition-transform hover:shadow-xl lg:w-auto dark:border-0 dark:-bg--dark"
  >
    <div class="absolute z-10 w-full p-2">
      <div class="flex justify-between">
        <div
          class="rounded-xl px-3 py-1 text-xs text-white lg:text-base"
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
            class="hidden w-7 lg:block"
            @click="onClickAdd"
            :src="!isAdded ? '/bug_1.svg' : '/bug_2.svg'"
            alt=""
          />
        </div>
        <!-- сюда будут добавляться ещё теги, если есть. В мобилке наверн просто многоточние на месте второго тега вставлять. в десктопе
            можно все теги оставлять -->
      </div>
    </div>

    <div class="">
      <!-- <img :src="images[0].url" class="rounded-xl border" alt="" /> -->
      <swiper-container
        slides-per-view="1"
        loop="true"
        :pagination="{
          clickable: true,
        }"
        class="max-h-[210px] max-w-[250px] rounded-xl bg-white"
      >
        <swiper-slide class="" v-for="image in images" :key="image.id">
          <img
            :src="image.url"
            class="h-[140px] w-[170px] rounded-xl object-contain lg:h-[210px] lg:w-[250px]"
            alt=""
          />
        </swiper-slide>
      </swiper-container>
    </div>
    <div class="p-2">
      <RouterLink
        :to="{
          name: 'Product',
          params: { id: props.id },
          query: {
            isFavorite: props.isFavorite,
            isAdded: props.isAdded,
          },
        }"
        ><p class="line-clamp-2 text-sm lg:text-xl">{{ title }}</p></RouterLink
      >

      <div class="flex justify-between">
        <div class="flex flex-row gap-2">
          <span class="text-sm font-bold lg:text-2xl lg:font-semibold">{{ price }} ₽</span>
          <div class="flex flex-row items-center gap-1 self-start">
            <p class="text-xs text-[#716969] line-through lg:text-lg">{{ price }} ₽</p>
            <p
              class="text-[10px] font-semibold -text--red lg:rounded-lg lg:-bg--yellow_dark lg:px-2 lg:py-1 lg:text-sm lg:font-normal lg:text-white"
            >
              -18%
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <button
        class="z-10 mb-2 ml-2 rounded -bg--black-soft px-4 py-2 text-xs text-white hover:shadow-xl lg:hidden"
        @click="onClickAdd"
        :class="{ '-bg--green': isAdded }"
      >
        <p v-if="isAdded">В корзине</p>
        <p v-else>В корзину</p>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
