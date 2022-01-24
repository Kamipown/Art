module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    },
    plugins: [
      require('unplugin-auto-import/webpack')({
        include: [
          /\.[tj]sx?$/,
          /\.vue$/,
          /\.vue\?vue/,
          /\.md$/,
        ],
        imports: [
          'vue',
          'vuex',
          'vue-i18n',
          'vue-router'
        ]
      })
    ]
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles";
        `
      }
    }
  },
  devServer: {
    hot: true,
    liveReload: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true
      }
    }
  },
  outputDir: 'dist',
  publicPath: '/Art'
}
