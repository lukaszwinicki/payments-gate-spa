import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '@/views/auth/ResetPasswordView.vue'
import TransactionsView from '@/views/transaction/TransactionsView.vue'
import CreateTransactionView from '@/views/transaction/CreateTransactionView.vue'
import TransactionStatusView from '@/views/transaction/TransactionStatusView.vue'
import RefundTransactionView from '@/views/transaction/RefundTransactionView.vue'
import PaymentLinkDetailsView from '@/views/payment-link/PaymentLinkDetailsView.vue'
import CreatePaymentLinkView from '@/views/payment-link/CreatePaymentLinkView.vue'
import ApiCredentialsView from '@/views/profile/ApiCredentialsView.vue'

const routes = [
  {
    path: '/payment/:payment_link_id',
    component: PaymentLinkDetailsView
  },
  {
    path: '/payment-status',
    component: TransactionStatusView
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
      { path: 'payment-refunds', component: RefundTransactionView },
      { path: 'api-credentials', component: ApiCredentialsView },
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
