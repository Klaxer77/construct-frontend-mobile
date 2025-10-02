import { Fonts } from '@/shared/assets/fonts/fonts-config';
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface TabItemProps {
  icon?: React.ComponentType<any>;
  children: ReactNode;
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
}

export const TabItem: React.FC<TabItemProps> = ({
  icon: IconComponent,
  children,
  title,
  subtitle,
  style,
  titleStyle,
  subtitleStyle,
  wrapperStyle
}) => {
  return (
    <View style={[styles.tabContainer, style]}>
      {IconComponent && <IconComponent />}
      <View style={[styles.tabWrapper, wrapperStyle]}>
        <View style={styles.tabWrapperText}>
          <Text style={[styles.tabTitle, titleStyle]}>{title}</Text>
          {subtitle && <Text style={[styles.tabSubtitle, subtitleStyle]}>{subtitle}</Text>}
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabTitle: {
    fontFamily: Fonts[700],
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.4,
    color: "#3D3D3D",
  },
  tabSubtitle: {
    fontFamily: Fonts[600],
    fontSize: 14,
    lineHeight: 12,
    letterSpacing: -0.28,
    color: "rgba(0, 0, 0, 0.5)",
  },
  tabContainer: {
    flex: 1,
    width: "100%",
    gap: 16,
    paddingVertical: 16,
    flexDirection: "row",
    maxHeight: 72,
    alignItems: "center",
    justifyContent: 'space-between',
  },
  tabWrapper: {
    flexDirection: "row",
    flex: 1,
    height: 72,
    alignItems: "center",
    justifyContent: 'space-between',
    borderBottomColor: "rgb(0,0,0,0.1)",
    borderBottomWidth: 1,
  },
  tabWrapperText: {
    gap: 12,
  }
})