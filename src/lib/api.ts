import type { AxiosError,AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

import { env } from '@/config/env'

// Create axios instance with default configuration
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: env.VITE_API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add auth token if available
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`  
      }

      // Add request timestamp
      config.metadata = { startTime: new Date() }
      
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`)
      return config
    },
    (error) => {
      console.error('❌ Request error:', error)
      return Promise.reject(error)
    }
  )

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      const duration = new Date().getTime() - (response.config.metadata?.startTime?.getTime() || 0)
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`)
      return response
    },
    (error: AxiosError) => {
      const duration = error.config?.metadata?.startTime 
        ? new Date().getTime() - error.config.metadata.startTime.getTime()
        : 0

      console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status} (${duration}ms)`)
      
      // Handle common error scenarios
      if (error.response?.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('auth_token')
        window.location.href = '/login'
      }
      
      if (error.response?.status === 403) {
        // Forbidden - show access denied message
        console.error('Access denied')
      }
      
      return Promise.reject(error)
    }
  )

  return client
}

export const apiClient = createApiClient()

// Utility types for API responses
export interface ApiError {
  message: string
  code?: string
  details?: Record<string, any>
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  timestamp: string
}

// Generic API methods
export const api = {
  get: <T = any>(url: string, params?: Record<string, any>): Promise<T> =>
    apiClient.get(url, { params }).then(response => response.data),
    
  post: <T = any>(url: string, data?: any): Promise<T> =>
    apiClient.post(url, data).then(response => response.data),
    
  put: <T = any>(url: string, data?: any): Promise<T> =>
    apiClient.put(url, data).then(response => response.data),
    
  patch: <T = any>(url: string, data?: any): Promise<T> =>
    apiClient.patch(url, data).then(response => response.data),
    
  delete: <T = any>(url: string): Promise<T> =>
    apiClient.delete(url).then(response => response.data),
    
  upload: <T = any>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> => {
    const formData = new FormData()
    formData.append('file', file)
    
    return apiClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    }).then(response => response.data)
  }
}

declare module 'axios' {
  interface AxiosRequestConfig {
    metadata?: {
      startTime: Date
    }
  }
}
