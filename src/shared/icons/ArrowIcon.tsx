import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function ArrowIcon(props: SvgProps) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M14.666 6.667H4.542l4.402-4.383A1.337 1.337 0 007.997 0C7.64 0 7.3.14 7.05.392L.38 7.053a1.332 1.332 0 00-.28.44 1.33 1.33 0 000 1.012c.064.164.159.313.28.44l6.67 6.66a1.333 1.333 0 001.894 0 1.332 1.332 0 000-1.89L4.542 9.33h10.124A1.335 1.335 0 0016 8a1.331 1.331 0 00-1.334-1.332z"
        fill="#1B1D21"
      />
    </Svg>
  )
}

export default ArrowIcon