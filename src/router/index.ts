import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
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
import TransactionDetailsView from '@/views/transaction/TransactionDetailsView.vue'
import NotificationsView from '@/views/transaction/NotificationsView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'

const routes = [
  {
    path: '/payment/:payment_link_id',
    name: 'payment-link-details',
    component: PaymentLinkDetailsView
  },
  {
    path: '/payment-status',
    name: 'payment-status',
    component: TransactionStatusView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
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
    name: 'register',
    component: RegisterView
  },
  {
    path: '/merchant',
    component: AdminLayout,
    redirect: '/merchant/dashboard',
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', name: 'dashboard', component: DashboardView },
      { path: 'create-transaction', name: 'create-transaction', component: CreateTransactionView },
      { path: 'create-payment-link', name: 'create-payment-link', component: CreatePaymentLinkView },
      { path: 'payment-refunds', name: 'payment-refunds', component: RefundTransactionView },
      {
        path: 'transactions',
        name: 'transactions',
        component: TransactionsView,
        children: [
          {
            path: ':transactionUuid',
            name: 'transaction-details',
            component: TransactionDetailsView,
            props: true
          }
        ]
      },
      { path: 'notifications', name: 'notifications', component: NotificationsView },
      { path: 'api-credentials', name: 'api-credentials', component: ApiCredentialsView },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


router.beforeEach(async (to, from, next) => {

  const auth = useAuthStore()

  if (!to.meta.requiresAuth) return next()

  if (!auth.isAuthenticated) {
    return next({ name: 'login' })
  }

  const tokenExpiry = auth.expiresAt

  if (tokenExpiry && new Date() > new Date(tokenExpiry)) {
    auth.logout()
    return next({ name: 'login' })
  }
  next()

})

export default router
