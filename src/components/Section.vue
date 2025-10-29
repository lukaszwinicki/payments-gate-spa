<template>
  <div>
    <h1 class="text-2xl font-semibold text-gray-700 mb-6">{{ title }}</h1>
    <div v-if="withWrapper" class="bg-white shadow-md rounded-lg p-6">
      <slot />
    </div>
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  withWrapper?: boolean
}>()
</script>