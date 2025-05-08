import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";
/* ---------- shared patterns ---------- */

const basePatterns: RemotePattern[] = [
  { protocol: "https", hostname: "place-hold.it", pathname: "/**" },
  { protocol: "https", hostname: "assets.vercel.com", pathname: "/**" },
];

type Stage = "local" | "qa" | "production";

const STAGE_PATTERNS: Record<Stage, RemotePattern[]> = {
  local: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "3000",
      pathname: "/api/media/**",
    },
  ],

  qa: [
    {
      protocol: "https",
      hostname: "*.vercel.app", // wildcard OK
      pathname: "/api/media/**",
    },
  ],

  production: [
    {
      protocol: "https",
      hostname: "mth.co.uk", // @TOOD - TBC
      pathname: "/media/**",
    },
  ],
};

const stage: Stage = (process.env.NEXT_PUBLIC_STAGE as Stage) ?? "local";
const stagePatterns = STAGE_PATTERNS[stage] ?? [];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [...basePatterns, ...stagePatterns],
    // disable image optimisation on local
    unoptimized: stage === "local",
  },
  // eslint: { ignoreDuringBuilds: true }, // TODO: remove. Temporarily skip checks
  // typescript: { ignoreBuildErrors: true }, // TODO: remove. Temporarily skip checks
};

export default withPayload(nextConfig);
