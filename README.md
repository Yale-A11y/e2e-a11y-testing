# e2e-a11y-testing

Recommended end-to-end accessibility testing for web projects

## Requirements

* [nodejs: >= 16](https://nodejs.org/en)
* A package manager:
  * [npm](https://www.npmjs.com)
  * [pnpm](https://pnpm.io)
  * [yarn](https://yarnpkg.com)

## Installation

To install, you'll need to clone the repository locally and change to the root
directory of it.  Then run the following commands:

### For `npm`

```bash
npm install
npx playwright install
```

### For `pnpm`

```bash
pnpm install
npx playwright install
```

### For `yarn`

```bash
yarn install
yarn playwright install
```

## Running tests

### pnpm/npm

To run all tests:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test <relative_path_to_file>
```

### yarn

To run all tests:

```bash
yarn playwright test
```

To run a specific test file:

```bash
yarn playwright test <relative_path_to_file>
```
