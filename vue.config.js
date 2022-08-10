const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
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
