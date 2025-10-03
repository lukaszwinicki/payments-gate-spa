import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import views
import Home from './views/Home.vue'
import Payments from './views/Payments.vue'

// Define routes
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/payments', name: 'Payments', component: Payments },
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.mount('#app')
