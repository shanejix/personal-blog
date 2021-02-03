import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"
import profilePic from "../assets/bio.png"
import { rhythm } from "../utils/typography"

const ListLink = props => (
  <span
    css={css`
      display: inline-block;
      margin-right: 1rem;
      margin-bottom: 0.5rem;
    `}
  >
    <Link to={props.to}>{props.children}</Link>
  </span>
)

const Nav = () => {
  return (
    <div
      css={css`
        margin-bottom: 1.5rem;
        display:flex;
        justify-content:center;
        flex-wrap:wrap;
        align-items:center;
      `}
    >
      <ListLink to="/">Home</ListLink>
      <ListLink to="/posts">Posts</ListLink>
      <ListLink to="/tags">Tags</ListLink>
      <ListLink to="https://wiki.shanejix.vercel.app/">Wiki</ListLink>
      {/* <a
            href="https://knowledge-bases.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wiki
          </a> */}
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/contact/">Contact</ListLink>
      {/* <ListLink to="/contact/">Project</ListLink> */}
    </div>
  )
}

export default Nav
