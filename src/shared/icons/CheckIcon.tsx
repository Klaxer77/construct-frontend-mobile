import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function CheckIcon({active = true, props }: {active: boolean, props?: SvgProps}) {
  return (
    <Svg
      width={8}
      height={6}
      viewBox="0 0 8 6"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.707 2.293A1 1 0 00.293 3.707l2 2a1 1 0 001.414 0l4-4A1 1 0 006.293.293L3 3.586 1.707 2.293z"
        fill={active ? "#FFFFFF": "#F4F5F7"}
      />
    </Svg>
  )
}

export default CheckIcon