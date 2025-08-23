import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Alert } from '@/components/ui/alert'
import { useDarkWebStore } from '@/stores/darkWebStore'
import type { DarkWebSearch } from '@/lib/schemas'

export const Route = createFileRoute('/_authenticated/services/darkweb')({
  component: DarkWebPage,
})

function DarkWebPage() {
  const [searchType, setSearchType] = useState<'search' | 'monitor' | 'keywords'>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [monitorEmail, setMonitorEmail] = useState('')
  const [monitorDomain, setMonitorDomain] = useState('')
  const [keywords, setKeywords] = useState('')
  
  const {
    searchResults,
    monitorResults,
    keywordResults,
    isSearching,
    isSettingMonitor,
    isSearchingKeywords,
    searchError,
    monitorError,
    keywordError,
    searchDarkWeb,
    setupMonitor,
    searchKeywords
  } = useDarkWebStore()

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    const request: DarkWebSearch = {
      keywords: [searchQuery.trim()],
      timeRange: '30d'
    }
    
    searchDarkWeb(request)
  }

  const handleSetupMonitor = () => {
    if (!monitorEmail.trim() && !monitorDomain.trim()) return
    
    const keywords = [monitorEmail.trim(), monitorDomain.trim()].filter(Boolean)
    const identifier = monitorEmail.trim() || monitorDomain.trim()
    
    setupMonitor(keywords, identifier)
  }

  const handleKeywordSearch = () => {
    if (!keywords.trim()) return
    
    const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean)
    searchKeywords({
      keywords: keywordList,
      sources: ['forums', 'markets', 'paste_sites'],
      timeRange: '30d'
    })
  }

  const searchTypes = [
    { id: 'search', label: 'Dark Web Search', icon: '🔍', description: 'Search across dark web markets and forums' },
    { id: 'monitor', label: 'Monitoring Setup', icon: '👁️', description: 'Monitor for mentions of emails/domains' },
    { id: 'keywords', label: 'Keyword Tracking', icon: '🔎', description: 'Track specific keywords and topics' }
  ] as const

  return (
    <div className="space-y-6">
      {/* Security Warning */}
      <Alert>
        <h4 className="font-medium">⚠️ Security Notice</h4>
        <p className="text-sm mt-1">
          Dark web monitoring is conducted through secure, anonymized channels. All searches are logged for security and compliance purposes. 
          This tool is intended for legitimate investigation and security research only.
        </p>
      </Alert>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Search Type Selection */}
        {searchTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-colors ${
              searchType === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setSearchType(type.id)}
          >
            <CardHeader className="text-center">
              <div className="text-2xl mb-2">{type.icon}</div>
              <CardTitle className="text-lg">{type.label}</CardTitle>
              <CardDescription className="text-sm">
                {type.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Dark Web Search */}
      {searchType === 'search' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 Dark Web Search
            </CardTitle>
            <CardDescription>
              Search across dark web markets, forums, and paste sites
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Search Query</label>
              <Input
                placeholder="Enter search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="flex-1"
              >
                {isSearching ? <LoadingSpinner size="sm" /> : 'Search Dark Web'}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Search Sources:</div>
                <div className="text-gray-600">• Dark web markets</div>
                <div className="text-gray-600">• Underground forums</div>
                <div className="text-gray-600">• Paste sites</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Content Types:</div>
                <div className="text-gray-600">• Text posts</div>
                <div className="text-gray-600">• Product listings</div>
                <div className="text-gray-600">• Forum discussions</div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="text-sm">
                <div className="font-medium text-amber-800 mb-1">Legal Notice</div>
                <div className="text-amber-700">
                  This search is for investigation and security research purposes only. 
                  All results are anonymized and no illegal content is accessed or stored.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monitoring Setup */}
      {searchType === 'monitor' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👁️ Dark Web Monitoring
            </CardTitle>
            <CardDescription>
              Set up monitoring for email addresses, domains, or specific content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  placeholder="user@example.com"
                  value={monitorEmail}
                  onChange={(e) => setMonitorEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Domain</label>
                <Input
                  placeholder="example.com"
                  value={monitorDomain}
                  onChange={(e) => setMonitorDomain(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Additional Keywords</label>
              <Input
                placeholder="company name, product names, etc."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSetupMonitor}
                disabled={(!monitorEmail.trim() && !monitorDomain.trim()) || isSettingMonitor}
                className="flex-1"
              >
                {isSettingMonitor ? <LoadingSpinner size="sm" /> : 'Setup Monitoring'}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Monitor for:</div>
                <div className="text-gray-600">• Credential leaks</div>
                <div className="text-gray-600">• Domain mentions</div>
                <div className="text-gray-600">• Brand discussions</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Alert Options:</div>
                <div className="text-gray-600">• Real-time alerts</div>
                <div className="text-gray-600">• Daily summaries</div>
                <div className="text-gray-600">• Weekly reports</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keyword Tracking */}
      {searchType === 'keywords' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔎 Keyword Tracking
            </CardTitle>
            <CardDescription>
              Track mentions of specific keywords across dark web sources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Keywords (comma-separated)</label>
              <Input
                placeholder="cybersecurity, data breach, ransomware"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleKeywordSearch}
                disabled={!keywords.trim() || isSearchingKeywords}
                className="flex-1"
              >
                {isSearchingKeywords ? <LoadingSpinner size="sm" /> : 'Track Keywords'}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Tracking Sources:</div>
                <div className="text-gray-600">• Hacker forums</div>
                <div className="text-gray-600">• Marketplaces</div>
                <div className="text-gray-600">• Chat channels</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Data Points:</div>
                <div className="text-gray-600">• Mention frequency</div>
                <div className="text-gray-600">• Context analysis</div>
                <div className="text-gray-600">• Threat level</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Time Ranges:</div>
                <div className="text-gray-600">• Last 7 days</div>
                <div className="text-gray-600">• Last 30 days</div>
                <div className="text-gray-600">• Custom range</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {(searchError || monitorError || keywordError) && (
        <Alert variant="destructive">
          <h4 className="font-medium">Operation Error</h4>
          <p className="text-sm mt-1">
            {searchError || monitorError || keywordError || 'An error occurred during the operation'}
          </p>
        </Alert>
      )}

      {/* Search Results */}
      {searchResults?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Dark Web Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.data.results?.length || 0} results for: {searchQuery}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.data.results?.map((result: any, index: number) => (
                <div key={index} className="border-l-4 border-red-500 pl-4 py-3 bg-gray-50 rounded-r">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium text-sm">{result.source}</div>
                    <div className="text-xs text-gray-500">{result.timestamp}</div>
                  </div>
                  <div className="text-sm mb-2">{result.title}</div>
                  <div className="text-sm text-gray-700 mb-2">{result.snippet}</div>
                  <div className="flex gap-2 text-xs">
                    <span className={`px-2 py-1 rounded ${
                      result.threatLevel === 'high' ? 'bg-red-100 text-red-800' :
                      result.threatLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {result.threatLevel} threat
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded">
                      {result.sourceType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monitor Results */}
      {monitorResults?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Monitoring Setup Complete</CardTitle>
            <CardDescription>
              Your monitoring profile has been configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-medium text-green-800">Monitor ID: {monitorResults.data.id}</div>
                <div className="text-sm text-green-700 mt-1">
                  Monitoring is now active. You'll receive alerts when matches are found.
                </div>
              </div>
              
              <div className="grid gap-3 md:grid-cols-2 text-sm">
                <div>
                  <div className="font-medium">Monitoring:</div>
                  {monitorEmail && <div className="text-gray-600">• Email: {monitorEmail}</div>}
                  {monitorDomain && <div className="text-gray-600">• Domain: {monitorDomain}</div>}
                  {keywords && <div className="text-gray-600">• Keywords: {keywords}</div>}
                </div>
                <div>
                  <div className="font-medium">Alert Settings:</div>
                  <div className="text-gray-600">• Frequency: Daily</div>
                  <div className="text-gray-600">• Channels: Email, Dashboard</div>
                  <div className="text-gray-600">• Status: Active</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keyword Results */}
      {keywordResults?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Keyword Tracking Results</CardTitle>
            <CardDescription>
              Keyword mentions found in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Summary Statistics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Total Mentions</span>
                    <span className="font-medium">{keywordResults.data?.totalMentions || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Unique Sources</span>
                    <span className="font-medium">{keywordResults.data?.uniqueSources || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Threat Level</span>
                    <span className={`font-medium ${
                      keywordResults.data?.averageThreatLevel === 'high' ? 'text-red-600' :
                      keywordResults.data?.averageThreatLevel === 'medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {keywordResults.data?.averageThreatLevel || 'Low'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recent Mentions</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {keywordResults.data?.recentMentions?.map((mention: any, index: number) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                      <div className="font-medium">{mention.keyword}</div>
                      <div className="text-gray-600">{mention.source}</div>
                      <div className="text-xs text-gray-500">{mention.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
