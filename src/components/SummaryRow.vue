<template>
    <div class="flex justify-between border-b border-gray-100 p-3">
        <span class="font-medium text-gray-400">{{ label }}:</span>
        <span :class="['font-bold', valueColor ?? 'text-gray-500']">{{ value ?? '-' }}</span>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ label: string; value?: string; valueColor?: string }>()
</script>