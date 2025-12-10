import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import TransactionsView from '@/views/payments/TransactionsView.vue'
import PaymentDetailsView from '@/views/PaymentDetailsView.vue'
import PaymentStatusView from '@/views/PaymentStatusView.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'
import CreateTransactionView from '@/views/CreateTransactionView.vue'
import CreatePaymentLinkView from '@/views/CreatePaymentLinkView.vue'
import PaymentRefundsView from '@/views/PaymentRefundsView.vue'
import AccessKeysView from '@/views/profile/AccessKeysView.vue'

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
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
    props: true
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'transactions', component: TransactionsView },
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

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const token = localStorage.getItem('token')
  const tokenExpiry = localStorage.getItem('token_expiry')

  if (token) {
    if (!axios.defaults.headers.common['Authorization']) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    if (tokenExpiry && new Date() > new Date(tokenExpiry)) {
      localStorage.removeItem('token')
      localStorage.removeItem('token_expiry')
      delete axios.defaults.headers.common['Authorization']
      return next('/login')
    }

    next()
  } else {
    next('/login')
  }
})

export default router
