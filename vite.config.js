import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 1. 新增這一行
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
     
    })
  ],
  server: {
    host: true
  }
})
