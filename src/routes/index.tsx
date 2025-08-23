import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Investigation Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive investigation and analysis platform for digital forensics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* News Analysis Service */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-lg font-semibold">News Analysis</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Monitor and analyze online news articles to extract key entities like names, locations, and vehicle numbers.
            </p>
            <Link 
              to="/services/news" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Get Started →
            </Link>
          </div>

          {/* Reverse Image Search */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold">Image Search</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Perform comprehensive reverse image searches across multiple search engines to find origins and presence.
            </p>
            <Link 
              to="/services/image" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Get Started →
            </Link>
          </div>

          {/* Social Media Scraping */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold">Social Media</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Scrape publicly available information from social media platforms using various identifiers.
            </p>
            <Link 
              to="/services/social" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Get Started →
            </Link>
          </div>

          {/* Government Site Scraping */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-lg font-semibold">Government Records</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Query publicly accessible Indian government portals for official records and information.
            </p>
            <Link 
              to="/services/government" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Get Started →
            </Link>
          </div>

          {/* Email Analysis */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold">Email Analysis</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Analyze email addresses to discover digital footprints, breach exposure, and associated accounts.
            </p>
            <Link 
              to="/services/email" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Get Started →
            </Link>
          </div>

          {/* Dark Web Scraping */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🕳️</span>
              </div>
              <h3 className="text-lg font-semibold">Dark Web Monitoring</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Monitor dark web forums, marketplaces, and paste sites for specific keywords and identifiers.
            </p>
            <Link 
              to="/services/darkweb" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Get Started →
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
