module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest', // Para suportar arquivos JS
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios)', // Permite que o axios seja transformado pelo Jest
  ],
};
