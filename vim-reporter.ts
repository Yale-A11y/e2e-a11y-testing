import type { Reporter,  TestCase, TestResult } from '@playwright/test/reporter';

export default class VimReporter implements Reporter {
  printsToStdio(): boolean {
    return true;
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status !== 'passed') {
      console.log(this.emacsOutput(test));
    }
  }

  private emacsOutput({ location, title }): string {
    return `${this.locationEmacsOutput(location)} ${title}`;
  }

  private locationEmacsOutput({ file, line, column}): string {
    return `${file}:${line}:${column}`;
  }
}
