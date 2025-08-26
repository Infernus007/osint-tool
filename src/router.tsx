import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'

import type { RouterContext } from '@/lib/router-context'
import { routeTree } from '@/routeTree.gen'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          if (error?.response?.status === 408 || error?.response?.status === 429) {
            return failureCount < 2
          }
          return false
        }
        return failureCount < 3
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: false,
    },
  },
})

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  } as RouterContext,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})
