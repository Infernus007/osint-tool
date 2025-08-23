import { QueryClient } from '@tanstack/react-query'
import type { AuthContextType } from '@/contexts/AuthContext'

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
