import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

interface IPulseSpinner {
  size?: number,
  offset?: number,
  backgroundColorMain?: string
  backgroundColorSecondary?: string,
}

export const PulseSpinner = ({
  size = 15.33,
  offset = 20,
  backgroundColorMain = "#007AFF",
  backgroundColorSecondary = "#98C9FF",
}: IPulseSpinner) => {
  const styles = stylesConstructor(size, offset, backgroundColorMain, backgroundColorSecondary)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const circles = [
    {cirles: useRef(new Animated.Value(1)).current, inner: useRef(new Animated.Value(1)).current, secondary: true},
    {cirles: useRef(new Animated.Value(1)).current, inner: useRef(new Animated.Value(1)).current},
    {cirles: useRef(new Animated.Value(1)).current, inner: useRef(new Animated.Value(1)).current, secondary: true},
    {cirles: useRef(new Animated.Value(1)).current, inner: useRef(new Animated.Value(1)).current},
  ];

  const opacities = circles.map((item) => {
    return item.inner.interpolate({
      inputRange: [1, 2],
      outputRange: [1, 0],
    });
  })

  useEffect(() => {
    const animation = (anim: {cirles: Animated.Value, inner: Animated.Value}, delay: number) => Animated.sequence([
      Animated.delay(delay * 300),
      Animated.parallel([
        Animated.sequence([
          Animated.timing(anim.inner, {
            toValue: 2,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim.inner, {
            toValue: 1,
            duration: 0,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(anim.cirles, {
            toValue: 1.5,
            duration: 150,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim.cirles, {
            toValue: 1,
            duration: 150,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ])

    const animationLoop = Animated.loop(
      Animated.parallel(circles.map((item, index) => animation(item, index)))
    );
    animationLoop.start()
    
    return () => {
      animationLoop.stop()
    }
  }, [circles]);

  const positions = ["top", "right", "bottom", "left"];

  return (
  <View style={styles.container}>
    {circles.map((circle, i) => (
      <Animated.View
        key={i}
        style={[
          styles.circle,
          styles[positions[i] as keyof typeof styles],
          circle.secondary && styles.secondary,
          { transform: [{ scale: circle.cirles }] },
        ]}
      >
        <Animated.View
          style={[
            styles.inner,
            styles[positions[i] as keyof typeof styles],
            circle.secondary && styles.secondary,
            {
              transform: [{ scale: circle.inner }],
              opacity: opacities[i],
            },
          ]}
        />
      </Animated.View>
    ))}
  </View>
  );
};


const stylesConstructor = (SIZE: number, OFFSET: number, backgroundColorMain:string, backgroundColorSecondary:string) => StyleSheet.create({
  container: {
    width: OFFSET * 2 + SIZE,
    height: OFFSET * 2 + SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: backgroundColorMain,
  },
  inner: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: backgroundColorMain,
  },
  secondary: {
    backgroundColor: backgroundColorSecondary,
  },
  top: { top: 0, left: "50%", marginLeft: -SIZE / 2 },
  bottom: { bottom: 0, left: "50%", marginLeft: -SIZE / 2 },
  left: { left: 0, top: "50%", marginTop: -SIZE / 2 },
  right: { right: 0, top: "50%", marginTop: -SIZE / 2 },
});