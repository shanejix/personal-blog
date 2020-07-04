import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
// import { rhythm } from "../utils/typography"

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

const Nav = () => {
  return (
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
  )
}

export default Nav
