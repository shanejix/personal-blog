import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Nav from "../components/nav"
import Bio from "../components/bio"

export default ({ data }) => {
  return (
    <Layout>
      <Nav />
      <Bio />
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
