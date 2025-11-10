<template>
  <div class="space-y-1">
    <label v-if="label" :for="id" class="block text-gray-600 font-medium mb-1">
      {{ label }}
    </label>

    <input :id="id" :type="type" :value="modelValue" :placeholder="placeholder" :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      class="border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full px-3 py-2 text-gray-700" />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  modelValue: [String, Number]
});

defineEmits(['update:modelValue']);
</script>