import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    host: true
  },
  base: "./",
  plugins: [
    preact(),
  ],
});
