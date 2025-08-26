import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { ApiResponse,SocialMediaSearch } from '@/lib/schemas'
import type { SocialSearchResult } from '@/services/socialService'
import { socialService } from '@/services/socialService'

export interface SocialState {
  // Scrape Profile state
  scrapeResults: ApiResponse<SocialSearchResult> | null
  isScraping: boolean
  scrapeError: string | null

  // Profile Search state
  profileResults: ApiResponse<SocialSearchResult> | null
  isSearchingProfiles: boolean
  profileError: string | null

  // Content Search state
  searchResults: ApiResponse<SocialSearchResult> | null
  isSearching: boolean
  searchError: string | null

  // Search History
  searchHistory: SocialSearchResult[]

  // Actions
  scrapeProfile: (request: SocialMediaSearch) => Promise<void>
  searchProfiles: (request: SocialMediaSearch) => Promise<void>
  searchContent: (request: SocialMediaSearch) => Promise<void>
  clearScrapeResults: () => void
  clearProfileResults: () => void
  clearSearchResults: () => void
  clearErrors: () => void
}

export const useSocialStore = create<SocialState>()(
  devtools((set, get) => ({
    // Initial state
    scrapeResults: null,
    isScraping: false,
    scrapeError: null,
    profileResults: null,
    isSearchingProfiles: false,
    profileError: null,
    searchResults: null,
    isSearching: false,
    searchError: null,
    searchHistory: [],

    // Actions
    scrapeProfile: async (request: SocialMediaSearch) => {
      set({ isScraping: true, scrapeError: null })

      try {
        const response = await socialService.searchProfiles(request)
        const currentHistory = get().searchHistory
        const newHistory = response.data 
          ? [response.data, ...currentHistory].slice(0, 10) 
          : currentHistory

        set({
          scrapeResults: response,
          isScraping: false,
          searchHistory: newHistory
        })
      } catch (error) {
        set({
          isScraping: false,
          scrapeError: error instanceof Error ? error.message : 'Profile scraping failed'
        })
      }
    },

    searchProfiles: async (request: SocialMediaSearch) => {
      set({ isSearchingProfiles: true, profileError: null })

      try {
        const response = await socialService.searchProfiles(request)
        set({
          profileResults: response,
          isSearchingProfiles: false
        })
      } catch (error) {
        set({
          isSearchingProfiles: false,
          profileError: error instanceof Error ? error.message : 'Profile search failed'
        })
      }
    },

    searchContent: async (request: SocialMediaSearch) => {
      set({ isSearching: true, searchError: null })

      try {
        const response = await socialService.searchProfiles(request)
        set({
          searchResults: response,
          isSearching: false
        })
      } catch (error) {
        set({
          isSearching: false,
          searchError: error instanceof Error ? error.message : 'Content search failed'
        })
      }
    },

    clearScrapeResults: () => set({ scrapeResults: null, scrapeError: null }),
    clearProfileResults: () => set({ profileResults: null, profileError: null }),
    clearSearchResults: () => set({ searchResults: null, searchError: null }),
    clearErrors: () => set({ 
      scrapeError: null, 
      profileError: null, 
      searchError: null 
    }),
  }), { name: 'social-store' })
)
