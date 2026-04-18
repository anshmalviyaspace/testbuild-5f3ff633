import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react";
          }
          if (id.includes("node_modules/react-router")) {
            return "react-router";
          }
          if (id.includes("node_modules/@supabase")) {
            return "supabase";
          }
          if (id.includes("node_modules/@radix-ui") || 
              id.includes("node_modules/recharts") ||
              id.includes("node_modules/cmdk") ||
              id.includes("node_modules/date-fns")) {
            return "ui-libs";
          }
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
          // Feature-based chunks
          if (id.includes("components/landing")) {
            return "landing";
          }
          if (id.includes("components/community")) {
            return "community";
          }
          if (id.includes("components/track")) {
            return "track";
          }
          if (id.includes("pages/LoginPage") || 
              id.includes("pages/SignupPage") ||
              id.includes("pages/OnboardingPage")) {
            return "auth";
          }
          if (id.includes("contexts/AuthContext")) {
            return "auth";
          }
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
    chunkSizeWarningLimit: 800,
    minify: "esbuild",
  },
}));
