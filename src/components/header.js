import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

const Header = () => {
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
    <header
      css={css`
        margin-bottom: ${rhythm(0.5)};
      `}
    >
      <Link
        to="/"
        css={css`
          text-shadow: none;
          background-image: none;
        `}
      >
        <h3
          css={css`
            display: inline-block;
            font-style: normal;
          `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
    </header>
  )
}

export default Header
