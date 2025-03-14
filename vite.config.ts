import path from "path";
// const path = require('path');
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tailwindcss from "@tailwindcss/vite";


export default defineConfig(({ mode }) => {
  const tsconfigPath = mode === 'development' ? './tsconfig.dev.json' : './tsconfig.prod.json';
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
    ],
    define: {
      'global': 'window',
      'process.env.BACKEND_URL': mode === 'development' ? JSON.stringify('http://localhost:8080/') : JSON.stringify('https://api.locutus.link/'),
      'process.env.API_URL': mode === 'development' ? JSON.stringify('http://localhost:8080/api/') : JSON.stringify('https://api.locutus.link/api/'),
      'process.env.EXTERNAL_URL': mode === 'development' ? JSON.stringify('http://localhost:5173/') : JSON.stringify('https://www.locutus.link/'),
      'process.env.APPLICATION': JSON.stringify('Locutus'),
      'process.env.ADMIN_ID': JSON.stringify("664156861033086987"),
      'process.env.BOT_ID': mode === 'development' ? JSON.stringify("949151508702826496") : JSON.stringify("672237266940198960"),
      'process.env.BOT_INVITE': mode === 'development' ? JSON.stringify("https://discord.com/api/oauth2/authorize?client_id=949151508702826496&permissions=395606879321&scope=bot") : JSON.stringify("https://discord.com/api/oauth2/authorize?client_id=672237266940198960&permissions=395606879321&scope=bot"),
      'process.env.ADMIN_NATION': JSON.stringify(189573),
      'process.env.DISCORD_INVITE': JSON.stringify("cUuskPDrB7"),
      'process.env.EMAIL': JSON.stringify("jessepaleg@gmail.com"),
      'process.env.REPOSITORY_URL': JSON.stringify("https://github.com/xdnw/locutus"),
      'process.env.WIKI_URL': JSON.stringify("https://github.com/xdnw/locutus/wiki"),
      'process.env.BASE_PATH': JSON.stringify('/'),
      'process.env.GTAG_ID': JSON.stringify('G-4J3KV26E2Z'),
      'process.env.TEST': JSON.stringify(true),
    },
    base: '/', // mode === 'development' ? '/' : '/lc_cmd_react/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      minify: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    esbuild: {
      target: 'es2020',
    },
    server: {
      hmr: true,
    }
  }
});

