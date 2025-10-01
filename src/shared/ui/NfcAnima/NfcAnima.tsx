import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export const NfcAnima = () => {
  const scaleWrapper = useRef(new Animated.Value(1)).current; // внешний круг
  const smallPulse = useRef(new Animated.Value(1)).current;   // внутренняя точка
  const extraCircle = useRef(new Animated.Value(0)).current;  // третий круг

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        // фаза: внешний растёт, внутренний уменьшается
        Animated.parallel([
          Animated.timing(scaleWrapper, {
            toValue: 1.3,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(smallPulse, {
            toValue: 0.7,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(extraCircle, {
            toValue: 0,
            duration: 0,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),

        // сброс третьего круга, возвращение остальных
        Animated.parallel([
          Animated.timing(scaleWrapper, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(smallPulse, {
            toValue: 1,
            duration: 400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(extraCircle, {
            toValue: 0.6,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
           Animated.timing(extraCircle, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.delay(400),
        ])
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [scaleWrapper, smallPulse, extraCircle]);

  // интерполяция для третьего круга (0 → 1 значит от размера внешнего круга до расширенного)
  const extraScale = extraCircle.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5], // такой же максимум как у внешнего
  });

  return (
    <View style={styles.root}>
      {/* внешний круг */}
      <Animated.View
        style={[
          styles.outer,
          { transform: [{ scale: scaleWrapper }] },
        ]}
      />

      {/* дополнительный круг */}
      <Animated.View
        style={[
          styles.extra,
          { transform: [{ scale: extraScale }] },
        ]}
      />

      {/* внутренняя точка */}
      <Animated.View
        style={[
          styles.inner,
          { transform: [{ scale: smallPulse }] },
        ]}
      />
    </View>
  );
};

const SIZE = 90.45;
const DOT = 18.09;

const styles = StyleSheet.create({
  root: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  outer: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 5,
    borderColor: "#007AFF",
  },
  extra: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 5,
    borderColor: "#007AFF",
    opacity: 0.5,
  },
  inner: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: "#007AFF",
  },
});