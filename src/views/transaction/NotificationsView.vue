<template>
    <div class="bg-white p-6 rounded-lg shadow-md space-y-5">
        <PageHeader title="List notification" :icon="BellIcon" />
        <Table :headers="headers" :data="notifications" :perPage="10" :searchable="true" :sortable="true"
            :paginated="true" />
        <div v-if="isLoading"
            class="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-xl">
            <div class="w-10 h-10 border-4 border-blue-500/40 border-t-blue-500 rounded-full animate-spin" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Table from '@/components/Table.vue';
import PageHeader from '@/components/PageHeader.vue';
import { BellIcon } from '@heroicons/vue/24/outline'
import { transactionService } from '@/services/transactions/TransactionService';
import { statusClass, formatDate } from '@/utils/formatters'
import type { Notification, NotificationRow, TransactionNotificationsListDto } from '@/types/transactions/NotificationTypes';
import { useApiError } from '@/composables/useApiError'

const isLoading = ref(false)
const notifications = ref<NotificationRow[]>([])

const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Transaction UUID', key: 'transactionUuid' },
    { label: 'Status', key: 'status', isStatus: true },
    { label: 'Status Type', key: 'statusType', isStatus: true },
    { label: 'Created At', key: 'createdAt' }
]

const { handleApiError } = useApiError()

onMounted(async () => {
    isLoading.value = true;
    try {
        const notificationsDto: TransactionNotificationsListDto = await transactionService.getNotificationList()
        notifications.value = notificationsDto.notifications.map((n: Notification) => ({
            id: n.id,
            transactionUuid: n.transactionUuid,
            status: {
                text: n.status,
                class: statusClass(n.status)
            },
            statusType: {
                text: n.statusType,
                class: statusClass(n.statusType)
            },
            createdAt: formatDate(n.createdAt)
        }));
    }
    catch (error) {
        await handleApiError(error, 'Error', 'error')
    } finally {
        isLoading.value = false;
    }
});

</script>