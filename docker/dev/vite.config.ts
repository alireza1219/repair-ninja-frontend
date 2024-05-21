import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      port: 5173,
      clientPort: 5173,
      host: "localhost",
      protocol: "ws",
    },
    watch: {
      // For reference:
      // https://github.com/paulmillr/chokidar/issues/1051
      // https://github.com/vitejs/vite/issues/1153
      // usePolling leads to a high cpu usage.
      // But it was the only way to get the HMR to work in Windows when running the project using docker.
      usePolling: true,
      interval: 1000,
    },
  },
});
