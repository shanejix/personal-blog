/**
 * gatsby-config.js 文件是 Gatsby 会自动识别的另一个特殊文件。 要在这里添加插件和网站配置。
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 * 
 */

module.exports = {
  // 页面元数据（metadata）:帮助 Google 之类的搜索引擎理解页面内容，决定什么时候出现在搜索结果里的关键。
  siteMetadata: {
    title: `ShaneJix`,
    author: `shanejix`,
    description: `A simple description about author lots...`,
  },
  /* Your site config here */
  plugins: [
    // PWA
    // 配置一个 manifest.webmanifest 文件
    // https://www.gatsbyjs.cn/packages/gatsby-plugin-manifest/
    {
      resolve: `gatsby-plugin-manifest`,
      // 插件配置项：https://www.gatsbyjs.cn/packages/gatsby-plugin-manifest/?=gatsby-plugin-manifest#automatic-mode
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    // PWA
    // 添加离线支持:使 Gatsby 站点能够离线运行，并通过创建一个 service worker 使你的站点在糟糕网络状况下受到的影响更小。
    // https://www.gatsbyjs.cn/packages/gatsby-plugin-offline/
    // 离线插件应该放在清单插件 之后。以便离线插件可以缓存清单插件创建的 manifest.webmanifest。
    `gatsby-plugin-offline`,
    // SEO
    `gatsby-plugin-react-helmet`,
    // 数据源插件
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
      },
    },
    // Markdown 文件的数据转换插件
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          // to compress images and add responsive images with
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
          // Wraps iframes or objects (e.g. embedded YouTube videos) 
          // within markdown files 
          // in a responsive elastic container with a fixed aspect ratio
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          // Adds syntax highlighting to code blocks in markdown files using PrismJS.
          `gatsby-remark-prismjs`,
          // Copies local files linked to/from Markdown 
          `gatsby-remark-copy-linked-files`,
          // Replaces “dumb” punctuation marks with “smart” punctuation marks using the retext-smartypants plugin.
          `gatsby-remark-smartypants`,
        ],
      },
    },
    // Creates ImageSharp nodes from image types that are supported by the Sharp image
    // processing library and provides fields in their GraphQL types for processing your images
    // in a variety of ways including resizing, cropping, and creating responsive images.
    // https://image-processing.gatsbyjs.org/
    `gatsby-transformer-sharp`,
    // https://www.gatsbyjs.cn/packages/gatsby-plugin-sharp/?=gatsby-plugin-sharp
    `gatsby-plugin-sharp`,
    // css-in-js
    `gatsby-plugin-emotion`,
    // typography排版
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        // 配置文件目录
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
