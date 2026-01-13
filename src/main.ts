import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'
import VueApexCharts from 'vue3-apexcharts'
import { setupInterceptors } from './lib/http/interceptors'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueApexCharts)

setupInterceptors(pinia, router)

app.mount('#app')
