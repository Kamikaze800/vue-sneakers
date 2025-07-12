<script setup>
import { onMounted, ref, reactive } from "vue"
import axios from "axios"
import { useRoute } from "vue-router"
import { inject } from "vue"
import Gallery from "@/components/Gallery.vue"

const route = useRoute()
const { id } = route.params
const { cart } = inject("cart")
const item = reactive({})

const fetchItem = async () => {
  try {
    const { data } = await axios.get("https://8fb2ce8dc0a90345.mokky.dev/items", { params: { id } })
    Object.assign(item, data[0]) // создаёт объект, клчами которого являются ключи data[0]
  } catch (e) {
    console.log(e)
  }
}
item.isFavorite = route.query.isFavorite === "true"
item.isAdded = route.query.isAdded === "true"
item.favoriteId = parseInt(route.query.favoriteId)

const showShare = ref(false)
const selectedSize = ref(null)
const selectedColor = ref(null)

const sale = ref(false)
const galleryOpen = ref(false)
const openGallery = () => {
  galleryOpen.value = true
}

const addToFavorite = inject("addToFavorite")
const addToCartPlus = inject("addToCartPlus")
onMounted(fetchItem)

const showPopup = ref(false)
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    showPopup.value = true
    setTimeout(() => {
      showPopup.value = false
    }, 2000)
  } catch (err) {
    console.error(err)
  }
}

const openIndex = ref(null)
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <div @click="() => (showShare = !showShare)" v-if="showShare" class="fixed h-full w-full"></div>
  <div
    v-if="showPopup"
    class="fixed bottom-5 left-1/2 -translate-x-1/2 transform rounded-md -bg--black-soft p-2 text-white shadow-xl"
  >
    скопировано
  </div>
  <div class="flex flex-col justify-center lg:flex-row">
    <div class="flex sm:h-[450px]">
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
      <!-- биг слайдер -->
      <swiper-container
        class="w-11/12 bg-white sm:max-w-[450px]"
        slides-per-view="1"
        :centered-slides="true"
        id="gallery-main"
        thumbs-swiper="#gallery-thumbs"
        pagination="true"
      >
        <swiper-slide class="" v-for="(image, index) in item.images" :key="index">
          <img
            :src="image.url"
            class="w-11/12 object-contain sm:h-[450px] sm:max-w-[450px]"
            alt=""
          />
        </swiper-slide>
      </swiper-container>
    </div>
    <!-- <Gallery v-show="galleryOpen.value" class="absolute"></Gallery> -->
    <div class="flex">
      <div class="hidden grid-cols-2">
        <div class="" v-for="image in item?.images || []" :key="image.id">
          <!-- изображения в фул  -->
          <img class="" :src="image.url" :alt="`Slide ${image.id}`" @click="console.log()" />
        </div>
      </div>
      <div class="fixed bg-slate-500"></div>
      <div class="flex max-w-[560px] flex-col px-4">
        <!-- основной текст -->
        <h1 class="text-xl">{{ item?.title }}</h1>
        <div class="flex justify-between">
          <div class="flex flex-row gap-2">
            <p class="text-2xl font-bold text-red-500">{{ item?.price }} ₽</p>
            <p class="text-sm text-[#716969] line-through">{{ item?.price }} ₽</p>
          </div>
          <div class="flex gap-6">
            <img
              @click="() => (showShare = !showShare)"
              src="/share.svg"
              class="cursor-pointer"
              alt=""
            />

            <div
              v-if="showShare"
              @click="copyLink"
              class="absolute right-16 z-10 mt-10 flex h-[40px] w-[210px] cursor-pointer items-center justify-center rounded-md bg-white shadow-xl"
            >
              <img src="/screpka.svg" class="w-6" alt="" />
              <p class="">Cкопировать ссылку</p>
            </div>
            <img
              :src="!item.isFavorite ? '/like_1.svg' : '/like_2.svg'"
              @click="() => addToFavorite(item)"
              class="cursor-pointer"
              alt=""
            />
          </div>
        </div>

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

        <button
          @click="addToCartPlus(item)"
          class="rounded-md px-9 py-3 text-sm text-white"
          :class="item.isAdded ? 'bg-green-500' : 'bg-[#464646]'"
        >
          <p v-if="!item.isAdded">ДОБАВИТЬ В КОРЗИНУ {{ item?.price }} ₽</p>
          <p v-else>В КОРЗИНЕ</p>
        </button>
        <button class="shrink underline">Купить в 1 клик</button>
        <!-- <div>
          <p class="text-lg font-medium">О товаре</p>
          <ul>
            <li><span>Материал</span> х<span>хлопок</span></li>
            <p>{{ item?.description }}</p>
            <p>{{ item.sections }}</p>
          </ul>
        </div> -->
        <div class="divide-y rounded-md border-t">
          <div v-for="(section, index) in item.sections" :key="index">
            <!-- Заголовок -->
            <button
              @click="toggle(index)"
              class="flex w-full items-center justify-between px-4 py-3 text-left font-medium"
            >
              {{ section.title }}
              <img
                src="/strelka.svg"
                class="rotate-180"
                :class="openIndex === index ? 'rotate-0' : ''"
              />
            </button>

            <!-- Контент -->
            <div v-if="openIndex === index" class="px-4 pb-3 text-sm text-gray-700">
              <ul class="space-y-1">
                <li v-for="(val, key) in section.content" :key="key" class="flex justify-between">
                  <span class="text-gray-500">{{ key }}</span>
                  <span class="text-black">{{ val }}</span>
                </li>
              </ul>
            </div>
          </div>
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
