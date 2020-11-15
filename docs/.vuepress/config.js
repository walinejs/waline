module.exports = {
  title: 'Waline',
  description: 'Simple Comment System inspired by Valine',
  themeConfig: {
    editLinks: true,
    repo: "https://github.com/lizheming/waline",
    logo: "https://p5.ssl.qhimg.com/t01ec54674f5912eea9.png",
    docsDir: "docs",
    editLinkText: "帮助我们改善此页面！",
    sidebar: [
      '/',
      '/why',
      '/quick-start',
      '/configuration',
      '/avatar',
      '/i18n',
      '/visitor',
      '/emoji',
      '/notification',
      '/migration',
      '/api',
      '/cdn',
      '/databases',
      '/vps-deploy',
      '/development',
      '/faq'
    ]
  },
  plugin: [
    _ => ({
      enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js')
    })
  ]
}
