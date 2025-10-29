<template>
    <div class="flex justify-between items-center border-b border-gray-100 p-3">
        <label class="font-medium text-gray-400 w-1/3">{{ label }}:</label>
        <slot />
    </div>
</template>

<script lang="ts" setup>
defineProps<{ label: string }>()
</script>