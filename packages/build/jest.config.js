module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/?(*.)+(unit|integration).js'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  testEnvironment: 'node',
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
};
