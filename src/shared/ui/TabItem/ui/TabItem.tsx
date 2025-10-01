import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { colors } from "@/shared/config/colors"
import { memo } from "react"
import { Pressable, StyleSheet } from "react-native"
import { Text } from "react-native-gesture-handler"

interface ITabItem {
  title: string,
  isActive: boolean,
  onPress: () => void
}

const TabItem = ({
  title,
  onPress,
  isActive,
}: ITabItem) => {
  return <Pressable style={[styles.tab, isActive && styles.active]} onPress={onPress}>
    <Text style={[styles.text, isActive && styles.activeText]}>{title}</Text>
  </Pressable>
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  active: {
    borderBottomColor: colors.blue,
  },
  activeText: {
    color: colors.blue,
  },
  text: {
    color: "#585757",
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
  }
})

export default memo(TabItem)