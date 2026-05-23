import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Rollup 4 / Vite 7 compatible manualChunks.
 * Each key is a chunk name; the callback receives module info for placement.
 */
function manualChunks(id: string) {
  // vendor-ui: all Radix primitives, icon libs, shadcn utilities
  if (
    id.includes("node_modules") &&
    /(?:@radix-ui|lucide-react|clsx|tailwind-merge|cmdk|class-variance-authority)/.test(id)
  ) {
    return "vendor-ui";
  }
  // vendor-runtime: heavy runtime libraries
  if (
    id.includes("node_modules") &&
    /(?:recharts|@supabase)/.test(id)
  ) {
    return "vendor-runtime";
  }
  // vendor-react: React-router and peer libs
  if (
    id.includes("node_modules") &&
    /(?:react-router|react-transition-group|embla-carousel|react-day-picker)/.test(id)
  ) {
    return "vendor-react";
  }
  return undefined;
}

export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
});
