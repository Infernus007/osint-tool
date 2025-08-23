import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/config/constants'
import type { VehicleSearch, CourtSearch, ApiResponse } from '@/lib/schemas'

export interface VehicleInfo {
  registrationNumber: string
  ownerName: string
  fatherName?: string
  address: string
  registrationDate: string
  fuelType: string
  vehicleClass: string
  maker: string
  model: string
  engineNumber: string
  chassisNumber: string
  registrationAuthority: string
  fitnessValidUpto?: string
  insuranceValidUpto?: string
  taxValidUpto?: string
  permitValidUpto?: string
  status: 'active' | 'suspended' | 'cancelled'
}

export interface CourtCase {
  caseNumber: string
  caseType: string
  caseStatus: string
  courtName: string
  judge: string
  filingDate: string
  nextHearing?: string
  petitioner: string
  respondent: string
  caseDetails: string
  orders: Array<{
    date: string
    order: string
  }>
}

export interface GovernmentSearchResult {
  searchId: string
  searchType: 'vehicle' | 'court'
  query: string
  results: VehicleInfo[] | CourtCase[]
  totalResults: number
  searchTime: number
  source: string
}

export const governmentService = {
  async searchVehicle(data: VehicleSearch): Promise<ApiResponse<GovernmentSearchResult>> {
    return api.post(API_ENDPOINTS.GOVERNMENT.VEHICLE, data)
  },

  async searchCourtCases(data: CourtSearch): Promise<ApiResponse<GovernmentSearchResult>> {
    return api.post(API_ENDPOINTS.GOVERNMENT.COURT, data)
  },

  async getVehicleDetails(vehicleNumber: string): Promise<ApiResponse<VehicleInfo>> {
    return api.get(`${API_ENDPOINTS.GOVERNMENT.VEHICLE}/${vehicleNumber}`)
  },

  async getCaseDetails(caseNumber: string): Promise<ApiResponse<CourtCase>> {
    return api.get(`${API_ENDPOINTS.GOVERNMENT.COURT}/${caseNumber}`)
  },

  async getRecords(type: 'vehicle' | 'court'): Promise<ApiResponse<GovernmentSearchResult[]>> {
    return api.get(`${API_ENDPOINTS.GOVERNMENT.RECORDS}?type=${type}`)
  },

  async deleteRecord(recordId: string): Promise<ApiResponse<void>> {
    return api.delete(`${API_ENDPOINTS.GOVERNMENT.RECORDS}/${recordId}`)
  }
}
