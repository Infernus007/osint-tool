import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/services/')({
  component: ServicesIndexPage,
})

function ServicesIndexPage() {
  const services = [
    {
      id: 'news',
      title: 'News Analysis',
      description: 'Analyze news articles for sentiment, entities, and credibility',
      icon: '📰',
      features: ['Sentiment Analysis', 'Entity Extraction', 'Credibility Scoring', 'Bias Detection'],
      path: '/services/news'
    },
    {
      id: 'image',
      title: 'Reverse Image Search',
      description: 'Find similar images and trace image sources across the web',
      icon: '🔍',
      features: ['Multi-Engine Search', 'Similarity Matching', 'Source Tracing', 'Metadata Analysis'],
      path: '/services/image'
    },
    {
      id: 'social',
      title: 'Social Media Intelligence',
      description: 'Analyze social media profiles, posts, and trends',
      icon: '📱',
      features: ['Profile Analysis', 'Content Search', 'Trend Detection', 'Network Mapping'],
      path: '/services/social'
    },
    {
      id: 'government',
      title: 'Government Records',
      description: 'Search public records, court documents, and official databases',
      icon: '🏛️',
      features: ['Vehicle Records', 'Court Cases', 'Property Records', 'Business Filings'],
      path: '/services/government'
    },
    {
      id: 'email',
      title: 'Email Analysis',
      description: 'Analyze email headers, check for breaches, and validate domains',
      icon: '📧',
      features: ['Header Analysis', 'Breach Detection', 'Domain Validation', 'Phishing Detection'],
      path: '/services/email'
    },
    {
      id: 'darkweb',
      title: 'Dark Web Monitoring',
      description: 'Monitor dark web for mentions, threats, and leaked credentials',
      icon: '🕳️',
      features: ['Credential Monitoring', 'Threat Detection', 'Market Surveillance', 'Keyword Tracking'],
      path: '/services/darkweb'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Choose an Investigation Service
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select from our comprehensive suite of investigation tools. Each service provides 
          specialized capabilities for different types of digital forensics and intelligence gathering.
        </p>
      </div>

      {/* Service Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="text-3xl mb-3">{service.icon}</div>
              <CardTitle className="text-lg">{service.title}</CardTitle>
              <CardDescription className="text-sm">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button asChild className="w-full">
                <Link to={service.path}>
                  Start Investigation
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 text-center">Platform Statistics</h3>
        <div className="grid gap-4 md:grid-cols-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">250M+</div>
            <div className="text-sm text-gray-600">Records Searched</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-sm text-gray-600">Data Sources</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-2 text-blue-900">Getting Started</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            <strong>First time using our platform?</strong> Start with the News Analysis or 
            Email Analysis services to get familiar with the interface.
          </p>
          <p>
            <strong>Need help?</strong> Each service includes detailed instructions and examples. 
            Check the documentation or contact support if you need assistance.
          </p>
          <p>
            <strong>Best Practices:</strong> Always verify information from multiple sources and 
            ensure your investigations comply with applicable laws and regulations.
          </p>
        </div>
      </div>
    </div>
  )
}
