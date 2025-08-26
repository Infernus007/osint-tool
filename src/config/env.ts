import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  VITE_API_BASE_URL: z.string().url().default('http://localhost:3000/api'),
  VITE_APP_NAME: z.string().default('My App'),
  VITE_APP_VERSION: z.string().default('1.0.0'),
  VITE_ENABLE_DEV_TOOLS: z.string().default('false').transform(val => val === 'true'),
})

const parseEnv = () => {
  const env = {
    NODE_ENV: import.meta.env.NODE_ENV,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
    VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
    VITE_ENABLE_DEV_TOOLS: import.meta.env.VITE_ENABLE_DEV_TOOLS,
  }

  try {
    return envSchema.parse(env)
  } catch (error) {
    console.error('❌ Invalid environment variables:', error)
    throw new Error('Invalid environment variables')
  }
}

export const env = parseEnv()
