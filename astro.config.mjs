import { defineConfig, passthroughImageService } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false
  },
  image: {
    service: passthroughImageService()
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/global.scss";`,
        },
      },
    },
  },
})
