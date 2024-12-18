// NOTE: jest.config.ts を TypeScript で記述するためには ts-node が必要
export default {
  preset: "ts-jest/presets/js-with-ts-esm",
  // see default value: https://jestjs.io/docs/configuration#testmatch-arraystring
  testMatch: ["**/?(*.)+(test).(cjs|[jt]s?(x))"],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
