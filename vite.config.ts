// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact,
// tailwindcss, tsConfigPaths, cloudflare (build-only), componentTagger (dev-only),
// VITE_* env injection, @ path alias, React/TanStack dedupe, and error loggers.
// Use defineConfig({ vite: { ... } }) to add extra vite plugins / config as needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
