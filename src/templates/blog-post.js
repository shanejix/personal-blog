import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      {/* 通过向<SEO> 组件传入 props，可以实时更改博文的元数据。 */}
      {/* 在这种情况下，将使用博客标题 title 和 excerpt（如果存在于博客帖子markdown文件中） */}
      {/* 代替 gatsby-config.js 文件中默认 siteMetadata` 属性。 */}
      {/* https://www.gatsbyjs.cn/docs/add-seo-component/ */}
      {/* https://github.com/nfl/react-helmet#example */}
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      excerpt
    }
  }
`