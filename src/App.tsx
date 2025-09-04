import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'

import { AuthProvider } from '@/app/providers/AuthProvider'
import { createRouterContext } from '@/lib/router-context'
import { queryClient,router } from '@/router'
import { useAuth } from '@/shared/hooks/useAuth'

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
      {/* {env.VITE_ENABLE_DEV_TOOLS && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  )
}

export default App
