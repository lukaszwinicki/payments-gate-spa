<template>
  <div :class="[
    'border rounded-lg p-4 cursor-pointer transition-all text-center',
    isSelected
      ? 'border-blue-500 bg-blue-50'
      : 'border-gray-200 hover:border-blue-300'
  ]" @click="$emit('select', method.id)">
    <img :src="method.icon" alt="" class="h-12 mx-auto mb-2" />
    <p class="font-medium">{{ method.name }}</p>
    <p class="text-sm text-gray-500">{{ method.description }}</p>
    <p class="text-xs text-green-600">{{ method.speed }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { PaymentMethod } from '@/enums/PaymentMethod';

defineProps<{
  method: {
    id: PaymentMethod
    name: string
    description: string
    speed: string
    icon: string
  }
  isSelected: boolean
}>()

defineEmits<{
  (e: 'select', methodId: PaymentMethod): void
}>()
</script>
