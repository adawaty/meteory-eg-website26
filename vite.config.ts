import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Inject data-source attribute for AI agent source location
          "./scripts/babel-plugin-jsx-source-location.cjs",
        ],
      },
    }),
    tailwindcss(),
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  base: "./",
  server: {
    proxy: {
      // In local dev, proxy /api to scripts/dev-api.ts (port 8787)
      "/api": "http://localhost:8787",
    },
  },
  build: { outDir: "dist", emptyOutDir: true },
});
