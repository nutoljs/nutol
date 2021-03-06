module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['**/?(*.)+(spec|test|unit|integration).[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', 'dist'],
  testEnvironment: 'node',
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
};
