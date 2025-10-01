import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { memo, ReactNode } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

interface IActionItem {
  icon: ReactNode,
  title: string,
  subtitle: string,
  onPress: () => void,
}

const ActionItem = ({
  icon,
  title,
  subtitle, 
  onPress
}: IActionItem) => {
  return <Pressable style={styles.container} onPress={onPress}>
    {icon}
    <View style={styles.text}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.03, 
    shadowRadius: 16,

    elevation: 5,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts[800],
    lineHeight: 18,
    letterSpacing: -0.2,
    color: "#595959",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: Fonts[600],
    lineHeight: 18,
    letterSpacing: -0.2,
    color: "#616161",
  },
  text: {
    display: "flex",
    gap: 4,
  }, 
})

export default memo(ActionItem)