<template>
  <div class="payments">
    <div class="page-header">
      <h1>Payment Processing</h1>
      <p>Manage your payments and transactions</p>
    </div>

    <div class="payment-dashboard">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Transactions</h3>
          <p class="stat-value">{{ stats.totalTransactions }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Amount</h3>
          <p class="stat-value">${{ stats.totalAmount.toLocaleString() }}</p>
        </div>
        <div class="stat-card">
          <h3>Success Rate</h3>
          <p class="stat-value">{{ stats.successRate }}%</p>
        </div>
        <div class="stat-card">
          <h3>Pending</h3>
          <p class="stat-value">{{ stats.pending }}</p>
        </div>
      </div>

      <div class="payment-form">
        <h2>Process New Payment</h2>
        <form @submit.prevent="processPayment" class="form">
          <div class="form-group">
            <label for="amount">Amount</label>
            <input
              id="amount"
              v-model="paymentForm.amount"
              type="number"
              step="0.01"
              min="0"
              required
              class="form-input"
              placeholder="0.00"
            />
          </div>

          <div class="form-group">
            <label for="currency">Currency</label>
            <select
              id="currency"
              v-model="paymentForm.currency"
              required
              class="form-input"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="PLN">PLN</option>
            </select>
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <input
              id="description"
              v-model="paymentForm.description"
              type="text"
              required
              class="form-input"
              placeholder="Payment description"
            />
          </div>

          <div class="form-group">
            <label for="email">Customer Email</label>
            <input
              id="email"
              v-model="paymentForm.email"
              type="email"
              required
              class="form-input"
              placeholder="customer@example.com"
            />
          </div>

          <button
            type="submit"
            :disabled="isProcessing"
            class="btn btn-primary"
          >
            {{ isProcessing ? 'Processing...' : 'Process Payment' }}
          </button>
        </form>
      </div>

      <div class="recent-transactions">
        <h2>Recent Transactions</h2>
        <div class="transaction-list">
          <div
            v-for="transaction in recentTransactions"
            :key="transaction.id"
            class="transaction-item"
          >
            <div class="transaction-info">
              <span class="transaction-id">#{{ transaction.id }}</span>
              <span class="transaction-description">{{ transaction.description }}</span>
            </div>
            <div class="transaction-details">
              <span class="transaction-amount">${{ transaction.amount }}</span>
              <span :class="`transaction-status status-${transaction.status}`">
                {{ transaction.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface PaymentForm {
  amount: number | null
  currency: string
  description: string
  email: string
}

interface Transaction {
  id: string
  amount: number
  description: string
  status: 'completed' | 'pending' | 'failed'
  date: string
}

interface Stats {
  totalTransactions: number
  totalAmount: number
  successRate: number
  pending: number
}

// Reactive data
const isProcessing = ref(false)

const paymentForm = reactive<PaymentForm>({
  amount: null,
  currency: 'USD',
  description: '',
  email: ''
})

const stats = reactive<Stats>({
  totalTransactions: 1247,
  totalAmount: 125430.50,
  successRate: 98.5,
  pending: 12
})

const recentTransactions = ref<Transaction[]>([
  {
    id: 'TXN001',
    amount: 299.99,
    description: 'Product Purchase',
    status: 'completed',
    date: '2024-10-03'
  },
  {
    id: 'TXN002',
    amount: 150.00,
    description: 'Service Payment',
    status: 'pending',
    date: '2024-10-03'
  },
  {
    id: 'TXN003',
    amount: 75.50,
    description: 'Subscription Fee',
    status: 'completed',
    date: '2024-10-02'
  },
  {
    id: 'TXN004',
    amount: 500.00,
    description: 'Consultation',
    status: 'failed',
    date: '2024-10-02'
  }
])

// Methods
const processPayment = async () => {
  isProcessing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add new transaction to the list
    const newTransaction: Transaction = {
      id: `TXN${String(Date.now()).slice(-3)}`,
      amount: paymentForm.amount || 0,
      description: paymentForm.description,
      status: 'completed',
      date: new Date().toISOString().split('T')[0]
    }
    
    recentTransactions.value.unshift(newTransaction)
    
    // Update stats
    stats.totalTransactions++
    stats.totalAmount += paymentForm.amount || 0
    
    // Reset form
    paymentForm.amount = null
    paymentForm.description = ''
    paymentForm.email = ''
    
    alert('Payment processed successfully!')
  } catch (error) {
    alert('Payment failed. Please try again.')
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
.payments {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.payment-dashboard {
  display: grid;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
}

.payment-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.payment-form h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  grid-column: 1 / -1;
  justify-self: start;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.recent-transactions {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recent-transactions h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ecf0f1;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.transaction-item:hover {
  background-color: #f8f9fa;
}

.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.transaction-id {
  font-weight: 600;
  color: #2c3e50;
}

.transaction-description {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.transaction-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.transaction-amount {
  font-weight: 600;
  color: #2c3e50;
}

.transaction-status {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-completed {
  background-color: #d4edda;
  color: #155724;
}

.status-pending {
  background-color: #fff3cd;
  color: #856404;
}

.status-failed {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
