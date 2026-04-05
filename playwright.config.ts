import { defineConfig, devices } from '@playwright/test';

/**
 * Production (working) and test environments share the same tests.
 * Each spec runs once per project below.
 */
export default defineConfig({
  
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://automationexercise.com',
    extraHTTPHeaders: {
      'Accept': 'application/json'
    }
  
  },
  projects: [
    {
      name: 'Prod',
      use: {
        headless: false,
        ...devices['Desktop Firefox'],
        baseURL: 'https://automationexercise.com',
      },
    },
    {
      name: 'testProd',
      use: {
        headless: false,
        ...devices['Desktop Firefox'],
        baseURL: 'https://test.automationexercise.com',
      },
    },
  ],
});
