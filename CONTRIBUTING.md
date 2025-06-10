# Contributing to E2E Accessibility Testing Tool

Thank you for your interest in contributing to our accessibility testing tool! We welcome contributions from the community to make this project better.

## 📋 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or pnpm
- Git
- xmllint (for sitemap parsing)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/your-username/e2e-a11y-testing.git
   cd e2e-a11y-testing
   ```

2. **Install dependencies**
   ```bash
   npm install
   npx playwright install
   ```

3. **Run the development checks**
   ```bash
   npm run lint
   npm run type-check
   npm run format
   ```

## 🛠️ Development Workflow

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

3. **Test your changes**
   ```bash
   # Run linting
   npm run lint

   # Type checking
   npm run type-check

   # Format code
   npm run format

   # Run tests
   npm test

   # Test with a real website
   npm run sitemap https://example.com
   npm run a11y https://example.com
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new accessibility rule for forms"
   # or
   git commit -m "fix: resolve sitemap parsing issue"
   ```

### Commit Message Format

We use conventional commits. Please format your commit messages as:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add WCAG 2.2 compliance testing
fix: resolve timeout issues in visual regression tests
docs: update installation instructions for macOS
test: add unit tests for sitemap parsing
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/axe-sitemap.spec.ts

# Run tests in headed mode (for debugging)
npx playwright test --headed

# Run tests with specific browser
npx playwright test --project=firefox
```

### Writing Tests

When adding new test functionality:

1. **Accessibility Tests**: Add to `tests/` directory
2. **Support Functions**: Add to `support/` directory
3. **Example Tests**: Add to `tests/tests-examples/` directory

Example test structure:
```typescript
import { test } from "@playwright/test";
import { expect } from "@support/a11y-page";

test.describe('My new accessibility feature', () => {
  test('should pass accessibility checks', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toPassAxe({ 
      tags: ['wcag2aa'],
      // Add any specific configuration
    });
  });
});
```

## 📝 Documentation

### Documentation Standards

- Update README.md for user-facing changes
- Add JSDoc comments for new functions
- Update configuration examples when changing configs
- Include troubleshooting information for common issues

### Writing Documentation

- Use clear, concise language
- Include code examples
- Provide both simple and advanced usage examples
- Update the troubleshooting section for new known issues

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment information**:
   - OS (macOS, Windows, Linux)
   - Node.js version
   - Browser versions
   - npm/pnpm version
5. **Error messages** or logs
6. **Screenshots** if applicable

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
1. Run command: `npm run a11y https://example.com`
2. See error: ...

**Expected behavior**
What you expected to happen.

**Environment:**
- OS: macOS 13.0
- Node.js: 18.17.0
- Browser: Chrome 118.0
- npm: 9.8.1

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check existing issues to avoid duplicates
2. Clearly describe the feature and its benefits
3. Provide use cases or examples
4. Consider implementation complexity
5. Be open to discussion and iteration

## 🔍 Code Review Process

### What We Look For

- **Code Quality**: Clean, readable, maintainable code
- **Testing**: Adequate test coverage for new features
- **Documentation**: Updated docs for user-facing changes
- **Performance**: Efficient implementations
- **Accessibility**: Features that improve accessibility testing

### Review Guidelines

- Be respectful and constructive
- Focus on the code, not the person
- Explain the "why" behind suggestions
- Be open to learning and teaching

## 🏷️ Release Process

1. Features are merged to `develop` branch
2. Regular releases are cut from `develop` to `main`
3. Versioning follows semantic versioning (semver)
4. Release notes are generated from commit messages

## 📞 Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open a GitHub Issue
- **Security Issues**: Email maintainers directly

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- [ ] Additional WCAG 2.2 rule implementations
- [ ] Performance optimizations for large sitemaps
- [ ] Mobile accessibility testing improvements
- [ ] Better error handling and user feedback

### Medium Priority
- [ ] Integration with popular CMS platforms
- [ ] Custom rule configuration system
- [ ] PDF accessibility testing
- [ ] Accessibility metrics and scoring

### Documentation
- [ ] Video tutorials
- [ ] Best practices guide
- [ ] Integration examples with popular frameworks
- [ ] Troubleshooting guide expansion

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub repository insights

Thank you for contributing to making the web more accessible! 🌟
