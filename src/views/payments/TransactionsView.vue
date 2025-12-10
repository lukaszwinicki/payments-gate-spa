<template>
  <div class="p-6">
    <Table :headers="['ID', 'UUID', 'Full name', 'Email']" :data="transactions" :perPage="10" />

  </div>
  <div v-if="isLoading"
    class="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-xl">
    <div class="w-10 h-10 border-4 border-blue-500/40 border-t-blue-500 rounded-full animate-spin"></div>
  </div>
</template>

<script setup>
import Table from '@/components/Table.vue';
import { ref, onMounted } from 'vue'
import axios from 'axios';

const isLoading = ref(false)
const transactions = ref([])

onMounted(async () => {
  isLoading.value = true;
  try {
    const responseTransactions = await axios.get('/api/transactions');
    const TableData = responseTransactions.data.data ?? responseTransactions.data
    console.log(responseTransactions)
    transactions.value = TableData.map(t => ({
      ID: t.id,
      UUID: t.transactionUuid,
      'Full name': t.fullname,
      Email: t.email
    }));
  } finally {
    isLoading.value = false;
  }
});
</script>