import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
// import createHTMLReport from "axe-html-reporter";

const base_uri = "https://dev-yalesites-platform.pantheonsite.io";

const testPageAxe = (pagePath: string) => {
  const url = `${base_uri}/${pagePath}`;

  return test(`should not have a11y issue on ${url}`, async ({
    page,
  }, testInfo) => {
    await page.goto(url);
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Convert JSON to HTML table
    const tableHTML = `<table>
  <thead>
    <tr>
      <th>Rule</th>
      <th>Impact</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    ${accessibilityScanResults.violations
      .map(
        (violation) => `
          <tr>
            <td>${violation.id}</td>
            <td>${violation.impact}</td>
            <td>${violation.description}</td>
          </tr>`
      )
      .join("")}
  </tbody>
</table>`;

    // attach full test results (not just violations)
    // await testInfo.attach("accessibility-scan-results", {
    //   body: JSON.stringify(accessibilityScanResults, null, 2),
    //   contentType: "application/json",
    // });

    // attach HTML table
    await testInfo.attach("tableHTML", {
      body: tableHTML,
      contentType: "text/html",
    });
    expect(accessibilityScanResults.violations).toEqual([]);
  });
};

testPageAxe("welcome");
testPageAxe("welcome/customize-confidence");
testPageAxe("welcome/effortless-editing");
testPageAxe("welcome/text-heavy-content");
testPageAxe("welcome/centering-inclusivity");
testPageAxe("welcome/contact-us");
testPageAxe("administrative-office");
testPageAxe("administrative-office/administrative-about-page");
testPageAxe("administrative-office/administrative-text-only-page");
testPageAxe("administrative-office/administrative-contact-us");
testPageAxe("posts/2023-05-26-share-timely-updates");
testPageAxe("events/2025-05-31-event-series-promote-your-event");
testPageAxe("department-exploration");
testPageAxe("department-exploration/academics");
testPageAxe("department-exploration/diversity-and-inclusion");
testPageAxe("department-exploration/department-contact-us");
testPageAxe("generic-homepage");
testPageAxe("generic-homepage/generic-about-page");
testPageAxe("generic-homepage/generic-contact-us");
testPageAxe("posts/2023-05-04-generic-example-post");
testPageAxe("fancy-lab");
testPageAxe("fancy-lab/lab-about-page");
testPageAxe("fancy-lab/people");
testPageAxe("fancy-lab/facilities");
testPageAxe("fancy-lab/opportunities");
testPageAxe("fancy-lab/research-areas");
testPageAxe("kitchen-sink");
testPageAxe("kitchen-sink/kitchen-sink-homepage");
testPageAxe("text-heavy-kitchens");
testPageAxe("interior-page");
testPageAxe("deeper-kitchen-sink");
