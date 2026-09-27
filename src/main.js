import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import routes from './router'
import site from './config/site.js'
import './styles/main.css'

document.title = site.title

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } },
})

createApp(App).use(router).mount('#app')
