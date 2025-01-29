<script setup>
import { ref, onMounted } from 'vue'
import { inject } from 'vue'
const emit = defineEmits(['openDrawer', 'closeDrawer'])
defineProps({
  totalPrice: Number,
  vatPrice: Number,
})

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  console.log(menuOpen.value)
}

const { darkTheme, toggleTheme } = inject('darkTheme')

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

      <button @click="toggleTheme">
        <svg
          v-show="darkTheme"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <!-- Луна -->
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"></path>
        </svg>

        <svg
          v-show="!darkTheme"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>

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
    <img src="/krest.svg" class="absolute right-0" @click="toggleMenu" alt="" />
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
