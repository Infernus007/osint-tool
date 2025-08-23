import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Alert } from '@/components/ui/alert'
import { useNewsStore } from '@/stores/newsStore'
import type { NewsAnalysis } from '@/lib/schemas'

export const Route = createFileRoute('/_authenticated/services/news')({
  component: NewsAnalysisPage,
})

function NewsAnalysisPage() {
  const [url, setUrl] = useState('')
  const [keywords, setKeywords] = useState('')
  const [analysisRequest, setAnalysisRequest] = useState<NewsAnalysis | null>(null)
  
  const { 
    analysisData, 
    isAnalyzing, 
    analysisError,
    analyzeNews,
    entitiesData, 
    isExtractingEntities, 
    entitiesError,
    extractEntities 
  } = useNewsStore()

  const handleAnalyze = () => {
    if (!url.trim()) return
    
    const request: NewsAnalysis = {
      url: url.trim(),
      content: '', // Will be extracted from URL
      source: url.trim(),
      language: 'en'
    }
    
    setAnalysisRequest(request)
    analyzeNews(request)
  }

  const handleExtractEntities = () => {
    if (!url.trim()) return
    
    extractEntities(url.trim())
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Analysis Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📰 News Analysis
            </CardTitle>
            <CardDescription>
              Analyze news articles for sentiment, entities, and key insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Article URL</label>
              <Input
                placeholder="https://example.com/news-article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Keywords (comma-separated)</label>
              <Input
                placeholder="politics, economy, technology"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleAnalyze}
                disabled={!url.trim() || isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? <LoadingSpinner size="sm" /> : 'Analyze Article'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleExtractEntities}
                disabled={!url.trim() || isExtractingEntities}
              >
                {isExtractingEntities ? <LoadingSpinner size="sm" /> : 'Extract Entities'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common news analysis tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              🔍 Trending Topics Analysis
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📊 Sentiment Tracking
            </Button>
            <Button variant="outline" className="w-full justify-start">
              🌐 Source Credibility Check
            </Button>
            <Button variant="outline" className="w-full justify-start">
              📈 News Monitoring Setup
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      {(analysisError || entitiesError) && (
        <Alert variant="destructive">
          <h4 className="font-medium">Analysis Error</h4>
          <p className="text-sm mt-1">
            {analysisError || entitiesError || 'An error occurred during analysis'}
          </p>
        </Alert>
      )}

      {analysisData && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              Results for: {analysisRequest?.url}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-sm mb-2">Sentiment Analysis</h4>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span>Sentiment</span>
                    <span className={`font-medium capitalize ${
                      analysisData.data?.sentiment === 'positive' ? 'text-green-600' :
                      analysisData.data?.sentiment === 'negative' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {analysisData.data?.sentiment || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Article Details</h4>
                <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Source</span>
                    <span className="font-medium">
                      {analysisData.data?.source || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Keywords Found</span>
                    <span className="font-medium">
                      {analysisData.data?.keywords?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {analysisData.data?.content && (
              <div className="mt-4">
                <h4 className="font-medium text-sm mb-2">Content Summary</h4>
                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {analysisData.data.content.length > 300 
                    ? `${analysisData.data.content.substring(0, 300)}...` 
                    : analysisData.data.content}
                </p>
              </div>
            )}

            {analysisData.data?.keywords && analysisData.data.keywords.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-sm mb-2">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisData.data.keywords.map((keyword: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {entitiesData?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Extracted Entities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {entitiesData.data.map((entity: any, index: number) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-sm">{entity.value}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {entity.type} ({(entity.confidence * 100).toFixed(0)}%)
                  </div>
                  {entity.context && (
                    <div className="text-xs text-gray-400 mt-1">
                      {entity.context}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
