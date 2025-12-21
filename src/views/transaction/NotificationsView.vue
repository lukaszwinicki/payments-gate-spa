<template>
    <div class="bg-white p-6 rounded-lg shadow-md space-y-5">
        <PageHeader title="List notification" :icon="BellIcon" />
        <Table :headers="['ID', 'Uuid transaction', 'Status notification', 'Status transaction', 'Data created']"
            :data="notifications" :perPage="10" :searchable="true" :sortable="true" :paginated="true" />
        <div v-if="isLoading"
            class="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-xl">
            <div class="w-10 h-10 border-4 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import Table from '@/components/Table.vue';
import PageHeader from '@/components/PageHeader.vue';
import { BellIcon } from '@heroicons/vue/24/outline'
import { transactionService } from '@/services/transactions/TransactionService';
import { statusClass, formatDate } from '@/utils/formatters'
import type { NotificationRow } from '@/types/transactions/NotificationTypes';

const isLoading = ref(false)
const notifications = ref<NotificationRow[]>([])

onMounted(async () => {
    isLoading.value = true;
    try {
        const notificationsList = await transactionService.getNotificationList();
        notifications.value = notificationsList.map(n => ({
            ID: n.id,
            'Uuid transaction': n.transactionUuid,
            'Status notification': {
                text: n.status,
                class: statusClass(n.status)
            },
            'Status transaction': {
                text: n.statusType,
                class: statusClass(n.statusType)
            },
            'Data created': formatDate(n.createdAt)
        }));
    }
    catch (err: any) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.response?.error ?? err.message ?? 'Unknown error',
            confirmButtonColor: '#ef4444',
        })
    } finally {
        isLoading.value = false;
    }
});

</script>