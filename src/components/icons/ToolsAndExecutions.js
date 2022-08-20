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
      d="M14.624 5.273a.53.53 0 0 0-1.013-.311L9.377 18.727a.53.53 0 0 0 1.013.311l4.235-13.765ZM8.669 7.92a.53.53 0 0 1 0 .75L5.337 12l3.332 3.331a.53.53 0 1 1-.75.75l-3.706-3.706a.53.53 0 0 1 0-.75L7.92 7.92a.53.53 0 0 1 .75 0Zm6.662 0a.528.528 0 0 0 0 .75L18.663 12l-3.332 3.331a.528.528 0 0 0 0 .75.53.53 0 0 0 .75 0l3.706-3.706a.53.53 0 0 0 0-.75L16.08 7.92a.53.53 0 0 0-.75 0Z"
      fill="#0A125D"
    />
  </svg>
)

export default SvgComponent