import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li >
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
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      {/* // css use style */}
      <header style={{ marginBottom: `1.5rem` }}>
        <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
          <h3 style={{ display: `inline` }}>{data.site.siteMetadata.title}</h3>
        </Link>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/about/">About</ListLink>
          <ListLink to="/contact/">Contact</ListLink>
        </ul>
      </header>
      {children}

      {/* // css in js use emotion*/}

      {/* TODO:css in js 放上面不生效 */}
      <div
        css={css`
        margin: 0 auto;
        max-width: 700px;
        padding: ${rhythm(2)};
        padding-top: ${rhythm(1.5)};
      `}
      >
        <Link to={`/`}>
          <h3
            css={css`
            margin-bottom: ${rhythm(2)};
            display: inline-block;
            font-style: normal;
          `}
          >
            Pandas Eating Lots
        </h3>
        </Link>
        <Link
          to={`/about/`}
          css={css`
          float: right;
        `}
        >
          About
      </Link>
        {children}
      </div>
    </div >
  )
}