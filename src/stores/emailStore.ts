import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { emailService } from '@/services/emailService'
import type { EmailAnalysis, ApiResponse } from '@/lib/schemas'
import type { EmailAnalysisResult, DomainInfo } from '@/services/emailService'

export interface EmailState {
  // Analysis state
  analysisResults: ApiResponse<EmailAnalysisResult> | null
  isAnalyzing: boolean
  analysisError: string | null

  // Breach check state
  breachResults: ApiResponse<EmailAnalysisResult['breaches']> | null
  isCheckingBreach: boolean
  breachError: string | null

  // Domain info state
  domainResults: ApiResponse<DomainInfo> | null
  isCheckingDomain: boolean
  domainError: string | null

  // History
  analysisHistory: EmailAnalysisResult[]

  // Actions
  analyzeEmail: (request: EmailAnalysis) => Promise<void>
  checkBreach: (email: string) => Promise<void>
  checkDomain: (domain: string) => Promise<void>
  validateEmail: (email: string) => Promise<void>
  clearAnalysisResults: () => void
  clearBreachResults: () => void
  clearDomainResults: () => void
  clearErrors: () => void
}

export const useEmailStore = create<EmailState>()(
  devtools((set, get) => ({
    // Initial state
    analysisResults: null,
    isAnalyzing: false,
    analysisError: null,
    breachResults: null,
    isCheckingBreach: false,
    breachError: null,
    domainResults: null,
    isCheckingDomain: false,
    domainError: null,
    analysisHistory: [],

    // Actions
    analyzeEmail: async (request: EmailAnalysis) => {
      set({ isAnalyzing: true, analysisError: null })

      try {
        const response = await emailService.analyzeEmail(request)
        const currentHistory = get().analysisHistory
        const newHistory = response.data 
          ? [response.data, ...currentHistory].slice(0, 10) 
          : currentHistory

        set({
          analysisResults: response,
          isAnalyzing: false,
          analysisHistory: newHistory
        })
      } catch (error) {
        set({
          isAnalyzing: false,
          analysisError: error instanceof Error ? error.message : 'Email analysis failed'
        })
      }
    },

    checkBreach: async (email: string) => {
      set({ isCheckingBreach: true, breachError: null })

      try {
        const response = await emailService.checkBreaches(email)
        set({
          breachResults: response,
          isCheckingBreach: false
        })
      } catch (error) {
        set({
          isCheckingBreach: false,
          breachError: error instanceof Error ? error.message : 'Breach check failed'
        })
      }
    },

    checkDomain: async (domain: string) => {
      set({ isCheckingDomain: true, domainError: null })

      try {
        const response = await emailService.getDomainInfo(domain)
        set({
          domainResults: response,
          isCheckingDomain: false
        })
      } catch (error) {
        set({
          isCheckingDomain: false,
          domainError: error instanceof Error ? error.message : 'Domain check failed'
        })
      }
    },

    validateEmail: async (email: string) => {
      set({ isAnalyzing: true, analysisError: null })

      try {
        const response = await emailService.validateEmail(email)
        // Validation results can be stored in analysisResults for now
        set({
          analysisResults: response as any,
          isAnalyzing: false
        })
      } catch (error) {
        set({
          isAnalyzing: false,
          analysisError: error instanceof Error ? error.message : 'Email validation failed'
        })
      }
    },

    clearAnalysisResults: () => set({ analysisResults: null, analysisError: null }),
    clearBreachResults: () => set({ breachResults: null, breachError: null }),
    clearDomainResults: () => set({ domainResults: null, domainError: null }),
    clearErrors: () => set({ 
      analysisError: null, 
      breachError: null, 
      domainError: null 
    }),
  }), { name: 'email-store' })
)
