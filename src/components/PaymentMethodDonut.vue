<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
    <h3 class="text-gray-700 font-semibold mb-4">{{ title }}</h3>
    <div class="h-64">
      <apexchart type="donut" :options="chartOptions" :series="series" height="100%" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PaymentMethodShare } from '@/types/dashboard/DashboardTypes';
import { computed } from 'vue'

const props = defineProps<{
  title: string,
  data: PaymentMethodShare[]
}>()

const series = computed(() =>
  props.data.map(item => Number(item.percentage.toFixed(2)))
)

const chartOptions = computed(() => ({
  chart: {
    type: 'donut'
  },
  labels: props.data.map(item =>
    `${item.paymentMethod.toUpperCase()} (${item.count})`
  ),
  colors: [
    '#6366f1',
    '#22c55e',
    '#f59e0b',
    '#ef4444',
    '#06b6d4'
  ],
  legend: {
    position: 'bottom'
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Transactions',
            formatter: () =>
              props.data.reduce((sum, i) => sum + i.count, 0).toString()
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    y: {
      formatter: (val: number) => `${val}%`
    }
  }
}))
</script>