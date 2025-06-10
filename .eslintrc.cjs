module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    // Basic code quality rules
    'no-unused-vars': 'warn',
    'no-undef': 'error', 
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Relaxed style rules for better development experience
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single', { allowTemplateLiterals: true }],
    'indent': ['warn', 2],
  },
  ignorePatterns: [
    'node_modules/',
    'test-results/',
    'playwright-report/',
    'dist/',
    '*.d.ts',
    // Skip TypeScript files - let TypeScript compiler handle them
    '*.ts',
    '**/*.ts',
  ],
  overrides: [
    {
      // Allow console in script files and configuration files
      files: [
        'scripts/**/*', 
        'sitemap.js',
      ],
      rules: {
        'no-console': 'off',
      },
    },
  ],
};
