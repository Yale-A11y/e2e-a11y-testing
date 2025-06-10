# E2E Accessibility Testing Tool

A comprehensive end-to-end accessibility testing tool built with Playwright and axe-core for automated WCAG compliance testing.

## 🌟 Features

- **Automated Accessibility Testing**: Uses axe-core for WCAG 2.1 AA compliance testing
- **Sitemap Testing**: Test entire websites by parsing sitemap.xml files
- **Visual Regression Testing**: Detect visual changes that might affect accessibility
- **Multiple Browser Support**: Test across Chromium, Firefox, and WebKit
- **CI/CD Ready**: GitHub Actions workflow included
- **Detailed Reporting**: HTML reports with accessibility violation details
- **Keyboard Navigation Testing**: Example tests for keyboard accessibility
- **One-Command Setup**: Automated setup script handles everything

## 📋 Requirements

- **Node.js**: >= 18.0.0
- **npm**: Latest version
- **xmllint**: For sitemap parsing (automatically checked during setup)

## 🚀 Quick Start

### **One-Command Setup** ⚡

```bash
# Clone the repository
git clone <your-repo-url>
cd e2e-a11y-testing

# Run the automated setup (handles everything!)
npm run setup
```

The setup script will:
- ✅ Check all prerequisites (Node.js, npm, xmllint)
- ✅ Install all dependencies
- ✅ Install Playwright browsers
- ✅ Set up configuration files
- ✅ Run initial verification tests
- ✅ Provide next steps

### **Start Testing Immediately**

After setup completes:

```bash
# Test a single page for accessibility
npm run a11y https://example.com

# Test an entire website via sitemap
npm run a11y https://example.com/sitemap.xml

# Run visual regression tests
npm run visreg https://example.com
```

## 📖 Usage

### Essential Commands

```bash
# Accessibility testing
npm run a11y <url>              # Test single page or sitemap
npm run visreg <url>             # Visual regression testing

# Development & maintenance
npm run setup                    # One-time setup
npm run verify                   # Verify installation
npm run lint                     # Check code quality
npm run lint:fix                 # Auto-fix style issues
npm run format                   # Format code with Prettier
npm run type-check               # TypeScript compilation check

# Advanced testing
npm run test                     # Run all Playwright tests
npm run test:headed              # Run tests with browser UI
npm run test:debug               # Debug mode
npm run show-report              # View detailed HTML reports
```

### Environment Configuration

Create a `.env` file to customize defaults:

```env
# Base URL for testing
TEST_URL=https://your-site.com

# Custom timeouts (milliseconds)
TEST_TIMEOUT=60000
NAVIGATION_TIMEOUT=30000

# Skip certain URL patterns
SKIP_URL_PATTERNS=/admin,/login,/private

# Browser preference
BROWSER=chromium
```

### Manual Installation (Alternative)

If you prefer manual setup:

```bash
npm install
npx playwright install
```

**Platform-specific requirements:**

**Ubuntu/Debian:**
```bash
sudo apt-get update && sudo apt-get install -y libxml2-utils
```

**macOS:**
```bash
brew install libxml2
```

## 🧪 Test Types

### 1. Accessibility Tests
- **WCAG 2.1 AA compliance** using axe-core
- **Color contrast** validation
- **Keyboard navigation** testing  
- **Screen reader compatibility**
- **Form labels and semantics**

### 2. Visual Regression Tests
- **Full-page screenshots** with baseline comparison
- **Layout change detection**
- **CSS modification tracking**
- **Cross-browser visual consistency**

### 3. Keyboard Navigation Tests
- **Tab order validation**
- **Focus management**
- **Skip link functionality**
- **Keyboard shortcut accessibility**

## 📊 Reports and Analysis

### HTML Reports

```bash
# Generate and view comprehensive reports
npm run test
npm run show-report
```

Reports include:
- **Test execution summary** with pass/fail status
- **Detailed accessibility violations** with remediation guidance  
- **Screenshots of failures** for visual debugging
- **Performance metrics** and execution times
- **Cross-browser comparison** results

### CI/CD Integration

The included GitHub Actions workflow provides:
- **Automated testing** on push/PR
- **Multi-browser testing** (Chrome, Firefox, Safari)
- **Accessibility report generation**
- **Visual regression detection**
- **Daily scheduled tests**
- **PR comments** with test results

## ⚙️ Configuration

### Accessibility Testing Configuration

Modify `tests/axe-sitemap.spec.ts`:

```typescript
const axeConfig = {
  // WCAG compliance levels
  tags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  
  // Disable problematic rules (use sparingly)
  disabledRules: ['color-contrast'], // Example
  
  // Test only specific areas
  include: ['.main-content'],
  
  // Exclude third-party content
  exclude: ['.third-party-widget'],
};
```

### Test Configuration

Customize test behavior:

```typescript
const testConfig = {
  timeout: 60000,           // Test timeout
  skipUrls: ['/admin'],     // URLs to skip
  retries: 1,               // Retry failed tests
};
```

## 🔧 Development

### Adding New Tests

```typescript
// tests/my-custom.spec.ts
import { test } from "@playwright/test";
import { expect } from "@support/a11y-page";

test('Custom accessibility test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toPassAxe({ 
    tags: ['wcag2aa'],
    exclude: ['.advertisement'] 
  });
});
```

### Code Quality Tools

```bash
# Check code quality
npm run lint                     # ESLint for JavaScript
npm run type-check               # TypeScript compiler
npm run format                   # Prettier formatting

# Auto-fix issues
npm run lint:fix                 # Fix JavaScript style issues
npm run format                   # Auto-format all files
```

## 🐛 Troubleshooting

### Common Setup Issues

**Setup script fails:**
```bash
# Re-run setup with verbose output
npm run setup

# Or install components manually
npm install
npx playwright install
```

**"No sitemap links found":**
```bash
# Make sure to generate sitemap first
npm run sitemap https://example.com/sitemap.xml
npm run a11y https://example.com/sitemap.xml
```

**"xmllint command not found":**
```bash
# Install xmllint (the setup script will warn you)
# Ubuntu/Debian: sudo apt-get install libxml2-utils
# macOS: brew install libxml2

# Or use the Node.js alternative
npm run sitemap-alt https://example.com/sitemap.xml
```

**Browser installation issues:**
```bash
# Reinstall browsers
npx playwright install --force

# Or run setup again
npm run setup
```

### Debug Mode

```bash
# Debug specific tests
npx playwright test --debug

# Run with verbose logging
DEBUG=pw:api npx playwright test

# Run in headed mode to see browser
npm run test:headed
```

### Verification

```bash
# Verify everything is working
npm run verify

# Check individual components
npm run type-check    # TypeScript compilation
npm run lint          # Code quality  
npm run test         # Run a test suite
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

### Development Workflow

1. Fork and clone the repository
2. Run setup: `npm run setup`
3. Create a feature branch
4. Make your changes
5. Run quality checks:
   ```bash
   npm run verify
   npm run lint:fix
   npm run format
   ```
6. Test your changes:
   ```bash
   npm run test
   npm run a11y https://example.com
   ```
7. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🔗 Resources

- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules Reference](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)

## 🚀 What's Next

After setup, try these example tests:

```bash
# Test popular websites
npm run a11y https://playwright.dev
npm run a11y https://github.com

# Test your own site
npm run a11y https://your-website.com

# Visual regression testing
npm run visreg https://your-website.com

# View detailed reports
npm run show-report
```

Happy accessibility testing! 🌟
