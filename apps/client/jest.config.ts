import type { Config } from 'jest';

const config: Config = {
   testEnvironment: 'jsdom',
   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
   transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
   },
   moduleNameMapper: {
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@lib/(.*)$': '<rootDir>/src/lib/$1',
      '^@types/(.*)$': '<rootDir>/src/types/$1'
   }
};

export default config;
