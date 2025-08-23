import { z } from 'zod'

// Common schemas
export const idSchema = z.string().min(1, 'ID is required')
export const emailSchema = z.string().email('Invalid email format')
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
export const urlSchema = z.string().url('Invalid URL format')

// News Analysis schemas
export const newsAnalysisSchema = z.object({
  url: urlSchema.optional(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  source: z.string().optional(),
  language: z.enum(['en', 'hi', 'other']).default('en'),
})

export const newsEntitySchema = z.object({
  type: z.enum(['person', 'location', 'vehicle', 'organization']),
  value: z.string().min(1),
  confidence: z.number().min(0).max(1),
  context: z.string().optional(),
})

// Image Search schemas
export const imageSearchSchema = z.object({
  imageUrl: urlSchema.optional(),
  imageFile: z.instanceof(File).optional(),
  engines: z.array(z.enum(['google', 'bing', 'yandex', 'tineye'])).default(['google']),
}).refine(data => data.imageUrl || data.imageFile, {
  message: 'Either image URL or image file is required',
})

// Social Media schemas
export const socialMediaSearchSchema = z.object({
  identifier: z.string().min(1, 'Identifier is required'),
  identifierType: z.enum(['email', 'phone', 'username']),
  platforms: z.array(z.enum(['facebook', 'instagram', 'twitter', 'linkedin'])).min(1),
  deepSearch: z.boolean().default(false),
})

// Government Search schemas
export const vehicleSearchSchema = z.object({
  vehicleNumber: z.string().regex(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/, 'Invalid vehicle number format'),
  state: z.string().optional(),
})

export const courtSearchSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  caseNumber: z.string().optional(),
  court: z.string().optional(),
  year: z.number().int().min(1950).max(new Date().getFullYear()).optional(),
})

// Email Analysis schemas
export const emailAnalysisSchema = z.object({
  email: emailSchema,
  checkBreaches: z.boolean().default(true),
  checkDomain: z.boolean().default(true),
  checkSocial: z.boolean().default(false),
})

// Dark Web Search schemas
export const darkWebSearchSchema = z.object({
  keywords: z.array(z.string().min(1)).min(1, 'At least one keyword is required'),
  identifier: z.string().optional(),
  identifierType: z.enum(['email', 'phone', 'username']).optional(),
  timeRange: z.enum(['1d', '7d', '30d', '90d', 'all']).default('30d'),
})

// API Response schemas
export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    error: z.string().optional(),
    timestamp: z.string().datetime(),
  })

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
})

export const paginatedResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: z.array(dataSchema),
    pagination: paginationSchema,
    message: z.string().optional(),
    timestamp: z.string().datetime(),
  })

export type NewsAnalysis = z.infer<typeof newsAnalysisSchema>
export type NewsEntity = z.infer<typeof newsEntitySchema>
export type ImageSearch = z.infer<typeof imageSearchSchema>
export type SocialMediaSearch = z.infer<typeof socialMediaSearchSchema>
export type VehicleSearch = z.infer<typeof vehicleSearchSchema>
export type CourtSearch = z.infer<typeof courtSearchSchema>
export type EmailAnalysis = z.infer<typeof emailAnalysisSchema>
export type DarkWebSearch = z.infer<typeof darkWebSearchSchema>
export type ApiResponse<T> = z.infer<ReturnType<typeof apiResponseSchema<z.ZodType<T>>>>
export type PaginatedResponse<T> = z.infer<ReturnType<typeof paginatedResponseSchema<z.ZodType<T>>>>
