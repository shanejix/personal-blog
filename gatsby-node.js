// 每当创建新节点（或更新）时，Gatsby 都会调用 onCreateNode 函数。

const path = require(`path`)

// gatsby-source-filesystem 插件附带了创建 slug 的功能
const { createFilePath } = require(`gatsby-source-filesystem`)

// 创建节点
exports.onCreateNode = ({ node, getNode, actions }) => {
  /**
   * 允许你在其他插件创建的节点里创建其他字段
   * 只有节点的原始创建者才能直接修改该节点
   * ——所有其他插件（包括你的gatsby-node.js）都必须使用此函数来创建额外字段。
   */
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent)
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// 创建页面
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  console.log('result',JSON.stringify(result, null, 4))
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}
