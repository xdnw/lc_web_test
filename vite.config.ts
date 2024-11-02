import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      'global': 'window', // Map global to window
      'process.env.API_URL': JSON.stringify('http://localhost/api/'),
      'process.env.EXTERNAL_URL': JSON.stringify('http://localhost:5173/'),
    },
    base: mode === 'development' ? '/' : '/lc_cmd_react/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})