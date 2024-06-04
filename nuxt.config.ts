// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt', 
    '@nuxtjs/style-resources', 
    "@nuxtjs/i18n"
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_main.scss" as *;'
        }
      }
    }
  }
})