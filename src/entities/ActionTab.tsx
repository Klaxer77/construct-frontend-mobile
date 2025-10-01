import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { ReactNode } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Svg, { Path } from "react-native-svg"

interface IActionTab {
  title: string,
  subtitle: string,
  icon?: ReactNode,
  disable?: boolean,
  onPress?: () => void
}

export const ActionTab = ({
  icon,
  title,
  subtitle,
  onPress,
  disable,
}: IActionTab) => {
  return <View style={[styles.container, disable && styles.disable]}>
    <View style={styles.wrapper}>
      {icon}
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
    <Pressable onPress={onPress}>
      <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
    >
      <Path
        d="M8.91 20.42l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.58"
        stroke="#595959"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  disable: {
    opacity: 0.4
  },
  wrapper: {
    alignItems: "center",
    gap: 16,
    flexDirection: "row",
  },
  title: {
    fontSize: 17,
    lineHeight: 27,
    letterSpacing: -0.2,
    color: "#595959",
    fontFamily: Fonts[800]
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: "#A0A0A5",
    fontFamily: Fonts[600]
  }
})