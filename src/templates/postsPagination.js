import React from "react"
import { Link, graphql } from "gatsby"
// https://www.npmjs.com/package/react-helmet
import Helmet from "react-helmet"
import Layout from "../components/layout"
import CrayonsStory from "../components/crayonsStory"

const postsPagination = props => {
  const { data } = props
  const { totalPage, currentPage } = props.pageContext

  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet
        htmlAttributes={{ lang: "en" }}
        meta={[{ name: "description", content: siteDescription }]}
        title={siteTitle}
      />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        const date = node.frontmatter.date
        const slug = node.fields.slug
        // const tags = node.frontmatter.tags || []
        return (
          <div key={node.fields.slug}>
            <CrayonsStory title={title} date={date} slug={slug} />
            <h3
              style={{
                marginTop: "3rem",
                marginBottom: "0.25rem",
              }}
            >
              <Link
                className="css-title"
                style={{ boxShadow: "none" }}
                to={node.fields.slug}
              >
                {title}
                {/* //todo tags */}
                {/* {tags.map(tag=>(<h3>{tag}</h3>))} */}
              </Link>
            </h3>
            <small className="css-date">{node.frontmatter.date}</small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
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
              to={"/posts/" + (currentPage - 1 === 1 ? "" : currentPage - 1)}
              rel="prev"
            >
              ← 上一页
            </Link>
          )}
        </div>
        <div>
          {currentPage + 1 <= totalPage && (
            <Link to={"/posts/" + (currentPage + 1)} rel="next">
              下一页 →
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default postsPagination

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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
