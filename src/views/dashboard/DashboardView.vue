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
      <Table :headers="['Transaction uuid', 'Amount', 'Payment Method', 'Status', 'Date']" :data="transactions"
        :perPage="10" :searchable="false" :sortable="false" :paginated="false">
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { BanknotesIcon, CurrencyDollarIcon, CurrencyEuroIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import Swal from 'sweetalert2'
import KpiCard from '@/components/KpiCard.vue'
import PaymentMethodDonut from '@/components/PaymentMethodDonut.vue'
import Table from '@/components/Table.vue'
import type { PaymentMethodShare, RecentTransactionResponse, TransactionBalancesResponse, TransactionRejectedResponse, TransactionsTotalResponse } from '@/types/dashboard/DashboardTypes'
import { dashboardService } from '@/services/dashboard/DashboardService'
import { statusClass, formatDate } from '@/utils/formatters'

const isLoading = ref(false)
const transactions = ref<RecentTransactionResponse>([])
const paymentMethods = ref<PaymentMethodShare[]>([])
const transactionsTotal = ref<TransactionsTotalResponse | null>(null)
const transactionsBalances = ref<TransactionBalancesResponse | null>(null)
const transactionsRejected = ref<TransactionRejectedResponse | null>(null)

onMounted(async () => {
  try {
    const [
      recentTransactions,
      paymentMethodShare,
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
    transactions.value = recentTransactions.map(t => ({
      'Transaction uuid': t.transactionUuid,
      Amount: t.amount + ' ' + t.currency,
      'Payment Method': t.paymentMethod,
      Status: {
        text: t.status,
        class: statusClass(t.status)
      },
      Date: formatDate(t.createdAt)
    }));

    paymentMethods.value = paymentMethodShare
    transactionsTotal.value = total
    transactionsBalances.value = balances
    transactionsRejected.value = rejeceted

  }
  catch (err: any) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.error ?? err.message ?? 'Unknown error',
      confirmButtonColor: '#ef4444',
    })
  } finally {
    isLoading.value = false;
  }
});

</script>