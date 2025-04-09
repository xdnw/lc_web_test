import * as path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from 'rollup-plugin-visualizer'; // Add this import

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  const minify = isDevelopment || true;
  const tsconfigPath = isDevelopment ? './tsconfig.dev.json' : './tsconfig.prod.json';
  return {
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
    define: {
      'global': 'window',
      'process.env.BACKEND_URL': isDevelopment ? JSON.stringify('http://localhost:8080/') : JSON.stringify('https://api.locutus.link/'),
      'process.env.API_URL': isDevelopment ? JSON.stringify('http://localhost:8080/api/') : JSON.stringify('https://api.locutus.link/api/'),
      'process.env.EXTERNAL_URL': isDevelopment ? JSON.stringify('http://localhost:5173/') : JSON.stringify('https://www.locutus.link/'),
      'process.env.APPLICATION': JSON.stringify('Locutus'),
      'process.env.ADMIN_ID': JSON.stringify("664156861033086987"),
      'process.env.BOT_ID': isDevelopment ? JSON.stringify("949151508702826496") : JSON.stringify("672237266940198960"),
      'process.env.BOT_INVITE': isDevelopment ? JSON.stringify("https://discord.com/api/oauth2/authorize?client_id=949151508702826496&permissions=395606879321&scope=bot") : JSON.stringify("https://discord.com/api/oauth2/authorize?client_id=672237266940198960&permissions=395606879321&scope=bot"),
      'process.env.ADMIN_NATION': JSON.stringify(189573),
      'process.env.DISCORD_INVITE': JSON.stringify("cUuskPDrB7"),
      'process.env.EMAIL': JSON.stringify("jessepaleg@gmail.com"),
      'process.env.REPOSITORY_URL': JSON.stringify("https://github.com/xdnw/locutus"),
      'process.env.WIKI_URL': JSON.stringify("https://github.com/xdnw/locutus/wiki"),
      'process.env.BASE_PATH': JSON.stringify('/'),
      'process.env.GTAG_ID': JSON.stringify('G-4J3KV26E2Z'),
      'process.env.TEST': JSON.stringify(true),
    },
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

            if (id.includes('node_modules/react-syntax-highlighter')) {
              return 'syntax-highlighting';
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

