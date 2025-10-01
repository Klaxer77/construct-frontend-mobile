import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';

interface TypographyProps extends TextProps {
  children: ReactNode;
  fontSize: number;
  lineHeight?: number;
  color?: string,
  letterSpacing?: number;
  font?: keyof typeof Fonts;
}

export const Typography = ({
  children,
  fontSize,
  lineHeight,
  color,
  letterSpacing = 0.04,
  font = 600,
  style,
  ...rest
}: TypographyProps) => {

  return (
    <Text
      style={[
        {
          fontSize: fontSize,
          color: color,
          lineHeight: lineHeight ?? fontSize * 1.5,
          letterSpacing: letterSpacing,
          fontFamily: Fonts[font],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
