import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { RouterContext } from '@/lib/router-context'
// import { env } from '@/config/env'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
      {/* {env.VITE_ENABLE_DEV_TOOLS && <TanStackRouterDevtools />} */}
    </>
  ),
  notFoundComponent: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-4">Page not found</p>
        <a href="/" className="text-blue-600 hover:text-blue-800">
          Go back home
        </a>
      </div>
    </div>
  ),
})
