import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'
import axios from 'axios';

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

app.use(createPinia())
app.use(router)

app.mount('#app')
