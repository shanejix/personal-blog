import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from "react-helmet"
import Layout from "../components/layout"
import CrayonsStory from "../components/crayonsStory"

const BlogTags = props => {
  const { data } = props
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges
  const { totalPage, currentPage, tag } = props.pageContext

  return (
    <Layout>
      <Helmet
        htmlAttributes={{ lang: "en" }}
        meta={[{ name: "description", content: siteDescription }]}
        title={siteTitle}
      />
      {posts.map((post, idx) => {
        const { node } = post
        const title = node.frontmatter.title || node.fields.slug
        const date = node.frontmatter.date
        const slug = node.fields.slug
        const tags = node.frontmatter.tags || []
        return (
          <CrayonsStory
            key={idx}
            title={title}
            date={date}
            slug={slug}
            tags={tags}
          />
        )
      })}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          listStyle: "none",
          padding: 0,
        }}
      >
        <div>
          {currentPage - 1 > 0 && (
            <Link
              to={
                `/tags/${tag}/` + (currentPage - 1 === 1 ? "" : currentPage - 1)
              }
              rel="prev"
            >
              ← 上一页
            </Link>
          )}
        </div>
        <div>
          {currentPage + 1 <= totalPage && (
            <Link to={`/tags/${tag}/` + (currentPage + 1)} rel="next">
              下一页 →
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BlogTags

export const pageQuery = graphql`
  query($tag: String!, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
