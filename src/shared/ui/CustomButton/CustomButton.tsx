import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { colors } from '@/shared/config/colors';
import React, { ReactNode, useRef } from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
  Animated,
} from 'react-native';

interface ICustomButton {
  text?: string;
  onPress?: () => void;
  disable?: boolean;
  loading?: boolean;
  loadingAnima?: ReactNode;
  styleButton?: StyleProp<ViewStyle>;
  styleButtonView?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  secondary?: boolean;
  textColorActive?: string;
  textColorDefault?: string;
  colorActive?: string,
  colorDefault?: string,
  iconRigth?: ReactNode,
}

export default function CustomButton({
  text,
  onPress,
  disable,
  styleButton,
  styleButtonView,
  styleText,
  loading,
  loadingAnima,
  secondary,
  colorActive,
  colorDefault,
  textColorActive,
  textColorDefault,
  iconRigth,
}: ICustomButton) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const colorsButton = {
    default: colorDefault ? colorDefault : secondary ? '#FFF' : colors.blue,
    active: colorActive ? colorActive : secondary ? '#F7F7F8' : '#0059FF',
  };

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      textColorDefault || (secondary ? '#1C1C1C' : '#FFFFFF'),
      textColorActive || '#FFFFFF',
    ],
  });

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = disable
    ? '#D7D7D7'
    : animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [colorsButton.default, colorsButton.active],
      });

  return (
    <Pressable
      disabled={disable || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={styleButtonView}
    >
      <Animated.View
        style={[
          styles.button,
          { backgroundColor },
          secondary && styles.secondaryButton,
          iconRigth ? styles.iconRigth: "",
          loading ? styles.loading: "",
          styleButton,
        ]}
      >
        {!loading && (
          <Animated.Text
            style={[
              styles.text,
              secondary && styles.secondaryText,
              styleText,
              { color: textColor },
            ]}
          >
            {text}
          </Animated.Text>
        )}
        {loading && loadingAnima}
        {iconRigth && !loading && iconRigth}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    alignItems: 'center',
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  loading: {
    justifyContent: "center",
  },
  iconRigth: {
    justifyContent: "space-between"
  },
  loadingText: {
    opacity: 0,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts[700],
    lineHeight: 24,
    color: '#FFFFFF',
    letterSpacing: -0.313,
  },
  secondaryText: {
    color: '#1C1C1C',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
});
