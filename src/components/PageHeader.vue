<template>
    <div class="flex items-center gap-3 mb-6">
        <div
            class="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-tr from-blue-200 to-blue-400 shadow">
            <component :is="icon" class="w-6 h-6 text-white" />
        </div>
        <h2 class="text-xl font-semibold text-gray-800">
            {{ title }}
        </h2>
    </div>
</template>

<script lang="ts" setup>
import { type Component } from 'vue'
defineProps<{
    title: string
    icon: Component
}>()
</script>