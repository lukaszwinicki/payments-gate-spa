import { STATUS_STYLES, TransactionStatus } from '@/enums/TransactionStatus';

export const statusClass = (status: string) => {
    return STATUS_STYLES[status as TransactionStatus] ?? 'bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-semibold'
}

export const formatDate = (iso: string) => {
    const date = new Date(iso)
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')
        }.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')
        }:${date.getSeconds().toString().padStart(2, '0')}`
}