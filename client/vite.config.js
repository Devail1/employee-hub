import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import eslint from "vite-plugin-eslint";

import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), eslint(), tailwindcss()],
    server: {
      port: 3000,
      proxy: {
        "/api": "http://localhost:5000",
      },
    },
  };
});
