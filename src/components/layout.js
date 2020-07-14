import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Header from "../components/header"
import Footer from "../components/footer"

export default ({ children }) => {
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
      <main>{children}</main>
      <Footer />
    </div>
  )
}
