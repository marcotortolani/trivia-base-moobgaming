import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
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
    VitePWA({
      injectRegister: "script",
      registerType: "autoUpdate",
      devOptions: { enabled: false },
      includeAssets: ["/img/logo.webp"],
      manifest: {
        name: "Trivia Club Media Fest by MediaMoob",
        short_name: "Trivia ClubMediaFest",
        lang: "es",
        description: "Trivia Club Media Fest - Juego de preguntas con categorías - by Media Moob",
        theme_color: "#C46253",
        icons: [
          {
            src: "/img/logo.webp",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/img/logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
