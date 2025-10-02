import { Fonts } from "@/shared/assets/fonts/fonts-config"
import React, { memo, useEffect, useRef, useState } from "react"
import { StyleSheet, Text, View, Animated } from "react-native"

const ProgressBar = ({ percent }: { percent: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const listenerId = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.round(value))
    })

    const anima = Animated.timing(animatedValue, {
      toValue: percent,
      duration: 800,
      useNativeDriver: false,
    })
    anima.start()

    return () => {
      anima.stop()
      animatedValue.removeListener(listenerId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent])

  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  })

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Прогресс</Text>
        <Text style={styles.text}>{displayValue}%</Text>
      </View>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progress, { width: animatedWidth }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: Fonts[700],
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.4,
    color: "#1C1C1C",
  },
  progressContainer: {
    position: "relative",
    height: 10,
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#DAEDE7",
  },
  progress: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#5F9281",
  },
})

export default memo(ProgressBar)