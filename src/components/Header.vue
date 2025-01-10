<script setup>
import { ref, onMounted } from 'vue'
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  console.log(menuOpen.value)
}
// onMounted(() => {
//   if (hamburger.value) {
//     hamburger.value.addEventListener('click', () => {
//       navLinks.value.classList.toggle('hidden')
//       bg.value.classList.toggle('hidden')
//     })
//   }
// })
</script>

<template>
  <header class="max-h-81 border-b border-slate-300 p-5 sm:flex sm:justify-between">
    <div class="flex justify-between">
      <RouterLink to="/">
        <div class="flex items-center">
          <img src="/logo.png" alt="Logo" class="max-w-10 aspect-ratio: auto;" />
          <h2 class="inline text-xl font-bold leading-4 ml-3">
            VUE SNEAKERS <br />
            <span class="text-slate-400 text-sm font-normal">Магазин лучших кроссовок</span>
          </h2>
        </div>
      </RouterLink>
      <button ref="hamburger" class="fixed top-5 right-5 sm:hidden z-20" @click="toggleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-10 sm:hidden"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <ul class="hidden sm:flex sm:items-center sm:gap-5">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-gray-400 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="" />
        <b>{{ totalPrice }} руб</b>
      </li>
      <RouterLink to="/favorites">
        <li class="flex items-center gap-3 text-gray-400 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="" />
          <span>Закладки</span>
        </li>
      </RouterLink>
      <li class="flex items-center gap-3 text-gray-400 hover:text-black cursor-pointer">
        <img src="/profile.svg" alt="" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>

  <div
    ref="bg"
    class="fixed top-0 left-0 h-full w-full bg-black z-20 opacity-70"
    v-if="menuOpen"
    @click="toggleMenu"
  ></div>
  <div class="bg-white w-2/4 h-full fixed right-0 top-0 z-20" v-if="menuOpen">
    <ul ref="navLinks" class="mr-5 mt-14">
      <li
        @click="() => emit('openDrawer')"
        class="flex text-2xl justify-end items-center gap-3 text-black cursor-pointer p-2 border-b border-slate-300"
      >
        <img src="/cart.svg" alt="" />
        <b> Корзина</b>
      </li>
      <RouterLink to="/favorites">
        <li
          class="flex text-2xl justify-end items-center gap-3 text-black cursor-pointer p-2 border-b border-slate-300"
        >
          <img src="/heart.svg" alt="" />
          <span>Закладки</span>
        </li>
      </RouterLink>
      <li
        class="flex text-2xl justify-end items-center gap-3 text-black cursor-pointer p-2 border-b border-slate-300"
      >
        <img src="/profile.svg" alt="" />
        <span>Профиль</span>
      </li>
    </ul>
  </div>
</template>
