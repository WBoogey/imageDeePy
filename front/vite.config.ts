import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // server: {
  //   host: true,               
  //   port: 5173,                
  //   allowedHosts: ['cccd-185-226-32-80.ngrok-free.app'],  
  //   hmr: {
  //     host: 'Cloudvision.cccd-185-226-32-80.ngrok-free.app',     
  //     clientPort: 443,         
  //   },
  // },
})