import React, { useLayoutEffect, useRef } from "react";
import { StyleSheet, View, Animated, Easing } from "react-native";

export const Signal = ({active}: {active: boolean}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const scaleWrapper = useRef(new Animated.Value(1)).current;

  const opacityWrapper = scaleWrapper.interpolate({
    inputRange: [1, 6],
    outputRange: [1, 0],
  });

  useLayoutEffect(() => {
    const pulse = Animated.sequence([
        Animated.timing(scale, {
          toValue: 2.5,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(500),
    ])

    const pulseWrapper = Animated.sequence([
      Animated.timing(scaleWrapper, {
        toValue: 6,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleWrapper, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ])

    const animation = Animated.loop(
      Animated.parallel([pulse, pulseWrapper])
    );

    animation.start();

    return () => {
      animation.stop();
    }
  }, [scale, scaleWrapper]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.signalInner,
          active && styles.activeInner,
          {
            transform: [{ scale: scaleWrapper }],
            opacity: opacityWrapper
          }
        ]}
      />
      <Animated.View
        style={[
          styles.signal,
          active && styles.active,
          { transform: [{ scale }] }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 112,
    height: 112,
    justifyContent: "center",
    alignItems: "center",
  },
  signal: {
    width: 13.5,
    height: 13.5,
    borderRadius: 13.5 / 2,
    backgroundColor: "#E02D3C",
    zIndex: 2,
  },
  active: {
    backgroundColor: "#08875D",
  },
  activeInner: {
    backgroundColor: "rgba(8, 135, 93, 0.3)",
  },
  signalInner: {
    width: 13.5,
    height: 13.5,
    borderRadius: 13.5 / 2,
    backgroundColor: "rgba(224, 45, 60, 0.3)",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -13.5 / 2,
    marginTop: -13.5 / 2,
    zIndex: 1,
  }
});