import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@assets": "/src/assets",
      "@types": "/src/types",
      "@styles": "/src/styles",
      "@services": "/src/services",
      "@contexts": "/src/contexts",
    },
  },
  build: {
    outDir: "build",
  },
});
