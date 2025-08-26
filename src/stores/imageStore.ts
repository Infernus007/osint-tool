import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { ApiResponse } from '@/lib/schemas'
import type { ImageSearchResponse } from '@/services/imageService'
import { imageService } from '@/services/imageService'

export interface ImageState {
  // URL search state
  urlSearchResults: ApiResponse<ImageSearchResponse> | null
  isSearchingByUrl: boolean
  urlSearchError: string | null

  // File search state
  fileSearchResults: ApiResponse<ImageSearchResponse> | null
  isSearchingByFile: boolean
  fileSearchError: string | null

  // Upload progress
  uploadProgress: number

  // Search History
  searchHistory: ImageSearchResponse[]

  // Actions
  searchByUrl: (imageUrl: string, engines?: string[]) => Promise<void>
  searchByFile: (file: File, engines?: string[], onProgress?: (progress: number) => void) => Promise<void>
  clearUrlResults: () => void
  clearFileResults: () => void
  clearErrors: () => void
  setUploadProgress: (progress: number) => void
}

export const useImageStore = create<ImageState>()(
  devtools((set, get) => ({
    // Initial state
    urlSearchResults: null,
    isSearchingByUrl: false,
    urlSearchError: null,
    fileSearchResults: null,
    isSearchingByFile: false,
    fileSearchError: null,
    uploadProgress: 0,
    searchHistory: [],

    // Actions
    searchByUrl: async (imageUrl: string, engines?: string[]) => {
      set({ isSearchingByUrl: true, urlSearchError: null })

      try {
        const response = await imageService.searchByUrl(imageUrl, engines)
        const currentHistory = get().searchHistory
        const newHistory = response.data 
          ? [response.data, ...currentHistory].slice(0, 10) 
          : currentHistory

        set({
          urlSearchResults: response,
          isSearchingByUrl: false,
          searchHistory: newHistory
        })
      } catch (error) {
        set({
          isSearchingByUrl: false,
          urlSearchError: error instanceof Error ? error.message : 'URL search failed'
        })
      }
    },

    searchByFile: async (file: File, engines?: string[], onProgress?: (progress: number) => void) => {
      set({ isSearchingByFile: true, fileSearchError: null, uploadProgress: 0 })

      try {
        const response = await imageService.searchByFile(file, engines, (progress) => {
          set({ uploadProgress: progress })
          onProgress?.(progress)
        })
        
        const currentHistory = get().searchHistory
        const newHistory = response.data 
          ? [response.data, ...currentHistory].slice(0, 10) 
          : currentHistory

        set({
          fileSearchResults: response,
          isSearchingByFile: false,
          uploadProgress: 100,
          searchHistory: newHistory
        })
      } catch (error) {
        set({
          isSearchingByFile: false,
          fileSearchError: error instanceof Error ? error.message : 'File search failed',
          uploadProgress: 0
        })
      }
    },

    clearUrlResults: () => set({ urlSearchResults: null, urlSearchError: null }),
    clearFileResults: () => set({ fileSearchResults: null, fileSearchError: null }),
    clearErrors: () => set({ 
      urlSearchError: null, 
      fileSearchError: null 
    }),
    setUploadProgress: (progress: number) => set({ uploadProgress: progress }),
  }), { name: 'image-store' })
)
