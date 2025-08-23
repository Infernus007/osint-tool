import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { createRouterContext } from '@/lib/router-context'
import { router, queryClient } from '@/router'
import { env } from '@/config/env'

function InnerApp() {
  const auth = useAuth()
  
  const routerContext = createRouterContext(queryClient, auth)
  
  return <RouterProvider router={router} context={routerContext} />
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
      {env.VITE_ENABLE_DEV_TOOLS && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App
