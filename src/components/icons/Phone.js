import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.059 15.473v2.118a1.41 1.41 0 0 1-1.539 1.411 13.97 13.97 0 0 1-6.092-2.167A13.765 13.765 0 0 1 7.193 12.6a13.97 13.97 0 0 1-2.167-6.12A1.412 1.412 0 0 1 6.43 4.941h2.117A1.412 1.412 0 0 1 9.96 6.155c.09.678.255 1.343.494 1.984a1.412 1.412 0 0 1-.318 1.49l-.896.896a11.294 11.294 0 0 0 4.235 4.235l.897-.896a1.412 1.412 0 0 1 1.49-.318c.64.239 1.305.405 1.983.494a1.412 1.412 0 0 1 1.214 1.433Z"
      stroke="#0A125D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SvgComponent
