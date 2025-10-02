import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function IconDown(props: SvgProps) {
  return (
    <Svg
      width={12}
      height={6}
      viewBox="0 0 12 6"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.291 1.707c.63-.63.185-1.707-.706-1.707H2.413c-.89 0-1.337 1.077-.707 1.707l3.582 3.586a1 1 0 001.415 0l3.588-3.586z"
        fill="#D9D9D9"
      />
    </Svg>
  )
}

export default IconDown
