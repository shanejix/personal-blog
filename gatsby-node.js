/**
 * 每当创建新节点（或更新）时，Gatsby 都会调用 onCreateNode 函数。
 */

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

  // blog分页模板
  const postsPagination = path.resolve("./src/templates/postsPagination.js")
  // blogPost模板
  const blogPost = path.resolve(`./src/templates/blogPost.js`)
  // blog tags 模板
  const blogTags = path.resolve("./src/templates/blogTags.js")

  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  // console.log("result", JSON.stringify(result, null, 4))

  // all tags
  const tags = result.data.allMarkdownRemark.group
  // all posts
  const posts = result.data.allMarkdownRemark.edges

  // create posts pagination
  const postsPerPage = 7
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((ele, i) => {
    createPage({
      path: i === 0 ? `/posts` : `/posts/${i + 1}`,
      component: postsPagination,
      context: {
        currentPage: i + 1,
        totalPage: numPages,
        limit: postsPerPage,
        skip: i * postsPerPage,
      },
    })
  })

  // create blog tags pages
  tags.forEach(tag => {
    const total = tag.totalCount
    const numPages = Math.ceil(total / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/tags/${tag.fieldValue}`
            : `/tags/${tag.fieldValue}/${i + 1}`,
        component: blogTags,
        context: {
          tag: tag.fieldValue,
          currentPage: i + 1,
          totalPage: numPages,
          limit: postsPerPage,
          skip: i * postsPerPage,
        },
      })
    })
  })

  // create blog posts pages.
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    console.log("previous,next", previous, next)

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })
}
