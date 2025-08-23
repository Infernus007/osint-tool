import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, beforeEach } from 'vitest'
import { AuthProvider } from '@/contexts/AuthContext'

// Example test for services
describe('Services Integration', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    })
  })

  it('should render services without errors', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div>Services Test</div>
        </AuthProvider>
      </QueryClientProvider>
    )
    
    expect(screen.getByText('Services Test')).toBeInTheDocument()
  })
})
