<template>
  <div class="p-6">
    <Table :headers="['ID', 'UUID', 'Full name', 'Email', 'Status', 'More']" :data="transactions" :perPage="10">
      <template #row-actions="{ row }">
        <td class="px-6 py-2 text-right">
          <button class="text-gray-600 hover:text-blue-500 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </td>
      </template>
    </Table>
  </div>
  <div v-if="isLoading"
    class="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-xl">
    <div class="w-10 h-10 border-4 border-blue-500/40 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
</template>

<script lang="ts" setup>
import Table from '@/components/Table.vue';
import { transactionService } from '@/services/transactions/TransactionService';
import { STATUS_STYLES, TransactionStatus } from '@/enums/TransactionStatus';
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import type { TransactionList } from '@/types/transactions/TransactionTypes';

const isLoading = ref(false)
const transactions = ref([])

onMounted(async () => {
  isLoading.value = true;
  try {
    const transactionsList = await transactionService.getTransctionsList();
    const TableData: TransactionList = transactionsList

    transactions.value = TableData.map(t => ({
      ID: t.id,
      UUID: t.transactionUuid,
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