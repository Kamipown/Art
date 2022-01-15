module.exports = {
  outputDir: 'dist',
  publicPath: '/Art',
  configureWebpack: {
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
  }
}
