/** @type {import('./dist').JestConfigWithTsJest} */

module.exports = {
    roots: ['<rootDir>/src'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['<rootDir>/test/**/*.ts', '!**/test/**', '!**/config/**'],
    // preset: '@shelf/jest-postgres',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Custom transformation for TypeScript files
    },
  
    clearMocks: true,
    collectCoverage: true,
    coverageProvider: 'v8',
    transformIgnorePatterns: ['<rootDir>/node_modules'], // Exclude a legacy library
  }