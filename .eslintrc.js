module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:storybook/recommended'],
  rules: {
    'import/order': ['error', {
      groups: [['builtin', 'external'], ['internal'], ['sibling', 'parent', 'index']],
      pathGroups: [{
        pattern: 'react',
        group: 'external',
        position: 'before'
      }, {
        pattern: '@shared',
        group: 'internal'
      }],
      pathGroupsExcludedImportTypes: ['builtin'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc'
      }
    }]
  }
};