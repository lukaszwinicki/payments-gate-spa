<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" class="block text-gray-600 font-medium mb-1">
      {{ label }}
    </label>
    <select :id="id" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
      class="border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700"
      :required="required">
      <option disabled value="">Select a payment method</option>
      <option v-for="method in options" :key="method" :value="method">
        {{ method }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  id: String,
  options: {
    type: Array,
    required: true
  },
  modelValue: String,
  required: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);
</script>