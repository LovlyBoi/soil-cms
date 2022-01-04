const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    devServer: {
      port: 9000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://120.79.189.55:8079/content1-2.0/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
  }
}