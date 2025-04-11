import * as path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from 'rollup-plugin-visualizer';
import devConfig from './env.dev';
import prodConfig from './env.prod';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const minify = true;
  const tsconfigPath = isDevelopment ? './tsconfig.dev.json' : './tsconfig.prod.json';
  const envConfig = isDevelopment ? devConfig : prodConfig;

  const processedEnvConfig = Object.fromEntries(
    Object.entries(envConfig).map(([key, value]) => {
      return [key, JSON.stringify(value)];
    })
  );
  processedEnvConfig['global'] = 'window';

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
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Your App Name',
          short_name: 'App',
          description: 'Your application description',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
        },
        workbox: {
          // GitHub Pages serves files with a specific base path
          // that corresponds to your repository name
          // This ensures service worker can handle requests correctly
          navigateFallback: 'index.html',
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        }
      })
    ],
    base: '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      reportCompressedSize: false,
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      sourcemap: isDevelopment,  // For production
      emptyOutDir: true,
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

