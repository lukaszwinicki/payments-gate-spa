export enum TransactionStatus {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
    PENDING = 'PENDING',
    REFUND_SUCCESS = 'REFUND_SUCCESS',
    REFUND_FAIL = 'REFUND_FAIL',
    REFUND_PENDING = 'REFUND_PENDING'
}

export const STATUS_STYLES: Record<TransactionStatus, string> = {
    [TransactionStatus.SUCCESS]: 'bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold',
    [TransactionStatus.REFUND_SUCCESS]: 'bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-semibold',
    [TransactionStatus.PENDING]: 'bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-xs font-semibold',
    [TransactionStatus.REFUND_PENDING]: 'bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-xs font-semibold',
    [TransactionStatus.FAIL]: 'bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-semibold',
    [TransactionStatus.REFUND_FAIL]: 'bg-red-100 text-red-700 px-4 py-2 rounded-full text-xs font-semibold',
  };
  