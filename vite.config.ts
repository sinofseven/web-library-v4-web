import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: true,
    allowedHosts: ["vite.luciferous.app"],
    proxy: {
      "/api": "http://localhost:8786",
    },
  },
});
