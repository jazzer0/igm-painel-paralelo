import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    host: "0.0.0.0",
    allowedHosts: [
      "painelparalelo.cfa.org.br",
      "localhost",
    ],
    proxy: {
      "/api": {
        target: "http://10.10.10.206:3000",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    },
  },
});
