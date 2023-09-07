# e2e-a11y-testing
Recommended end-to-end accessibility testing for web projects

## Requirements

* [nodejs: >= 16](https://nodejs.org/en)
* [pnpm](https://pnpm.io)

## Installation

To install, you'll need to clone the repository locally and change to the root directory of it.  Then run the following commands:

```bash
pnpm install
npx playwright install
```

## Running tests

To run all scripts:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test <relative_path_to_file>
```
