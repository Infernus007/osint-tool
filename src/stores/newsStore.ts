import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { newsService } from '@/services/newsService'
import type { NewsAnalysis, NewsEntity, ApiResponse } from '@/lib/schemas'
import type { NewsAnalysisResult, NewsMonitorOptions } from '@/services/newsService'

export interface NewsState {
  // Analysis state
  analysisData: ApiResponse<NewsAnalysisResult> | null
  isAnalyzing: boolean
  analysisError: string | null

  // Entities state
  entitiesData: ApiResponse<NewsEntity[]> | null
  isExtractingEntities: boolean
  entitiesError: string | null

  // Monitor state
  monitoringData: ApiResponse<{ monitorId: string }> | null
  isSettingupMonitoring: boolean
  monitoringError: string | null

  // History
  analysisHistory: NewsAnalysisResult[]
  
  // Actions
  analyzeNews: (request: NewsAnalysis) => Promise<void>
  extractEntities: (content: string) => Promise<void>
  startMonitoring: (options: NewsMonitorOptions) => Promise<void>
  clearAnalysisData: () => void
  clearEntitiesData: () => void
  clearErrors: () => void
}

export const useNewsStore = create<NewsState>()(
  devtools((set, get) => ({
    // Initial state
    analysisData: null,
    isAnalyzing: false,
    analysisError: null,
    entitiesData: null,
    isExtractingEntities: false,
    entitiesError: null,
    monitoringData: null,
    isSettingupMonitoring: false,
    monitoringError: null,
    analysisHistory: [],

    // Actions
    analyzeNews: async (request: NewsAnalysis) => {
      set({ isAnalyzing: true, analysisError: null })

      try {
        const response = await newsService.analyzeNews(request)
        const currentHistory = get().analysisHistory
        const newHistory = response.data 
          ? [response.data, ...currentHistory].slice(0, 10) 
          : currentHistory
        
        set({
          analysisData: response,
          isAnalyzing: false,
          analysisHistory: newHistory
        })
      } catch (error) {
        set({
          isAnalyzing: false,
          analysisError: error instanceof Error ? error.message : 'Analysis failed'
        })
      }
    },

    extractEntities: async (content: string) => {
      set({ isExtractingEntities: true, entitiesError: null })

      try {
        const response = await newsService.extractEntities(content)
        set({
          entitiesData: response,
          isExtractingEntities: false
        })
      } catch (error) {
        set({
          isExtractingEntities: false,
          entitiesError: error instanceof Error ? error.message : 'Entity extraction failed'
        })
      }
    },

    startMonitoring: async (options: NewsMonitorOptions) => {
      set({ isSettingupMonitoring: true, monitoringError: null })

      try {
        const response = await newsService.startMonitoring(options)
        set({
          monitoringData: response,
          isSettingupMonitoring: false
        })
      } catch (error) {
        set({
          isSettingupMonitoring: false,
          monitoringError: error instanceof Error ? error.message : 'Monitoring setup failed'
        })
      }
    },

    clearAnalysisData: () => set({ analysisData: null, analysisError: null }),
    clearEntitiesData: () => set({ entitiesData: null, entitiesError: null }),
    clearErrors: () => set({ 
      analysisError: null, 
      entitiesError: null, 
      monitoringError: null 
    }),
  }), { name: 'news-store' })
)
