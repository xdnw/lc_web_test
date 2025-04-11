import * as path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from 'rollup-plugin-visualizer'; // Add this import
import devConfig from './env.dev';
import prodConfig from './env.prod';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const minify = true;
  const tsconfigPath = isDevelopment ? './tsconfig.dev.json' : './tsconfig.prod.json';
  // Import the appropriate config file based on mode
  const envConfig = isDevelopment ? devConfig : prodConfig;

  const processedEnvConfig = Object.fromEntries(
    Object.entries(envConfig).map(([key, value]) => {
      return [key, JSON.stringify(value)];
    })
  );
  processedEnvConfig['global'] = 'window';

  console.error('Vite Config:', processedEnvConfig); // Log the processed environment config

  return {
    define: processedEnvConfig,
    plugins: [
      tailwindcss(),
      react(),
      tsconfigPaths({ projects: [tsconfigPath] }),
      viteStaticCopy({
        targets: [
          {
            src: 'CNAME',
            dest: '.'
          }
        ]
      }),
      visualizer({ // Add the visualizer plugin
        filename: 'dist/stats.html', // Output path
        open: true, // Auto-open the report after build
        gzipSize: true, // Show gzipped sizes
        brotliSize: true, // Show brotli sizes
      }),
    ],
    base: '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: minify,
          drop_debugger: minify,
        }
      },
      minify: minify,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Create separate chunks for each icon
            if (id.includes('node_modules/lucide-react')) {
              return 'lucide-core';
            }

            // Other vendor chunks
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor';
            }

            if (id.includes('node_modules/clsx') ||
              id.includes('node_modules/tailwind-merge') ||
              id.includes('node_modules/msgpackr')) {
              return 'utils';
            }

            // @odiffey/discord-markdown
            if (id.includes('node_modules/@odiffey/discord-markdown')) {
              return 'discord-markdown';
            }
          },
        },
      },
    },
    chunkSizeWarningLimit: 600,
    esbuild: {
      target: 'es2020',
    },
    server: {
      hmr: true,
    },
  }
});

