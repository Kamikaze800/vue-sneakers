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
    console.log(data)
    item.value = data[0]
    title.value = item.value.title
    console.log(item.value.images[0].url)
  } catch (e) {
    console.log(e)
  }
}

const sale = ref(false)

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
            <img class="" :src="image.url" :alt="`Slide ${image.id}`" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="flex place-content-center">
      <div class="hidden sm:grid grid-cols-2">
        <div class="" v-for="image in item?.images || []" :key="image.id">
          <!-- изображения в фул  -->
          <img class="" :src="image.url" :alt="`Slide ${image.id}`" @click="console.log()" />
        </div>
      </div>
      <div class="fixed bg-slate-500"></div>
      <div class="px-4 flex flex-col">
        <!-- основной текст -->
        <h1 class="text-xl">{{ title }}</h1>
        <div class="flex justify-between">
          <div class="flex flex-row gap-2">
            <p class="text-red-500 text-2xl font-bold">{{ item?.price }} ₽</p>
            <p class="text-sm line-through text-[#716969]">{{ item?.price }} ₽</p>
          </div>
          <img src="/heart.svg" class="object-fill" alt="" />
        </div>
        <p>{{ item?.description }}</p>
        <div class="mb-2">
          <p class="pb-2">Размер</p>
          <ul class="flex gap-3 flex-wrap">
            <li
              class="-bg--gray_white px-2 py-1 rounded-md hover:-bg--dark hover:text-white cursor-pointer active:-bg--dark"
            >
              44
            </li>
            <li class="-bg--gray_white px-2 py-1 rounded-md">44</li>
          </ul>
        </div>
        <div class="mb-2">
          <p class="pb-2">Цвет</p>
          <ul class="flex gap-3">
            <li class="bg-orange-600 size-7 rounded-md"></li>
            <li class="bg-orange-600 size-7 rounded-md"></li>
          </ul>
        </div>
        <button class="text-sm text-white bg-[#464646] py-3 px-9 rounded-md">
          ДОБАВИТЬ В КОРЗИНУ {{ item?.price }} ₽
        </button>
        <button class="underline shrink">Купить в 1 клик</button>
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
