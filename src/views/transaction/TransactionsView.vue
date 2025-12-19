<template>
  <div class="bg-white p-6 rounded-lg shadow-md space-y-5">
    <PageHeader title="List Transaction" :icon="DocumentTextIcon" />
    <Table :headers="['ID', 'Transaction uuid', 'Full name', 'Email', 'Status', 'More']" :data="transactions"
      :perPage="10">
      <template #row-actions="{ row }">
        <td class="px-6 py-2 text-right">
          <button @click="openDetails(row['Transaction uuid'])" class="text-gray-600 hover:text-blue-500 transition inline-flex"
            aria-label="Show transaction details">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </td>
      </template>
    </Table>

    <div v-if="isLoading"
      class="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-xl">
      <div class="w-10 h-10 border-4 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
    </div>

    <transition name="fade">
      <div v-if="$route.name === 'transaction-details'" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="closeModal" />

        <div class="relative z-10 w-full max-w-2xl">
          <router-view />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
import { transactionService } from '@/services/transactions/TransactionService';
import { STATUS_STYLES, TransactionStatus } from '@/enums/TransactionStatus';
import { useRouter } from 'vue-router'
import { useTransactionsStore } from '@/stores/Transactions';
import type { TransactionList, TransactionRow } from '@/types/transactions/TransactionTypes';
import Table from '@/components/Table.vue';
import PageHeader from '@/components/PageHeader.vue';

const router = useRouter()
const isLoading = ref(false)
const transactionsRaw = ref<TransactionList>([] as unknown as TransactionList)
const transactions = ref<TransactionRow[]>([])
const store = useTransactionsStore()

onMounted(() => {
  if (Array.isArray(store.transactionsRaw) && !store.transactionsRaw.length) {
    store.fetchTransactions();
  }
})

const openDetails = (uuid: string) => {
  const transaction = Array.isArray(transactionsRaw.value)
    ? transactionsRaw.value.find((t: any) => t.transactionUuid === uuid)
    : null;

  if (!transaction) return

  router.push({
    name: 'transaction-details',
    params: { transactionUuid: uuid },
  })
}

const closeModal = () => {
  router.back()
}

onMounted(async () => {
  isLoading.value = true;
  try {
    const transactionsList = await transactionService.getTransctionsList();
    transactionsRaw.value = transactionsList
    transactions.value = transactionsList.map(t => ({
      ID: t.id,
      'Transaction uuid': t.transactionUuid,
      'Full name': t.fullname,
      Email: t.email,
      Status: {
        text: t.status,
        class: STATUS_STYLES[t.status as TransactionStatus] ?? 'bg-gray-100 text-gray-600'
      }
    }));
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