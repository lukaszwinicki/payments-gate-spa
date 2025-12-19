export interface Notification {
    id: number,
    transactionUuid: string,
    status: string,
    statusType: string,
    createdAt: string
}

export interface NotificationRow {
    ID: number
    'Transaction uuid': string
    'Status notification': { text: string, class: string }
    'Status transaction': { text: string, class: string }
    'Data created': string
}

export type NotificationList = Notification[]
