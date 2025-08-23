import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/services')({
  component: ServicesLayout,
})

function ServicesLayout() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Investigation Services</h1>
        <p className="text-gray-600 mt-2">Choose from our comprehensive suite of investigation tools</p>
      </div>

      {/* Service Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <Link
            to="/services/news"
            className="flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
            activeProps={{
              className: "bg-white text-blue-600 shadow-sm"
            }}
            inactiveProps={{
              className: "text-gray-500 hover:text-gray-700"
            }}
          >
            News Analysis
          </Link>
          <Link
            to="/services/image"
            className="flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
            activeProps={{
              className: "bg-white text-blue-600 shadow-sm"
            }}
            inactiveProps={{
              className: "text-gray-500 hover:text-gray-700"
            }}
          >
            Image Search
          </Link>
          <Link
            to="/services/social"
            className="flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
            activeProps={{
              className: "bg-white text-blue-600 shadow-sm"
            }}
            inactiveProps={{
              className: "text-gray-500 hover:text-gray-700"
            }}
          >
            Social Media
          </Link>
          <Link
            to="/services/government"
            className="flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
            activeProps={{
              className: "bg-white text-blue-600 shadow-sm"
            }}
            inactiveProps={{
              className: "text-gray-500 hover:text-gray-700"
            }}
          >
            Government
          </Link>
          <Link
            to="/services/email"
            className="flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
            activeProps={{
              className: "bg-white text-blue-600 shadow-sm"
            }}
            inactiveProps={{
              className: "text-gray-500 hover:text-gray-700"
            }}
          >
            Email
          </Link>
          <Link
            to="/services/darkweb"
            className="flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
            activeProps={{
              className: "bg-white text-blue-600 shadow-sm"
            }}
            inactiveProps={{
              className: "text-gray-500 hover:text-gray-700"
            }}
          >
            Dark Web
          </Link>
        </nav>
      </div>

      <Outlet />
    </div>
  )
}
