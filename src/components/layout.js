import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Header from "../components/header"
import Nav from "../components/nav"
import Footer from "../components/footer"

export default ({ children }) => {
  return (
    <div
      css={css`
        margin-left: auto;
        margin-right: auto;
        padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
        max-width: 780px;
      `}
    >
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
