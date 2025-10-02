import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { ReactNode } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

interface IJournalItem {
  title: string
  subtitle: string,
  icon: ReactNode,
  disable?: boolean,
  onPress?: () => void,
}

export const JournalItem = ({
title,
subtitle,
icon,
disable,
onPress,
}: IJournalItem) => {
  return <Pressable onPress={onPress} disabled={disable} style={[styles.container, disable && styles.disable]}>
    <View style={styles.icon}>
      {icon}
    </View>
    <View style={styles.containerText}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    gap: 18,
    paddingLeft: 2,
    alignItems: 'center',
    position: "relative",
  },
  disable: {
    opacity: 0.29
  },
  icon: {
    display: "flex",
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  
  containerText: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingBottom: 10,
    width: "100%",
  },
  text: {
    width: 290,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 16,
    lineHeight: 27,
    fontFamily: Fonts[700],
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts[600],
    letterSpacing: -0.2,
  },
})