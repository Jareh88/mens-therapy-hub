import "@testing-library/jest-dom";
import { loadEnvConfig } from "@next/env";

jest.mock("@payloadcms/richtext-lexical/react", () => ({
  __esModule: true,
  RichText: () => null,
}));

jest.mock("@frontend/_lib/payload", () => ({
  __esModule: true,
  getPayloadInstance: async () => ({}),
}));

loadEnvConfig(process.cwd());

declare global {
  interface Window {
    matchMedia: (query: string) => MediaQueryList;
  }
}
window.matchMedia ??= () =>
  ({
    matches: false,
    addListener: () => undefined,
    removeListener: () => undefined,
  }) as unknown as MediaQueryList;
