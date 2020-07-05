import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

export default ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  console.log(" ,pageContext,previous, next", pageContext, previous, next)

  return (
    <Layout>
      {/* 通过向<SEO> 组件传入 props，可以实时更改博文的元数据。 */}
      {/* 在这种情况下，将使用博客标题 title 和 excerpt（如果存在于博客帖子markdown文件中） */}
      {/* 代替 gatsby-config.js 文件中默认 siteMetadata` 属性。 */}
      {/* https://www.gatsbyjs.cn/docs/add-seo-component/ */}
      {/* https://github.com/nfl/react-helmet#example */}
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>Bio</footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
            marginLeft: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
