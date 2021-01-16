// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'fullstack.chat',
  siteUrl: 'https://fullstack.chat',
  icon: {
    favicon: './static/assets/images/logo-2.png',
    touchicon: './static/assets/images/logo-2.png'
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'src/docs/**/*.md',
        typeName: 'Document',
        remark: {
          // remark options
        }
      }
    }
  ],
  transformers: {
    remark: {
      // global remark options
    }
  }
}
