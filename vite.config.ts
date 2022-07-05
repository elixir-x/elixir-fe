import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    https: {
      cert: process.env.ENVIRONMENT === 'local' ? readFileSync('./cert.pem') : '',
      key: process.env.ENVIRONMENT === 'local' ? readFileSync('./cert-key.pem') : '',
    }
  }
})
