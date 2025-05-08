"use client";

import * as React from "react";
import { ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";

// Create one Emotion cache per request (server) or per tab (client).
function createEmotionCache() {
  const cache = createCache({ key: "mui" });
  cache.compat = true; // keeps insertion order predictable in app‑router
  return cache;
}

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const { cache } = React.useMemo(() => ({ cache: createEmotionCache() }), []);

  useServerInsertedHTML(() => {
    const css = Object.values(cache.inserted)
      .filter((v): v is string => typeof v === "string") // narrow to strings
      .join(" ");

    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
        dangerouslySetInnerHTML={{ __html: css }}
      />
    );
  });

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true, key: "mui" }}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </AppRouterCacheProvider>
  );
}
