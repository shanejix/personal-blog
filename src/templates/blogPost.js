import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Panel from "../components/panel"
import { rhythm, scale } from "../utils/typography"
import SEO from "../components/seo"
import Bio from "../components/bio"
import { formatReadingTime } from "../utils/helper"

const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`

export default ({ data, pageContext }) => {
  console.log("data", data)
  const post = data.markdownRemark
  const { edges } = data.allMarkdownRemark
  const { previous, next } = pageContext

  let timeToRead
  edges.forEach(({ node }) => {
    if (node.id === post.id) {
      timeToRead = node.timeToRead
    }
  })

  let postUrl = post.frontmatter.url
  postUrl = "https://" + postUrl.slice(12).replace(/\/repos/g, "")

  return (
    <Layout>
      {/* 通过向<SEO> 组件传入 props，可以实时更改博文的元数据。 */}
      {/* 在这种情况下，将使用博客标题 title 和 excerpt（如果存在于博客帖子markdown文件中） */}
      {/* 代替 gatsby-config.js 文件中默认 siteMetadata` 属性。 */}
      {/* https://www.gatsbyjs.cn/docs/add-seo-component/ */}
      {/* https://github.com/nfl/react-helmet#example */}
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <article
        style={{
          // border: `1px solid black`,
          borderRadius: `3px`,
          marginBottom: `0.5rem`,
          // background: `white`,
          fontSize: `1rem`,
          padding: `0 1rem`,
        }}
      >
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
              marginTop: rhythm(0.5),
            }}
          >
            <span>create:{post.frontmatter.date}</span>
            &nbsp;&nbsp;
            <span>update:{post.frontmatter.update}</span>
            &nbsp;&nbsp;
            <span>
              {" • "}
              {formatReadingTime(timeToRead)}
            </span>
          </p>
        </header>

        <div className="translations">
          <Panel style={{ fontFamily: systemFont }}>
            原文链接:&nbsp;&nbsp;
            <a href={postUrl}>{postUrl}</a>
          </Panel>
        </div>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
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
            {next && (
              <Link to={next.fields.slug} rel="next">
                ← {next.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title}→
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
    allMarkdownRemark {
      edges {
        node {
          id
          timeToRead
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        update(formatString: "MMMM DD, YYYY")
        url
      }
    }
  }
`
