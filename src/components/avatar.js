import React from "react"
import profilePic from "../assets/bio.png"
import { rhythm } from "../utils/typography"

class Avatar extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'column',
          flexWrap: 'wrap'
        }}
      >
        <img
          src={profilePic}
          alt={`Shane Jix`}
          style={{
            width: rhythm(5),
            height: rhythm(5),
            borderRadius: "50%",
          }}
        />
        <p>
          I&nbsp;explain with words and code.
        </p>
      </div>
    )
  }
}

export default Avatar
