import { QueryClient } from '@tanstack/react-query'

import type { AuthContextType } from '@/app/providers/AuthProvider'

export interface RouterContext {
  queryClient: QueryClient
  auth: AuthContextType
}

export const createRouterContext = (
  queryClient: QueryClient,
  auth: AuthContextType
): RouterContext => ({
  queryClient,
  auth,
})
