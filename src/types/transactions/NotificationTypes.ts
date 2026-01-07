export interface Notification {
    id: number,
    transactionUuid: string,
    status: string,
    statusType: string,
    createdAt: string
}

export interface NotificationRow {
    id: number
    transactionUuid: string
    status: { text: string; class: string; }
    statusType: { text: string; class: string; }
    createdAt: string
}

export interface TransactionNotificationsListDto {
    notifications: Notification[]
}