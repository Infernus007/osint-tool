import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/config/constants'
import type { NewsAnalysis, NewsEntity, ApiResponse } from '@/lib/schemas'

export interface NewsMonitorOptions {
  sources: string[]
  keywords: string[]
  interval: number // in minutes
  language: 'en' | 'hi' | 'other'
}

export interface NewsAnalysisResult {
  id: string
  content: string
  entities: NewsEntity[]
  sentiment: 'positive' | 'negative' | 'neutral'
  keywords: string[]
  source: string
  publishedAt: string
  analyzedAt: string
}

export const newsService = {
  async analyzeNews(data: NewsAnalysis): Promise<ApiResponse<NewsAnalysisResult>> {
    return api.post(API_ENDPOINTS.NEWS.ANALYZE, data)
  },

  async extractEntities(content: string): Promise<ApiResponse<NewsEntity[]>> {
    return api.post(API_ENDPOINTS.NEWS.ENTITIES, { content })
  },

  async startMonitoring(options: NewsMonitorOptions): Promise<ApiResponse<{ monitorId: string }>> {
    return api.post(API_ENDPOINTS.NEWS.MONITOR, options)
  },

  async getMonitoringResults(monitorId: string): Promise<ApiResponse<NewsAnalysisResult[]>> {
    return api.get(`${API_ENDPOINTS.NEWS.MONITOR}/${monitorId}/results`)
  },

  async stopMonitoring(monitorId: string): Promise<ApiResponse<void>> {
    return api.delete(`${API_ENDPOINTS.NEWS.MONITOR}/${monitorId}`)
  }
}
