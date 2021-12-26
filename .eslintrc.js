module.exports = {
  extends: ['./packages/eslint-config/eslintrc.js', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {},
    },
  ],
};
