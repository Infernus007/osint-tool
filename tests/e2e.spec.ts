import { test, expect, Page } from '@playwright/test'

test.describe('Investigation Platform E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display homepage correctly', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Investigation Platform')
    await expect(page.locator('text=News Analysis')).toBeVisible()
    await expect(page.locator('text=Image Search')).toBeVisible()
    await expect(page.locator('text=Social Media')).toBeVisible()
  })

  test('should navigate to dashboard (with auth redirect)', async ({ page }) => {
    await page.click('text=Go to Dashboard')
    
    // Should redirect to login page
    await expect(page).toHaveURL(/\/login/)
    await expect(page.locator('h2')).toContainText('Sign in to your account')
  })

  test('should navigate to service pages', async ({ page }) => {
    await page.click('text=Get Started →')
    
    // Should navigate to first service
    await expect(page).toHaveURL(/\/services/)
  })
})

test.describe('Authentication Flow', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('/login')
    
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should handle form validation', async ({ page }) => {
    await page.goto('/login')
    
    // Try to submit without filling form
    await page.click('button[type="submit"]')
    
    // Browser validation should prevent submission
    const emailInput = page.locator('input[type="email"]')
    await expect(emailInput).toHaveAttribute('required')
  })
})

test.describe('Responsive Design', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('.grid')).toBeVisible()
  })

  test('should work on tablet devices', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('.grid')).toBeVisible()
  })
})
