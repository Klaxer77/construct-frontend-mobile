import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { CategoryIcon } from "@/shared/icons/CategoryIcon"
import { NotificationIcon } from "@/shared/icons/NotificationIcon"
import { memo, ReactNode } from "react"
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native"

interface IHeader {
  title: string,
  IconLeft?: ReactNode,
  onPressLeft?: () => void,
  IconRigth?: ReactNode,
  onPressRigth?: () => void,
  style?: StyleProp<ViewStyle>,
  styleHeader?: StyleProp<ViewStyle>,
  children?: ReactNode,
}

const Header = ({title, IconLeft, onPressLeft, children, IconRigth, style, styleHeader}: IHeader) => {
  return <View style={[styles.container, styleHeader]}>
    <View style={[styles.header, style]}>
      <Pressable onPress={onPressLeft}>
        {IconLeft ? IconLeft: <CategoryIcon/>}
      </Pressable>
      {!children ? <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headerTitle}>{title}</Text>: children}
      <Pressable onPress={onPressLeft}>
        {IconRigth ? IconRigth: <NotificationIcon/>}
      </Pressable>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: 'flex', 
    justifyContent: "center",
    alignItems: 'center',
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    maxWidth: 330,
    
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 13,
  },
  headerTitle: {
    maxWidth: "65%",
    fontFamily: Fonts[800],
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.4,
    color: "#4C4C4C",
  },
})

export default memo(Header)