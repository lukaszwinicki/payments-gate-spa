<template>
  <div class="space-y-8">
    <div class="grid grid-cols-4 gap-6">
      <div class="col-span-4 grid gap-6">

        <div class="grid grid-cols-5 gap-6">
          <KpiCard label="Total transactions" :value="transactionsTotal?.total ?? 0" :icon="BanknotesIcon" />
          <KpiCard label="Rejected transactions" :value="transactionsRejected?.total ?? 0" :icon="XCircleIcon" />
          <KpiCard label="Balance PLN" :value="transactionsBalances?.pln ?? 0" :icon="BanknotesIcon" />
          <KpiCard label="Balance EUR" :value="transactionsBalances?.eur ?? 0" :icon="CurrencyEuroIcon" />
          <KpiCard label="Balance USD" :value="transactionsBalances?.usd ?? 0" :icon="CurrencyDollarIcon" />
        </div>

        <div class="grid grid-cols-2 gap-6">
          <PaymentMethodDonut title="Payment Method Distribution" :data="paymentMethods" />
        </div>

      </div>
    </div>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h3 class="text-gray-700 font-semibold mb-4">Latest transactions</h3>
      <Table :headers="headers" :data="transactions" :perPage="10" :searchable="false" :sortable="false"
        :paginated="false">
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { BanknotesIcon, CurrencyDollarIcon, CurrencyEuroIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import KpiCard from '@/components/KpiCard.vue'
import PaymentMethodDonut from '@/components/PaymentMethodDonut.vue'
import Table from '@/components/Table.vue'
import { dashboardService } from '@/services/dashboard/DashboardService'
import { statusClass, formatDate } from '@/utils/formatters'
import { useApiError } from '@/composables/useApiError'
import type {
  PaymentMethodShare,
  RecentTransaction,
  RecentTransactionDisplay,
  TransactionBalancesResponse,
  TransactionRejectedResponse,
  TransactionsTotalResponse
} from '@/types/dashboard/DashboardTypes'

const isLoading = ref(false)
const transactions = ref<RecentTransactionDisplay[]>([])
const paymentMethods = ref<PaymentMethodShare[]>([])
const transactionsTotal = ref<TransactionsTotalResponse | null>(null)
const transactionsBalances = ref<TransactionBalancesResponse | null>(null)
const transactionsRejected = ref<TransactionRejectedResponse | null>(null)

const headers = [
  { label: 'Transaction UUID', key: 'transactionUuid' },
  { label: 'Amount', key: 'amount' },
  { label: 'Payment Method', key: 'paymentMethod' },
  { label: 'Status', key: 'status', isStatus: true },
  { label: 'Date', key: 'date' }
]

const { handleApiError } = useApiError()

onMounted(async () => {
  isLoading.value = true
  try {
    const [
      recentTransactionsDto,
      paymentMethodShareDto,
      total,
      balances,
      rejeceted,
    ] = await Promise.all([
      dashboardService.getRecentTransaction(),
      dashboardService.getPaymentMethodShare(),
      dashboardService.getTransactionTotal(),
      dashboardService.getTransactionBalances(),
      dashboardService.getTransactionRejected(),
    ])

    transactions.value = recentTransactionsDto.transactions.map((t) => ({
      transactionUuid: t.transactionUuid,
      amount: `${t.amount} ${t.currency}`,
      paymentMethod: t.paymentMethod,
      status: {
        text: t.status,
        class: statusClass(t.status),
      },
      date: formatDate(t.createdAt),
    }))

    paymentMethods.value = paymentMethodShareDto.shares
    transactionsTotal.value = total
    transactionsBalances.value = balances
    transactionsRejected.value = rejeceted

  }
  catch (error) {
    await handleApiError(error, 'Error')
  } finally {
    isLoading.value = false;
  }
});

</script>