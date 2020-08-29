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
      {posts.map((post, idx) => {
        const { node } = post
        const title = node.frontmatter.title || node.fields.slug
        const date = node.frontmatter.date
        const update = node.frontmatter.update
        const slug = node.fields.slug
        const tags = node.frontmatter.tags || []
        const url = node.frontmatter.url || ""
        const comments = node.frontmatter.comments
        const timeToRead = node.timeToRead

        return (
          <CrayonsStory
            key={idx}
            title={title}
            date={date}
            update={update}
            slug={slug}
            tags={tags}
            postUrl={url}
            comments={comments}
            timeToRead={timeToRead}
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
          marginTop: "2rem",
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
            update(formatString: "MMMM DD, YYYY")
            title
            tags
            url
            comments
          }
          timeToRead
        }
      }
    }
  }
`
