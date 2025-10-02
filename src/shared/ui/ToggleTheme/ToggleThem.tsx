import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated } from 'react-native';

export const SwitchThemeButton = () => {
  const [theme, setTheme] = useState('dark');
  const isDarkTheme = theme === 'dark';
  
  const thumbPosition = useRef(new Animated.Value(isDarkTheme ? 42 : -42)).current;
  
  // Анимируем изменение темы
  useEffect(() => {
    Animated.timing(thumbPosition, {
      toValue: isDarkTheme ? 42 : -42,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isDarkTheme]);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <TouchableOpacity 
      style={[
        styles.themeToggle, 
        isDarkTheme ? styles.darkBackground : styles.lightBackground
      ]}
      onPress={handleThemeToggle}
      activeOpacity={0.8}
    >
      <View style={[
        styles.slider,
        isDarkTheme ? styles.sliderDark : styles.sliderLight
      ]}>
        <Animated.View 
          style={[
            styles.thumb,
            isDarkTheme ? styles.thumbDark : styles.thumbLight,
            { 
              transform: [{ translateX: thumbPosition }],
              // Добавляем transition для других свойств
              opacity: thumbPosition.interpolate({
                inputRange: [-42, 42],
                outputRange: [0.8, 1]
              })
            }
          ]} 
        />
        
        <View style={[styles.icon, styles.sun]}>
          {/* <SunIcon color={isDarkTheme ? "#888" : "#FFF"} /> */}
        </View>
        
        <View style={[styles.icon, styles.moon]}>
          {/* <MoonIcon color={isDarkTheme ? "#FFF" : "#888"} /> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    width: 82,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    padding: 4,
  },
  lightBackground: {
    backgroundColor: '#f5f5f5',
  },
  darkBackground: {
    backgroundColor: '#1c1c1c',
  },
  slider: {
    flex: 1,
    borderRadius: 26,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderLight: {
    backgroundColor: 'transparent',
  },
  sliderDark: {
    backgroundColor: 'transparent',
  },
  thumb: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  thumbLight: {
    backgroundColor: '#00a77f',
  },
  thumbDark: {
    backgroundColor: '#00a77f',
  },
  icon: {
    position: 'absolute',
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sun: {
    left: 8,
  },
  moon: {
    right: 8,
  },
});