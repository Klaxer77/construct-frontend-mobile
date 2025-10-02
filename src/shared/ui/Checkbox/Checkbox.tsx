import { Icon } from "@/shared/assets/icons/icons"
import { IconName } from "@/shared/assets/icons/types"
import { colors } from "@/shared/config/colors"
import { memo, ReactNode } from "react"
import { Pressable, StyleSheet, View } from "react-native"

interface ICheckBox {
  onPress?: () => void,
  text?: ReactNode,
  value?: boolean,
}

const Checkbox = ({
  onPress,
  value,
  text
}: ICheckBox) => {
  return <Pressable onPress={onPress} style={styles.container}>
    <View style={[styles.checkbox, value && styles.check]}>
      <Icon color={value ? "#FFFFFF": '#F1F1F1'} name={IconName.Check}/>
    </View>
    {text}
  </Pressable>
}

const styles = StyleSheet.create({
  container: {
    gap: 9,
    flexDirection: "row",
  },
  check: {
    backgroundColor: colors.blue,
  },
  checkbox: {
    width: 22,
    alignItems: "center",
    justifyContent: "center",
    height: 22,
    borderRadius: 4.58,
    backgroundColor: '#F1F1F1',
  }
})

export default memo(Checkbox)