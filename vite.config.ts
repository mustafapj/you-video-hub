import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // تم التغيير من plugin-react-swc إلى plugin-react
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), // الآن يستخدم Babel بدلاً من SWC
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));