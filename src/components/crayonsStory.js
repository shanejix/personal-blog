import React from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

const CrayonsStory = ({ title, date, slug, tags }) => (
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
          display: flex;
          align-items: center;
        `}
      >
        {/* crayons-story tags */}
        {tags.map((tag, idx) => (
          <h4
            key={idx}
            style={{
              marginRight: "2px",
              marginTop: "1rem",
            }}
          >
            #&nbsp;{tag}
          </h4>
        ))}
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        `}
      >
        {/* crayons-story bottom */}
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          {/* details */}
          <div
            css={css`
              display: flex;
              align-items: center;
              margin-right: 0.5rem;
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              role="img"
              aria-labelledby="aggf4nt2b8v14n58crwrtn350varbecd"
              className="crayons-icon"
            >
              <title id="aggf4nt2b8v14n58crwrtn350varbecd">Reactions</title>
              <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
            </svg>
            9<span>&nbsp;reactions</span>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              margin-right: 0.5rem;
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              role="img"
              aria-labelledby="asi1gaualkz8d8osdqs8bzraizeu9rfi"
              className="crayons-icon"
            >
              <title id="asi1gaualkz8d8osdqs8bzraizeu9rfi">Comments</title>
              <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
            </svg>
            3<span>&nbsp;comments</span>
          </div>
        </div>
        {/* save */}
        <div>
          <small className="crayons-story__tertiary fs-xs mr-2">
            1 min read
          </small>
          {/* <button
              type="button"
              data-reactable-id="385970"
              aria-label="Save to reading list"
              title="Save to reading list"
            >
              <span>Fare</span>
            </button> */}
        </div>
      </div>
    </div>
  </div>
)

export default CrayonsStory
