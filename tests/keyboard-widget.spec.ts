import { test, expect } from '@playwright/test';

// Safari uses Alt+Tab vs Tab for webkit
function tabKeyForBrowser(browserType: string) {
  let key = "Tab";
  if (browserType === 'webkit') {
    key = "Alt+Tab";
  }

  return key;
}

// Set globally so we can reuse this throughout our tests.
let tabKey: string;
test.beforeEach(async ({ page, defaultBrowserType }) => {
  // Webkit uses Alt+Tab over Tab to traverse, so we capture this before a test is done.
  tabKey = tabKeyForBrowser(defaultBrowserType);
});

test.describe('Keyboard widget', () => {
  test.beforeEach(async ({ page, defaultBrowserType }) => {
    await page.goto('https://playwright.dev/');
    await page.waitForLoadState('domcontentloaded');
    // Note: Must target body first in order for proper tabbing to happen.
    page.locator('body');
  });

  test('Keyboard can get to "Skip to main content" link', async ({ page }) => {
    await page.keyboard.press(tabKey);
    // Copy/pasted selector from dev tools.
    await expect(page.locator('#__docusaurus > div:nth-child(2) > a')).toBeFocused();
    await expect(page.locator('#__docusaurus > div:nth-child(2) > a')).toHaveText('Skip to main content');
  }); 

  test('Keyboard can expand menu link groups', async ({ page, isMobile }) => {
    if (isMobile) {
      // Note: as of the writing of this test, this WILL fail on mobile. 
      // Playwright's site does not target the menu to be expanded on mobile
      // using keyboard.
      // This is to illistrate how to handle dfferent cases for mobile and
      // desktop.
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press('Enter');
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
    } else {
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press(tabKey);
      await page.keyboard.press('Enter');
    }
    // Copy/pasted label from Playwright UI's target feature.
    await expect(page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Java' })).toBeVisible();
  }); 
});
