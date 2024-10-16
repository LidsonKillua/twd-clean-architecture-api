module.exports = {
    roots: ['<rootDir>/test'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^@test/(.*)$': '<rootDir>/test/$1',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts', 
      '!**/test/**', 
      '!**/config/**'
    ],
    preset: '@shelf/jest-mongodb',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Custom transformation for TypeScript files
    },
    setupFiles: ['dotenv/config'],
  
    clearMocks: true,
    collectCoverage: true,
    coverageProvider: 'v8',
    transformIgnorePatterns: ['<rootDir>/node_modules'], // Exclude a legacy library
  }