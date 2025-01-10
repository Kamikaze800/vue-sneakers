import { createWebHistory, createRouter } from 'vue-router'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Product from './pages/Product.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/:id', component: Product, name: 'Product', props: true },
]

// for (let i = 0; i < 15; i++) {
//   routes.push({ path: `/items/:id`, name: `${i}`, component: Product, props: true })
// }

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
