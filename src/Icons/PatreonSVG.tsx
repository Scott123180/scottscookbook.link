import * as React from "react"

const PatreonSVG = ({
  style = {},
  fill = "#73737D",
  width = "24",
  height = "24",
  className = "",
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${className || ""}`}
  >
    <path
      fill={fill}
      d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21c0 3.96-3.22 7.18-7.18 7.18c-3.97 0-7.21-3.22-7.21-7.18c0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z" />
  </svg>
)

export default PatreonSVG;

//source: https://docs.iconify.design/