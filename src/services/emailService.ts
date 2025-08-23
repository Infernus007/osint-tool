import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/config/constants'
import type { EmailAnalysis, ApiResponse } from '@/lib/schemas'

export interface EmailAnalysisResult {
  email: string
  isValid: boolean
  deliverable: boolean
  disposable: boolean
  domain: {
    name: string
    registrar: string
    creationDate?: string
    mxRecords: string[]
    spfRecord?: string
    dmarcRecord?: string
  }
  breaches: Array<{
    name: string
    domain: string
    breachDate: string
    dataClasses: string[]
    description: string
    verified: boolean
  }>
  socialAccounts: Array<{
    platform: string
    username: string
    profileUrl: string
    verified: boolean
  }>
  riskScore: number // 0-100
  reputation: 'good' | 'suspicious' | 'malicious'
  lastSeen?: string
}

export interface DomainInfo {
  domain: string
  registrar: string
  registrationDate: string
  expirationDate: string
  nameServers: string[]
  contacts: {
    registrant?: string
    admin?: string
    tech?: string
  }
  status: string[]
}

export const emailService = {
  async analyzeEmail(data: EmailAnalysis): Promise<ApiResponse<EmailAnalysisResult>> {
    return api.post(API_ENDPOINTS.EMAIL.ANALYZE, data)
  },

  async checkBreaches(email: string): Promise<ApiResponse<EmailAnalysisResult['breaches']>> {
    return api.post(API_ENDPOINTS.EMAIL.BREACH_CHECK, { email })
  },

  async getDomainInfo(domain: string): Promise<ApiResponse<DomainInfo>> {
    return api.get(`${API_ENDPOINTS.EMAIL.DOMAIN_INFO}?domain=${domain}`)
  },

  async validateEmail(email: string): Promise<ApiResponse<{ isValid: boolean; deliverable: boolean; disposable: boolean }>> {
    return api.post(`${API_ENDPOINTS.EMAIL.ANALYZE}/validate`, { email })
  },

  async getAnalysisHistory(): Promise<ApiResponse<EmailAnalysisResult[]>> {
    return api.get(API_ENDPOINTS.EMAIL.ANALYZE)
  },

  async deleteAnalysis(analysisId: string): Promise<ApiResponse<void>> {
    return api.delete(`${API_ENDPOINTS.EMAIL.ANALYZE}/${analysisId}`)
  }
}
