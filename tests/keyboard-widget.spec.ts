import { test, expect } from '@playwright/test';

test.describe('Keyboard widget', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.waitForLoadState('domcontentloaded');
    // Note: Must target body first in order for proper tabbing to happen.
    page.locator('body');
  });

  test('Keyboard can get to "Skip to main content" link', async ({ page, isMobile }) => {
    if (isMobile) {
      return;
    }

    await page.keyboard.press('Tab');
    await expect(page.locator('#__docusaurus > div:nth-child(2) > a')).toBeFocused();
    await expect(page.locator('#__docusaurus > div:nth-child(2) > a')).toHaveText('Skip to main content');
  }); 

  test('Keyboard can expand menu link groups', async ({ page, isMobile }) => {
    if (isMobile) {
      return;
    }

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Java' })).toBeVisible();
  }); 
});
