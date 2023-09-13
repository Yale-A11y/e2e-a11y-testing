import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Result, NodeResult } from "axe-core";
import fs from "fs";

const links = fs
  .readFileSync("sitemap.links", "utf-8")
  .split("\n")
  .filter((link) => link !== "");

links.forEach((link) => {
  test(`Accessibility test for ${link}`, async ({ page }) => {
    await page.goto(link);
    const results = await new AxeBuilder({ page }).analyze();
    if (results.violations.length > 0) {
      console.log(`Violations for ${link}`);
      outputViolations(results.violations);
    }
    expect(results.violations.length).toBe(0);
  });
});

const outputViolations = (violations: Result[]) => {
  violations.forEach((violation) => outputViolation(violation));
};

const outputViolation = (violation: Result) => {
  let { id, impact, description, nodes } = violation;

  console.log(`\n`);
  console.log(`----------------------------------------`);
  console.log(`Violation: ${id} (${impact})`);
  console.log(`Description: ${description}`);
  console.log(`Affected nodes:`);
  outputNodes(nodes);
};

const outputNodes = (nodes: NodeResult[]) => {
  nodes.forEach((node) => outputNode(node));
};

const outputNode = (node: NodeResult) => {
    let { html, target } = node;

    console.log(`  ${target}`);
    console.log(`  ${html}`);
    console.log(`  ----------------`);
    console.log(`  ${node.failureSummary}`);
};

