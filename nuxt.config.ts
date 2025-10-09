// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
//     devServer: {
//     host: '0.0.0.0',
//     port: 3000
//   },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    '~/assets/fonts/dm-sans.css'
  ],
    app: {
    head: {
        htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      link: [
        { rel: 'shortcut icon', href: 'https://www.milesweb.in/img-assets/favicon.ico' },
      ],
      meta: [
        { property: 'og:site_name', content: 'MilesWeb' },
        { property: 'og:url', content: 'https://www.milesweb.in' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://www.milesweb.in/assets/images/logo/milesweb-200x200.png' }
      ]
    }
  }
})
