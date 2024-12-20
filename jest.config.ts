import { JestConfigWithTsJest } from "ts-jest";

// NOTE: jest.config.ts を TypeScript で記述するためには ts-node が必要
export default {
  preset: "ts-jest/presets/js-with-ts-esm",
  // see default value: https://jestjs.io/docs/configuration#testmatch-arraystring
  testMatch: ["**/?(*.)+(test).(cjs|[jt]s?(x))"],
  testPathIgnorePatterns: ["/ch16/ex16/", "ch17/ex02", "final/*"],
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
} satisfies JestConfigWithTsJest;
