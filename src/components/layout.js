import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

const ListLink = props => (
  <li
    css={css`
      display: inline-block;
      margin-right: 1rem;
    `}
  >
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => {
  /**
   * 只有页面可以进行页面查询。非页面组件（例如 Layout）可以使用 StaticQuery。
   * https://www.gatsbyjs.cn/docs/static-query/
   * 最新引入的 hook 版本 — useStaticQuery:
   * https://www.gatsbyjs.cn/docs/use-static-query/
   */
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    // css in js
    <div
      css={css`
        margin: 3rem auto;
        max-width: 700px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
    >
      <header style={{ marginBottom: `1.5rem` }}>
        <Link
          to="/"
          css={css`
            text-shadow: none;
            background-image: none;
          `}
        >
          <h3
            css={css`
              margin-bottom: ${rhythm(2)};
              display: inline;
              font-style: normal;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
        </Link>
        <ul
          css={css`
            list-style: none;
            float: right;
          `}
        >
          <ListLink to="/">Home</ListLink>
          <ListLink to="/posts">Posts</ListLink>
          <ListLink to="/tags">Tags</ListLink>
          <ListLink to="https://knowledge-bases.netlify.app/">wiki</ListLink>
          {/* <a
            href="https://knowledge-bases.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a> */}
          <ListLink to="/about/">About</ListLink>
          <ListLink to="/contact/">Contact</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
