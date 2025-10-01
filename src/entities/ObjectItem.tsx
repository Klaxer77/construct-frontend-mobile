import { ReactNode, useRef } from "react"
import { Animated, Pressable, StyleSheet, View } from "react-native"
import { colors } from "@/shared"
import { Fonts } from "@/shared/assets/fonts/fonts-config"
import Svg, { Path } from "react-native-svg"
import { PulseSpinner } from "@/shared/ui/PulseSpinner/PulseSpinner"

interface IObjectItem {
  title: string
  subtitle: string
  onPress: () => void
  rigthElement?: ReactNode,
  bottomElement?: ReactNode,
  loading?: boolean,
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const ObjectItem = ({ title, subtitle, onPress, rigthElement, bottomElement, loading }: IObjectItem) => {
  const animatedValue = useRef(new Animated.Value(0)).current

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F7F7F8", colors.blue],
  })

  const colorIcon = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.blue, "#F7F7F8"],
  })

  const color = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#616161", "white"],
  })

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  return (
    <Pressable
      disabled={loading}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, { backgroundColor }]}>
        <View style={styles.wrapper}>
          <View>
            <Animated.Text style={[styles.text, { color }]}>{title}</Animated.Text>
            <Animated.Text style={[styles.text, { color }]}>{subtitle}</Animated.Text>
          </View>
          {!rigthElement && !loading && <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          >
            <AnimatedPath
              d="M2 22h20M15.01 21.99l-12 .02L3 7.07c0-.67.34-1.29.89-1.66l4-2.67c.67-.45 1.55-.45 2.22 0l4 2.67c.56.37.89.99.89 1.66l.01 14.92zM19.98 22.01V18M20 12c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2s2-.9 2-2v-2c0-1.1-.9-2-2-2zM3 14h12M9 22v-3.75"
              stroke={colorIcon}
              strokeWidth={1.5}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <AnimatedPath
              d="M9 10.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
              stroke={colorIcon}
              strokeWidth={1.5}
              strokeMiterlimit={10}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>}
          {loading && <PulseSpinner backgroundColorSecondary="#3A3A3A" backgroundColorMain={colors.blue} offset={10} size={7.58}/>}
          {!loading && rigthElement}
        </View>
        {bottomElement}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 18,
    gap: 10.87,
    alignItems: "center",
    borderRadius: 14.5,
    justifyContent: "space-between",
  },
  wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontFamily: Fonts[600],
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: "#616161",
  },
})