const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8082,
    proxy: {
      '/wujing': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/wujing' : ''
        }
      }
    }
  }
})
