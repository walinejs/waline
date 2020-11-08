module.exports = {
  title: 'Waline',
  description: 'Simple Comment System inspired by Valine',
  themeConfig: {
    editLinks: true,
    repo: "https://github.com/lizheming/waline",
    // 默认为 "Edit this page"
    docsDir: "docs",
    editLinkText: "帮助我们改善此页面！",
    sidebar: [
      '/',
      '/why',
      '/quick-start',
      '/configuration',
      '/avatar',
      '/i18n',
      '/emoji',
      '/migration',
      '/api',
      '/cdn',
      '/faq'
    ]
  },
  plugin: [
    _ => ({
      enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js')
    })
  ]
}
