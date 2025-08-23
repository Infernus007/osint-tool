import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { governmentService } from '@/services/governmentService'
import type { VehicleSearch, CourtSearch, ApiResponse } from '@/lib/schemas'

export interface GovernmentState {
  // Vehicle search
  vehicleResults: ApiResponse<any> | null
  isSearchingVehicle: boolean
  vehicleError: string | null

  // Court search
  courtResults: ApiResponse<any> | null
  isSearchingCourt: boolean
  courtError: string | null

  // Public records
  recordsResults: ApiResponse<any> | null
  isSearchingRecords: boolean
  recordsError: string | null

  // Actions
  searchVehicle: (request: VehicleSearch) => Promise<void>
  searchCourt: (request: CourtSearch) => Promise<void>
  searchRecords: (request: { name: string; includeProperty?: boolean; includeBusiness?: boolean; includeVoterRegistration?: boolean }) => Promise<void>
  clearErrors: () => void
}

export const useGovernmentStore = create<GovernmentState>()(
  devtools((set) => ({
    vehicleResults: null,
    isSearchingVehicle: false,
    vehicleError: null,
    courtResults: null,
    isSearchingCourt: false,
    courtError: null,
    recordsResults: null,
    isSearchingRecords: false,
    recordsError: null,

    searchVehicle: async (request) => {
      set({ isSearchingVehicle: true, vehicleError: null })
      try {
        const response = await governmentService.searchVehicle(request)
        set({ vehicleResults: response, isSearchingVehicle: false })
      } catch (error) {
        set({ isSearchingVehicle: false, vehicleError: error instanceof Error ? error.message : 'Vehicle search failed' })
      }
    },
    searchCourt: async (request) => {
      set({ isSearchingCourt: true, courtError: null })
      try {
        const response = await governmentService.searchCourtCases(request)
        set({ courtResults: response, isSearchingCourt: false })
      } catch (error) {
        set({ isSearchingCourt: false, courtError: error instanceof Error ? error.message : 'Court search failed' })
      }
    },
    searchRecords: async (_request) => {
      // Future enhancement: Use request parameters to filter records (name, includeProperty, etc.)
      set({ isSearchingRecords: true, recordsError: null })
      try {
        const response = await governmentService.getRecords('court') // This would be extended to handle different record types
        set({ recordsResults: response, isSearchingRecords: false })
      } catch (error) {
        set({ isSearchingRecords: false, recordsError: error instanceof Error ? error.message : 'Records search failed' })
      }
    },
    clearErrors: () => set({ vehicleError: null, courtError: null, recordsError: null }),
  }), { name: 'government-store' })
)
