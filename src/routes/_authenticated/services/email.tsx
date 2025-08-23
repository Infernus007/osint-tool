import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Alert } from '@/components/ui/alert'
import { useEmailStore } from '@/stores/emailStore'
import type { EmailAnalysis } from '@/lib/schemas'

export const Route = createFileRoute('/_authenticated/services/email')({
  component: EmailAnalysisPage,
})

function EmailAnalysisPage() {
  const [analysisType, setAnalysisType] = useState<'analyze' | 'breach' | 'domain'>('analyze')
  const [emailAddress, setEmailAddress] = useState('')
  const [emailContent, setEmailContent] = useState('')
  const [domain, setDomain] = useState('')
  
  const {
    analysisResults,
    breachResults,
    domainResults,
    isAnalyzing,
    isCheckingBreach,
    isCheckingDomain,
    analysisError,
    breachError,
    domainError,
    analyzeEmail,
    checkBreach,
    checkDomain
  } = useEmailStore()

  const handleAnalyzeEmail = () => {
    if (!emailAddress.trim()) return
    
    const request: EmailAnalysis = {
      email: emailAddress.trim(),
      checkBreaches: true,
      checkDomain: true,
      checkSocial: false
    }
    
    analyzeEmail(request)
  }

  const handleBreachCheck = () => {
    if (!emailAddress.trim()) return
    
    checkBreach(emailAddress.trim())
  }

  const handleDomainCheck = () => {
    const domainToCheck = domain.trim() || emailAddress.split('@')[1]
    if (!domainToCheck) return
    
    checkDomain(domainToCheck)
  }

  const analysisTypes = [
    { id: 'analyze', label: 'Email Analysis', icon: '📧', description: 'Analyze email content and headers' },
    { id: 'breach', label: 'Breach Check', icon: '🔒', description: 'Check if email was in data breaches' },
    { id: 'domain', label: 'Domain Info', icon: '🌐', description: 'Get domain reputation and info' }
  ] as const

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Analysis Type Selection */}
        {analysisTypes.map((type) => (
          <Card 
            key={type.id}
            className={`cursor-pointer transition-colors ${
              analysisType === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setAnalysisType(type.id)}
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

      {/* Email Analysis */}
      {analysisType === 'analyze' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📧 Email Content Analysis
            </CardTitle>
            <CardDescription>
              Analyze email headers, content, and detect potential threats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email Content (Raw Email)</label>
              <textarea
                placeholder="Paste the full email content including headers..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full h-40 mt-1 p-3 border rounded-md resize-vertical"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleAnalyzeEmail}
                disabled={!emailContent.trim() || isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? <LoadingSpinner size="sm" /> : 'Analyze Email'}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Analysis includes:</div>
                <div className="text-gray-600">• Header analysis</div>
                <div className="text-gray-600">• Spam detection</div>
                <div className="text-gray-600">• Phishing detection</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Security checks:</div>
                <div className="text-gray-600">• Link analysis</div>
                <div className="text-gray-600">• Attachment scanning</div>
                <div className="text-gray-600">• Domain reputation</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breach Check */}
      {analysisType === 'breach' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔒 Data Breach Check
            </CardTitle>
            <CardDescription>
              Check if an email address has been involved in known data breaches
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input
                placeholder="user@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleBreachCheck}
                disabled={!emailAddress.trim() || isCheckingBreach}
                className="flex-1"
              >
                {isCheckingBreach ? <LoadingSpinner size="sm" /> : 'Check Breaches'}
              </Button>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm">
                <div className="font-medium text-yellow-800 mb-1">Privacy Notice</div>
                <div className="text-yellow-700">
                  This search only checks against publicly known breach databases. 
                  No passwords or sensitive information will be displayed.
                </div>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Databases checked:</div>
                <div className="text-gray-600">• Have I Been Pwned</div>
                <div className="text-gray-600">• DeHashed</div>
                <div className="text-gray-600">• Leak-Lookup</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Information provided:</div>
                <div className="text-gray-600">• Breach dates</div>
                <div className="text-gray-600">• Affected services</div>
                <div className="text-gray-600">• Data types exposed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Domain Info */}
      {analysisType === 'domain' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🌐 Domain Information
            </CardTitle>
            <CardDescription>
              Get detailed information about email domains and their reputation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Domain Name</label>
                <Input
                  placeholder="example.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Or extract from email</label>
                <Input
                  placeholder="user@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleDomainCheck}
                disabled={(!domain.trim() && !emailAddress.includes('@')) || isCheckingDomain}
                className="flex-1"
              >
                {isCheckingDomain ? <LoadingSpinner size="sm" /> : 'Check Domain'}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Domain Info:</div>
                <div className="text-gray-600">• WHOIS data</div>
                <div className="text-gray-600">• Registration info</div>
                <div className="text-gray-600">• Nameservers</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Security:</div>
                <div className="text-gray-600">• Reputation score</div>
                <div className="text-gray-600">• Blacklist status</div>
                <div className="text-gray-600">• SSL certificate</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Email Config:</div>
                <div className="text-gray-600">• MX records</div>
                <div className="text-gray-600">• SPF records</div>
                <div className="text-gray-600">• DKIM setup</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {(analysisError || breachError || domainError) && (
        <Alert variant="destructive">
          <h4 className="font-medium">Analysis Error</h4>
          <p className="text-sm mt-1">
            {analysisError || breachError || domainError || 'An error occurred during analysis'}
          </p>
        </Alert>
      )}

      {/* Email Analysis Results */}
      {analysisResults?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Email Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Security Assessment</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Risk Score</span>
                    <span className={`font-medium ${
                      (analysisResults.data.riskScore || 0) > 70 ? 'text-red-600' :
                      (analysisResults.data.riskScore || 0) > 40 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {analysisResults.data.riskScore || 0}/100
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Reputation</span>
                    <span className={`font-medium capitalize ${
                      analysisResults.data.reputation === 'malicious' ? 'text-red-600' : 
                      analysisResults.data.reputation === 'suspicious' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {analysisResults.data.reputation || 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Deliverable</span>
                    <span className={`font-medium ${
                      analysisResults.data.deliverable ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {analysisResults.data.deliverable ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Email Details</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Email:</span> {analysisResults.data.email}</div>
                  <div><span className="font-medium">Valid:</span> {analysisResults.data.isValid ? 'Yes' : 'No'}</div>
                  <div><span className="font-medium">Disposable:</span> {analysisResults.data.disposable ? 'Yes' : 'No'}</div>
                  <div><span className="font-medium">Domain:</span> {analysisResults.data.domain?.name}</div>
                  {analysisResults.data.lastSeen && (
                    <div><span className="font-medium">Last Seen:</span> {analysisResults.data.lastSeen}</div>
                  )}
                </div>
              </div>
            </div>

            {analysisResults.data.socialAccounts && analysisResults.data.socialAccounts.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Social Media Accounts</h4>
                <div className="space-y-2">
                  {analysisResults.data.socialAccounts.map((account: any, index: number) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                      <div className="font-medium">{account.platform}</div>
                      <div className="text-gray-600">
                        {account.username} • {account.verified ? 'Verified' : 'Unverified'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Breach Results */}
      {breachResults?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Data Breach Results</CardTitle>
            <CardDescription>
              Breach history for: {emailAddress}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {breachResults.data && breachResults.data.length > 0 ? (
              <div className="space-y-4">
                <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-red-800 font-medium">
                    Found in {breachResults.data.length} data breach{breachResults.data.length !== 1 ? 'es' : ''}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {breachResults.data.map((breach: any, index: number) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                      <div className="font-medium">{breach.name}</div>
                      <div className="text-sm text-gray-600">{breach.domain}</div>
                      <div className="text-sm mt-1">
                        Breach Date: {breach.breachDate}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Data Types: {breach.dataClasses?.join(', ')}
                      </div>
                      {breach.description && (
                        <div className="text-xs text-gray-500 mt-1">{breach.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-green-800 font-medium">
                  No breaches found for this email address
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Domain Results */}
      {domainResults?.data && (
        <Card>
          <CardHeader>
            <CardTitle>Domain Information</CardTitle>
            <CardDescription>
              Information for domain: {domain || emailAddress.split('@')[1]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2">Domain Details</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Domain:</span> {domainResults.data.domain}</div>
                  <div><span className="font-medium">Registrar:</span> {domainResults.data.registrar}</div>
                  <div><span className="font-medium">Created:</span> {domainResults.data.registrationDate}</div>
                  <div><span className="font-medium">Expires:</span> {domainResults.data.expirationDate}</div>
                  {domainResults.data.status && domainResults.data.status.length > 0 && (
                    <div><span className="font-medium">Status:</span> {domainResults.data.status.join(', ')}</div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Name Servers</h4>
                <div className="space-y-2 text-sm">
                  {domainResults.data.nameServers && domainResults.data.nameServers.length > 0 ? (
                    domainResults.data.nameServers.map((ns: string, index: number) => (
                      <div key={index} className="text-gray-600">{ns}</div>
                    ))
                  ) : (
                    <div className="text-gray-500">No name servers found</div>
                  )}
                </div>
              </div>
            </div>

            {domainResults.data.contacts && Object.keys(domainResults.data.contacts).length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="grid gap-2 md:grid-cols-3 text-sm">
                  {domainResults.data.contacts.registrant && (
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">Registrant</div>
                      <div className="text-gray-600">{domainResults.data.contacts.registrant}</div>
                    </div>
                  )}
                  {domainResults.data.contacts.admin && (
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">Admin</div>
                      <div className="text-gray-600">{domainResults.data.contacts.admin}</div>
                    </div>
                  )}
                  {domainResults.data.contacts.tech && (
                    <div className="p-2 bg-gray-50 rounded">
                      <div className="font-medium">Technical</div>
                      <div className="text-gray-600">{domainResults.data.contacts.tech}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
