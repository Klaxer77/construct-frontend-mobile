import { ReactNode } from 'react';
import { IconName } from './types';
import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Image,
  Mask,
  Path,
  Pattern,
  Use,
} from 'react-native-svg';

type IconComponentProps = {
  color?: string;
  size?: number;
  style?: any;
  height?: number;
  width?: number;
};

const ICONS: Record<IconName, (props: IconComponentProps) => ReactNode> = {
  [IconName.Logo]: ({ style, width = 53, height = 52 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox="0 0 53 52"
        fill="none"
        style={style}
      >
        <Path fill="#007AFF" d="M0.5 0H34.9266V34.4266H0.5z" />
        <Path
          transform="rotate(-15 10.336 18.746)"
          fill="#1E1E1E"
          d="M10.3359 18.7461H44.7625V53.1727H10.3359z"
        />
      </Svg>
    );
  },
  [IconName.ArrowDropDown]: ({ style, width = 15, height = 16 }) => {
    return (
      <Svg
        style={style}
        width={width}
        height={height}
        viewBox="0 0 15 16"
        fill="none"
      >
        <Path
          d="M3.125 5.8125C3.125 5.8125 5.715 10.1875 7.5 10.1875C9.28438 10.1875 11.875 5.8125 11.875 5.8125"
          stroke="#0B0B0B"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.Town]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        style={style}
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M13 22H5C3 22 2 21 2 19V11C2 9 3 8 5 8H10V19C10 21 11 22 13 22Z"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.11 4C10.03 4.3 10 4.63 10 5V8H5V6C5 4.9 5.9 4 7 4H10.11Z"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 8V13M18 8V13M6 13V17"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17 17H15C14.45 17 14 17.45 14 18V22H18V18C18 17.45 17.55 17 17 17Z"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10 19V5C10 3 11 2 13 2H19C21 2 22 3 22 5V19C22 21 21 22 19 22H13C11 22 10 21 10 19Z"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.Journal]: ({ style, color, width = 20, height = 20 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M2.364 2.502a9.914 9.914 0 016.94 0l.072.027v15.407l-1.183-.442a6.746 6.746 0 00-4.718 0c-1.114.417-2.433-.332-2.433-1.594V4.358c0-.84.544-1.563 1.322-1.856zm8.334 0a9.913 9.913 0 016.939 0c.779.293 1.322 1.017 1.322 1.856V15.9c0 1.262-1.318 2.011-2.432 1.594a6.748 6.748 0 00-4.72 0l-1.181.442V2.529l.072-.027z"
          fill={color}
          opacity={0.64}
        />
      </Svg>
    );
  },
  [IconName.Message]: ({
    style,
    width = 24,
    height = 24,
    color = '#007AFF',
  }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M12 1.25c5.937 0 10.75 4.813 10.75 10.75S17.937 22.75 12 22.75c-1.887 0-3.662-.487-5.205-1.343a.312.312 0 00-.252-.031l-2.522.892c-1.546.546-3.035-.943-2.489-2.489l.928-2.627a.31.31 0 00-.026-.243A10.708 10.708 0 011.25 12C1.25 6.063 6.063 1.25 12 1.25zM7.05 10.8a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm5 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm5 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
          fill={color}
        />
      </Svg>
    );
  },
  [IconName.Search]: ({ style, width = 21, height = 21 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Circle
          cx={9.66667}
          cy={9.66667}
          r={6.66667}
          stroke="#969696"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M15.535 15.916l2.882 2.882"
          stroke="#969696"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.Concrete]: ({ style, width = 30, height = 20 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          fill="url(#pattern0_280_17200)"
          d="M0 0.0703125H30V20.9297125H0z"
        />
        <Defs>
          <Pattern
            id="pattern0_280_17200"
            patternContentUnits="objectBoundingBox"
            width={1}
            height={1}
          >
            <Use
              xlinkHref="#image0_280_17200"
              transform="matrix(.00195 0 0 .0028 0 -.222)"
            />
          </Pattern>
          <Image
            id="image0_280_17200"
            width={512}
            height={512}
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d13nF1Vuf/xz0wq6YQAAWmCgAgiHeldwIte9AKKBbCBekVQr6LY+GHDhiCiggKKhStYQBAEQm9K750k1FAT0hNS5vfHM3NnMkw55zyr7PJ9v17rRYCcvZ+99j77rL32Ws8CEREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREREZG6a8sdwAAmAHsDGwHjgCeBe4BbgaUZ4xIREZEIJgI/AxYCHX2UOcBFwNHAJpliFBERkYA2AabT9w9/f+Vp4Bzgg8DqySOWVEYAawFbApsCw/OGIyJSbkV6BTAZuBNYw7GNDuA+YApwJXA9sMAfmkTQBqwKTOr852Rgtc4/r4Y15lbt8f/G9bGNZ4CrsPM9BXg+etQiIhVRpAbABcBBgbe5GLgFawxMAe4AlgXeh3Qbzet/vNfo8efV6f6RXxUYEnDfHcD9dDcGrgPmB9y+iEilFKUBsDHwEPHjmQVcTXcPwROR91d2Q+n7x3s17Km86wm+60d+VJ4w+/Qa1vjrOte3o8afiMj/KUoD4KvAtzPsdxrdPxBXA69kiCG1Cby+e73nj3zP/zcpU4wxvApcQ3dv0GN5wxERyasoDYDrgF1zBwE8CFyM/UDcCCzKG05DRgCrACt3ljWA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/RS9PAG8qcU6lpobB0wh/0Vc1HIrxZxD3GVlrMsvdz0VtdwIrNJy7UpuE4BryX8dFbX8i/yvSqTkhmCjYWMmXCljOZfWBrulNhQ7fyGXDS17WY4tYz289WqVgtD13Xc5AxjRerWKrGgP8oxcLVqZAxzqrMsc3kWeGR5FK68CBznrUopnL/LMHClamQ28z1mXIn1aA7ia/Bd5rnI75Z4jvjZx84oXvdyCzSeXanoD9X7ldSs2gFskmnZsvv4r5L/gU5V5wJepRpfxUGwBkNipkItUZgPHdB67VNsQ4L/Jkw8jV5kLfAEYFqD+RBoyEXuPWvV3bxcD64WpskJZAxvHsJz8dRz7/BVhDQpJaxXsPXgdrm/NYpFsdqaa03EeAfYPWE9FtSdp1oFIXe7vPDapt92whW9yX4+hy0PAOwLWk4jL3tg71txfjBA/HIdRr+7idmyQ4K3kr39vuRc7f0OC1pCUWRt2fcdeVTBFuQ9d31JgO2PdUrm/KM2Wu9EXC6whdzP5z0ez5U7gYJQOXAa2M+XMbXIXur6lRLYFTsNWn8r95emvzMaWJ949ThWU2k7YO9QiD6aaCfwS2DFSHUh1bQ+cTrEHM88CzsQaLSKlNAR7qjwXmE/+L9VS4Ersab+VVQfrZgTWfXo+sJhinb8yJGKSYhtOca/vVlYdrDV1jxTbWGBXbHDWHtjyvSlW8HsQy19wDZY6dGaCfVbRBLrP357EXSu9Swc2LuPqznId1nMjEto4Vry+30r8+1MH8AArXt+vRt5nZakBUC6rYF+4LbElYTfq/OdKLW7vNWyVsEew1QzvwX7wn/cGKn1aFXt9sgV27rrOX6spSBfTfe4ewc7fdcCL3kBFWjAJm0WwBSven0a2uL3F2LXddX3fi92fXvAGKkYNgPJrw7K1rYc9cY7BusImYD0I7dgT4FwsQc88rMX8JDAdy0sg+bTz+vM3Bnu6Gtf5d+Zg53A+3edvOnYOlyeNVqQ57di8+zcC4+m+vsdj13cbdm3P4fX3pyfR/UlERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERKL6/5QgO6zgjyxCAAAAAElFTkSuQmCC"
          />
        </Defs>
      </Svg>
    );
  },
  [IconName.Welding]: ({ style, width = 30, height = 32.83 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <G clipPath="url(#clip0_280_17208)" stroke="#000">
          <Path
            d="M5.393.834h19.213c1.057 0 1.917.86 1.917 1.916v22.593a6.827 6.827 0 01-6.823 6.823h-9.4a6.827 6.827 0 01-6.822-6.823V2.75c0-1.057.858-1.916 1.915-1.916z"
            strokeWidth={1.5}
          />
          <Path
            d="M7.802 9.215H22.2c.084 0 .152.07.152.153v3.994a3.268 3.268 0 01-3.265 3.266h-8.173a3.268 3.268 0 01-3.266-3.266V9.368c0-.084.07-.153.154-.153z"
            fill="#fff"
            strokeWidth={1.5}
          />
          <Path d="M29.132 8.965a.37.37 0 01.369.369v2.406a.37.37 0 01-.37.37h-1.358V8.964h1.359zM.87 12.11a.37.37 0 01-.37-.369V9.335a.37.37 0 01.37-.37h1.358v3.145H.869z" />
          <Path d="M23.101 3.94H6.898v2.086h16.203V3.94z" strokeWidth={1.5} />
        </G>
        <Defs>
          <ClipPath id="clip0_280_17208">
            <Path
              fill="#fff"
              transform="translate(0 .084)"
              d="M0 0H30V32.8317H0z"
            />
          </ClipPath>
        </Defs>
      </Svg>
    );
  },
  [IconName.ArrowBack]: ({ style, width = 25, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M19.166 10.667H9.042l4.402-4.383A1.337 1.337 0 0012.497 4c-.355 0-.696.14-.947.392l-6.67 6.661a1.332 1.332 0 00-.28.44 1.33 1.33 0 000 1.012c.064.164.159.313.28.44l6.67 6.66a1.332 1.332 0 001.894 0 1.33 1.33 0 000-1.89L9.042 13.33h10.124A1.335 1.335 0 0020.5 12a1.331 1.331 0 00-1.334-1.332z"
          fill="#4C4C4C"
        />
      </Svg>
    );
  },
  [IconName.Settings]: ({ style, width = 36, height = 36 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Circle cx={18} cy={18} r={18} fill="#F9FAFB" />
        <Path
          d="M18 12.876a2.125 2.125 0 110-4.25 2.125 2.125 0 010 4.25zM18 20.125a2.124 2.124 0 110-4.248 2.124 2.124 0 010 4.248zM18 27.374a2.123 2.123 0 110-4.247 2.123 2.123 0 010 4.247z"
          fill="#19191A"
        />
      </Svg>
    );
  },
  [IconName.Plus]: ({ style, width = 24, height = 24, color }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M5 12h14M12 5v14"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </Svg>
    );
  },
  [IconName.Smile]: ({ style, width = 20, height = 20 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M17.5 10a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          stroke="#B0B0B0"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M14.166 10.833c-.893 1.675-2.269 2.5-4.166 2.5-1.898 0-3.274-.825-4.167-2.5"
          stroke="#B0B0B0"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M8.334 8.333a.833.833 0 11-1.667 0 .833.833 0 011.667 0zM13.334 8.333a.833.833 0 11-1.667 0 .833.833 0 011.667 0z"
          fill="#B0B0B0"
        />
      </Svg>
    );
  },
  [IconName.Microphone]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M6 10.25V11a6 6 0 0012 0v-.75"
          stroke="#B0B0B0"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <Path
          d="M15 11a3 3 0 11-6 0V6a3 3 0 116 0v5zM12 17.182V21M8.625 21h6.75"
          stroke="#B0B0B0"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </Svg>
    );
  },
  [IconName.SendArrow]: ({ style, width = 20, height = 21 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.834 3.524c-.863-.383-1.75.487-1.383 1.357l2.267 5.371a.208.208 0 010 .162L2.45 15.787c-.367.87.52 1.74 1.383 1.357l13.18-5.858c.826-.366.826-1.537 0-1.903L3.835 3.524zm4.2 6.184a.625.625 0 000 1.25h2.5a.625.625 0 100-1.25h-2.5z"
          fill="#F9FAFB"
        />
      </Svg>
    );
  },
  [IconName.File]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M9 2a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5a3 3 0 013-3h4zM7 17a1 1 0 100 2 1 1 0 000-2zM13.5 15.66a.4.4 0 00.652.31l5.883-4.778a3 3 0 00.028-4.271l-2.841-2.842a2.998 2.998 0 00-2.704-.822c-.673.133-1.018.822-1.018 1.508V15.66zM13.87 18.132a1 1 0 00-.37.776V21a1 1 0 001 1H19a3 3 0 003-3v-4.797a2.2 2.2 0 00-1.012-1.853l-7.118 5.782z"
          fill="#007AFF"
        />
      </Svg>
    );
  },
  [IconName.History]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.25 6A4.75 4.75 0 018 1.25h8A4.75 4.75 0 0120.75 6v12A4.75 4.75 0 0116 22.75H8A4.75 4.75 0 013.25 18V6zM8 6.25a.75.75 0 000 1.5h8a.75.75 0 000-1.5H8zM7.25 12a.75.75 0 01.75-.75h8a.75.75 0 010 1.5H8a.75.75 0 01-.75-.75zM8 16.25a.75.75 0 000 1.5h4a.75.75 0 000-1.5H8z"
          fill="#007AFF"
        />
      </Svg>
    );
  },
  [IconName.Check]: ({ style, width = 11, height = 11, color = 'white' }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 11 11`}
        fill="none"
        style={style}
      >
        <Path
          d="M10.53.152a1 1 0 01.318 1.378l-5.625 9a1 1 0 01-1.622.103L.226 6.508a1 1 0 111.548-1.266l2.492 3.046L9.152.47A1 1 0 0110.53.152z"
          fill={color}
        />
      </Svg>
    );
  },
  [IconName.Email]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3"
          stroke="#000"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17 9l-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9M19.21 14.77l-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01zM18.7 15.28c.3 1.08 1.14 1.92 2.22 2.22"
          stroke="#000"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.Password]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M19.79 14.93a7.575 7.575 0 01-7.6 1.87l-4.71 4.7c-.34.35-1.01.56-1.49.49l-2.18-.3c-.72-.1-1.39-.78-1.5-1.5l-.3-2.18c-.07-.48.16-1.15.49-1.49l4.7-4.7c-.8-2.6-.18-5.55 1.88-7.6 2.95-2.95 7.74-2.95 10.7 0 2.96 2.95 2.96 7.76.01 10.71zM6.89 17.49l2.3 2.3"
          stroke="#000"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
          stroke="#000"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.Role]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M2 22h20M12 2c1.6.64 3.4.64 5 0v3c-1.6.64-3.4.64-5 0V2zM12 5v3M17 8H7c-2 0-3 1-3 3v11h16V11c0-2-1-3-3-3zM4.58 12h14.84"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.99 12v10M11.99 12v10M15.99 12v10"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.LogoToolls]: ({ style, width = 91, height = 32 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Mask
          id="a"
          maskUnits="userSpaceOnUse"
          x={0}
          y={13.8867}
          width={29}
          height={11}
          fill="#000"
        >
          <Path fill="#fff" d="M0 13.8867H29V24.886699999999998H0z" />
          <Path d="M5.255 22.433l.04.112c.014.034.024.07.031.111.014.04.02.078.02.112a.135.135 0 01-.05.111.382.382 0 01-.122.081.426.426 0 01-.121.04.774.774 0 01-.071.01c-.04 0-.115-.124-.223-.374a8.385 8.385 0 01-.354-1.033 27.502 27.502 0 01-.375-1.59 21.414 21.414 0 01-.314-2.025c-.013.156-.04.338-.08.547a2.703 2.703 0 01-.163.577 1.481 1.481 0 01-.294.466.585.585 0 01-.445.182c-.128 0-.273-.067-.435-.202a3.954 3.954 0 01-.476-.476 10.076 10.076 0 01-.416-.567 6.305 6.305 0 01-.273-.476c.027.297.071.655.132 1.073.067.419.168.861.303 1.327a.668.668 0 00.041.111c.02.02.037.044.05.071.02.027.034.057.041.091.014.027.02.071.02.132 0 .087-.033.152-.1.192a.376.376 0 01-.193.06c-.034 0-.078-.05-.132-.151a3.921 3.921 0 01-.172-.415c-.06-.169-.122-.355-.182-.557-.061-.21-.118-.415-.172-.618a14.84 14.84 0 01-.122-.567 2.527 2.527 0 01-.05-.435c0-.176.006-.297.02-.365a.356.356 0 01.08-.151v-.618c0-.095.024-.166.072-.213a.275.275 0 01.202-.08c.068 0 .145.057.233.171a4.1 4.1 0 01.283.436c.108.175.22.364.335.567.114.202.226.391.334.567.115.175.223.32.324.435.108.115.209.172.304.172.087 0 .172-.08.253-.243.08-.168.155-.388.222-.658.075-.27.139-.577.193-.921.054-.345.098-.696.131-1.053a.934.934 0 00-.01-.132 1.39 1.39 0 01-.01-.172c0-.081.017-.169.05-.263.041-.095.116-.142.224-.142.06 0 .108.017.141.05.04.034.068.078.081.132a.55.55 0 01.02.152c.007.047.01.088.01.121 0 .055-.006.146-.02.274-.006.121-.01.31-.01.567 0 .223.017.483.051.78.034.29.078.6.132.931.06.324.128.662.202 1.013.081.344.166.681.253 1.012.095.331.186.645.274.942.094.29.189.547.283.77zm5.264-2.652c0 .121-.058.273-.173.455a2.361 2.361 0 01-.445.517 2.86 2.86 0 01-.658.435c-.25.115-.51.172-.78.172-.121 0-.25-.02-.385-.06a1.843 1.843 0 01-.395-.173 1.752 1.752 0 01-.344-.283 1.105 1.105 0 01-.223-.385c-.04.04-.09.108-.152.203a5.043 5.043 0 01-.182.293 1.618 1.618 0 01-.223.253.391.391 0 01-.253.102c-.087 0-.162-.044-.222-.132a1.53 1.53 0 01-.132-.304 2.703 2.703 0 01-.091-.496c0-.081.023-.233.07-.456.048-.23.119-.465.213-.708.095-.243.213-.46.355-.648.148-.19.32-.284.516-.284.074 0 .122.034.142.101.027.061.04.122.04.183v.303a.403.403 0 00.102.061.23.23 0 01.1.04.122.122 0 01.072.071c.02.034.03.088.03.162a.802.802 0 01-.01.132.515.515 0 00-.01.101c0 .176.013.348.04.517.027.169.081.32.162.455.081.129.193.237.335.324.141.081.33.122.567.122.297 0 .546-.06.749-.182.21-.129.381-.267.516-.416.142-.155.253-.293.334-.415.081-.128.149-.192.203-.192.088 0 .132.044.132.132zm-3.555-.446a.125.125 0 00-.02-.07.163.163 0 01-.02-.072c0-.027.007-.05.02-.07a.144.144 0 00.02-.082c0-.02-.006-.033-.02-.04-.013-.014-.02-.027-.02-.04-.06.013-.125.07-.192.172-.061.1-.122.219-.183.354a2.97 2.97 0 00-.131.415c-.034.135-.05.246-.05.334 0 .047.013.125.04.233a.488.488 0 00.09.213c.115-.236.22-.466.315-.689.1-.223.151-.442.151-.658zm6.657.921c0 .034-.017.068-.05.102a.176.176 0 00-.051.09c0 .075.014.146.04.213.034.068.051.149.051.243 0 .088-.027.132-.08.132a.302.302 0 00-.153.03.646.646 0 01-.152.041c-.04 0-.084-.037-.131-.111a.527.527 0 01-.071-.122c0-.007-.02.007-.06.04a.835.835 0 01-.183.122c-.081.04-.196.081-.345.122a2.43 2.43 0 01-.546.05.982.982 0 01-.496-.121c-.142-.088-.26-.2-.355-.334a1.639 1.639 0 01-.202-.456 2.335 2.335 0 01-.061-.527c0-.162.017-.313.05-.455.041-.149.095-.277.163-.385a.824.824 0 01.253-.273.624.624 0 01.354-.102c.128 0 .257.04.385.122a2.312 2.312 0 01.587.526l.101.112-.253-1.428a78.836 78.836 0 00-.101-.537 12.14 12.14 0 00-.152-.84 2.21 2.21 0 01-.02-.182 2.513 2.513 0 01-.02-.213 92.334 92.334 0 01-.04-.648 1.397 1.397 0 00-.021-.182 9.354 9.354 0 00-.081-.253 1.434 1.434 0 01-.04-.172c0-.034.016-.075.05-.122.034-.054.078-.081.132-.081.04 0 .077.003.111.01a.157.157 0 01.091.06c.027.035.05.089.071.163.027.067.05.165.07.293.008.068.028.196.062.385.033.19.067.395.1.618.035.223.068.435.102.638.034.202.057.35.071.445.034.257.078.537.132.84.06.298.121.585.182.861.06.277.121.524.182.74.061.209.115.35.162.425.014.027.04.047.081.06.04.008.068.028.081.061zm-.75.203a3.42 3.42 0 00-.13-.253 3.648 3.648 0 00-.294-.496 2.535 2.535 0 00-.395-.486c-.142-.142-.28-.213-.415-.213-.115 0-.21.088-.284.263a1.685 1.685 0 00-.101.608c0 .256.074.462.223.617a.716.716 0 00.516.233c.162 0 .33-.027.506-.08.176-.055.3-.119.375-.193zm4.46.364c.008.014.011.034.011.061 0 .04-.03.101-.091.183a1.372 1.372 0 01-.405.314 2.158 2.158 0 01-1.003.232 1.09 1.09 0 01-.455-.1 1.25 1.25 0 01-.395-.315 1.794 1.794 0 01-.284-.516 2.177 2.177 0 01-.111-.73c0-.263.034-.509.101-.738.068-.23.152-.432.253-.608.108-.176.226-.314.355-.415a.61.61 0 01.374-.152c.108 0 .216.024.324.07.115.041.216.095.304.163a.807.807 0 01.223.233.45.45 0 01.081.253c0 .101-.047.206-.142.314-.087.108-.195.21-.324.304a2.822 2.822 0 01-.385.222.847.847 0 01-.303.081.154.154 0 01-.112-.05.25.25 0 01-.04-.142c0-.095.04-.169.121-.223.088-.054.182-.101.284-.142.101-.047.192-.1.273-.162a.29.29 0 00.132-.253.317.317 0 00-.05-.101c-.035-.054-.126-.081-.274-.081-.068 0-.145.04-.233.122a1.251 1.251 0 00-.253.313 1.86 1.86 0 00-.203.466 1.952 1.952 0 00-.08.577c0 .176.03.334.09.476.068.142.152.264.253.365.102.094.22.168.355.223.135.053.273.08.415.08.101 0 .21-.02.324-.06a5.53 5.53 0 00.334-.142c.108-.054.2-.101.274-.142a.489.489 0 01.152-.07c.02 0 .04.01.06.03.027.02.044.04.05.06zm7.544-.951c0 .303-.038.57-.112.8a2.18 2.18 0 01-.253.577c-.101.148-.206.26-.314.334-.101.074-.185.111-.253.111a.402.402 0 01-.273-.121c-.088-.088-.132-.169-.132-.243 0-.108.044-.162.132-.162.033 0 .067.013.101.04.034.02.064.037.091.05.115-.094.223-.249.324-.465.108-.216.162-.523.162-.921 0-.162-.017-.307-.05-.436a1.49 1.49 0 00-.122-.324.7.7 0 00-.132-.202c-.047-.047-.08-.071-.1-.071-.068 0-.136.067-.203.202-.061.135-.115.29-.162.466a6.836 6.836 0 00-.122.506c-.027.162-.04.274-.04.335.006.04.013.077.02.111l.02.101a.518.518 0 01-.121.446c-.088.101-.173.152-.254.152-.04 0-.074-.027-.1-.081a1.372 1.372 0 01-.052-.223 25.927 25.927 0 01-.04-.273 2.357 2.357 0 00-.03-.254 7.023 7.023 0 01-.213-.577c-.088-.263-.182-.543-.284-.84l-.273-.881a17.35 17.35 0 01-.182-.679 12.378 12.378 0 01-.213-.951 12.352 12.352 0 01-.121-.72 4.83 4.83 0 01-.061-.536 8.551 8.551 0 01-.01-.375c0-.06.027-.108.08-.141a.232.232 0 01.133-.051c.06 0 .104.013.131.04.027.02.047.068.06.142l.031.324a9.065 9.065 0 00.122 1.043c.04.203.09.429.152.679l.192.79c.074.27.148.53.223.78.08.249.158.478.233.688.08.209.155.374.222.496.061-.243.135-.463.223-.658.074-.162.166-.31.274-.446a.482.482 0 01.395-.213c.06 0 .141.027.242.082.102.053.2.145.294.273.101.128.186.297.253.506.074.21.112.466.112.77zm3.17-2.724c-.087.466-.168.915-.242 1.347-.034.182-.068.374-.102.577l-.1.587a51.47 51.47 0 01-.082.547c-.02.169-.037.324-.05.466a9.917 9.917 0 00-.061.739l-.04.79c-.014.29-.021.584-.021.88 0 .061-.007.129-.02.203-.014.074-.02.149-.02.223a.289.289 0 01-.051.172c-.027.047-.071.07-.132.07-.054 0-.098-.043-.131-.13a2.678 2.678 0 01-.111-.628 4.287 4.287 0 01-.01-.233v-.203c0-.074.003-.189.01-.344l.05-.587c.02-.25.05-.574.091-.973a14.115 14.115 0 00-.476-.324 31.621 31.621 0 01-.405-.303 3.232 3.232 0 01-.344-.314.505.505 0 01-.061-.091.342.342 0 01-.04-.173c0-.033.016-.067.05-.1.034-.041.071-.062.111-.062.027 0 .055.014.081.04.156.136.335.288.537.457.203.162.402.31.598.445.013-.121.04-.307.08-.557a37.363 37.363 0 00.274-1.64c.047-.27.081-.486.101-.648a.963.963 0 01.081-.314.646.646 0 01.091-.152c.034-.047.071-.07.112-.07.02 0 .064.02.131.06.068.034.102.115.102.243z" />
        </Mask>
        <Path
          d="M5.255 22.433l.04.112c.014.034.024.07.031.111.014.04.02.078.02.112a.135.135 0 01-.05.111.382.382 0 01-.122.081.426.426 0 01-.121.04.774.774 0 01-.071.01c-.04 0-.115-.124-.223-.374a8.385 8.385 0 01-.354-1.033 27.502 27.502 0 01-.375-1.59 21.414 21.414 0 01-.314-2.025c-.013.156-.04.338-.08.547a2.703 2.703 0 01-.163.577 1.481 1.481 0 01-.294.466.585.585 0 01-.445.182c-.128 0-.273-.067-.435-.202a3.954 3.954 0 01-.476-.476 10.076 10.076 0 01-.416-.567 6.305 6.305 0 01-.273-.476c.027.297.071.655.132 1.073.067.419.168.861.303 1.327a.668.668 0 00.041.111c.02.02.037.044.05.071.02.027.034.057.041.091.014.027.02.071.02.132 0 .087-.033.152-.1.192a.376.376 0 01-.193.06c-.034 0-.078-.05-.132-.151a3.921 3.921 0 01-.172-.415c-.06-.169-.122-.355-.182-.557-.061-.21-.118-.415-.172-.618a14.84 14.84 0 01-.122-.567 2.527 2.527 0 01-.05-.435c0-.176.006-.297.02-.365a.356.356 0 01.08-.151v-.618c0-.095.024-.166.072-.213a.275.275 0 01.202-.08c.068 0 .145.057.233.171a4.1 4.1 0 01.283.436c.108.175.22.364.335.567.114.202.226.391.334.567.115.175.223.32.324.435.108.115.209.172.304.172.087 0 .172-.08.253-.243.08-.168.155-.388.222-.658.075-.27.139-.577.193-.921.054-.345.098-.696.131-1.053a.934.934 0 00-.01-.132 1.39 1.39 0 01-.01-.172c0-.081.017-.169.05-.263.041-.095.116-.142.224-.142.06 0 .108.017.141.05.04.034.068.078.081.132a.55.55 0 01.02.152c.007.047.01.088.01.121 0 .055-.006.146-.02.274-.006.121-.01.31-.01.567 0 .223.017.483.051.78.034.29.078.6.132.931.06.324.128.662.202 1.013.081.344.166.681.253 1.012.095.331.186.645.274.942.094.29.189.547.283.77zm5.264-2.652c0 .121-.058.273-.173.455a2.361 2.361 0 01-.445.517 2.86 2.86 0 01-.658.435c-.25.115-.51.172-.78.172-.121 0-.25-.02-.385-.06a1.843 1.843 0 01-.395-.173 1.752 1.752 0 01-.344-.283 1.105 1.105 0 01-.223-.385c-.04.04-.09.108-.152.203a5.043 5.043 0 01-.182.293 1.618 1.618 0 01-.223.253.391.391 0 01-.253.102c-.087 0-.162-.044-.222-.132a1.53 1.53 0 01-.132-.304 2.703 2.703 0 01-.091-.496c0-.081.023-.233.07-.456.048-.23.119-.465.213-.708.095-.243.213-.46.355-.648.148-.19.32-.284.516-.284.074 0 .122.034.142.101.027.061.04.122.04.183v.303a.403.403 0 00.102.061.23.23 0 01.1.04.122.122 0 01.072.071c.02.034.03.088.03.162a.802.802 0 01-.01.132.515.515 0 00-.01.101c0 .176.013.348.04.517.027.169.081.32.162.455.081.129.193.237.335.324.141.081.33.122.567.122.297 0 .546-.06.749-.182.21-.129.381-.267.516-.416.142-.155.253-.293.334-.415.081-.128.149-.192.203-.192.088 0 .132.044.132.132zm-3.555-.446a.125.125 0 00-.02-.07.163.163 0 01-.02-.072c0-.027.007-.05.02-.07a.144.144 0 00.02-.082c0-.02-.006-.033-.02-.04-.013-.014-.02-.027-.02-.04-.06.013-.125.07-.192.172-.061.1-.122.219-.183.354a2.97 2.97 0 00-.131.415c-.034.135-.05.246-.05.334 0 .047.013.125.04.233a.488.488 0 00.09.213c.115-.236.22-.466.315-.689.1-.223.151-.442.151-.658zm6.657.921c0 .034-.017.068-.05.102a.176.176 0 00-.051.09c0 .075.014.146.04.213.034.068.051.149.051.243 0 .088-.027.132-.08.132a.302.302 0 00-.153.03.646.646 0 01-.152.041c-.04 0-.084-.037-.131-.111a.527.527 0 01-.071-.122c0-.007-.02.007-.06.04a.835.835 0 01-.183.122c-.081.04-.196.081-.345.122a2.43 2.43 0 01-.546.05.982.982 0 01-.496-.121c-.142-.088-.26-.2-.355-.334a1.639 1.639 0 01-.202-.456 2.335 2.335 0 01-.061-.527c0-.162.017-.313.05-.455.041-.149.095-.277.163-.385a.824.824 0 01.253-.273.624.624 0 01.354-.102c.128 0 .257.04.385.122a2.312 2.312 0 01.587.526l.101.112-.253-1.428a78.836 78.836 0 00-.101-.537 12.14 12.14 0 00-.152-.84 2.21 2.21 0 01-.02-.182 2.513 2.513 0 01-.02-.213 92.334 92.334 0 01-.04-.648 1.397 1.397 0 00-.021-.182 9.354 9.354 0 00-.081-.253 1.434 1.434 0 01-.04-.172c0-.034.016-.075.05-.122.034-.054.078-.081.132-.081.04 0 .077.003.111.01a.157.157 0 01.091.06c.027.035.05.089.071.163.027.067.05.165.07.293.008.068.028.196.062.385.033.19.067.395.1.618.035.223.068.435.102.638.034.202.057.35.071.445.034.257.078.537.132.84.06.298.121.585.182.861.06.277.121.524.182.74.061.209.115.35.162.425.014.027.04.047.081.06.04.008.068.028.081.061zm-.75.203a3.42 3.42 0 00-.13-.253 3.648 3.648 0 00-.294-.496 2.535 2.535 0 00-.395-.486c-.142-.142-.28-.213-.415-.213-.115 0-.21.088-.284.263a1.685 1.685 0 00-.101.608c0 .256.074.462.223.617a.716.716 0 00.516.233c.162 0 .33-.027.506-.08.176-.055.3-.119.375-.193zm4.46.364c.008.014.011.034.011.061 0 .04-.03.101-.091.183a1.372 1.372 0 01-.405.314 2.158 2.158 0 01-1.003.232 1.09 1.09 0 01-.455-.1 1.25 1.25 0 01-.395-.315 1.794 1.794 0 01-.284-.516 2.177 2.177 0 01-.111-.73c0-.263.034-.509.101-.738.068-.23.152-.432.253-.608.108-.176.226-.314.355-.415a.61.61 0 01.374-.152c.108 0 .216.024.324.07.115.041.216.095.304.163a.807.807 0 01.223.233.45.45 0 01.081.253c0 .101-.047.206-.142.314-.087.108-.195.21-.324.304a2.822 2.822 0 01-.385.222.847.847 0 01-.303.081.154.154 0 01-.112-.05.25.25 0 01-.04-.142c0-.095.04-.169.121-.223.088-.054.182-.101.284-.142.101-.047.192-.1.273-.162a.29.29 0 00.132-.253.317.317 0 00-.05-.101c-.035-.054-.126-.081-.274-.081-.068 0-.145.04-.233.122a1.251 1.251 0 00-.253.313 1.86 1.86 0 00-.203.466 1.952 1.952 0 00-.08.577c0 .176.03.334.09.476.068.142.152.264.253.365.102.094.22.168.355.223.135.053.273.08.415.08.101 0 .21-.02.324-.06a5.53 5.53 0 00.334-.142c.108-.054.2-.101.274-.142a.489.489 0 01.152-.07c.02 0 .04.01.06.03.027.02.044.04.05.06zm7.544-.951c0 .303-.038.57-.112.8a2.18 2.18 0 01-.253.577c-.101.148-.206.26-.314.334-.101.074-.185.111-.253.111a.402.402 0 01-.273-.121c-.088-.088-.132-.169-.132-.243 0-.108.044-.162.132-.162.033 0 .067.013.101.04.034.02.064.037.091.05.115-.094.223-.249.324-.465.108-.216.162-.523.162-.921 0-.162-.017-.307-.05-.436a1.49 1.49 0 00-.122-.324.7.7 0 00-.132-.202c-.047-.047-.08-.071-.1-.071-.068 0-.136.067-.203.202-.061.135-.115.29-.162.466a6.836 6.836 0 00-.122.506c-.027.162-.04.274-.04.335.006.04.013.077.02.111l.02.101a.518.518 0 01-.121.446c-.088.101-.173.152-.254.152-.04 0-.074-.027-.1-.081a1.372 1.372 0 01-.052-.223 25.927 25.927 0 01-.04-.273 2.357 2.357 0 00-.03-.254 7.023 7.023 0 01-.213-.577c-.088-.263-.182-.543-.284-.84l-.273-.881a17.35 17.35 0 01-.182-.679 12.378 12.378 0 01-.213-.951 12.352 12.352 0 01-.121-.72 4.83 4.83 0 01-.061-.536 8.551 8.551 0 01-.01-.375c0-.06.027-.108.08-.141a.232.232 0 01.133-.051c.06 0 .104.013.131.04.027.02.047.068.06.142l.031.324a9.065 9.065 0 00.122 1.043c.04.203.09.429.152.679l.192.79c.074.27.148.53.223.78.08.249.158.478.233.688.08.209.155.374.222.496.061-.243.135-.463.223-.658.074-.162.166-.31.274-.446a.482.482 0 01.395-.213c.06 0 .141.027.242.082.102.053.2.145.294.273.101.128.186.297.253.506.074.21.112.466.112.77zm3.17-2.724c-.087.466-.168.915-.242 1.347-.034.182-.068.374-.102.577l-.1.587a51.47 51.47 0 01-.082.547c-.02.169-.037.324-.05.466a9.917 9.917 0 00-.061.739l-.04.79c-.014.29-.021.584-.021.88 0 .061-.007.129-.02.203-.014.074-.02.149-.02.223a.289.289 0 01-.051.172c-.027.047-.071.07-.132.07-.054 0-.098-.043-.131-.13a2.678 2.678 0 01-.111-.628 4.287 4.287 0 01-.01-.233v-.203c0-.074.003-.189.01-.344l.05-.587c.02-.25.05-.574.091-.973a14.115 14.115 0 00-.476-.324 31.621 31.621 0 01-.405-.303 3.232 3.232 0 01-.344-.314.505.505 0 01-.061-.091.342.342 0 01-.04-.173c0-.033.016-.067.05-.1.034-.041.071-.062.111-.062.027 0 .055.014.081.04.156.136.335.288.537.457.203.162.402.31.598.445.013-.121.04-.307.08-.557a37.363 37.363 0 00.274-1.64c.047-.27.081-.486.101-.648a.963.963 0 01.081-.314.646.646 0 01.091-.152c.034-.047.071-.07.112-.07.02 0 .064.02.131.06.068.034.102.115.102.243z"
          fill="#fff"
        />
        <Path
          d="M5.255 22.433l.267-.088-.003-.011-.005-.01-.259.11zm.04.112l-.26.104.26-.104zm.031.111l-.277.047.003.021.007.021.267-.089zm-.03.223l-.176-.22-.012.01-.011.011.199.199zm-.122.081l-.11-.259-.008.004-.008.004.126.251zm-.415-.324l.258-.112v-.002l-.258.114zm-.354-1.033l-.272.074.001.004.27-.078zm-.375-1.59l.275-.057-.275.058zm-.314-2.025l.28-.03-.56.006.28.024zm-.08.547l-.277-.053-.001.007.277.046zm-.163.577l.26.106-.26-.106zm-.294.466l-.204-.193.204.193zm-1.356-.496l-.222.174.008.008.214-.182zm-.416-.567l-.239.148.007.01.232-.158zm-.273-.476l.252-.126-.532.151.28-.025zm.132 1.073l-.279.04.001.005.278-.045zm.303 1.327l.27-.078-.27.078zm.041.111l-.252.126.02.04.033.033.199-.199zm.05.071l-.251.126.011.023.016.02.225-.169zm.041.091l-.276.055.008.037.017.034.251-.126zm-.08.324l.144.241-.145-.24zm-.325-.091l-.252.126.004.006.248-.132zm-.172-.415l.265-.095-.265.095zm-.182-.557l-.27.078v.003l.27-.081zm-.172-.618l-.274.064.002.009.272-.073zm-.122-.567l-.277.052v.001l.277-.053zm-.03-.8l-.27-.08-.004.012-.002.013.276.055zm.08-.151l.2.198.082-.082v-.116H.699zm.072-.83l-.2-.2.2.2zm.718.526l-.243.14.004.007.24-.147zm.669 1.134l-.24.147.004.007.236-.154zm.324.435l-.211.186.006.007.205-.193zm.557-.07l.251.125.002-.004-.253-.122zm.222-.659l-.27-.075-.002.007.272.068zm.193-.921l.278.043-.278-.043zm.131-1.053l.28.026.002-.013v-.013h-.282zm-.01-.132l-.279.035v.005l.28-.04zm.04-.435l-.258-.111-.003.008-.003.008.265.095zm.365-.091l-.199.198.01.01.01.008.18-.216zm.081.131l-.273.068.003.01.27-.078zm.02.152H3.8v.02l.002.02.279-.04zm-.01.395l-.28-.03v.014l.28.016zm.041 1.347l-.28.031v.001l.28-.032zm.132.931l-.278.046.001.006.277-.052zm.202 1.013l-.275.058.001.006.274-.064zm.253 1.012l-.272.072.002.005.27-.077zm.274.942l-.27.08.002.007.268-.087zm.283.77l-.267.088c.015.045.03.088.047.127l.26-.104.262-.105a1.743 1.743 0 01-.035-.095l-.267.088zm.04.11l-.26.105c.005.013.01.03.014.053l.277-.046.278-.046a.819.819 0 00-.047-.17l-.261.105zm.031.112l-.267.09c.007.018.006.025.006.022h.563a.635.635 0 00-.035-.2l-.267.088zm.02.112h-.28c0-.01.001-.03.012-.053a.152.152 0 01.042-.056l.176.22.175.22a.416.416 0 00.157-.331h-.282zm-.05.111l-.2-.199a.101.101 0 01-.033.021l.111.259.111.259a.664.664 0 00.21-.141l-.2-.199zm-.122.081l-.126-.252a.149.149 0 01-.042.015l.047.277.046.278a.71.71 0 00.201-.066l-.126-.252zm-.121.04l-.047-.277a1.93 1.93 0 01-.041.007h-.006.023v.562c.027 0 .056-.005.062-.005l.055-.009-.046-.277zm-.071.01v-.28a.25.25 0 01.134.038.181.181 0 01.036.029c.005.005 0 0-.014-.024a2.379 2.379 0 01-.12-.249l-.259.112-.258.112c.055.128.107.235.153.313.023.038.05.08.084.117a.384.384 0 00.076.064c.032.02.09.05.168.05v-.281zm-.223-.374l.257-.114a8.128 8.128 0 01-.341-.997l-.27.078-.27.078c.129.45.251.809.367 1.07l.257-.115zm-.354-1.033l.271-.074a27.22 27.22 0 01-.37-1.573l-.276.058-.275.057c.129.618.255 1.154.378 1.606l.272-.074zm-.375-1.59l.275-.057c-.126-.604-.23-1.27-.31-1.998l-.279.03-.28.031c.082.743.188 1.427.319 2.052l.275-.058zm-.314-2.025l-.28-.024a5.117 5.117 0 01-.077.518l.276.053.276.054c.042-.216.07-.409.085-.576l-.28-.025zm-.08.547l-.278-.046a2.42 2.42 0 01-.145.517l.26.106.26.106c.083-.202.143-.415.18-.637l-.278-.046zm-.163.577l-.26-.106a1.2 1.2 0 01-.238.379l.204.193.205.194a1.76 1.76 0 00.35-.554l-.26-.106zm-.294.466l-.204-.193a.305.305 0 01-.241.094v.563a.866.866 0 00.65-.27l-.205-.194zm-.445.182v-.28c-.032 0-.114-.02-.255-.138l-.18.216-.18.216c.182.152.39.268.615.268v-.282zm-.435-.202l.18-.216a3.675 3.675 0 01-.442-.442l-.214.182-.214.182c.164.193.334.363.51.51l.18-.216zm-.476-.476l.22-.174a9.784 9.784 0 01-.403-.551l-.233.158-.232.158c.132.195.274.389.426.583l.222-.174zm-.416-.567l.24-.148a6.057 6.057 0 01-.261-.454l-.252.126-.252.126c.067.132.163.3.286.498l.24-.148zm-.273-.476l-.28.025c.028.304.072.667.133 1.089l.279-.04.278-.041c-.06-.415-.103-.768-.13-1.058l-.28.025zm.132 1.073l-.278.045c.07.431.174.885.311 1.36l.27-.078.27-.079a10.89 10.89 0 01-.296-1.293l-.277.045zm.303 1.327l-.27.077c.016.055.035.11.06.16l.251-.126.252-.126a.422.422 0 01-.022-.063l-.27.078zm.041.111l-.199.199-.002-.002.252-.126.251-.126a.554.554 0 00-.103-.144l-.199.2zm.05.071l-.224.169a.063.063 0 01-.01-.023l.275-.055.276-.055a.503.503 0 00-.091-.205l-.225.169zm.041.091l-.251.126a.143.143 0 01-.01-.025l-.002-.005.001.012.001.024h.563a.58.58 0 00-.05-.258l-.252.126zm.02.132h-.28c0 .008-.002-.001.006-.017a.092.092 0 01.028-.032l.145.241.145.241a.488.488 0 00.238-.433H1.72zm-.1.192l-.146-.241c-.036.022-.05.02-.047.02v.563a.655.655 0 00.337-.1l-.145-.242zm-.193.06v-.28a.232.232 0 01.148.052l.006.007-.01-.016a.661.661 0 01-.028-.046l-.248.132-.248.132a.912.912 0 00.109.166.363.363 0 00.27.135v-.281zm-.132-.151l.252-.126a3.647 3.647 0 01-.16-.384l-.264.095-.265.095c.063.175.125.324.186.446l.251-.126zm-.172-.415l.265-.095a10.608 10.608 0 01-.178-.543l-.27.081-.269.08c.062.207.125.398.187.572l.265-.095zm-.182-.557l.27-.078c-.06-.208-.117-.412-.17-.612l-.272.072-.272.073c.054.204.112.412.174.623l.27-.078zm-.172-.618l.273-.064c-.046-.2-.086-.384-.119-.556l-.276.053-.276.053c.034.18.076.373.124.578l.274-.064zm-.122-.567l.277-.05a2.27 2.27 0 01-.046-.385H.317c0 .133.02.297.054.486l.277-.05zm-.05-.435h.28c0-.177.008-.273.015-.31l-.275-.055-.276-.055c-.02.098-.026.246-.026.42h.281zm.02-.365l.27.081a.21.21 0 01.013-.037c.003-.006.003-.003-.003.003l-.2-.198-.198-.2a.633.633 0 00-.152.27l.27.081zm.08-.151H.98v-.618H.417v.617H.7zm0-.618H.98c0-.012 0-.021.002-.027l.001-.008-.003.007a.072.072 0 01-.012.014l-.198-.199-.2-.199a.567.567 0 00-.153.412H.7zm.072-.213l.198.2c.001-.002.002-.002 0-.001l-.003.002h.007v-.563a.556.556 0 00-.401.163l.199.2zm.202-.08v.28c-.047 0-.069-.02-.058-.012a.599.599 0 01.068.074l.223-.17.223-.172a.93.93 0 00-.18-.184.465.465 0 00-.276-.098v.281zm.233.171l-.223.171c.078.102.165.236.263.405l.243-.14.244-.14a4.373 4.373 0 00-.304-.467l-.223.171zm.283.436l-.24.147c.107.172.217.358.33.558l.245-.138.244-.139c-.116-.205-.229-.397-.339-.576l-.24.148zm.335.567l-.245.138c.116.206.23.397.34.576l.239-.147.24-.148a18.069 18.069 0 01-.33-.558l-.244.139zm.334.567l-.236.154c.12.183.236.34.349.467l.21-.186.212-.186a3.56 3.56 0 01-.3-.403l-.235.154zm.324.435l-.205.193c.127.135.298.26.509.26v-.562c.01 0 .01.004-.009-.006a.418.418 0 01-.09-.078l-.205.193zm.304.172v.282a.467.467 0 00.323-.14.942.942 0 00.181-.259l-.251-.126-.252-.125a.658.658 0 01-.067.105l.011-.006a.13.13 0 01.055-.012v.281zm.253-.243l.253.122c.092-.192.172-.431.242-.712l-.273-.068-.272-.068c-.065.26-.134.459-.204.605l.254.121zm.222-.658l.272.075c.077-.283.143-.6.199-.953l-.278-.043-.278-.044a8.139 8.139 0 01-.186.89l.271.075zm.193-.921l.278.043c.055-.35.1-.707.134-1.07l-.28-.026-.28-.027c-.034.352-.077.698-.13 1.036l.278.044zm.131-1.053h.282c0-.056-.005-.114-.013-.172l-.279.04-.278.04a.655.655 0 01.007.092h.281zm-.01-.132l.28-.035a1.11 1.11 0 01-.009-.137h-.562c0 .071.004.14.012.207l.28-.035zm-.01-.172h.281c0-.042.01-.098.035-.169l-.265-.094-.265-.095a1.066 1.066 0 00-.067.358h.281zm.05-.263l.26.11c0-.002 0 0-.004.005a.076.076 0 01-.018.016c-.017.01-.027.008-.014.008v-.562a.53.53 0 00-.288.079.508.508 0 00-.194.233l.259.11zm.224-.142v.281c.004 0-.002 0-.014-.004a.121.121 0 01-.044-.028l.2-.198.198-.2a.471.471 0 00-.34-.132v.28zm.141.05l-.18.216a.043.043 0 01-.009-.01l-.002-.006.272-.068.273-.068a.524.524 0 00-.174-.28l-.18.217zm.081.132l-.27.077a.27.27 0 01.01.075h.562a.832.832 0 00-.031-.23l-.27.078zm.02.152l-.278.04a.608.608 0 01.007.081h.563c0-.05-.005-.105-.013-.16l-.278.039zm.01.121h-.28c0 .038-.006.116-.02.244l.28.03.28.03c.014-.129.022-.233.022-.304h-.281zm-.02.274l-.28-.016c-.008.13-.01.326-.01.583h.562c0-.256.003-.438.01-.552l-.282-.015zm-.01.567h-.28c0 .236.017.507.052.811l.279-.031.28-.032a6.74 6.74 0 01-.05-.748h-.28zm.051.78l-.28.032c.035.295.08.61.134.945l.278-.046.277-.045a20.22 20.22 0 01-.13-.919l-.279.033zm.132.931l-.277.052c.061.326.13.666.204 1.019l.275-.058.275-.059a44.5 44.5 0 01-.2-1.006l-.277.052zm.202 1.013l-.274.064c.082.347.167.687.255 1.02l.272-.072.272-.072c-.087-.328-.17-.663-.251-1.005l-.274.065zm.253 1.012l-.27.077c.095.332.186.647.274.945l.27-.08.27-.08c-.088-.296-.179-.609-.273-.939l-.27.077zm.274.942l-.268.087c.097.296.194.56.292.792l.26-.11.258-.11a9.312 9.312 0 01-.275-.746l-.267.087zm5.374-1.428l-.238-.15-.001.003.24.147zm-.445.517l.187.21-.187-.21zm-.658.435l.117.256.006-.003-.123-.253zm-1.165.111l.081-.269-.08.27zm-.395-.172l-.15.238.01.006.14-.244zm-.344-.283l-.21.186.005.006.205-.192zm-.223-.385l.267-.089-.144-.432-.322.322.2.199zm-.152.203l-.236-.153-.004.007-.004.006.244.14zm-.182.293l.23.164.004-.008-.234-.156zm-.223.253l.18.217.01-.01-.19-.207zm-.475-.03l-.245.14.006.01.007.01.232-.16zm-.132-.304l-.27.08.001.004.269-.084zm-.071-.324l-.279.037.279-.037zm.05-.628l.276.059v-.002l-.275-.057zm.213-.708l.262.102-.262-.102zm.355-.648l-.222-.174-.003.005.225.169zm.658-.183l-.27.081.006.017.007.016.257-.114zm.04.486h-.28v.136l.105.084.175-.22zm.102.061l-.105.261.028.012.03.005.047-.278zm.1.04l-.168.226.03.022.034.014.105-.261zm.072.071l-.261.105.008.02.012.02.24-.145zm.02.294l.276.055.001-.009-.277-.046zm.03.618l.278-.045-.278.045zm.162.455l-.24.145.003.006.237-.15zm.335.324l-.149.24.009.005.14-.245zm1.316-.06l.145.24h.002l-.147-.24zm.516-.416l-.207-.19v.001l.207.19zm.334-.415l.235.156.003-.006-.238-.15zm-3.24-.577l-.251.126.007.016.01.014.234-.156zm0-.142l.234.156-.234-.156zm0-.121l-.199.199.033.032.04.02.126-.251zm-.02-.04h.281v-.351l-.342.076.061.274zm-.192.172l-.235-.157-.007.012.242.145zm-.183.354l-.256-.116-.005.012.261.104zm-.131.415l.273.068v-.003l-.273-.065zm-.01.567l-.273.068.273-.068zm.09.213l-.198.199.28.279.172-.355-.253-.123zm.315-.689l-.257-.116-.002.006.259.11zm3.706-.212h-.282c0 .041-.023.138-.129.305l.238.15.239.15c.123-.197.215-.404.215-.605h-.281zm-.173.455l-.24-.147c-.09.148-.22.3-.392.454l.187.21.187.21c.205-.184.373-.376.498-.58l-.24-.147zm-.445.517l-.187-.21c-.168.15-.366.28-.594.392l.123.253.123.253c.27-.132.512-.29.722-.479l-.187-.21zm-.658.435l-.118-.255a1.567 1.567 0 01-.662.146v.563c.311 0 .611-.067.897-.198l-.117-.256zm-.78.172v-.281c-.09 0-.191-.015-.304-.049l-.08.27-.082.269c.158.047.313.073.466.073v-.282zm-.385-.06l.081-.27a1.566 1.566 0 01-.335-.146l-.14.243-.142.244c.147.084.298.15.455.198l.081-.27zm-.395-.173l.15-.237a1.47 1.47 0 01-.289-.239l-.205.193-.205.192c.118.126.251.236.4.33l.15-.239zm-.344-.283l.211-.186a.825.825 0 01-.167-.288l-.267.089-.266.089c.059.178.153.34.278.482l.211-.186zm-.223-.385l-.199-.199c-.062.063-.126.15-.19.25l.237.151.237.153c.058-.09.096-.138.114-.156l-.199-.199zm-.152.203l-.244-.14c-.05.088-.107.18-.172.277l.234.156.234.156c.07-.106.135-.21.193-.31l-.245-.14zm-.182.293l-.229-.163c-.056.08-.118.149-.184.209l.19.207.19.208c.097-.089.184-.188.262-.297l-.229-.164zm-.223.253l-.18-.216c-.04.034-.063.036-.073.036v.562a.671.671 0 00.434-.166l-.18-.216zm-.253.102v-.282a.048.048 0 01.022.006c.005.003 0 .002-.013-.016l-.231.16-.232.16c.1.145.254.253.454.253v-.281zm-.222-.132l.244-.14a1.248 1.248 0 01-.108-.248l-.268.084-.269.084c.04.127.092.247.156.36l.245-.14zm-.132-.304l.27-.08a1.89 1.89 0 01-.062-.281l-.279.037-.279.037c.016.118.043.24.08.366l.27-.079zm-.071-.324l.279-.037a7.998 7.998 0 01-.018-.143v-.004a.083.083 0 010 .012H5.58c0 .027.004.064.006.086l.016.123.279-.037zm-.02-.172h.281c0-.047.017-.171.065-.397l-.275-.059-.275-.058c-.047.22-.077.4-.077.514h.28zm.07-.456l.276.057c.044-.212.11-.433.2-.663l-.263-.102-.262-.102c-.1.256-.175.507-.226.754l.276.056zm.213-.708l.262.102c.087-.222.193-.415.318-.582l-.225-.169-.225-.168a2.99 2.99 0 00-.392.715l.262.102zm.355-.648l.22.173c.11-.138.206-.176.296-.176v-.562c-.302 0-.55.151-.737.39l.22.175zm.516-.284v.281a.134.134 0 01-.072-.027.146.146 0 01-.056-.072l.27-.08.27-.082a.42.42 0 00-.157-.224.434.434 0 00-.255-.077v.281zm.142.101l-.257.114c.012.029.016.05.016.069h.563a.727.727 0 00-.065-.297l-.257.114zm.04.183h-.28v.303h.562v-.303h-.282zm0 .303l-.175.22a.684.684 0 00.172.102l.105-.261.104-.261a.129.129 0 01-.03-.02l-.176.22zm.102.061l-.047.277c.006.001-.005 0-.02-.011l.168-.226.169-.224a.51.51 0 00-.224-.093l-.046.277zm.1.04l-.104.262a.156.156 0 01-.085-.086l.26-.105.262-.104a.403.403 0 00-.228-.228l-.104.262zm.072.071l-.241.145a.126.126 0 01-.012-.023v-.004.015l.002.03h.562a.596.596 0 00-.07-.307l-.241.144zm.03.162H7.22a.523.523 0 01-.006.086l.277.046.277.046c.01-.058.014-.117.014-.178h-.28zm-.01.132l-.276-.055a.797.797 0 00-.015.156h.562c0-.015.002-.03.005-.046l-.276-.055zm-.01.101H7.2c0 .19.014.377.044.561l.277-.044.278-.045a2.983 2.983 0 01-.037-.472h-.281zm.04.517l-.277.044c.032.201.097.388.198.556l.241-.145.242-.144a.984.984 0 01-.126-.356l-.278.045zm.162.455l-.237.15c.106.168.25.306.423.413l.149-.239.148-.239a.744.744 0 01-.245-.235l-.238.15zm.335.324l-.14.245c.2.113.442.158.707.158v-.562c-.208 0-.343-.037-.428-.085l-.14.244zm.567.122v.281c.335 0 .637-.069.894-.222l-.145-.241-.145-.242c-.149.09-.345.143-.604.143v.28zm.749-.182l.147.24c.227-.14.421-.294.577-.466l-.208-.19-.208-.189a2.075 2.075 0 01-.455.365l.147.24zm.516-.416l.208.19c.148-.162.269-.311.36-.449l-.234-.156-.234-.156c-.07.106-.171.233-.307.382l.207.19zm.334-.415l.238.15a.86.86 0 01.067-.09l-.014.009a.19.19 0 01-.088.02v-.562a.418.418 0 00-.285.125 1.04 1.04 0 00-.155.198l.237.15zm.203-.192v.281s-.013 0-.031-.006a.179.179 0 01-.113-.112c-.006-.019-.006-.03-.006-.031h.562a.413.413 0 00-.114-.298.413.413 0 00-.298-.115v.281zm-3.423-.314h.282a.406.406 0 00-.068-.227l-.234.156-.234.156a.157.157 0 01-.027-.085h.281zm-.02-.07l.252-.127.003.01a.163.163 0 01.006.045h-.562c0 .08.025.148.05.197l.251-.126zm-.02-.072h.281a.157.157 0 01-.027.085l-.234-.156-.234-.156a.406.406 0 00-.067.227h.281zm.02-.07l.234.155a.423.423 0 00.068-.237h-.562s0-.034.026-.075l.234.156zm.02-.082h.282a.321.321 0 00-.176-.292l-.126.252-.126.252a.248.248 0 01-.11-.111.226.226 0 01-.025-.1h.281zm-.02-.04l.2-.199a.225.225 0 01.061.158h-.562c0 .115.058.196.102.24l.2-.2zm-.02-.04l-.061-.275c-.174.039-.291.18-.365.29l.234.157.234.156a.355.355 0 01.052-.066c.01-.008-.002.005-.033.012l-.061-.275zm-.192.172l-.242-.145a3.716 3.716 0 00-.197.384l.256.115.257.115a3.13 3.13 0 01.167-.325l-.241-.145zm-.183.354l-.26-.104c-.06.147-.108.299-.145.454l.274.065.273.065c.03-.128.07-.253.12-.376l-.262-.104zm-.131.415l-.273-.068a1.704 1.704 0 00-.06.402h.563c0-.055.012-.142.043-.266l-.273-.068zm-.05.334h-.282c0 .085.022.193.049.301l.273-.068.272-.068a1.718 1.718 0 01-.03-.154l-.002-.01h-.28zm.04.233l-.273.068c.015.063.034.123.057.177.022.05.055.114.108.167l.199-.2.199-.198c.01.01.015.019.016.02l-.005-.01a.636.636 0 01-.029-.092l-.272.068zm.09.213l.254.123c.116-.24.223-.474.32-.702l-.26-.11-.258-.11c-.093.218-.195.444-.308.676l.253.123zm.315-.689l.256.117c.115-.255.177-.514.177-.775h-.562c0 .17-.04.35-.127.542l.256.116zm6.808.264h.281v-.055l-.02-.05-.26.104zm-.101.192l-.276-.055-.005.027v.028h.281zm.04.212l-.26.105.004.01.005.011.252-.125zm-.182.405l.126.252.01-.005.009-.005-.145-.241zm-.152.041v.281h.026l.025-.004-.05-.277zm-.131-.111l.237-.151-.008-.013-.01-.012-.22.176zm-.071-.122h-.281v.058l.022.053.259-.11zm-.06.04l-.181-.215-.01.008-.009.009.2.199zm-.183.122l.126.252.007-.004-.133-.248zm-.345.122l.066.273.008-.002-.073-.271zm-1.042-.071l-.149.24.009.004.14-.244zm-.355-.334l-.236.153.006.008.23-.161zm-.202-.456l-.275.063.004.013.27-.076zm-.01-.982l-.272-.074-.002.009.274.065zm.162-.385l.238.15.004-.007-.242-.143zm.253-.273l.156.234-.156-.234zm.739.02l-.15.238.15-.238zm.587.526l-.225.17.008.01.009.01.208-.19zm.101.112l-.208.189.658.723-.173-.962-.277.05zm-.253-1.428l.277-.048v-.003l-.277.051zm-.101-.537l-.278.042.002.012.276-.054zm-.081-.486l-.276.053.276-.053zm-.07-.354l-.28.037.002.011.002.01.275-.058zm-.021-.182h.281v-.023l-.004-.023-.277.046zm-.02-.213l-.281.018.28-.018zm-.02-.334l.28-.017-.28.017zm-.041-.496l.273-.069-.004-.012-.27.08zm-.081-.253l-.272.072.002.008.003.009.267-.09zm.01-.294l.229.164.005-.008.005-.007-.239-.149zm.243-.07l.055-.277-.055.276zm.091.06l-.22.176.22-.176zm.071.162l-.271.074.004.015.006.015.261-.104zm.07.293l.28-.027v-.008l-.001-.008-.278.043zm.062.385l-.277.05.277-.05zm.202 1.256l.278-.046-.278.046zm.071.445l.279-.036v-.003l-.279.04zm.132.84l-.277.05.001.007.276-.056zm.364 1.6l-.27.077v.002l.27-.078zm.162.426l.252-.126-.007-.013-.008-.012-.237.151zm.081.06l-.089.268.021.007.022.003.046-.277zm-.668.264l.199.199.123-.123-.055-.165-.267.089zm-.132-.253l-.253.121.003.007.003.006.247-.134zm-.293-.496l-.239.15.007.01.232-.16zm-.395-.486l-.2.199.005.004.195-.203zm-.699.05l-.26-.11-.002.01.262.1zm.122 1.226l-.204.194.005.004.199-.198zm1.022.151l.083.27-.083-.27zm1.124-.395h-.281c0-.067.035-.1.032-.097l.199.199.199.199a.425.425 0 00.133-.3h-.282zm-.05.102l-.2-.2a.457.457 0 00-.127.236l.276.055.276.055a.118.118 0 01-.012.033.086.086 0 01-.014.02l-.2-.2zm-.051.09h-.281c0 .11.02.216.06.318l.261-.104.262-.105a.287.287 0 01-.02-.108h-.282zm.04.213l-.251.126c.01.02.02.056.02.117h.563a.818.818 0 00-.08-.368l-.252.125zm.051.243h-.281c0 .025-.005-.005.021-.048a.215.215 0 01.18-.101v.562a.348.348 0 00.3-.166.467.467 0 00.061-.247h-.28zm-.08.132v-.281a.573.573 0 00-.298.07l.145.242.145.24a.12.12 0 01-.021.01l-.005.003.01-.002h.023v-.282zm-.153.03l-.126-.251.01-.004a.912.912 0 01-.085.02l.05.276.05.277a.889.889 0 00.227-.066l-.126-.252zm-.152.041v-.281c.07 0 .11.032.119.038.008.007.003.005-.013-.02l-.237.152-.238.15c.032.05.073.104.124.148a.379.379 0 00.245.094v-.281zm-.131-.111l.22-.176a.248.248 0 01-.033-.057l-.258.111-.259.111c.029.066.065.13.11.186l.22-.175zm-.071-.122h.281a.283.283 0 00-.193-.268c-.093-.031-.17-.004-.18 0-.042.014-.073.035-.08.04a.837.837 0 00-.069.053l.18.216.18.216.022-.018a.201.201 0 01-.013.008c-.005.003-.02.011-.043.019-.008.002-.083.03-.175 0a.28.28 0 01-.191-.266h.28zm-.06.04l-.2-.198c.001-.001-.006.006-.028.02-.02.014-.05.032-.089.052l.134.248.133.248c.092-.05.183-.106.248-.17l-.199-.2zm-.183.122l-.126-.251a1.694 1.694 0 01-.292.101l.074.272.074.271c.155-.042.29-.089.396-.141l-.126-.252zm-.345.122l-.065-.274c-.112.027-.27.043-.481.043v.563c.234 0 .44-.018.612-.059l-.066-.273zm-.546.05v-.281a.704.704 0 01-.357-.084l-.14.244-.139.244c.19.109.406.159.636.159v-.282zm-.496-.121l.148-.24a.916.916 0 01-.272-.256l-.23.162-.231.16c.116.168.263.305.437.413l.148-.24zm-.355-.334l.236-.154a1.364 1.364 0 01-.168-.378l-.27.076-.271.076c.054.194.133.372.237.533l.236-.153zm-.202-.456l.274-.063a2.056 2.056 0 01-.054-.464h-.562c0 .198.022.395.068.59l.274-.063zm-.061-.527h.281c0-.142.015-.272.043-.39l-.273-.065-.274-.065c-.04.165-.058.339-.058.52h.28zm.05-.455l.272.074c.035-.127.079-.23.13-.31l-.24-.149-.238-.149c-.085.136-.149.29-.195.46l.272.074zm.163-.385l.242.143a.543.543 0 01.167-.182l-.156-.234-.156-.234c-.14.093-.253.217-.34.364l.243.143zm.253-.273l.156.234a.344.344 0 01.198-.054v-.562a.905.905 0 00-.51.148l.156.234zm.354-.102v.282c.066 0 .143.02.235.078l.15-.238.15-.238a.995.995 0 00-.535-.165v.281zm.385.122l-.15.238c.114.072.215.15.302.23l.192-.205.192-.206a2.594 2.594 0 00-.386-.295l-.15.238zm.344.263l-.192.206c.094.087.162.162.21.226l.225-.169.225-.168a2.352 2.352 0 00-.276-.3l-.192.205zm.243.263l-.208.19.012.013.006.007.003.003.003.003.01.011.01.011c.013.015-.003-.004.01.01.003.004 0 .002.004.005l.002.002v.001l.002.002.004.004.001.001v.001h.001l.001.002.007.007v.001h.002v.001c0 .001 0 0 0 0v.001h.001l.003.004.005.005.001.002h.001l.002.003.002.002c.01.012-.008-.01.002.002l.003.003v.001h.001v.001l.001.001h.001v.001l.208-.19.208-.188c-.01-.011.009.008-.001-.002l-.002-.002-.003-.003-.003-.004-.005-.005-.002-.003-.002-.001v-.002l-.007-.006-.001-.002-.002-.002a.03.03 0 01-.002-.002l-.002-.002-.007-.008-.008-.009-.005-.005-.002-.003-.002-.002-.01-.01-.005-.007h-.001v-.001h-.001l-.001-.002-.003-.003-.001-.001-.002-.002c-.001-.001 0 .001 0 0l-.001-.001-.002-.002-.005-.006-.006-.007-.002-.002-.002-.001c-.006-.007.005.005-.001-.002l-.002-.002-.208.19zm.101.112l.277-.05-.253-1.426-.277.048-.277.049c.075.425.159.902.254 1.428l.276-.05zm-.253-1.428l.277-.051a74.71 74.71 0 00-.102-.539l-.276.053-.276.054.1.534.277-.05zm-.101-.537l.278-.04a12.325 12.325 0 00-.083-.498l-.276.052-.276.053c.026.137.052.295.079.475l.278-.042zm-.081-.486l.276-.052a16.67 16.67 0 00-.072-.36l-.275.058-.275.059c.02.092.043.207.07.348l.276-.053zm-.07-.354l.278-.037a5.36 5.36 0 01-.018-.146c0-.008 0-.006 0 0h-.562c0 .044.01.129.022.22l.28-.037zm-.021-.182l.277-.046a2.33 2.33 0 01-.017-.186l-.28.02-.281.018c.007.1.014.184.023.24l.278-.046zm-.02-.213l.28-.017a72.627 72.627 0 01-.02-.334l-.28.017-.281.016.02.336.28-.018zm-.02-.334l.28-.017a26.5 26.5 0 00-.02-.317l-.28.02-.281.02.02.31.28-.016zm-.02-.314l.28-.02a1.55 1.55 0 00-.028-.23l-.273.068-.273.068v.001a2.991 2.991 0 01.013.133l.28-.02zm-.021-.182l.27-.081a9.36 9.36 0 00-.084-.261l-.267.089-.267.089c.033.1.06.18.079.245l.269-.081zm-.081-.253l.272-.073a4.288 4.288 0 01-.034-.134v.003c0 .001.003.014.003.032h-.562c0 .033.005.064.007.07a4.564 4.564 0 00.042.174l.272-.072zm-.04-.172h.28c0 .03-.007.048-.008.052l.007-.01-.229-.164-.229-.163a.497.497 0 00-.103.285h.281zm.05-.122l.239.15c-.001 0-.01.015-.033.029a.144.144 0 01-.074.021v-.562a.431.431 0 00-.37.213l.238.149zm.132-.081v.281c.025 0 .043.002.056.005l.055-.276.055-.276a.854.854 0 00-.166-.015v.281zm.111.01l-.055.276a.147.147 0 01-.053-.022.091.091 0 01-.02-.017l.22-.176.219-.176a.437.437 0 00-.256-.16l-.055.275zm.091.06l-.22.177c-.006-.008-.005-.01 0 .002a.43.43 0 01.02.058l.271-.074.271-.074a.73.73 0 00-.122-.264l-.22.176zm.071.163l-.261.104c.015.039.035.112.054.233l.278-.043.278-.044a1.703 1.703 0 00-.088-.355l-.261.105zm.07.293l-.279.028c.008.08.03.22.064.407l.277-.05.277-.05a6.086 6.086 0 01-.058-.362l-.28.027zm.062.385l-.277.05c.033.186.066.39.1.61l.278-.042.278-.042a24.11 24.11 0 00-.102-.625l-.277.05zm.1.618l-.277.042c.034.224.068.438.102.642l.277-.046.278-.046a44.27 44.27 0 01-.101-.634l-.278.042zm.102.638l-.277.046c.033.202.057.348.07.44l.278-.04.278-.04c-.014-.098-.038-.25-.071-.452l-.278.046zm.071.445l-.279.037c.035.261.08.546.134.853l.277-.05.277-.048a18.64 18.64 0 01-.13-.828l-.279.036zm.132.84l-.276.057c.061.299.122.587.183.865l.275-.06.275-.06c-.06-.276-.121-.562-.182-.858l-.275.057zm.182.861l-.275.06c.062.282.124.534.186.756l.271-.076.271-.076c-.059-.21-.118-.451-.178-.724l-.275.06zm.182.74l-.27.078c.06.208.124.386.195.498l.237-.151.238-.151a1.706 1.706 0 01-.13-.353l-.27.079zm.162.425l-.251.126a.41.41 0 00.243.202l.09-.267.088-.267s.05.017.082.08l-.252.126zm.081.06l-.046.278a.19.19 0 01-.134-.112l.261-.105.261-.104a.378.378 0 00-.296-.234l-.046.278zm-.668.264l.267-.089c-.012-.036-.038-.086-.055-.12a10.577 10.577 0 00-.097-.179l-.247.135-.247.134a10.292 10.292 0 01.114.214c.007.015.003.009-.002-.006l.267-.089zm-.132-.253l.254-.122a3.92 3.92 0 00-.316-.534l-.231.16-.232.16c.115.166.205.318.272.457l.253-.121zm-.293-.496l.238-.15a2.82 2.82 0 00-.439-.54l-.194.204-.194.203c.13.125.248.269.35.433l.239-.15zm-.395-.486l.199-.2c-.17-.168-.375-.294-.614-.294v.562c.03 0 .101.016.216.13l.199-.198zm-.415-.213v-.281c-.292 0-.457.23-.543.435l.26.11.258.109a.313.313 0 01.059-.101c.003-.003 0 0-.008.004a.072.072 0 01-.026.005v-.281zm-.284.263l-.262-.1c-.083.213-.12.451-.12.708h.562c0-.203.03-.37.083-.507l-.263-.1zm-.101.608h-.281c0 .314.092.594.3.812l.204-.194.203-.195c-.09-.093-.145-.224-.145-.423h-.281zm.223.617l-.2.2c.2.198.44.315.716.315v-.562c-.102 0-.206-.04-.317-.151l-.2.199zm.516.233v.282a2 2 0 00.589-.094l-.083-.269-.082-.268a1.441 1.441 0 01-.424.068v.281zm.506-.08l.083.268c.191-.059.368-.14.49-.262l-.198-.199-.199-.199c-.026.026-.098.073-.258.123l.082.268zm4.835.171l-.267.09.006.018.01.018.25-.126zm-.081.244l-.225-.17.225.17zm-.132.131l.188.21-.188-.21zm-.273.182l.131.249-.131-.249zm-.425.162l-.076-.27h-.003l.079.27zm-1.033-.03l-.126.252.01.004.116-.256zm-.395-.314l-.219.177.005.005.214-.182zm-.284-.516l-.265.094.001.003.264-.097zm-.01-1.468l.27.079-.27-.08zm.253-.608l-.24-.148-.003.008.243.14zm.355-.415l.174.22-.174-.22zm.698-.081l-.112.258.01.004.009.003.093-.265zm.304.162l-.171.223.008.006.163-.23zm.223.233l-.24.147.006.009.234-.156zm-.06.567l-.213-.185-.006.007.218.178zm-.325.304l.16.232.007-.006-.167-.226zm-.385.222l.11.26.01-.006-.12-.254zm-.415.03l-.234.157.016.023.02.02.198-.2zm.081-.364l-.147-.24-.009.006.156.234zm.284-.142l.104.262.008-.003.007-.004-.12-.255zm.273-.162l-.16-.231-.009.006.17.225zm.081-.354l-.238.15.238-.15zm-.506.04l.182.215.009-.008-.191-.207zm-.253.314l.238.15.003-.005-.241-.145zm-.203.466l.27.083v-.003l-.27-.08zm.01 1.053l-.258.111.004.01.254-.12zm.253.365l-.199.199.008.006.191-.205zm.355.223l-.104.26.104-.26zm.74.02l.093.265.008-.003-.102-.262zm.333-.142l.12.255.006-.003-.126-.252zm.274-.142l.134.247.007-.004-.141-.243zm.212-.04l-.199.199.014.014.017.012.168-.225zm.05.06l-.25.126a.196.196 0 01-.019-.054c-.002-.009-.001-.013-.001-.01h.562a.417.417 0 00-.04-.187l-.251.125zm.011.061h-.281c0-.024.004-.04.006-.046.002-.007.003-.008 0-.004a.72.72 0 01-.042.063l.226.17.225.168a.992.992 0 00.095-.149.454.454 0 00.052-.202h-.281zm-.091.183l-.225-.17a1.93 1.93 0 01-.095.091l.188.21.188.21c.066-.06.13-.12.169-.173l-.225-.168zm-.132.131l-.188-.209c-.045.04-.114.089-.217.143l.132.248.131.249c.128-.067.24-.14.33-.222l-.188-.209zm-.273.182l-.132-.248a1.892 1.892 0 01-.37.14l.077.27.075.271c.182-.05.344-.111.482-.184l-.132-.249zm-.425.162l-.08-.27c-.129.038-.294.06-.498.06v.563c.242 0 .462-.026.656-.082l-.078-.27zm-.578.071v-.28a.808.808 0 01-.339-.077l-.116.256-.117.256c.183.083.375.127.572.127v-.282zm-.455-.1l.126-.253a.97.97 0 01-.307-.244l-.214.182-.214.182c.137.162.298.291.483.384l.126-.252zm-.395-.315l.218-.177a1.516 1.516 0 01-.238-.436l-.264.097-.264.097c.083.226.192.426.33.596l.218-.177zm-.284-.516l.265-.094a1.901 1.901 0 01-.095-.635h-.562c0 .301.04.577.127.823l.265-.094zm-.111-.73h.281c0-.238.03-.458.09-.66l-.27-.078-.27-.08a2.89 2.89 0 00-.112.819h.281zm.101-.738l.27.079c.062-.212.139-.393.227-.546l-.244-.141-.243-.14a3.068 3.068 0 00-.28.668l.27.08zm.253-.608l.24.147a1.29 1.29 0 01.29-.341l-.175-.221-.175-.22c-.16.125-.298.291-.42.488l.24.147zm.355-.415l.174.22c.096-.075.16-.09.2-.09v-.563a.888.888 0 00-.548.212l.174.22zm.374-.152v.281c.066 0 .136.014.212.047l.112-.257.113-.258a1.083 1.083 0 00-.437-.094v.281zm.324.07l-.093.266c.09.032.164.072.226.12l.171-.223.172-.223a1.368 1.368 0 00-.382-.204l-.094.265zm.304.163l-.163.229c.068.048.114.1.146.151l.24-.147.24-.148a1.087 1.087 0 00-.3-.314l-.163.229zm.223.233l-.234.156a.17.17 0 01.034.097h.562a.73.73 0 00-.128-.41l-.234.157zm.081.253h-.281c0 .01-.004.05-.073.129l.212.185.212.185a.763.763 0 00.211-.5h-.281zm-.142.314l-.218-.178c-.07.088-.16.173-.273.255l.167.227.167.226c.145-.107.27-.224.375-.353l-.218-.177zm-.324.304l-.159-.233c-.117.08-.232.147-.346.201l.12.254.12.255a3.1 3.1 0 00.424-.245l-.159-.232zm-.385.222l-.109-.259a.633.633 0 01-.194.06v.562c.131 0 .275-.045.413-.103l-.11-.26zm-.303.081v-.28c.02 0 .04.004.058.012a.103.103 0 01.03.019l-.2.199-.199.199a.435.435 0 00.31.133v-.282zm-.112-.05l.234-.156a.045.045 0 01.006.013c.001.003.001.004.001 0h-.563a.53.53 0 00.088.299l.234-.156zm-.04-.142h.281v-.002a.045.045 0 01-.004.01.035.035 0 01-.005.007l.005-.004-.156-.234-.156-.234a.534.534 0 00-.247.457h.282zm.121-.223l.148.24a1.57 1.57 0 01.24-.12l-.104-.262-.105-.26a2.13 2.13 0 00-.326.163l.147.24zm.284-.142l.119.255a1.81 1.81 0 00.323-.192l-.169-.225-.169-.225a1.247 1.247 0 01-.223.133l.119.254zm.273-.162l.16.232a.572.572 0 00.253-.485h-.563v.014c-.001.002-.001.002 0 0l-.01.008.16.231zm.132-.253h.281a.324.324 0 00-.02-.108 1.103 1.103 0 00-.074-.142l-.238.149-.238.15a.61.61 0 01.025.042l-.004-.01a.252.252 0 01-.013-.08h.28zm-.05-.101l.238-.15a.436.436 0 00-.253-.18.922.922 0 00-.26-.032v.562a.617.617 0 01.1.009c.004.001-.003 0-.015-.009a.164.164 0 01-.05-.05l.24-.15zm-.274-.081v-.281c-.176 0-.32.1-.424.196l.19.206.192.207a.317.317 0 01.063-.048c.01-.006.002.001-.021.001v-.281zm-.233.122l-.182-.215c-.118.1-.221.231-.312.384l.24.144.242.145a.975.975 0 01.194-.244l-.182-.215zm-.253.313l-.238-.15a2.139 2.139 0 00-.234.536l.27.08.269.08c.048-.163.106-.294.17-.395l-.237-.15zm-.203.466l-.269-.082a2.236 2.236 0 00-.093.66h.563c0-.186.023-.35.068-.495l-.269-.083zm-.08.577h-.282c0 .209.036.406.114.587l.258-.11.259-.111a.917.917 0 01-.068-.366h-.282zm.09.476l-.254.121c.08.168.183.317.309.443l.198-.2.2-.198a1.021 1.021 0 01-.199-.287l-.254.121zm.253.365l-.191.205c.128.12.276.212.441.279l.105-.261.104-.262a.848.848 0 01-.267-.167l-.191.206zm.355.223l-.104.26c.167.068.34.102.52.102v-.563a.826.826 0 01-.312-.06l-.104.26zm.415.08v.282c.139 0 .279-.028.418-.077l-.094-.265-.093-.265a.699.699 0 01-.23.044v.282zm.324-.06l.102.262c.126-.05.244-.099.351-.15l-.119-.254-.119-.255c-.095.044-.2.09-.317.135l.102.262zm.334-.142l.126.252c.11-.055.204-.104.282-.147l-.134-.247-.135-.247c-.07.039-.158.084-.265.137l.126.252zm.274-.142l.141.243a1.624 1.624 0 01.076-.041l.003-.001a.183.183 0 01-.038.008.234.234 0 01-.03.002v-.562a.347.347 0 00-.11.018.61.61 0 00-.063.025c-.036.017-.077.04-.121.065l.142.243zm.152-.07v.28a.197.197 0 01-.139-.051l.2-.2.198-.198a.367.367 0 00-.26-.113v.281zm.06.03l-.168.225s-.006-.004-.015-.015a.187.187 0 01-.033-.06l.267-.09.267-.088a.412.412 0 00-.149-.197l-.169.225zm7.482-.091l-.267-.087-.003.007.27.08zm-.253.577l.233.158.003-.005-.236-.153zm-.314.334l-.16-.232-.006.005.166.227zm-.526-.01l-.2.199.009.008.19-.207zm.101-.365l-.176.22.015.012.016.01.145-.242zm.091.05l-.126.253.164.081.14-.116-.178-.217zm.324-.465l-.252-.126-.003.007.255.12zm.111-1.357l.273-.071-.273.071zm-.121-.324l-.255.118.003.008.004.008.248-.134zm-.132-.202l-.198.199.198-.2zm-.303.131l-.252-.125-.005.01.257.115zm-.162.466l.27.076.001-.003-.271-.073zm-.122.506l-.276-.055-.001.01.277.046zm-.04.335h-.282v.023l.004.023.278-.046zm.02.111l-.276.055.276-.055zm.02.101l.276-.055-.276.055zm-.121.446l-.213-.184.213.184zm-.355.07l-.267.09.007.019.009.018.251-.126zm-.05-.222l-.279.043.278-.043zm-.041-.273l-.28.02v.01l.002.01.278-.04zm-.03-.254l.276-.05-.006-.033-.013-.03-.257.113zm-.213-.577l.267-.089-.267.09zm-.284-.84l-.268.083.002.008.266-.091zm-.273-.881l-.27.077.001.006.27-.083zm-.182-.679l.273-.065v-.005l-.273.07zm-.213-.951l.277-.049v-.005l-.277.054zm-.121-.72l.279-.037-.002-.007-.277.045zm-.061-.536l.28-.013-.28.013zm.07-.516l.15.238.007-.004.007-.006-.163-.228zm.264-.01l-.199.198.014.014.016.012.17-.224zm.06.141l.281-.025-.001-.013-.002-.012-.277.05zm.031.324l.282-.013-.002-.013-.28.026zm.05.567l-.279.032v.001l.28-.033zm.072.476l-.278.047.002.008.276-.055zm.152.679l.273-.067-.273.067zm.192.79l-.273.066.002.008.271-.075zm.223.78l-.27.08.002.006.268-.087zm.233.688l-.265.094.002.007.263-.101zm.222.496l-.245.136.346.623.172-.691-.273-.068zm.223-.658l-.256-.117v.002l.256.115zm.274-.446l.22.176.003-.005-.223-.17zm.637-.131l.133-.249-.133.248zm.294.273l-.226.167.005.007.221-.174zm.253.506l-.268.087.003.007.265-.094zm.112.77h-.282c0 .281-.034.518-.097.713l.267.087.268.086a2.88 2.88 0 00.125-.886h-.281zm-.112.8l-.27-.08c-.061.21-.136.376-.218.503l.235.154.236.154c.12-.184.214-.403.287-.652l-.27-.08zm-.253.577l-.232-.159a.985.985 0 01-.241.261l.16.232.159.232c.145-.1.272-.24.386-.408l-.232-.158zm-.314.334l-.166-.227a.477.477 0 01-.086.053c-.019.008-.018.004 0 .004v.563c.16 0 .305-.083.419-.166l-.167-.227zm-.253.111v-.28c-.006 0-.033-.002-.083-.048l-.19.207-.191.206a.681.681 0 00.464.197v-.282zm-.273-.121l.199-.2a.292.292 0 01-.05-.06c-.006-.01 0-.003 0 .017h-.562c0 .185.107.335.214.442l.199-.2zm-.132-.243h.281c0-.023.006.011-.03.056a.18.18 0 01-.07.052.134.134 0 01-.05.011v-.562a.4.4 0 00-.316.144.467.467 0 00-.096.299h.281zm.132-.162v.281a.125.125 0 01-.075-.021l.176-.22.176-.22a.442.442 0 00-.277-.101v.28zm.101.04l-.145.242c.038.022.075.043.11.06l.126-.251.126-.252a1.095 1.095 0 01-.072-.04l-.145.241zm.091.05l.179.218c.16-.132.29-.33.4-.563l-.255-.12-.255-.12c-.093.2-.179.312-.248.369l.18.217zm.324-.465l.252.126c.136-.273.191-.63.191-1.047h-.562c0 .38-.053.636-.133.795l.252.126zm.162-.921h.281c0-.181-.018-.351-.06-.507l-.271.071-.272.072c.026.1.04.22.04.364h.282zm-.05-.436l.272-.071a1.764 1.764 0 00-.146-.386l-.248.133-.248.134c.034.063.068.149.098.262l.271-.072zm-.122-.324l.255-.118a.977.977 0 00-.188-.283l-.199.199-.198.199a.436.436 0 01.075.121l.255-.118zm-.132-.202l.2-.2a.761.761 0 00-.1-.084.355.355 0 00-.2-.068v.562a.237.237 0 01-.096-.019l-.026-.014c-.002-.002.005.003.024.022l.198-.2zm-.1-.071v-.281a.425.425 0 00-.301.133.863.863 0 00-.154.225l.252.125.251.126a.55.55 0 01.049-.079s-.006.007-.023.015a.17.17 0 01-.075.017v-.281zm-.203.202l-.257-.115a3.384 3.384 0 00-.177.508l.272.073.271.073c.044-.164.094-.304.147-.423l-.256-.116zm-.162.466l-.271-.076c-.05.176-.092.351-.127.527l.276.056.276.055c.032-.162.071-.324.116-.486l-.27-.076zm-.122.506l-.277-.046a2.66 2.66 0 00-.045.38h.562c0-.034.01-.123.038-.287l-.278-.046zm-.04.335l-.278.046.022.12.276-.055.276-.055a3.223 3.223 0 01-.019-.103l-.277.047zm.02.111l-.276.055v.004h.001v.005l.001.001v.004l.001.001v.004h.001v.005l.001.001v.004l.001.001v.004l.001.001v.004l.001.001v.004l.001.001v.004l.001.001v.004l.001.001v.004h.001v.005l.001.001v.004l.001.001v.004h.001v.005l.001.001v.004l.001.001v.004l.001.001v.004h.001v.005l.001.001v.001l.276-.055.276-.055v-.001-.001-.001l-.001-.001V20.5v-.001-.001-.001-.001h-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.001-.001-.001h-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.002l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.001-.001-.001h-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.002l-.001-.001v-.002-.001-.001l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.002l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001-.001-.001l-.001-.001v-.001-.001l-.276.055zm.02.101l-.276.055a.242.242 0 01.005.047h.563a.798.798 0 00-.016-.157l-.276.055zm.01.102h-.281a.23.23 0 01-.063.16l.213.184.212.184c.13-.15.2-.33.2-.529h-.28zm-.131.344l-.213-.184a.282.282 0 01-.061.056c-.008.005 0-.002.02-.002v.562c.203 0 .359-.124.466-.248l-.212-.184zm-.254.152v-.282c.049 0 .091.018.12.042.025.02.033.037.03.033l-.25.126-.252.125c.048.097.157.237.352.237v-.281zm-.1-.081l.266-.09a1.114 1.114 0 01-.04-.176l-.277.043-.279.043c.016.098.036.188.062.269l.267-.09zm-.052-.223l.279-.043a24.657 24.657 0 01-.04-.27l-.279.04-.278.04.04.276.278-.043zm-.04-.273l.28-.02a2.65 2.65 0 00-.034-.284l-.276.05-.277.05c.011.063.02.137.027.224l.28-.02zm-.03-.254l.257-.114a6.81 6.81 0 01-.203-.552l-.267.09-.267.088c.088.265.163.468.223.603l.257-.115zm-.213-.577l.267-.089-.284-.842-.267.09-.266.091c.101.297.196.577.283.84l.267-.09zm-.284-.84l.27-.084-.274-.88-.269.083-.269.083.274.881.268-.083zm-.273-.881l.27-.077c-.08-.282-.14-.504-.179-.667l-.273.065-.274.066c.042.174.104.405.186.69l.27-.077zm-.182-.679l.272-.07a12.06 12.06 0 01-.208-.93l-.277.049-.277.048c.05.28.122.605.218.974l.272-.07zm-.213-.951l.276-.054a12.058 12.058 0 01-.119-.702l-.278.037-.28.037c.029.21.07.455.125.736l.276-.054zm-.121-.72l.277-.044a4.554 4.554 0 01-.057-.505l-.281.013-.281.013c.007.162.03.353.064.569l.278-.045zm-.061-.536l.28-.013a8.262 8.262 0 01-.009-.362h-.563c0 .107.004.237.011.388l.28-.013zm-.01-.375h.281a.122.122 0 01-.017.059.11.11 0 01-.034.038l-.15-.238-.148-.239a.44.44 0 00-.213.38h.28zm.08-.141l.164.228.006-.004a.106.106 0 01-.038.006v-.562a.51.51 0 00-.295.103l.164.229zm.133-.051v.281c.01 0 .007.002-.005-.002a.158.158 0 01-.063-.04l.2-.198.198-.2a.458.458 0 00-.33-.122v.281zm.131.04l-.169.226a.194.194 0 01-.042-.044c-.008-.01-.011-.018-.012-.02-.001-.003.003.005.007.03l.277-.05.277-.05a.714.714 0 00-.044-.152.4.4 0 00-.125-.164l-.169.225zm.06.142l-.28.026.031.325.28-.027.28-.026a62.67 62.67 0 01-.03-.323l-.28.025zm.031.324l-.28.014c.006.15.024.346.051.585l.28-.032.28-.032a8.75 8.75 0 01-.05-.548l-.28.013zm.05.567l-.279.033c.015.122.04.285.073.49l.278-.047.277-.046c-.033-.2-.056-.354-.069-.463l-.28.033zm.072.476l-.276.055c.041.207.093.438.154.69l.274-.066.273-.067c-.06-.247-.11-.469-.15-.667l-.275.055zm.152.679l-.274.066.193.79.273-.067.273-.066-.192-.79-.273.067zm.192.79l-.271.074c.075.272.15.534.224.785l.27-.08.27-.08a39.013 39.013 0 01-.222-.774l-.271.075zm.223.78l-.268.086c.082.252.16.484.236.696l.265-.094.265-.094c-.073-.207-.15-.434-.23-.682l-.268.087zm.233.688l-.263.101c.084.215.163.394.24.531l.245-.136.246-.137a3.855 3.855 0 01-.206-.46l-.262.1zm.222.496l.273.068c.058-.23.127-.433.207-.611l-.257-.115-.256-.115a4.243 4.243 0 00-.24.705l.273.068zm.223-.658l.256.117c.065-.142.144-.27.237-.387l-.22-.176-.22-.176a2.41 2.41 0 00-.309.505l.256.117zm.274-.446l.223.17c.064-.083.118-.101.172-.101v-.562a.763.763 0 00-.62.323l.225.17zm.395-.213v.282c-.01 0-.006-.002.017.006.021.007.052.02.093.042l.133-.248.132-.249a.827.827 0 00-.375-.114v.281zm.242.082l-.132.248c.053.028.121.085.2.192l.226-.167.227-.167a1.193 1.193 0 00-.388-.355l-.133.248zm.294.273l-.22.174c.074.095.145.23.206.419l.267-.087.268-.086a1.89 1.89 0 00-.3-.594l-.22.174zm.253.506l-.265.094c.06.17.095.393.095.676h.562c0-.325-.039-.616-.127-.864l-.265.094zm3.283-1.954l.276.052.005-.026v-.026h-.281zm-.243 1.347l.276.05v-.003l-.276-.047zm-.102.577l.278.048v-.002l-.278-.046zm-.1.587l-.278-.048-.001.008.278.04zm-.082.547l-.278-.043-.001.01.28.033zm-.05.466l.279.034v-.008l-.28-.026zm-.061.739l-.281-.014.28.014zm-.04.79l-.282-.016v.003l.281.013zm-.041 1.083l-.277-.05.277.05zm-.071.395l-.229-.163-.008.011-.007.012.244.14zm-.263-.06l-.267.088.004.012.263-.1zm-.071-.294l.277-.05v-.002l-.277.052zm-.04-.335l.28-.016v-.001l-.28.017zm0-.78l-.281-.025v.014l.28.012zm.05-.587l.28.024-.28-.023zm.091-.972l.28.029.001-.014v-.015h-.281zm-.142-.1l-.16.23.008.006.152-.237zm-.334-.224l-.167.227.007.005.007.004.153-.236zm-.405-.303l-.176.22.006.003.17-.223zm-.344-.314l.206-.192-.007-.007-.2.199zm-.061-.091l.244-.14-.244.14zm.01-.274l.199.2.009-.01.008-.01-.216-.18zm.192-.02l-.198.199.007.007.007.006.184-.212zm.537.456l-.18.216.005.003.175-.22zm.598.445l-.16.232.387.267.052-.468-.28-.03zm.08-.557l-.276-.052-.001.007.278.045zm.142-.8l.278.047v-.002l-.278-.045zm.132-.84l-.277-.049-.001.007.278.042zm.101-.648l.28.035.002-.018v-.017h-.282zm.02-.132l-.274-.06.274.06zm.061-.182l.257.114-.257-.114zm.091-.152l.216.18.007-.008.006-.009-.229-.163zm.243-.01l-.144.241.009.006.01.005.125-.252zm.102.243l-.277-.052c-.088.467-.169.917-.244 1.351l.278.048.277.047c.074-.43.155-.878.242-1.342l-.276-.052zm-.243 1.347l-.277-.052c-.034.184-.068.379-.102.583l.277.046.278.046c.033-.201.067-.392.1-.572l-.276-.051zm-.102.577l-.277-.048-.101.587.277.048.277.048.102-.587-.278-.048zm-.1.587l-.28-.04c-.026.188-.053.37-.08.544l.278.043.278.043.082-.55-.279-.04zm-.082.547l-.28-.034c-.02.171-.037.328-.05.473l.28.027.28.026c.013-.139.03-.292.05-.459l-.28-.033zm-.05.466l-.28-.035c-.028.224-.048.478-.062.76l.28.014.282.013c.013-.271.033-.51.059-.718l-.28-.034zm-.061.739l-.281-.014-.04.788.28.016.281.015c.014-.25.027-.514.04-.792l-.28-.013zm-.04.79l-.282-.014c-.013.295-.02.593-.02.894h.562c0-.292.007-.581.02-.867l-.28-.013zm-.021.88h-.281a.86.86 0 01-.016.153l.277.05.276.05c.016-.087.025-.171.025-.253h-.281zm-.02.203l-.277-.05c-.017.09-.025.181-.025.273h.562c0-.057.006-.115.017-.173l-.277-.05zm-.02.223h-.282V23.52l-.001.001v-.002l.003-.003.229.163.229.163a.568.568 0 00.103-.335h-.282zm-.051.172l-.244-.14a.148.148 0 01.112-.07v.562a.42.42 0 00.376-.212l-.244-.14zm-.132.07v-.28c.026 0 .053.005.077.016.023.01.04.024.049.033.016.017.014.023.005 0l-.262.1-.263.101c.042.109.152.312.394.312v-.281zm-.131-.13l.266-.09a1.823 1.823 0 01-.06-.253l-.277.049-.277.048c.022.124.048.236.08.334l.268-.089zm-.071-.294l.276-.052a2.374 2.374 0 01-.036-.3l-.28.017-.282.017c.008.126.023.25.045.37l.277-.052zm-.04-.335l.28-.017a4.075 4.075 0 01-.01-.215h-.562c0 .056.004.142.01.25l.281-.018zm-.01-.232h.28v-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001h-.562V22.758h.281zm0-.203h.28c0-.068.003-.177.01-.332l-.28-.012-.282-.012c-.007.155-.01.275-.01.356h.281zm.01-.344l.28.025.05-.59-.28-.023-.28-.023-.05.585.28.026zm.05-.587l.28.022c.02-.247.05-.569.09-.966l-.279-.029-.28-.028c-.04.4-.071.725-.091.978l.28.023zm.091-.973h.281a.285.285 0 00-.107-.223 3.186 3.186 0 00-.164-.114l-.152.236-.152.237.095.063.007.005a.257.257 0 01-.074-.111.278.278 0 01-.015-.093h.281zm-.142-.1l.16-.232c-.09-.063-.204-.139-.34-.227l-.154.235-.153.236c.134.087.242.16.327.218l.16-.23zm-.334-.224l.167-.226c-.127-.094-.26-.194-.401-.301l-.171.224-.17.223c.142.11.279.211.408.307l.167-.227zm-.405-.303l.176-.22a2.971 2.971 0 01-.315-.286l-.205.192-.206.192c.106.113.231.227.374.341l.176-.22zm-.344-.314l.199-.2a.139.139 0 01.012.015l-.003-.004a.723.723 0 01-.025-.042l-.244.14-.244.14a.736.736 0 00.106.15l.199-.2zm-.061-.091l.244-.14c.003.004-.003-.002-.003-.033h-.562c0 .105.02.213.077.312l.244-.14zm-.04-.173h.28c0 .068-.034.101-.031.098l-.199-.199-.199-.199a.424.424 0 00-.133.3h.282zm.05-.1l.216.18s-.009.01-.028.02a.162.162 0 01-.076.02v-.562a.424.424 0 00-.328.161l.216.18zm.111-.062v.282a.17.17 0 01-.117-.042l.198-.2.2-.198a.396.396 0 00-.28-.123v.281zm.081.04l-.184.213c.157.137.338.29.541.46l.18-.216.18-.216a33.388 33.388 0 01-.532-.452l-.184.212zm.537.457l-.175.22c.207.165.411.317.613.457l.16-.232.16-.231a10.25 10.25 0 01-.582-.434l-.176.22zm.598.445l.28.031c.012-.114.038-.294.078-.543l-.277-.045-.278-.045c-.04.25-.069.442-.083.571l.28.031zm.08-.557l.277.052c.048-.252.095-.52.143-.805l-.278-.047-.277-.046c-.047.282-.094.546-.14.794l.276.052zm.142-.8l.278.046c.047-.292.091-.573.132-.844l-.278-.042-.278-.042c-.04.269-.084.548-.131.837l.277.045zm.132-.84l.277.048c.048-.272.082-.493.103-.661l-.279-.035-.279-.035c-.02.155-.052.366-.1.634l.278.049zm.101-.648h.282l.001-.01.012-.06-.275-.062-.274-.06a.942.942 0 00-.027.192h.281zm.02-.132l.275.061a.677.677 0 01.043-.129l-.257-.114-.257-.114c-.034.076-.06.155-.078.235l.274.061zm.061-.182l.257.114a.364.364 0 01.05-.086l-.216-.18-.216-.18a.928.928 0 00-.132.218l.257.114zm.091-.152l.23.163c.002-.003-.006.009-.026.021a.175.175 0 01-.092.026v-.562a.419.419 0 00-.34.189l.228.163zm.112-.07v.28a.234.234 0 01-.045-.004l-.02-.005a.086.086 0 01-.007-.002h.002a.382.382 0 01.057.032l.144-.241.145-.241a1.197 1.197 0 00-.11-.06c-.022-.01-.088-.041-.166-.041v.281zm.131.06l-.125.252a.138.138 0 01-.041-.032.098.098 0 01-.017-.026c-.002-.004 0-.002 0 .006a.271.271 0 01.003.043h.562c0-.156-.039-.386-.256-.495l-.126.252z"
          fill="#fff"
          mask="url(#a)"
        />
        <Path
          d="M42.161 11.958l-.508 3.685c-.798.472-1.718.72-2.758.744-1.041.012-1.937-.194-2.687-.617.025-.847.121-1.604.29-2.269.17-.678.364-1.228.582-1.652.23-.435.538-.798.925-1.089a6.299 6.299 0 011.017-.671c.302-.157.701-.272 1.197-.345.509-.073.896-.115 1.162-.127.266-.012.647-.018 1.143-.018h.218c.63 0 1.367.048 2.215.145.846.085 1.59.17 2.232.254.653.073 1.325.121 2.014.145.69.012 1.331-.06 1.924-.217a4.456 4.456 0 001.616-.78h.145c.181.677.272 1.318.272 1.923 0 1.464-.375 2.644-1.125 3.54-.738.883-1.76 1.324-3.067 1.324a5.45 5.45 0 01-1.834-.308 6.32 6.32 0 01-1.56-.799c-.448-.327-.89-.69-1.325-1.089-.424-.4-.835-.793-1.235-1.18-.387-.399-.774-.762-1.161-1.089a4.861 4.861 0 00-1.234-.816 3.231 3.231 0 00-1.361-.309v.127c.496 0 .967.127 1.415.381.46.254.956.623 1.488 1.107zm5.845 4.12l-.454 3.376c-.121.992-.182 1.652-.182 1.979.025.568.152.913.382 1.034l-.037.055c-.98.145-1.887.217-2.722.217a6.976 6.976 0 01-1.597-.163 3.323 3.323 0 01-1.198-.508 2.035 2.035 0 01-.763-1.017c-.145-.447-.175-.98-.09-1.597l1.016-7.314c.17.17.424.43.762.78.351.34.63.617.835.835.218.206.502.454.853.744s.672.533.962.726c.303.182.648.357 1.035.527.4.157.798.266 1.198.326zm9.924-3.267c1.04 0 1.954.158 2.74.472.8.315 1.435.805 1.907 1.47.484.654.726 1.44.726 2.36 0 .496-.079.998-.236 1.506a5.278 5.278 0 01-.726 1.489 5.893 5.893 0 01-1.253 1.325c-.484.375-1.107.683-1.869.925-.75.23-1.585.345-2.505.345-1.04 0-1.96-.157-2.758-.472-.8-.315-1.434-.799-1.906-1.452-.472-.653-.708-1.446-.708-2.378 0-.496.073-.992.218-1.488.145-.508.387-1.01.726-1.506.338-.496.75-.932 1.234-1.307.496-.387 1.125-.696 1.887-.926.763-.242 1.604-.363 2.523-.363zm-.018.146c-.036 0-.072.096-.109.29-.036.181-.084.46-.145.835-.048.375-.097.732-.145 1.07-.036.34-.09.787-.163 1.344-.073.556-.128.98-.164 1.27-.387 3.013-.544 4.604-.472 4.774 0 .012.006.018.018.018.025 0 .055-.085.091-.254.036-.182.079-.46.127-.835.06-.375.11-.726.145-1.053a116.347 116.347 0 00.345-2.65c.182-1.38.32-2.523.418-3.43.097-.92.115-1.38.054-1.38zm12.337-.146c1.04 0 1.954.158 2.74.472.799.315 1.434.805 1.906 1.47.484.654.726 1.44.726 2.36 0 .496-.078.998-.236 1.506a5.278 5.278 0 01-.726 1.489 5.893 5.893 0 01-1.252 1.325c-.484.375-1.107.683-1.87.925-.75.23-1.585.345-2.504.345-1.04 0-1.96-.157-2.759-.472-.799-.315-1.434-.799-1.906-1.452-.472-.653-.708-1.446-.708-2.378 0-.496.073-.992.218-1.488.145-.508.387-1.01.726-1.506.339-.496.75-.932 1.234-1.307.497-.387 1.126-.696 1.888-.926.762-.242 1.603-.363 2.523-.363zm-.018.146c-.037 0-.073.096-.11.29-.036.181-.084.46-.144.835-.049.375-.097.732-.146 1.07-.036.34-.09.787-.163 1.344-.073.556-.127.98-.163 1.27-.388 3.013-.545 4.604-.472 4.774 0 .012.006.018.018.018.024 0 .054-.085.09-.254.037-.182.08-.46.128-.835.06-.375.109-.726.145-1.053a116.347 116.347 0 00.345-2.65c.181-1.38.32-2.523.417-3.43.097-.92.115-1.38.055-1.38zm11.433 5.245c-.024.205-.06.466-.109.78a29.55 29.55 0 00-.109.726c-.012.17-.018.309-.018.418 0 .278.073.417.218.417.242 0 .496-.46.762-1.38h.182a6.74 6.74 0 01-.509 1.344 3.936 3.936 0 01-.653.962c-.242.242-.49.447-.744.617a3.41 3.41 0 01-.817.4c-.278.084-.532.138-.762.162-.23.037-.466.055-.708.055-1.997 0-2.874-.92-2.632-2.759l1.053-8.004c.073-.605.2-1.131.381-1.579.182-.448.393-.805.635-1.07.254-.279.557-.503.908-.672.363-.17.732-.285 1.107-.345.387-.06.829-.09 1.325-.09.944 0 1.93.138 2.958.417l-.018.054a.81.81 0 00-.526.145 1.14 1.14 0 00-.4.454 3.696 3.696 0 00-.29.69c-.084.254-.163.55-.236.889-.06.327-.115.66-.163.998-.048.327-.097.678-.145 1.053 0 .024-.006.042-.019.054v.091l-.671 5.173zm8.918.962h.182a5.795 5.795 0 01-.635 1.542c-.255.436-.533.78-.835 1.035a4.045 4.045 0 01-1.053.599c-.4.145-.78.236-1.143.272-.351.049-.75.073-1.198.073-.896 0-1.7-.182-2.414-.545-.702-.363-1.138-.786-1.307-1.27.387-.678.702-1.76.944-3.249.145-.92.248-1.821.308-2.704h-.072c-.23 1.778-.478 3.194-.744 4.247h-.182c.29-1.174.532-2.59.726-4.247.085-.726.43-1.277 1.035-1.652.617-.387 1.397-.58 2.34-.58.715 0 1.465.108 2.251.326l-.036.055a.43.43 0 00-.308.235.908.908 0 00-.11.472c0 .23.055.484.164.763.121.278.266.568.436.87.17.291.338.6.508.926.17.315.315.678.436 1.09.12.399.181.798.181 1.197 0 .86-.181 1.598-.544 2.215a3.502 3.502 0 01-1.507 1.397c1.295-.436 2.154-1.458 2.577-3.067z"
          fill="#fff"
        />
        <Path
          d="M46.546 12.101c.276-.037.51-.011.7.076.194.088.347.248.46.48a.982.982 0 01.068.18.734.734 0 01.013.363.53.53 0 01-.076.166.65.65 0 01-.352.258 1.391 1.391 0 01-.293.069 5.822 5.822 0 01-.325.034 1.448 1.448 0 01-.244-.002.552.552 0 01-.176-.05.32.32 0 01-.067-.044.424.424 0 01-.057-.059.521.521 0 01-.08-.168l-.26-.766a2.35 2.35 0 00-.11-.286.492.492 0 00-.026-.038.118.118 0 00-.029-.028.107.107 0 00-.03-.017l.001-.007c.074-.019.204-.045.392-.08a9.06 9.06 0 01.491-.081zm.01.026l-.016.002.518 1.542.017-.002c-.047-.181-.128-.447-.246-.798a22.717 22.717 0 00-.172-.491 4.6 4.6 0 00-.1-.253zm2.903.63l.012.002c.007.198-.043.356-.15.475-.109.117-.267.189-.474.216-.222.03-.414.006-.577-.072a.755.755 0 01-.42-.542.454.454 0 01.099-.362.546.546 0 01.194-.136 1.233 1.233 0 01.672-.08c.12.018.222.054.309.107a.483.483 0 01.19.193c.051.105.05.19-.003.257-.053.065-.138.106-.255.121a.92.92 0 01-.241-.002.722.722 0 01-.229-.068l-.004.007a.771.771 0 00.514.088.63.63 0 00.217-.068.365.365 0 00.146-.137zm-1.004-.486c-.014.002.046.198.181.588l.036.007a45.778 45.778 0 00-.115-.333 3.455 3.455 0 00-.102-.262zm.931.256a10 10 0 00-.048-.14.709.709 0 00-.024-.063.238.238 0 00-.028-.054c-.008-.012-.017-.02-.026-.022l.001-.007a1.194 1.194 0 01.396-.126c.11-.014.193-.006.25.024.057.03.104.078.14.147.053.1.104.24.153.42.05.18.073.33.069.452l.011.003c.02-.133 0-.31-.058-.53a1.619 1.619 0 00-.247-.551l-.001-.007a.528.528 0 01.203-.062.75.75 0 01.324.026.398.398 0 01.23.199c.033.066.05.137.054.213a.68.68 0 01-.027.224.976.976 0 01-.256.404.827.827 0 01-.445.212.588.588 0 01-.29-.032.346.346 0 01-.128-.089.412.412 0 01-.09-.155l-.163-.486z"
          fill="#007AFF"
        />
      </Svg>
    );
  },
  [IconName.Chat]: ({ style, width = 24, height = 25, color = '#FFF' }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M17 2.93a5.75 5.75 0 015.75 5.75v6A5.75 5.75 0 0117 20.43H7.701a1.25 1.25 0 00-.78.274l-2.828 2.263c-1.146.916-2.843.1-2.843-1.367V8.68A5.75 5.75 0 017 2.93h10zm-9.95 7.55a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm5 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zm5 0a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
          fill={color}
        />
      </Svg>
    );
  },
  [IconName.Create]: ({
    style,
    width = 24,
    height = 25,
    color = '#007AFF',
  }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M13.063 1.93c.063 0 .125.003.187.007v4.744A2.75 2.75 0 0016 9.43h3.75v5.395A2 2 0 0017 16.681v1h-1a2 2 0 100 4h1v1c0 .101.008.201.022.299-.613.289-1.299.45-2.022.45H7a4.75 4.75 0 01-4.75-4.75v-12A4.75 4.75 0 017 1.93h6.063z"
          fill={color}
        />
        <Path
          d="M19.113 7.644c.076.092.145.187.209.287H16c-.69 0-1.25-.56-1.25-1.25V2.509c.155.12.298.258.426.411l3.937 4.724zM22.75 19.68a.75.75 0 01-.75.75h-2.25v2.25a.75.75 0 01-1.5 0v-2.25H16a.75.75 0 010-1.5h2.25v-2.25a.75.75 0 011.5 0v2.25H22a.75.75 0 01.75.75z"
          fill={color}
        />
      </Svg>
    );
  },
  [IconName.Access]: ({
    style,
    width = 24,
    height = 25,
    color = '#007AFF',
  }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M16 8.93a4.75 4.75 0 014.75 4.75v4A4.75 4.75 0 0116 22.43H8a4.75 4.75 0 01-4.75-4.75v-4A4.75 4.75 0 018 8.93h8zm-4 5a.75.75 0 00-.75.75v2a.75.75 0 001.5 0v-2a.75.75 0 00-.75-.75z"
          fill={color}
        />
        <Path
          d="M16 9.68v-2a4 4 0 00-4-4v0a4 4 0 00-4 4v2"
          stroke={color}
          strokeWidth={1.5}
        />
      </Svg>
    );
  },

  [IconName.Quit]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M12 2a4 4 0 014 4v5.25H9a.75.75 0 000 1.5h7V18a4 4 0 01-4 4H7a4 4 0 01-4-4V6a4 4 0 014-4h5zm6.47 6.47a.75.75 0 011.06 0l2.293 2.293a1.75 1.75 0 010 2.474L19.53 15.53a.75.75 0 11-1.06-1.06l1.72-1.72H16v-1.5h4.19l-1.72-1.72a.75.75 0 010-1.06z"
          fill="#007AFF"
        />
      </Svg>
    );
  },
  [IconName.Camera]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.697 4.702a1.85 1.85 0 011.618-.952h5.372c.672 0 1.29.364 1.617.952l1.27 2.285a.85.85 0 01-.743 1.263H7.17a.85.85 0 01-.743-1.263l1.27-2.285zm1.618.548a.35.35 0 00-.306.18l-.734 1.32h7.451l-.733-1.32a.35.35 0 00-.306-.18H9.315z"
          fill="#007AFF"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.502 6.75a1.75 1.75 0 00-1.75 1.75v10c0 .966.783 1.75 1.75 1.75h14.997a1.75 1.75 0 001.75-1.75v-10a1.75 1.75 0 00-1.75-1.75H4.502zM15 13.5a3 3 0 11-6 0 3 3 0 016 0zM5.813 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z"
          fill="#007AFF"
        />
      </Svg>
    );
  },
  [IconName.Documetn]: ({ style, width = 25, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.231 2.25H5.625A1.75 1.75 0 003.875 4v16c0 .967.784 1.75 1.75 1.75h13.75a1.75 1.75 0 001.75-1.75V9.293h-4.144a2.75 2.75 0 01-2.75-2.75V2.25zm-5.98 9.25a.75.75 0 01.75-.75h7a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM9 13.75a.75.75 0 000 1.5h7a.75.75 0 000-1.5H9zm-.75 3.75a.75.75 0 01.75-.75h3a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"
          fill="#007AFF"
        />
        <Path
          d="M20.962 7.792a1.751 1.751 0 00-.363-.512l-4.64-4.532a1.751 1.751 0 00-.228-.188v3.982c0 .69.56 1.25 1.25 1.25h3.98z"
          fill="#007AFF"
        />
      </Svg>
    );
  },
  [IconName.Galery]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M2.25 18.014A2.75 2.75 0 005 20.75h14.002l-.227-.227-8.886-9.409a.25.25 0 00-.353-.01l-6.014 5.638-1.272 1.272zM20.606 20.233A2.746 2.746 0 0021.75 18v-1.664L18.715 13.3a.25.25 0 00-.336-.015l-2.449 2.04 3.92 4.151.756.756zM14.75 8.625a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
          fill="#007AFF"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.75 6v8.214l-1.974-1.973a1.75 1.75 0 00-2.358-.107l-2.52 2.1-3.919-4.15a1.75 1.75 0 00-2.469-.075l-6.032 5.655-.228.228V6A2.75 2.75 0 015 3.25h14A2.75 2.75 0 0121.75 6zm-6.25.375a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
          fill="#007AFF"
        />
      </Svg>
    );
  },
  [IconName.Link]: ({ style, width = 20, height = 20 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M10.833 9.167l6.833-6.833M18.334 5.666v-4h-4M9.167 1.666H7.5c-4.166 0-5.833 1.667-5.833 5.833v5c0 4.167 1.667 5.834 5.833 5.834h5c4.167 0 5.834-1.667 5.834-5.834v-1.666"
          stroke="#007AFF"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.ArrowUp]: ({ style, width = 24, height = 24 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M12 7v10m0-10l4 4m-4-4l-4 4"
          stroke="#10A242"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.MakeComment]: ({ style, width = 24, height = 25 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M11 17.5l2-2-2-2 2 2H7"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M22 10.5v5c0 5-2 7-7 7H9c-5 0-7-2-7-7v-6c0-5 2-7 7-7h5"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M22 10.5h-4c-3 0-4-1-4-4v-4l8 8z"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.VerificationWork]: ({ style, width = 24, height = 25 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M12 18.7a4 4 0 100-8 4 4 0 000 8z"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.44 14.8l.65.65c.19.19.5.19.69.01l1.78-1.64"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8 22.5h8c4.02 0 4.74-1.61 4.95-3.57l.75-8c.27-2.44-.43-4.43-4.7-4.43H7c-4.27 0-4.97 1.99-4.7 4.43l.75 8c.21 1.96.93 3.57 4.95 3.57zM8 6.5v-.8c0-1.77 0-3.2 3.2-3.2h1.6C16 2.5 16 3.93 16 5.7v.8M21.65 11.5a16.335 16.335 0 01-5.64 2.64M2.62 11.77c1.67 1.14 3.49 1.95 5.38 2.41"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.SendComment]: ({ style, width = 24, height = 25 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M2.5 12.836a4 4 0 014-4h5.25v7a.75.75 0 101.5 0v-7h5.25a4 4 0 014 4v5a4 4 0 01-4 4h-12a4 4 0 01-4-4v-5zm6.47-6.47a.75.75 0 010-1.06l2.293-2.293a1.75 1.75 0 012.474 0l2.293 2.293a.75.75 0 11-1.06 1.06l-1.72-1.72v4.19h-1.5v-4.19l-1.72 1.72a.75.75 0 01-1.06 0z"
          fill="#191818"
        />
      </Svg>
    );
  },
  [IconName.ArrowRigth]: ({
    style,
    width = 24,
    height = 25,
    color = '#595959',
  }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${24} ${25}`}
        fill="none"
        style={style}
      >
        <Path
          d="M8.91 20.42l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.58"
          stroke={color}
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.Lupa]: ({ style, width = 20, height = 20 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M9.167 16.666a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM7.083 9.166h4.167M9.167 11.25V7.085M15.775 17.241c.442 1.334 1.45 1.467 2.225.3.708-1.066.242-1.941-1.042-1.941-.95-.009-1.483.733-1.183 1.641z"
          stroke="#fff"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.Schedule]: ({ style, width = 24, height = 25 }) => {
    return (
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        style={style}
      >
        <Path
          d="M5.9 17.5h12.19c1.9 0 2.9-1 2.9-2.9V2.5h-18v12.1C3 16.5 4 17.5 5.9 17.5zM2 2.5h20M8 22.5l4-2v-3M16 22.5l-4-2"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.5 11.5l3.15-2.63c.25-.21.58-.15.75.13l1.2 2c.17.28.5.33.75.13L16.5 8.5"
          stroke="#007AFF"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  },
  [IconName.PlusMap]: ({ style, width = 31, height = 30 }) => {
    return (
      <Svg
        style={style}
        width={width}
        height={height}
        viewBox="0 0 31 30"
        fill="none"
      >
        <Path
          d="M12.0625 13.75H18.9375"
          stroke="#007AFF"
          strokeWidth={1.875}
          strokeLinecap="round"
        />
        <Path
          d="M15.5 17.1875V10.3125"
          stroke="#007AFF"
          strokeWidth={1.875}
          strokeLinecap="round"
        />
        <Path
          d="M5.02415 10.6125C7.48665 -0.212497 23.5241 -0.199997 25.9741 10.625C27.4116 16.975 23.4616 22.35 19.9991 25.675C17.4866 28.1 13.5116 28.1 10.9866 25.675C7.53665 22.35 3.58665 16.9625 5.02415 10.6125Z"
          stroke="#007AFF"
          strokeWidth={1.875}
        />
      </Svg>
    );
  },
  [IconName.Material]: ({ style, width = 24, height = 24, }) => {
    return <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={style}
    >
      <Path
        d="M16 22H9c-3 0-5-2-5-5V7c0-3 2-5 5-5h7c3 0 5 2 5 5v10c0 3-2 5-5 5zM4 15h17M7 12h1M7 9.5h1M7 7h1"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.494 18.25h.01"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  },
  [IconName.Pencil]: ({ style, width = 20, height = 20, }) => {
    return <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={style}
    >
      <Path
        d="M11.05 3L4.21 10.242c-.259.275-.509.816-.559 1.191l-.308 2.7c-.108.975.592 1.642 1.558 1.475l2.684-.458c.375-.067.9-.342 1.158-.625l6.842-7.242c1.183-1.25 1.716-2.675-.125-4.416C13.625 1.142 12.234 1.75 11.05 3zM9.908 4.208A5.105 5.105 0 0014.45 8.5M2.5 18.333h15"
        stroke="#007AFF"
        strokeWidth={1.25}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  },
  [IconName.Warning]: ({ style, width = 24, height = 24, }) => {
    return <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={style}
    >
      <Path
        d="M12 7.75V13M21.08 8.58v6.84c0 1.12-.6 2.16-1.57 2.73l-5.94 3.43c-.97.56-2.17.56-3.15 0l-5.94-3.43a3.15 3.15 0 01-1.57-2.73V8.58c0-1.12.6-2.16 1.57-2.73l5.94-3.43c.97-.56 2.17-.56 3.15 0l5.94 3.43c.97.57 1.57 1.6 1.57 2.73z"
        stroke="#E02D3C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16.2v.1"
        stroke="#E02D3C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  },
};

export const Icon = ({
  name,
  color,
  size,
  style,
  height,
  width,
}: IconComponentProps & { name: IconName }): ReactNode => {
  const IconComponent = ICONS[name];
  return IconComponent?.({ color, size, style, width, height }) ?? null;
};
