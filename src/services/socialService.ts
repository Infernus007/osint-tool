import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/config/constants'
import type { SocialMediaSearch, ApiResponse } from '@/lib/schemas'

export interface SocialProfile {
  id: string
  platform: string
  username: string
  displayName: string
  bio?: string
  profileImage?: string
  profileUrl: string
  verified: boolean
  followers?: number
  following?: number
  posts?: number
  lastActive?: string
  accountCreated?: string
}

export interface SocialSearchResult {
  searchId: string
  identifier: string
  identifierType: 'email' | 'phone' | 'username'
  profiles: SocialProfile[]
  totalProfiles: number
  platformsSearched: string[]
  searchTime: number
  confidence: number
}

export const socialService = {
  async searchProfiles(data: SocialMediaSearch): Promise<ApiResponse<SocialSearchResult>> {
    return api.post(API_ENDPOINTS.SOCIAL.SCRAPE, data)
  },

  async getProfileDetails(profileId: string): Promise<ApiResponse<SocialProfile>> {
    return api.get(`${API_ENDPOINTS.SOCIAL.PROFILES}/${profileId}`)
  },

  async searchByIdentifier(
    identifier: string, 
    type: 'email' | 'phone' | 'username',
    platforms: string[] = ['facebook', 'instagram', 'twitter']
  ): Promise<ApiResponse<SocialSearchResult>> {
    return api.post(API_ENDPOINTS.SOCIAL.SEARCH, {
      identifier,
      identifierType: type,
      platforms
    })
  },

  async getSearchHistory(): Promise<ApiResponse<SocialSearchResult[]>> {
    return api.get(API_ENDPOINTS.SOCIAL.SEARCH)
  },

  async deleteSearchResult(searchId: string): Promise<ApiResponse<void>> {
    return api.delete(`${API_ENDPOINTS.SOCIAL.SEARCH}/${searchId}`)
  }
}
