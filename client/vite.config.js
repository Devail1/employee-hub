import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      proxy: {
        "/api": "http://localhost:5000",
      },
    },
  };
});
