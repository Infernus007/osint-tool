import { createFileRoute } from '@tanstack/react-router'
import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Alert } from '@/components/ui/alert'
import { useImageStore } from '@/stores/imageStore'

export const Route = createFileRoute('/_authenticated/services/image')({
  component: ImageSearchPage,
})

function ImageSearchPage() {
  const [imageUrl, setImageUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const {
    urlSearchResults,
    fileSearchResults,
    isSearchingByUrl,
    isSearchingByFile,
    urlSearchError,
    fileSearchError,
    searchByUrl,
    searchByFile
  } = useImageStore()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      setImageUrl('')
    }
  }

  const handleUrlChange = (value: string) => {
    setImageUrl(value)
    if (value && !selectedFile) {
      setPreviewUrl(value)
    }
  }

  const handleSearch = async () => {
    if (selectedFile) {
      searchByFile(selectedFile, ['google', 'bing', 'yandex'])
    } else if (imageUrl.trim()) {
      searchByUrl(imageUrl.trim(), ['google', 'bing', 'yandex'])
    }
  }

  const clearSelection = () => {
    setSelectedFile(null)
    setImageUrl('')
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const hasImage = selectedFile || imageUrl.trim()
  const isLoading = isSearchingByUrl || isSearchingByFile
  const searchResults = selectedFile ? fileSearchResults : urlSearchResults
  const searchError = urlSearchError || fileSearchError

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upload Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 Reverse Image Search
            </CardTitle>
            <CardDescription>
              Upload an image or provide a URL to find similar images and sources
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Upload Image</label>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="mt-1"
              />
            </div>
            
            <div className="text-center text-sm text-gray-500">
              OR
            </div>
            
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="mt-1"
                disabled={!!selectedFile}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSearch}
                disabled={!hasImage || isLoading}
                className="flex-1"
              >
                {isLoading ? <LoadingSpinner size="sm" /> : 'Search Image'}
              </Button>
              
              <Button 
                variant="outline"
                onClick={clearSelection}
                disabled={!hasImage}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Image Preview</CardTitle>
            <CardDescription>
              Preview of the image to be searched
            </CardDescription>
          </CardHeader>
          <CardContent>
            {previewUrl ? (
              <div className="space-y-3">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border"
                  onError={() => setPreviewUrl(null)}
                />
                <div className="text-sm text-gray-600">
                  {selectedFile ? (
                    <div>
                      <div>File: {selectedFile.name}</div>
                      <div>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  ) : (
                    <div>URL: {imageUrl}</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-2xl mb-2">🖼️</div>
                  <div>No image selected</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Search Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Search Options</CardTitle>
          <CardDescription>
            Configure your reverse image search parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Search Engines</label>
              <div className="mt-2 space-y-2">
                {['Google', 'Bing', 'Yandex', 'TinEye'].map((engine) => (
                  <label key={engine} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">{engine}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Similarity Threshold</label>
              <Input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                defaultValue="0.8"
                className="mt-2"
              />
              <div className="text-xs text-gray-500 mt-1">
                Higher values find more exact matches
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {searchError && (
        <Alert variant="destructive">
          <h4 className="font-medium">Search Error</h4>
          <p className="text-sm mt-1">
            {searchError}
          </p>
        </Alert>
      )}

      {/* Results */}
      {searchResults?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>
              Found {searchResults.data.results?.length || 0} similar images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.data.results?.map((result: any, index: number) => (
                <div key={index} className="border rounded-lg p-3">
                  <img 
                    src={result.thumbnail} 
                    alt="Search result"
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <div className="space-y-1">
                    <div className="text-sm font-medium truncate">
                      {result.title || 'Untitled'}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {result.source}
                    </div>
                    <div className="text-xs text-blue-600">
                      Similarity: {((result.similarity || 0) * 100).toFixed(0)}%
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => window.open(result.url, '_blank')}
                    >
                      View Source
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
