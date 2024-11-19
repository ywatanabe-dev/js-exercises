export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testMatch: ['**/?(*.)+(test).(cjs|[jt]s?(x))'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};
