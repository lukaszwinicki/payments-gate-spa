import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
