import { API_ENDPOINTS } from '@/config/constants'
import { api } from '@/lib/api'
import type { ApiResponse } from '@/lib/schemas'

export interface ImageSearchResult {
  id: string
  engine: string
  url: string
  title: string
  description: string
  similarity: number
  sourceUrl: string
  dimensions: {
    width: number
    height: number
  }
  fileSize?: number
  format?: string
}

export interface ImageSearchResponse {
  searchId: string
  results: ImageSearchResult[]
  totalResults: number
  searchTime: number
  engines: string[]
}

export const imageService = {
  async searchByUrl(imageUrl: string, engines: string[] = ['google']): Promise<ApiResponse<ImageSearchResponse>> {
    return api.post(API_ENDPOINTS.IMAGE.SEARCH, { imageUrl, engines })
  },

  async searchByFile(file: File, engines: string[] = ['google'], onProgress?: (progress: number) => void): Promise<ApiResponse<ImageSearchResponse>> {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('engines', JSON.stringify(engines))
    
    return api.upload(API_ENDPOINTS.IMAGE.UPLOAD, file, onProgress)
  },

  async getSearchResults(searchId: string): Promise<ApiResponse<ImageSearchResponse>> {
    return api.get(`${API_ENDPOINTS.IMAGE.RESULTS}/${searchId}`)
  },

  async deleteSearchResults(searchId: string): Promise<ApiResponse<void>> {
    return api.delete(`${API_ENDPOINTS.IMAGE.RESULTS}/${searchId}`)
  }
}
