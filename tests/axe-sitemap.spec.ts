import { test } from "@playwright/test";
import { expect } from "@support/a11y-page";
import getSitemapLinks from "@support/sitemap-links";

// Configuration for axe testing
const axeConfig = {
  // WCAG 2.1 AA compliance (most common standard)
  tags: [
    "wcag2a",
    "wcag2aa", 
    "wcag21a",
    "wcag21aa",
    "best-practice",
    // Uncomment for WCAG 2.2 (latest standard)
    // "wcag22a",
    // "wcag22aa",
    // Uncomment for experimental rules
    // "experimental",
  ],
  
  // Rules to disable (add rule IDs that are causing issues)
  disabledRules: [
    // Example: 'color-contrast' // if you need to temporarily disable
  ],
  
  // Include or exclude certain elements
  include: [
    // Example: ['.main-content'] // test only specific areas
  ],
  exclude: [
    // Example: ['.third-party-widget'] // exclude problematic third-party content
  ],
};

// Test configuration
const testConfig = {
  // Timeout for each individual test
  timeout: 60000,
  
  // Skip certain URLs if needed
  skipUrls: [
    // Example: '/admin', '/login'
  ],
  
  // Retry failed tests
  retries: 1,
};

// Helper function to check if URL should be skipped
function shouldSkipUrl(url: string): boolean {
  return testConfig.skipUrls.some(skipUrl => url.includes(skipUrl));
}

// Helper function to clean URL for test naming
function cleanUrlForTestName(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname + urlObj.search;
  } catch {
    return url.replace(/[^a-zA-Z0-9-_]/g, '_');
  }
}

// Get sitemap links with error handling
let sitemapLinks: string[] = [];
try {
  const links = getSitemapLinks("sitemap.links");
  if (links && Array.isArray(links)) {
    sitemapLinks = links.filter(link => {
      // Basic URL validation
      try {
        new URL(link);
        return !shouldSkipUrl(link);
      } catch {
        console.warn(`Skipping invalid URL: ${link}`);
        return false;
      }
    });
  } else {
    console.error("No valid sitemap links found. Make sure to run the sitemap command first.");
  }
} catch (error) {
  console.error("Error loading sitemap links:", error);
}

// Generate tests for each link or create a placeholder test if no links
if (sitemapLinks.length === 0) {
  test('No sitemap links available', async () => {
    test.skip(true, 'No sitemap links found. Run "npm run sitemap <url>" first to generate sitemap links.');
  });
} else {
  sitemapLinks.forEach((link: string) => {
  test(`Accessibility test for ${cleanUrlForTestName(link)}`, async ({ page }) => {
    // Set longer timeout for accessibility scans
    test.setTimeout(testConfig.timeout);
    
    console.log(`Testing accessibility for: ${link}`);
    
    try {
      // Navigate to the page
      await page.goto(link, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Wait for dynamic content to load
      await page.waitForTimeout(2000);
      
      // Run accessibility test
      await expect(page).toPassAxe({ 
        tags: axeConfig.tags,
        disabledRules: axeConfig.disabledRules,
        include: axeConfig.include,
        exclude: axeConfig.exclude,
      });
      
      console.log(`✅ Accessibility test passed for: ${link}`);
      
    } catch (error) {
      console.error(`❌ Accessibility test failed for: ${link}`);
      throw error;
    }
    });
  });
}

// Add a summary test to track overall results
test('Accessibility Test Summary', async () => {
  console.log(`
  📊 Accessibility Test Summary:
  - Total URLs tested: ${sitemapLinks.length}
  - WCAG Standards: ${axeConfig.tags.join(', ')}
  - Skipped URLs: ${testConfig.skipUrls.length}
  `);
});
