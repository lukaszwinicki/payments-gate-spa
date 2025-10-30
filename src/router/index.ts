import { createRouter, createWebHistory } from 'vue-router'
import PaymentDetailsView from '@/views/PaymentDetailsView.vue'
import PaymentStatusView from '@/views/PaymentStatusView.vue'

const routes = [
  {
    path: '/payment/:payment_link_id',
    name: 'PaymentLink',
    component: PaymentDetailsView
  },
  {
    path: '/payment-status',
    name: 'PaymentStatus',
    component: PaymentStatusView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
