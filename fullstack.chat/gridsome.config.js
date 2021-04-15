// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const tailwindcss = require("tailwindcss")

module.exports = {
  siteName: 'Gridsome',
  icon: './src/favicon.png',
  plugins: [
    // {
    //   use: "gridsome-plugin-tailwindcss",
    //   // options: {
    //   //   shouldImport: true,
    //   //   shouldTimeTravel: true
    //   // }
    // }
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "src/docs/**/*.md",
        typeName: "Document",
        remark: {
          // remark options
        },
      },
    },
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss
        ],
      },
    },
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule("postcss-loader")
  //     .test(/.css$/)
  //     .use(["tailwindcss", "autoprefixer"])
  //     .loader("postcss-loader")
  // }
}
