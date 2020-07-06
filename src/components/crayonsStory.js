import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const CrayonsStory = ({ title, date, slug }) => {
  return (
    // crayons-story
    <div
      css={css`
        border: 1px solid black;
        border-radius: 3px;
        margin-bottom: 0.5rem;
        background: white;
        font-size: 1rem;
      `}
    >
      {/* CrayonsStory body */}
      <div
        css={css`
          padding: 16px;
        `}
      >
        {/* crayons-story top */}
        <div>
          <time className="css-date">{date}</time>
        </div>
        {/* crayons-story indention */}
        <div>
          {/* crayons-story titel */}
          <h3
            style={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <Link className="css-title" style={{ boxShadow: "none" }} to={slug}>
              {title}
            </Link>
          </h3>
        </div>
        <div
          css={css`
            margin-bottom: 1rem;
            margin-top: 1rem;
          `}
        >
          {/* crayons-story tags */}
          tags
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
          `}
        >
          {/* crayons-story bottom */}
          <div>
            {/* details */}
            details
          </div>
          <div>
            {/* save */}
            save
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrayonsStory
