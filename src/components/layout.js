import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Header from "../components/header"
import Footer from "../components/footer"
import Toggle from "./Toggle"

import sun from "../assets/sun.png"
import moon from "../assets/moon.png"

class Layout extends React.Component {
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
    const { children } = this.props
    return (
      <div
        style={{
          color: "var(--textNormal)",
          background: "var(--bg)",
          transition: "color 0.2s ease-out, background 0.2s ease-out",
          minHeight: "100vh",
        }}
        css={css`
          margin-left: auto;
          margin-right: auto;
          padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
          max-width: 42rem;
        `}
      >
        <Header />
        {/* {this.state.theme !== null ? ( */}
        {null ? (
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
        ) : (
          // <div style={{ height: "24px" }} />
          <div></div>
        )}
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
