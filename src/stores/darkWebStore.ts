import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { darkWebService } from '@/services/darkWebService'
import type { DarkWebSearch, ApiResponse } from '@/lib/schemas'
import type { DarkWebSearchResponse, DarkWebMonitor } from '@/services/darkWebService'

export interface DarkWebState {
  // Search state
  searchResults: ApiResponse<DarkWebSearchResponse> | null
  isSearching: boolean
  searchError: string | null

  // Monitor state
  monitorResults: ApiResponse<DarkWebMonitor> | null
  isSettingMonitor: boolean
  monitorError: string | null

  // Keyword search state
  keywordResults: ApiResponse<any> | null
  isSearchingKeywords: boolean
  keywordError: string | null

  // Search History
  searchHistory: DarkWebSearchResponse[]

  // Actions
  searchDarkWeb: (request: DarkWebSearch) => Promise<void>
  setupMonitor: (keywords: string[], identifier?: string) => Promise<void>
  searchKeywords: (request: { keywords: string[], sources: string[], timeRange: string }) => Promise<void>
  clearSearchResults: () => void
  clearMonitorResults: () => void
  clearKeywordResults: () => void
  clearErrors: () => void
}

export const useDarkWebStore = create<DarkWebState>()(
  devtools((set, get) => ({
    // Initial state
    searchResults: null,
    isSearching: false,
    searchError: null,
    monitorResults: null,
    isSettingMonitor: false,
    monitorError: null,
    keywordResults: null,
    isSearchingKeywords: false,
    keywordError: null,
    searchHistory: [],

    // Actions
    searchDarkWeb: async (request: DarkWebSearch) => {
      set({ isSearching: true, searchError: null })

      try {
        const response = await darkWebService.searchDarkWeb(request)
        const currentHistory = get().searchHistory
        const newHistory = response.data 
          ? [response.data, ...currentHistory].slice(0, 10) 
          : currentHistory

        set({
          searchResults: response,
          isSearching: false,
          searchHistory: newHistory
        })
      } catch (error) {
        set({
          isSearching: false,
          searchError: error instanceof Error ? error.message : 'Dark web search failed'
        })
      }
    },

    setupMonitor: async (keywords: string[], identifier?: string) => {
      set({ isSettingMonitor: true, monitorError: null })

      try {
        const response = await darkWebService.createMonitor(keywords, identifier)
        set({
          monitorResults: response,
          isSettingMonitor: false
        })
      } catch (error) {
        set({
          isSettingMonitor: false,
          monitorError: error instanceof Error ? error.message : 'Monitor setup failed'
        })
      }
    },

    searchKeywords: async (request: { keywords: string[], sources: string[], timeRange: string }) => {
      set({ isSearchingKeywords: true, keywordError: null })

      try {
        // For now, use the general search endpoint with keywords
        const searchRequest: DarkWebSearch = {
          keywords: request.keywords,
          timeRange: request.timeRange as any
        }
        const response = await darkWebService.searchDarkWeb(searchRequest)
        set({
          keywordResults: response as any,
          isSearchingKeywords: false
        })
      } catch (error) {
        set({
          isSearchingKeywords: false,
          keywordError: error instanceof Error ? error.message : 'Keyword search failed'
        })
      }
    },

    clearSearchResults: () => set({ searchResults: null, searchError: null }),
    clearMonitorResults: () => set({ monitorResults: null, monitorError: null }),
    clearKeywordResults: () => set({ keywordResults: null, keywordError: null }),
    clearErrors: () => set({ 
      searchError: null, 
      monitorError: null, 
      keywordError: null 
    }),
  }), { name: 'darkweb-store' })
)
