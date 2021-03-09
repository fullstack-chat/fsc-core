// const tailwind = require("tailwindcss");
// const purgecss = require("@fullhuman/postcss-purgecss");

// const postcssPlugins = [tailwind()];

// if (process.env.NODE_ENV === "production")
//   postcssPlugins.push(purgecss(require("./purgecss.config.js")));

const tailwindcss = require("tailwindcss")

module.exports = {
  siteName: "fullstack.chat",
  siteUrl: "https://fullstack.chat",
  icon: {
    favicon: "./static/assets/images/logo-2.png",
    touchicon: "./static/assets/images/logo-2.png",
  },
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: postcssPlugins,
  //     },
  //   },
  // },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          tailwindcss
        ],
      },
    },
  },
  plugins: [
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
    // {
    //   use: "gridsome-plugin-tailwindcss",
    //   // options: {
    //   //   shouldImport: true,
    //   //   // shouldTimeTravel: true
    //   // }
    // }
  ],
  transformers: {
    remark: {
      // global remark options
    },
  },
};
