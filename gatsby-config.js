/**
 * gatsby-config.js 文件是 Gatsby 会自动识别的另一个特殊文件。 要在这里添加插件和网站配置。
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 * 
 */

module.exports = {
  // 网站元数据
  siteMetadata: {
    title: `Title from siteMetadata`,
    author: `shanejixx`,
    contact: `github.com/shanejixx`,
  },
  /* Your site config here */
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        // 配置文件目录
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
