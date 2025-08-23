export const API_ENDPOINTS = {
  // News Analysis Service
  NEWS: {
    ANALYZE: '/news/analyze',
    ENTITIES: '/news/entities',
    MONITOR: '/news/monitor',
  },
  
  // Reverse Image Search
  IMAGE: {
    SEARCH: '/image/search',
    UPLOAD: '/image/upload',
    RESULTS: '/image/results',
  },
  
  // Social Media Scraping
  SOCIAL: {
    SCRAPE: '/social/scrape',
    PROFILES: '/social/profiles',
    SEARCH: '/social/search',
  },
  
  // Government Site Scraping
  GOVERNMENT: {
    VEHICLE: '/government/vehicle',
    COURT: '/government/court',
    RECORDS: '/government/records',
  },
  
  // Email Analysis
  EMAIL: {
    ANALYZE: '/email/analyze',
    BREACH_CHECK: '/email/breach-check',
    DOMAIN_INFO: '/email/domain-info',
  },
  
  // Dark Web Scraping
  DARKWEB: {
    SEARCH: '/darkweb/search',
    MONITOR: '/darkweb/monitor',
    KEYWORDS: '/darkweb/keywords',
  },
} as const

export const APP_CONFIG = {
  name: 'Investigation Platform',
  version: '1.0.0',
  description: 'Comprehensive investigation and analysis platform',
  routes: {
    home: '/',
    dashboard: '/dashboard',
    services: '/services',
    settings: '/settings',
    profile: '/profile',
  },
} as const
