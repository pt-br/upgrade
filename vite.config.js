import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";

// Display localhost instead of 127.0.0.1 for CORS purposes.
// See [this](https://vitejs.dev/config/server-options.html#server-host).
dns.setDefaultResultOrder("verbatim");

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3001/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    plugins: [react()],
  };
});
