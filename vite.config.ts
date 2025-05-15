import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        app: "/src/app",
        features: '/src/features',
        shared: '/src/shared',
        store: '/src/store',
        utils: '/src/utils',
        hooks: '/src/hooks',
      }
    },
    server: {
      port: 3003,
    }
  }
})
