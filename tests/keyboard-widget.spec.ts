import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.waitForLoadState('domcontentloaded');
  // Note: Must target body first in order for proper tabbing to happen.
  page.locator('body');
});

test('Keyboard can get to "Skip to main content" link', async ({ page }) => {
  await page.keyboard.press('Tab');
  expect(page.locator('#__docusaurus > div:nth-child(2) > a')).toBeFocused();
  expect(page.locator('#__docusaurus > div:nth-child(2) > a')).toHaveText('Skip to main content');
}); 

test('Keyboard can expand menu link groups', async ({ page }) => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  expect(page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Java' })).toBeVisible();
}); 
