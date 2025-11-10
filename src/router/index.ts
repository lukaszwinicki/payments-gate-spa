import { createRouter, createWebHistory } from 'vue-router'
import PaymentDetailsView from '@/views/PaymentDetailsView.vue'
import PaymentStatusView from '@/views/PaymentStatusView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginView from '@/views/LoginView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CreateTransactionView from '@/views/admin/CreateTransactionView.vue'
import CreatePaymentLinkView from '@/views/admin/CreatePaymentLinkView.vue'
import PaymentRefundsView from '@/views/admin/PaymentRefundsView.vue'
import AccessKeysView from '@/views/admin/AccessKeysView.vue'

const routes = [
  {
    path: '/payment/:payment_link_id',
    component: PaymentDetailsView
  },
  {
    path: '/payment-status',
    component: PaymentStatusView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/forgot-password',
    component: ForgotPasswordView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'create-transaction', component: CreateTransactionView },
      { path: 'create-payment-link', component: CreatePaymentLinkView },
      { path: 'payment-refunds', component: PaymentRefundsView },
      { path: 'access-keys', component: AccessKeysView },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
