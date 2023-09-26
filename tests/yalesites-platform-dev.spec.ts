import { test, expect, type Page } from "@playwright/test";

const base_uri = "https://dev-yalesites-platform.pantheonsite.io";

const testScreenshotForPage = (pagePath) => {
  const url = `${base_uri}/${pagePath}`;

  return test(`should compare ${url}`, async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
};

testScreenshotForPage("welcome");
testScreenshotForPage("welcome/customize-confidence");
testScreenshotForPage("welcome/effortless-editing");
testScreenshotForPage("welcome/text-heavy-content");
testScreenshotForPage("welcome/centering-inclusivity");
testScreenshotForPage("welcome/contact-us");
testScreenshotForPage("administrative-office");
testScreenshotForPage("administrative-office/administrative-about-page");
testScreenshotForPage("administrative-office/administrative-text-only-page");
testScreenshotForPage("administrative-office/administrative-contact-us");
testScreenshotForPage("posts/2023-05-26-share-timely-updates");
testScreenshotForPage("events/2025-05-31-event-series-promote-your-event");
testScreenshotForPage("department-exploration");
testScreenshotForPage("department-exploration/academics");
testScreenshotForPage("department-exploration/diversity-and-inclusion");
testScreenshotForPage("department-exploration/department-contact-us");
testScreenshotForPage("generic-homepage");
testScreenshotForPage("generic-homepage/generic-about-page");
testScreenshotForPage("generic-homepage/generic-contact-us");
testScreenshotForPage("posts/2023-05-04-generic-example-post");
testScreenshotForPage("fancy-lab");
testScreenshotForPage("fancy-lab/lab-about-page");
testScreenshotForPage("fancy-lab/people");
testScreenshotForPage("fancy-lab/facilities");
testScreenshotForPage("fancy-lab/opportunities");
testScreenshotForPage("fancy-lab/research-areas");
testScreenshotForPage("kitchen-sink");
testScreenshotForPage("kitchen-sink/kitchen-sink-homepage");
testScreenshotForPage("text-heavy-kitchens");
testScreenshotForPage("interior-page");
testScreenshotForPage("deeper-kitchen-sink");
