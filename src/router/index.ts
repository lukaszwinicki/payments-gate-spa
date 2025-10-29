import { createRouter, createWebHistory } from 'vue-router'
import PaymentDetails from '@/views/PaymentDetailsView.vue'

const routes = [
  {
    path: '/payment/:payment_link_id',
    name: 'PaymentLink',
    component: PaymentDetails
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
