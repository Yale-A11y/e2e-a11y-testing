import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const base_uri = "https://yalesites.yale.edu";

const testPageAxe = (pagePath) => {
  const url = `${base_uri}/${pagePath}`;

  return test(`should not have a11y issue on ${url}`, async ({ page }) => {
    await page.goto(url);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
};

testPageAxe("");
testPageAxe("our-vision-guiding-principles");
testPageAxe("resource-library");
testPageAxe("community-trainings");
testPageAxe("find-support");
testPageAxe("announcements");
testPageAxe("self-service-quick-start-guide");
testPageAxe("building-blocks");
testPageAxe("how-conduct-content-audit");
