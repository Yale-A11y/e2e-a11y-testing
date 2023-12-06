import { expect as baseExpect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { Result, NodeResult, AxeResults } from "axe-core";

/*
 * Output axe result violations in a format that is easier to read.
 *
 * @param {Result[]} violations - An array of violations
 * @param {integer} indentation - the number of 2 spaces to use as indention to
 *                                output
 *
 * @returns {string} - A string with the violations formatted for output.
 *
 */
const violationOutput = {
  outputViolations: (violations: Result[]) => {
    return violations
      .map((violation) => violationOutput._outputViolation(violation))
      .join("\n");
  },

  _outputViolation: (violation: Result, indentation = 0) => {
    let { id, impact, description, nodes } = violation;
    const indentedString = violationOutput.createIndentation(indentation);

    return `
${indentedString}--------------------------------------------------------------------------------
${indentedString}Violation: ${id} (${impact})
${indentedString}Description: ${description}
${indentedString}Affected nodes:
${indentedString}${violationOutput._outputNodes(nodes, indentation + 1)}
    `;
  },

  _outputNodes: (nodes: NodeResult[], indentation = 0) => {
    return Array.from(nodes, (node) =>
      violationOutput._outputNode(node, indentation),
    ).join("\n");
  },

  _outputNode: (node: NodeResult, indention = 0) => {
    let { html, target } = node;

    let indentionString = "  ".repeat(indention);

    return `
${indentionString}----------------------------------------
${indentionString}${target}
${indentionString}${html}

${indentionString}${node.failureSummary}
    `;
  },
  createIndentation(indention: number) {
    return "  ".repeat(indention);
  },
};

/*
 * Extend the expect object with a new matcher to check for accessibility.
 *
 * @param {Page} page - The page to test
 * @param {string[]} tags - An array of axe tags to test against
 *
 * @returns {object} - An object with the pass/fail results of the test.
 */
export const expect = baseExpect.extend({
  async toPassAxe(
    page: Page,
    options: {
      tags: Array<string>;
      options?: { timeout?: number };
      outputBuffer?: typeof violationOutput;
    },
  ) {
    if (!options.outputBuffer) {
      options.outputBuffer = violationOutput;
    }

    const { tags, options: axePageOptions, outputBuffer } = options;
    const axePage = new AxePage(page, { tags, ...axePageOptions });
    let pass: boolean;
    let matcherResult: any;
    const expected = 0;

    const results = await axePage.evaluate();

    try {
      baseExpect(results.violations.length).toBe(0);
      pass = true;
    } catch (e: any) {
      pass = false;
      matcherResult = e.matcherResult;
    }

    const message = pass
      ? () => "True"
      : () => {
          return outputBuffer.outputViolations(results.violations);
        };

    return {
      message,
      pass,
      name: "toBeAccessible",
      expected,
      actual: matcherResult?.actual,
    };
  },
});

/*
 * A wrapper around axe-core/playwright to make it easier to use.
 */
export class AxePage {
  private readonly axeBuilder: AxeBuilder;
  public results: AxeResults;

  constructor(
    public readonly page: Page,
    public readonly options = { tags: [] as string[] },
  ) {
    let axeBuilder = new AxeBuilder({ page });

    if (options.tags && options.tags.length > 0) {
      axeBuilder.withTags(options.tags);
    }

    this.axeBuilder = axeBuilder;
  }

  async evaluate(): Promise<AxeResults> {
    this.results = await this.axeBuilder.analyze();
    return this.results;
  }
}

