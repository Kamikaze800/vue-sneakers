<script setup>
import { onMounted, ref, reactive } from "vue"
import axios from "axios"
import { useRoute } from "vue-router"

import Gallery from "@/components/Gallery.vue"

const route = useRoute()
const { id } = route.params
const item = reactive({})

const fetchItem = async () => {
  try {
    const { data } = await axios.get("https://8fb2ce8dc0a90345.mokky.dev/items", { params: { id } })
    Object.assign(item, data[0]) // создаёт объект, клчами которого являются ключи data[0]
    // console.log(item.price)
    // item.value = data[0]
    // title.value = item.value.title
    // console.log(item.value.images[0].url)
  } catch (e) {
    console.log(e)
  }
}

const selectedSize = ref(null)
const selectedColor = ref(null)

const sale = ref(false)
const galleryOpen = ref(false)
const openGallery = () => {
  galleryOpen.value = true
}

// Обработчик прогресса слайдера
// const onProgress = (e) => {
//   const [swiper, progress] = e.detail
//   console.log(progress)
// }

// Обработчик смены слайда
const onSlideChange = (e) => {
  console.log(e.detail[0].activeIndex)
}

// console.log(openGallery.value)
onMounted(fetchItem)
</script>

<template>
  <div class="flex justify-center">
    <div class="flex h-[450px]">
      <!-- Миниатюры (левый вертикальный слайдер) -->
      <swiper-container
        class="hidden max-h-[300px] w-[100px] sm:block"
        direction="vertical"
        :slides-per-view="4"
        navigation="false"
        :mousewheel="{ forceToAxis: true }"
        id="gallery-thumbs"
      >
        <swiper-slide v-for="(image, index) in item.images" :key="index">
          <img :src="image.url" :data-index="index" class="cursor-pointer object-cover" />
        </swiper-slide>
      </swiper-container>
      <swiper-container
        class="max-w-[500px] bg-white"
        slides-per-view="1"
        :centered-slides="true"
        id="gallery-main"
        thumbs-swiper="#gallery-thumbs"
        pagination="true"
      >
        <swiper-slide class="" v-for="(image, index) in item.images" :key="index">
          <img :src="image.url" class="m-auto h-[450px] max-w-[500px] object-contain" alt="" />
        </swiper-slide>
      </swiper-container>
    </div>
    <!-- <Gallery v-show="galleryOpen.value" class="absolute"></Gallery> -->
    <div class="flex place-content-center">
      <div class="hidden grid-cols-2">
        <div class="" v-for="image in item?.images || []" :key="image.id">
          <!-- изображения в фул  -->
          <img class="" :src="image.url" :alt="`Slide ${image.id}`" @click="console.log()" />
        </div>
      </div>
      <div class="fixed bg-slate-500"></div>
      <div class="flex flex-col px-4">
        <!-- основной текст -->
        <h1 class="text-xl">{{ item?.title }}</h1>
        <div class="flex justify-between">
          <div class="flex flex-row gap-2">
            <p class="text-2xl font-bold text-red-500">{{ item?.price }} ₽</p>
            <p class="text-sm text-[#716969] line-through">{{ item?.price }} ₽</p>
          </div>
          <div class="flex gap-6">
            <img src="/share.svg" class="" alt="" />
            <img
              :src="!item.isFavorite ? '/like_1.svg' : '/like_2.svg'"
              @click="(e) => console.log(item)"
              class=""
              alt=""
            />
          </div>
        </div>
        <p>{{ item?.description }}</p>
        <div class="mb-2">
          <p class="pb-2">Размер</p>
          <ul class="flex flex-wrap gap-3">
            <!--мне надо выделять конкретный элемент li, при нажатии не него
            у меня есть key, который
            может ис-->
            <li
              v-for="size in item.sizes"
              :key="size"
              class="cursor-pointer rounded-md px-2 py-1"
              :class="{
                '-bg--dark text-white': selectedSize === size, // Выбранный размер (активный)
                '-bg--gray_white': selectedSize !== size, // Не выбранный размер (стандартный)
                'hover:-bg--dark hover:text-white': selectedSize !== size, // Наведение
              }"
              @click="selectedSize = size"
            >
              {{ size }}
            </li>
          </ul>
        </div>
        <div class="mb-2">
          <p class="pb-2">Цвет</p>
          <ul class="flex gap-3">
            <li
              v-for="color in item.colors"
              :key="color"
              class="size-7 cursor-pointer rounded-md"
              :style="{ backgroundColor: color }"
              :class="{
                'outline outline-2 outline-offset-2': selectedColor === color, // Выбранный размер (активный)
              }"
              @click="
                () => {
                  selectedColor = color
                  console.log(selectedColor)
                }
              "
            ></li>
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

<style scoped>
@media (min-width: 701px) {
  swiper-container::part(pagination) {
    display: none;
  }
}
</style>
