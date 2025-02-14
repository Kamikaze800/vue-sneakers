<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Gallery from '@/components/Gallery.vue'

const modules = [Navigation, Pagination, Scrollbar, A11y]

const onSwiper = (swiper) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}

const route = useRoute()
const { id } = route.params
const item = ref()
const title = ref()
const fetchItem = async () => {
  try {
    const { data } = await axios.get('https://8fb2ce8dc0a90345.mokky.dev/items', { params: { id } })
    // console.log(data)
    item.value = data[0]
    title.value = item.value.title
    // console.log(item.value.images[0].url)
  } catch (e) {
    console.log(e)
  }
}

const sale = ref(false)
const galleryOpen = ref(false)
const openGallery = () => {
  galleryOpen.value = true
}
// console.log(openGallery.value)
onMounted(fetchItem)
</script>

<template>
  <div class="">
    <div class="rounded-md sm:hidden">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
      >
        <!-- Динамическое создание слайдов из item.images -->
        <swiper-slide v-for="image in item?.images || []" :key="image.id">
          <div class="flex place-content-center">
            <img
              @click="() => (openGalley = !openGalley)"
              class=""
              :src="image.url"
              :alt="`Slide ${image.id}`"
            />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <Gallery v-show="galleryOpen.value"></Gallery>
    <div class="flex place-content-center">
      <div class="hidden grid-cols-2 sm:grid">
        <div class="" v-for="image in item?.images || []" :key="image.id">
          <!-- изображения в фул  -->
          <img class="" :src="image.url" :alt="`Slide ${image.id}`" @click="console.log()" />
        </div>
      </div>
      <div class="fixed bg-slate-500"></div>
      <div class="flex flex-col px-4">
        <!-- основной текст -->
        <h1 class="text-xl">{{ title }}</h1>
        <div class="flex justify-between">
          <div class="flex flex-row gap-2">
            <p class="text-2xl font-bold text-red-500">{{ item?.price }} ₽</p>
            <p class="text-sm text-[#716969] line-through">{{ item?.price }} ₽</p>
          </div>
          <img src="/heart.svg" class="object-fill" alt="" />
        </div>
        <p>{{ item?.description }}</p>
        <div class="mb-2">
          <p class="pb-2">Размер</p>
          <ul class="flex flex-wrap gap-3">
            <li
              class="cursor-pointer rounded-md -bg--gray_white px-2 py-1 hover:-bg--dark hover:text-white active:-bg--dark"
            >
              44
            </li>
            <li class="rounded-md -bg--gray_white px-2 py-1">44</li>
          </ul>
        </div>
        <div class="mb-2">
          <p class="pb-2">Цвет</p>
          <ul class="flex gap-3">
            <li class="size-7 rounded-md bg-orange-600"></li>
            <li class="size-7 rounded-md bg-orange-600"></li>
          </ul>
        </div>
        <button class="rounded-md bg-[#464646] px-9 py-3 text-sm text-white">
          ДОБАВИТЬ В КОРЗИНУ {{ item?.price }} ₽
        </button>
        <button class="shrink underline">Купить в 1 клик</button>
        <div>
          <p class="text-lg font-medium">О товаре</p>
          <ul>
            <li><span>Материал</span> х<span>хлопок</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
