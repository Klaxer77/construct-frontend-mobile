import * as React from "react"
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg"

export function RussianFlagIcon(props: SvgProps) {
  return (
    <Svg
      width={21}
      height={17}
      viewBox="0 0 21 17"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_4385_6955)">
        <Rect y={0.739746} width={21} height={16} rx={3} fill="#1A47B8" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 11.406h21v5.334H0v-5.333z"
          fill="#F93939"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 .74h21v5.333H0V.74z"
          fill="#fff"
        />
      </G>
      <Rect
        x={0.5}
        y={1.23975}
        width={20}
        height={15}
        rx={2.5}
        stroke="#F3F4F6"
      />
      <Defs>
        <ClipPath id="clip0_4385_6955">
          <Rect y={0.739746} width={21} height={16} rx={3} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
