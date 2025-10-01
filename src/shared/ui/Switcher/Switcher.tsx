import { colors } from "@/shared/config/colors";
import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";

export default function Switcher() {
  const [active, setActive] = useState(false);
  const [position] = useState(new Animated.Value(0));

  const toggleSwitch = () => {
    setActive(!active);
    Animated.timing(position, {
      toValue: active ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const translateX = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.8}>
      <View style={[styles.switcher, active && styles.switcherActive]}>
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ translateX }] },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  switcher: {
    width: 60,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#ccc",
    justifyContent: "center",
    padding: 2,
  },
  switcherActive: {
    backgroundColor: colors.blue,
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
});