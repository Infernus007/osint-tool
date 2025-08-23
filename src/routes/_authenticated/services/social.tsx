import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Alert } from '@/components/ui/alert'
import { useSocialStore } from '@/stores/socialStore'
import type { SocialMediaSearch } from '@/lib/schemas'

export const Route = createFileRoute('/_authenticated/services/social')({
  component: SocialMediaPage,
})

function SocialMediaPage() {
  const [platform, setPlatform] = useState<'twitter' | 'instagram' | 'facebook' | 'linkedin'>('twitter')
  const [username, setUsername] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [hashtag, setHashtag] = useState('')
  
  const { 
    scrapeResults, 
    isScraping, 
    scrapeError,
    scrapeProfile,
    profileResults, 
    isSearchingProfiles, 
    profileError,
    searchProfiles,
    searchResults, 
    isSearching, 
    searchError,
    searchContent 
  } = useSocialStore()

  const handleScrapeProfile = () => {
    if (!username.trim()) return
    
    const request: SocialMediaSearch = {
      identifier: username.trim(),
      identifierType: 'username',
      platforms: [platform],
      deepSearch: true
    }
    
    scrapeProfile(request)
  }

  const handleSearchProfiles = () => {
    if (!searchQuery.trim()) return
    
    const request: SocialMediaSearch = {
      identifier: searchQuery.trim(),
      identifierType: 'username',
      platforms: [platform],
      deepSearch: false
    }
    
    searchProfiles(request)
  }

  const handleSearchContent = () => {
    if (!searchQuery.trim() && !hashtag.trim()) return
    
    const query = hashtag.trim() ? `#${hashtag.trim()}` : searchQuery.trim()
    const request: SocialMediaSearch = {
      identifier: query,
      identifierType: 'username',
      platforms: [platform],
      deepSearch: false
    }
    
    searchContent(request)
  }

  const platformIcons = {
    twitter: '🐦',
    instagram: '📷',
    facebook: '👥',
    linkedin: '💼'
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Platform Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📱 Social Media Intelligence
            </CardTitle>
            <CardDescription>
              Analyze social media profiles, posts, and trends across platforms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Platform</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {(Object.keys(platformIcons) as Array<keyof typeof platformIcons>).map((p) => (
                  <Button
                    key={p}
                    variant={platform === p ? "default" : "outline"}
                    onClick={() => setPlatform(p)}
                    className="justify-start"
                  >
                    <span className="mr-2">{platformIcons[p]}</span>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Stats</CardTitle>
            <CardDescription>
              Current platform: {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Active Users</span>
                <span className="font-medium">
                  {platform === 'twitter' ? '450M' : 
                   platform === 'instagram' ? '2B' :
                   platform === 'facebook' ? '2.9B' : '900M'}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Daily Posts</span>
                <span className="font-medium">
                  {platform === 'twitter' ? '500M' : 
                   platform === 'instagram' ? '100M' :
                   platform === 'facebook' ? '4B' : '50M'}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm">Search Depth</span>
                <span className="font-medium">Advanced</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Analysis</CardTitle>
          <CardDescription>
            Analyze a specific user profile for insights and connections
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Username</label>
              <Input
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleScrapeProfile}
                disabled={!username.trim() || isScraping}
                className="w-full"
              >
                {isScraping ? <LoadingSpinner size="sm" /> : 'Analyze Profile'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Search */}
      <Card>
        <CardHeader>
          <CardTitle>Content Search</CardTitle>
          <CardDescription>
            Search for posts, hashtags, and trending content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium">Search Query</label>
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Hashtag</label>
              <Input
                placeholder="trending"
                value={hashtag}
                onChange={(e) => setHashtag(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-end gap-2">
              <Button 
                onClick={handleSearchContent}
                disabled={(!searchQuery.trim() && !hashtag.trim()) || isSearching}
                className="flex-1"
              >
                {isSearching ? <LoadingSpinner size="sm" /> : 'Search Content'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Search */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Discovery</CardTitle>
          <CardDescription>
            Find profiles matching specific criteria
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Search Terms</label>
              <Input
                placeholder="journalist, crypto, influencer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={handleSearchProfiles}
                disabled={!searchQuery.trim() || isSearchingProfiles}
                className="w-full"
              >
                {isSearchingProfiles ? <LoadingSpinner size="sm" /> : 'Find Profiles'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {(scrapeError || profileError || searchError) && (
        <Alert variant="destructive">
          <h4 className="font-medium">Search Error</h4>
          <p className="text-sm mt-1">
            {scrapeError || profileError || searchError || 'An error occurred during search'}
          </p>
        </Alert>
      )}

      {/* Profile Results */}
      {scrapeResults && scrapeResults.data && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Analysis Results</CardTitle>
            <CardDescription>
              Analysis for @{username} on {platform}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold">{scrapeResults.data.profiles?.[0]?.followers || 0}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold">{scrapeResults.data.profiles?.[0]?.following || 0}</div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold">{scrapeResults.data.profiles?.[0]?.posts || 0}</div>
                <div className="text-sm text-gray-600">Recent Posts</div>
              </div>
            </div>

            {scrapeResults.data.profiles?.[0] && (
              <div className="mt-4 p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Profile Information</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Bio:</span> {scrapeResults.data.profiles[0].bio}</div>
                  <div><span className="font-medium">Verified:</span> {scrapeResults.data.profiles[0].verified ? 'Yes' : 'No'}</div>
                  <div><span className="font-medium">Account Created:</span> {scrapeResults.data.profiles[0].accountCreated}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      {(searchResults || profileResults) && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              {searchResults ? 'Content search results' : 'Profile search results'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults?.data?.profiles?.map((post: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="font-medium text-sm">{post.author}</div>
                  <div className="text-sm mt-1">{post.content}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {post.timestamp} • {post.likes} likes • {post.shares} shares
                  </div>
                </div>
              ))}
              
              {profileResults?.data?.profiles?.map((profile: any, index: number) => (
                <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    {platformIcons[platform]}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{profile.username}</div>
                    <div className="text-sm text-gray-600">{profile.bio}</div>
                    <div className="text-xs text-gray-500">
                      {profile.followers} followers • {profile.location}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
