import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    https: {
      cert: readFileSync('.././cert.pem'),
      key: readFileSync('.././cert-key.pem'),
    }
  }
})
