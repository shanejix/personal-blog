/**
 * Typography.js 配置文件
 */
import "../fonts/fonts-shared.css"
import "./global.css"

import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => ({
  a: {
    color: "var(--pink)",
    lineHeight: 1.5
  },
  hr: {
    background: "var(--hr)",
  },
  ol: {
    marginLeft: "1.45rem !important",
  },
  ul: {
    marginLeft: "1.45rem !important",
  },
  "a.gatsby-resp-image-link": {
    boxShadow: "none",
  },
  // These two are for gatsby-remark-autolink-headers:
  "a.anchor": {
    boxShadow: "none",
  },
  'a.anchor svg[aria-hidden="true"]': {
    stroke: "var(--textLink)",
  },
  "p code": {
    fontSize: "0.85rem",
  },
  // TODO: why tho
  "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
    fontSize: "inherit",
  },
  "li code": {
    fontSize: "0.85rem",
  },
  blockquote: {
    color: "inherit",
    borderLeftColor: "inherit",
    opacity: "0.8",
    // marginLeft: "0",
  },
  "blockquote.translation": {
    fontSize: "1em",
  },
})

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
export const options = typography.options
