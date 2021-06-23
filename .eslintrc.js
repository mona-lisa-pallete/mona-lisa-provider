module.exports = {
  extends: [
    'eslint-config-ali/typescript/react',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 1,
    'import/no-cycle': 'off',
    'prettier/prettier': 'error',
    'react/prop-types': 0,
  },
};
