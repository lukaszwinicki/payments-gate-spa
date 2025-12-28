export interface BackendErrorData {
  error?: string
  errors?: Record<string, string[]>
  [key: string]: any
}

export interface ApiError<T = BackendErrorData> {
  status: number
  message?: string
  errors?: Record<string, string[]>
  data?: T
}