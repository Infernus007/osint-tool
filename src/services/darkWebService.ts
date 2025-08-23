import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/config/constants'
import type { DarkWebSearch, ApiResponse } from '@/lib/schemas'

export interface DarkWebResult {
  id: string
  source: string
  url: string
  title: string
  content: string
  timestamp: string
  relevanceScore: number
  keywords: string[]
  category: 'forum' | 'marketplace' | 'paste' | 'leak' | 'other'
}

export interface DarkWebSearchResponse {
  searchId: string
  query: string
  results: DarkWebResult[]
  totalResults: number
  searchTime: number
  sourcesSearched: string[]
  status: 'completed' | 'running' | 'failed'
}

export interface DarkWebMonitor {
  id: string
  keywords: string[]
  identifier?: string
  isActive: boolean
  createdAt: string
  lastRun: string
  matchCount: number
}

export const darkWebService = {
  async searchDarkWeb(data: DarkWebSearch): Promise<ApiResponse<DarkWebSearchResponse>> {
    return api.post(API_ENDPOINTS.DARKWEB.SEARCH, data)
  },

  async getSearchResults(searchId: string): Promise<ApiResponse<DarkWebSearchResponse>> {
    return api.get(`${API_ENDPOINTS.DARKWEB.SEARCH}/${searchId}`)
  },

  async createMonitor(keywords: string[], identifier?: string): Promise<ApiResponse<DarkWebMonitor>> {
    return api.post(API_ENDPOINTS.DARKWEB.MONITOR, { keywords, identifier })
  },

  async getMonitors(): Promise<ApiResponse<DarkWebMonitor[]>> {
    return api.get(API_ENDPOINTS.DARKWEB.MONITOR)
  },

  async updateMonitor(monitorId: string, data: Partial<DarkWebMonitor>): Promise<ApiResponse<DarkWebMonitor>> {
    return api.patch(`${API_ENDPOINTS.DARKWEB.MONITOR}/${monitorId}`, data)
  },

  async deleteMonitor(monitorId: string): Promise<ApiResponse<void>> {
    return api.delete(`${API_ENDPOINTS.DARKWEB.MONITOR}/${monitorId}`)
  },

  async getMonitorResults(monitorId: string): Promise<ApiResponse<DarkWebResult[]>> {
    return api.get(`${API_ENDPOINTS.DARKWEB.MONITOR}/${monitorId}/results`)
  },

  async manageKeywords(action: 'add' | 'remove', keywords: string[]): Promise<ApiResponse<string[]>> {
    return api.post(API_ENDPOINTS.DARKWEB.KEYWORDS, { action, keywords })
  },

  async getKeywords(): Promise<ApiResponse<string[]>> {
    return api.get(API_ENDPOINTS.DARKWEB.KEYWORDS)
  }
}
