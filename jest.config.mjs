import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig({
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^next/image$": "<rootDir>/testMocks/nextImage",
    "^next/link$": "<rootDir>/testMocks/nextLink",
    "^next/router$": "<rootDir>/testMocks/nextRouter",

    "^@/(.*)$": "<rootDir>/$1",
    "^@frontend/(.*)$": "<rootDir>/src/app/(frontend)/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },

  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
});
