import { defineStore } from 'pinia'
import { transactionService } from '@/services/transactions/TransactionService'
import type { Transaction } from '@/types/transactions/TransactionTypes'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    isLoading: false,
    transactionsRaw: [] as Transaction[],
  }),

  actions: {
    async fetchTransactions() {
      this.isLoading = true
      try {
        const dto = await transactionService.getTransactionList()
        this.transactionsRaw = dto.transactions
      } finally {
        this.isLoading = false
      }
    },

    getByUuid(uuid: string): Transaction | undefined {
      return this.transactionsRaw.find(t => t.transactionUuid === uuid)
    },
  },
})
