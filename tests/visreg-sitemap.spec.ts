import { test, expect } from "@playwright/test";
import fs from "fs";

const links = fs
  .readFileSync("sitemap.links", "utf-8")
  .split("\n")
  .filter((link) => link !== "");

links.forEach((link) => {
  test(`Visual Regression should compare ${link}`, async ({ page }) => {
    await page.goto(link);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});
