import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Toggle from "./toggle"

import sun from "../assets/sun.png"
import moon from "../assets/moon.png"

class Header extends React.Component {

  state = {
    theme: null,
  }

  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }

  render() {
    return (
      <header
        css={css`
          margin-bottom: ${rhythm(0.5)};
          display: flex;
          align-items: center;
          just-content: flex-end;
        `}
      >
        <div style={{ marginRight: 'auto' }}>
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
              {this.props.data.site.siteMetadata.title}
            </h3>
          </Link>
        </div>
        <div style={{marginTop:'32px'}}>
          {
            this.state.theme !== null ?
              <Toggle
                icons={{
                  checked: (
                    <img
                      src={moon}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: "none" }}
                    />
                  ),
                  unchecked: (
                    <img
                      src={sun}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: "none" }}
                    />
                  ),
                }}
                checked={this.state.theme === "dark"}
                onChange={e =>
                  window.__setPreferredTheme(e.target.checked ? "dark" : "light")
                }
              />
              :
              <div style={{ height: "24px" }} />
          }
        </div>
      </header >
    )
  }
}

/**
 * 只有页面可以进行页面查询。非页面组件（例如 Layout）可以使用 StaticQuery。
 * https://www.gatsbyjs.cn/docs/static-query/
 * 最新引入的 hook 版本 — useStaticQuery:
 * https://www.gatsbyjs.cn/docs/use-static-query/
 */
export default () => (
  <StaticQuery
    query={
      graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `
    }
    render={data => <Header data={data} />}
  />
)
