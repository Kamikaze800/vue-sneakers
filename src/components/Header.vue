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
          <img src="/logo.png" alt="Logo" class="aspect-ratio: auto; max-w-10" />
          <h2 class="ml-3 inline text-xl font-bold leading-4">
            VUE SNEAKERS <br />
            <span class="text-sm font-normal text-slate-400">Магазин лучших кроссовок</span>
          </h2>
        </div>
      </RouterLink>

      <button ref="hamburger" class="fixed right-5 top-5 z-20 sm:hidden" @click="toggleMenu">
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
      <li class="h-6">
        <button
          @click="toggleTheme"
          class="fill-gray-400 text-gray-400 hover:fill-black hover:text-black dark:hover:fill-white dark:hover:text-white"
        >
          <svg
            width="24"
            v-show="darkTheme"
            xmlns="http://www.w3.org/2000/svg"
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
            width="24"
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
      </li>
      <li @click="() => emit('openDrawer')" class="menu_item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z"
          />
        </svg>
        <b>{{ totalPrice }} руб</b>
      </li>
      <RouterLink to="/favorites">
        <li class="menu_item">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M12 9.229c.234-1.12 1.547-6.229 5.382-6.229 2.22 0 4.618 1.551 4.618 5.003 0 3.907-3.627 8.47-10 12.629-6.373-4.159-10-8.722-10-12.629 0-3.484 2.369-5.005 4.577-5.005 3.923 0 5.145 5.126 5.423 6.231zm-12-1.226c0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-7.962-9.648-9.028-12-3.737-2.338-5.262-12-4.27-12 3.737z"
            />
          </svg>
          <span>Закладки</span>
        </li>
      </RouterLink>

      <RouterLink to="/login">
        <li class="menu_item">
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"
            />
          </svg>
          <span>Профиль</span>
        </li>
      </RouterLink>
    </ul>
  </header>

  <div
    ref="bg"
    class="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-70"
    v-if="menuOpen"
    @click="toggleMenu"
  ></div>
  <div class="fixed right-0 top-0 z-20 h-full w-2/4 bg-white" v-if="menuOpen">
    <img src="/krest.svg" class="absolute right-0" @click="toggleMenu" alt="" />
    <ul ref="navLinks" class="mr-5 mt-14">
      <li
        @click="() => emit('openDrawer')"
        class="flex cursor-pointer items-center justify-end gap-3 border-b border-slate-300 p-2 text-2xl text-black"
      >
        <img src="/cart.svg" alt="" />
        <b> Корзина</b>
      </li>
      <RouterLink to="/favorites">
        <li
          class="flex cursor-pointer items-center justify-end gap-3 border-b border-slate-300 p-2 text-2xl text-black"
        >
          <img src="/heart.svg" alt="" />
          <span>Закладки</span>
        </li>
      </RouterLink>
      <li
        class="flex cursor-pointer items-center justify-end gap-3 border-b border-slate-300 p-2 text-2xl text-black"
      >
        <img src="/profile.svg" alt="" />
        <span>Профиль</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu_item {
  @apply flex cursor-pointer items-center gap-2 fill-gray-400 text-gray-400 hover:fill-black hover:text-black dark:hover:fill-white dark:hover:text-white;
}
</style>
