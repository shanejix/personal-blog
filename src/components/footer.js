import React from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

const Footer = () => {
  return (
    <footer
      css={css`
        margin: ${rhythm(1.2)} 0;
      `}
    >
      © {new Date().getFullYear()}, Built with
      {` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </footer>
  )
}

export default Footer
