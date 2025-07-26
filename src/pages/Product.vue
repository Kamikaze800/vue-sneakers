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
  <div class="flex flex-col flex-wrap justify-center lg:flex-row">
    <div class="grid w-11/12 grid-cols-6 sm:max-w-[600px]">
      <!-- Миниатюры (левый вертикальный слайдер) -->
      <swiper-container
        class="col-span-1 hidden sm:block"
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
        class="col-span-6 w-full bg-white sm:col-span-5 sm:h-[300px]"
        slides-per-view="1"
        :centered-slides="true"
        id="gallery-main"
        thumbs-swiper="#gallery-thumbs"
        pagination="true"
      >
        <swiper-slide class="" v-for="(image, index) in item.images" :key="index">
          <img :src="image.url" class="h-full w-full object-contain" alt="" />
        </swiper-slide>
      </swiper-container>
    </div>
    <!-- <Gallery v-show="galleryOpen.value" class="absolute"></Gallery> -->
    <div class="fixed bg-slate-500"></div>
    <div class="m-auto flex w-[340px] max-w-[560px] flex-col px-2 sm:m-0">
      <!-- основной текст -->
      <h1 class="mt-[15px] text-xl font-medium uppercase">{{ item?.title }}</h1>
      <div class="mt-[32px] flex justify-between">
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
      <div href="" class="flex">
        <a href="" class="">
          <p class="text-sm">
            Рассрочка от <span class="font-semibold -text--dark">2500 ₽/мес</span>
          </p>
        </a>
        <img src="/strelka.svg" class="w-[6px] rotate-90" alt="" />
      </div>
      <div class="mt-[32px]">
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
      <div class="mt-[24px]">
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
        class="mt-[32px] min-w-[328px] rounded-md px-9 py-3 text-sm font-medium text-white"
        :class="item.isAdded ? 'bg-green-500' : 'bg-[#464646]'"
      >
        <p v-if="!item.isAdded">ДОБАВИТЬ В КОРЗИНУ {{ item?.price }} ₽</p>
        <p v-else>В КОРЗИНЕ</p>
      </button>
      <button class="mt-[16px] shrink font-medium underline">Купить в 1 клик</button>
      <!-- <div>
          <p class="text-lg font-medium">О товаре</p>
          <ul>
            <li><span>Материал</span> х<span>хлопок</span></li>
            <p>{{ item?.description }}</p>
            <p>{{ item.sections }}</p>
          </ul>
        </div> -->
      <div class="mt-[36px] divide-y rounded-md border-t">
        <div v-for="(section, index) in item.sections" :key="index">
          <!-- Заголовок -->
          <button
            @click="toggle(index)"
            class="mb-[16px] mt-[16px] flex w-full items-center justify-between text-left font-medium"
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
            <ul v-if="index === 0" class="space-y-1">
              <li
                v-for="(value, ind) in section.content"
                :key="ind"
                class="mb-3 flex justify-between"
              >
                <span class="text-gray-500">{{ value.title }}</span>
                <span class="w-[100px] text-black">{{ value.val }}</span>
              </li>
            </ul>
            <div class="" v-else>{{ section.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  swiper-container::part(pagination) {
    display: none;
  }
}
</style>
