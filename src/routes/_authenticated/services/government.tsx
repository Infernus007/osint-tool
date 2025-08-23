import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Alert } from '@/components/ui/alert'
import { useGovernmentStore } from '@/stores/governmentStore'
import type { CourtCase } from '@/services/governmentService'

// Define interfaces for property and business records
interface PropertyRecord {
  address: string
  assessedValue?: number
  owner?: string
  type?: string
}

interface BusinessRecord {
  name: string
  type: string
  status: string
  registrationDate?: string
}

export const Route = createFileRoute('/_authenticated/services/government')({
  component: GovernmentPage,
})

function GovernmentPage() {
  const [searchType, setSearchType] = useState<'vehicle' | 'court' | 'records'>('vehicle')
  const [vehicleId, setVehicleId] = useState('')
  const [personName, setPersonName] = useState('')
  const [courtState, setCourtState] = useState('')
  const [caseNumber, setCaseNumber] = useState('')

  // Zustand store
  const {
    vehicleResults,
    isSearchingVehicle,
    vehicleError,
    searchVehicle,
    courtResults,
    isSearchingCourt,
    courtError,
    searchCourt,
    recordsResults,
    isSearchingRecords,
    recordsError,
    searchRecords,
  } = useGovernmentStore()

  const handleVehicleSearch = () => {
    if (!vehicleId.trim()) return
    searchVehicle({ vehicleNumber: vehicleId.trim(), state: 'CA' })
  }

  const handleCourtSearch = () => {
    if (!personName.trim()) return
    searchCourt({ name: personName.trim(), court: courtState || 'CA', caseNumber: caseNumber.trim() || undefined })
  }

  const handleRecordsSearch = () => {
    if (!personName.trim()) return
    searchRecords({ name: personName.trim(), includeProperty: true, includeBusiness: true, includeVoterRegistration: true })
  }

  const searchTypes = [
    { id: 'vehicle', label: 'Vehicle Records', icon: '🚗', description: 'License plates, registration, history' },
    { id: 'court', label: 'Court Records', icon: '⚖️', description: 'Legal proceedings, judgments, cases' },
    { id: 'records', label: 'Public Records', icon: '📋', description: 'Property, business, voter records' }
  ] as const

  // Error display
  const errorMessage = vehicleError || courtError || recordsError

  // Vehicle Results
  const vehicleData = vehicleResults?.data
  // Court Results
  const courtData = courtResults?.data
  // Records Results
  const recordsData = recordsResults?.data

  return (
    <div className="space-y-6">
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

      {/* Vehicle Search */}
      {searchType === 'vehicle' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🚗 Vehicle Records Search
            </CardTitle>
            <CardDescription>
              Search vehicle registration and history by license plate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">License Plate Number</label>
                <Input
                  placeholder="ABC123"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">State</label>
                <select 
                  className="w-full mt-1 p-2 border rounded-md"
                  defaultValue="CA"
                >
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleVehicleSearch}
                disabled={!vehicleId.trim() || isSearchingVehicle}
                className="flex-1"
              >
                {isSearchingVehicle ? <LoadingSpinner size="sm" /> : 'Search Vehicle'}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Search includes:</div>
                <div className="text-gray-600">• Registration details</div>
                <div className="text-gray-600">• Ownership history</div>
                <div className="text-gray-600">• Lien information</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Also searches:</div>
                <div className="text-gray-600">• Accident reports</div>
                <div className="text-gray-600">• Inspection records</div>
                <div className="text-gray-600">• Title transfers</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Court Records Search */}
      {searchType === 'court' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ⚖️ Court Records Search
            </CardTitle>
            <CardDescription>
              Search court proceedings, judgments, and legal cases
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Person Name</label>
                <Input
                  placeholder="John Doe"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">State/Jurisdiction</label>
                <Input
                  placeholder="CA"
                  value={courtState}
                  onChange={(e) => setCourtState(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Case Number (Optional)</label>
              <Input
                placeholder="CV-2023-001234"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleCourtSearch}
                disabled={!personName.trim() || isSearchingCourt}
                className="flex-1"
              >
                {isSearchingCourt ? <LoadingSpinner size="sm" /> : 'Search Court Records'}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Civil Records:</div>
                <div className="text-gray-600">• Lawsuits</div>
                <div className="text-gray-600">• Judgments</div>
                <div className="text-gray-600">• Liens</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Criminal Records:</div>
                <div className="text-gray-600">• Arrests</div>
                <div className="text-gray-600">• Convictions</div>
                <div className="text-gray-600">• Sentencing</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Public Records Search */}
      {searchType === 'records' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📋 Public Records Search
            </CardTitle>
            <CardDescription>
              Search property records, business filings, and voter registration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Person/Business Name</label>
              <Input
                placeholder="John Doe or ABC Corporation"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleRecordsSearch}
                disabled={!personName.trim() || isSearchingRecords}
                className="flex-1"
              >
                {isSearchingRecords ? <LoadingSpinner size="sm" /> : 'Search Public Records'}
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Property Records:</div>
                <div className="text-gray-600">• Ownership</div>
                <div className="text-gray-600">• Sales history</div>
                <div className="text-gray-600">• Tax assessments</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Business Records:</div>
                <div className="text-gray-600">• Incorporations</div>
                <div className="text-gray-600">• Licenses</div>
                <div className="text-gray-600">• Filings</div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Other Records:</div>
                <div className="text-gray-600">• Voter registration</div>
                <div className="text-gray-600">• Professional licenses</div>
                <div className="text-gray-600">• Permits</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {errorMessage && (
        <Alert variant="destructive">
          <h4 className="font-medium">Search Error</h4>
          <p className="text-sm mt-1">
            {errorMessage}
          </p>
        </Alert>
      )}

      {/* Vehicle Results */}
      {vehicleData && (
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Records</CardTitle>
            <CardDescription>
              Results for license plate: {vehicleId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">Vehicle Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Make/Model:</span>
                    <span className="font-medium">{vehicleData?.vehicle?.make} {vehicleData?.vehicle?.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year:</span>
                    <span className="font-medium">{vehicleData?.vehicle?.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VIN:</span>
                    <span className="font-medium">{vehicleData?.vehicle?.vin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Color:</span>
                    <span className="font-medium">{vehicleData?.vehicle?.color}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Registration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Owner:</span>
                    <span className="font-medium">{vehicleData?.registration?.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expiration:</span>
                    <span className="font-medium">{vehicleData?.registration?.expiration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium">{vehicleData?.registration?.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Court Results */}
      {courtData && (
        <Card>
          <CardHeader>
            <CardTitle>Court Records</CardTitle>
            <CardDescription>
              Results for: {personName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courtData?.cases?.map((case_: CourtCase, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="font-medium">{case_.caseNumber}</div>
                  <div className="text-sm text-gray-600">{case_.courtName}</div>
                  <div className="text-sm mt-1">{case_.caseDetails}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    Filed: {case_.filingDate} • Status: {case_.caseStatus}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Public Records Results */}
      {recordsData && (
        <Card>
          <CardHeader>
            <CardTitle>Public Records</CardTitle>
            <CardDescription>
              Results for: {personName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {recordsData?.property && (
                <div>
                  <h4 className="font-medium mb-2">Property Records</h4>
                  <div className="space-y-2">
                    {recordsData?.property.map((property: PropertyRecord, index: number) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        <div className="font-medium">{property.address}</div>
                        <div className="text-gray-600">Value: ${property.assessedValue?.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {recordsData?.business && (
                <div>
                  <h4 className="font-medium mb-2">Business Records</h4>
                  <div className="space-y-2">
                    {recordsData?.business.map((business: BusinessRecord, index: number) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        <div className="font-medium">{business.name}</div>
                        <div className="text-gray-600">Type: {business.type}</div>
                        <div className="text-gray-600">Status: {business.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
