<template>
  <div
    class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
    <div>
      <p class="text-sm font-medium text-gray-400">{{ label }}</p>
      <h2 class="text-2xl md:text-2xl font-extrabold text-gray-600 mt-1 tracking-tight">
        {{ value }}
      </h2>
    </div>
    <div
      class="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-tr from-blue-200 to-blue-400 shadow">
      <component :is="icon" class="w-6 h-6 text-white" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  label: string;
  value: string | number;
  icon: object;
}>()

</script>