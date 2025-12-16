<template>
  <div class="relative w-full">
    <label class="block text-sm font-medium text-gray-600 mb-2">
      {{ label }}
    </label>

    <input type="text" :value="value" readonly @click="copyToClipboard" class="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-pointer
             focus:outline-none focus:ring-2 focus:ring-blue-400" />

    <span v-if="copied" class="absolute right-2 -bottom-2 text-green-600 text-sm font-medium">
      Copied!
    </span>

    <p v-if="hint" class="mt-3 text-gray-500 text-sm">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label: string
  value: string
  copyValue?: string
  hint?: string
}

const props = defineProps<Props>()
const copied = ref(false)

function copyToClipboard() {
  const textToCopy = props.copyValue ?? props.value
  if (!textToCopy) return

  navigator.clipboard.writeText(textToCopy).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  })
}
</script>
