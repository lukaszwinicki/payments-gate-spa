<template>
  <div class="p-6">
    <Table :headers="['ID', 'UUID', 'Full name', 'Email']" :data="transactions" :perPage="10" />
  </div>
</template>

<script setup>
import Table from '@/components/Table.vue';

</script>