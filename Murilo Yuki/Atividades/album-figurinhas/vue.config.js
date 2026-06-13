const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://v3.football.api-sports.io',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },
      '/img-proxy': {
        target: 'https://media.api-sports.io',
        changeOrigin: true,
        pathRewrite: { '^/img-proxy': '' },
        headers: {
          'x-apisports-key': 'd874b37d33bd55e4d9494e7bbd4d4033'
        }
      }
    }
  }
})