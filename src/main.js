// CSS
import "./assets/main.css"

// Core
import { createApp } from "vue"
import App from "./App.vue"

// Plugins
import { autoAnimatePlugin } from "@formkit/auto-animate/vue"
import router from "./router"

// Swiper Web Components
import { register } from "swiper/element/bundle"
register()

// Init app
const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(router)
app.mount("#app")
