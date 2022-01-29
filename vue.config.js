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
  outputDir: 'build',
  publicPath: '/Art'
}
