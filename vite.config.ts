import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
// import legacy from '@vitejs/plugin-legacy';

export default defineConfig(({ mode }) => {
  const tsconfigPath = mode === 'development' ? './tsconfig.dev.json' : './tsconfig.prod.json';
  return {
    plugins: [
      react(),
      tsconfigPaths({ projects: [tsconfigPath] }),
      // legacy({
      //   targets: ['defaults', 'not IE 11'],
      //   polyfills: ['es/object/has-own'],
      //   modernPolyfills: ['es/object/has-own'],
      // })
    ],
    define: {
      'global': 'window',
      // dev values
      // 'process.env.API_URL': JSON.stringify('http://localhost/api/'),
      // 'process.env.EXTERNAL_URL': JSON.stringify('http://localhost:5173/'),
      // prod values
      // 'process.env.API_URL': JSON.stringify('https://api.locutus.link'),
      // 'process.env.EXTERNAL_URL': JSON.stringify('https://www.locutus.link/'),
      'process.env.API_URL': mode === 'development' ? JSON.stringify('http://localhost/api/') : JSON.stringify('https://api.locutus.link'),
      'process.env.EXTERNAL_URL': mode === 'development' ? JSON.stringify('http://localhost:5173/') : JSON.stringify('https://www.locutus.link/'),
      'process.env.APPLICATION': JSON.stringify('Locutus'),
      'process.env.ADMIN_ID': JSON.stringify("664156861033086987"),
      'process.env.ADMIN_NATION': JSON.stringify(189573),
      'process.env.DISCORD_INVITE': JSON.stringify("cUuskPDrB7"),
      'process.env.EMAIL': JSON.stringify("jessepaleg@gmail.com"),
      'process.env.REPOSITORY_URL': JSON.stringify("https://github.com/xdnw/locutus"),
      'process.env.WIKI_URL': JSON.stringify("https://github.com/xdnw/locutus/wiki"),
      'process.env.BOT_INVITE': JSON.stringify("https://discord.com/api/oauth2/authorize?client_id=672237266940198960&permissions=395606879321&scope=bot"),
    },
    base: mode === 'development' ? '/' : '/lc_cmd_react/',
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