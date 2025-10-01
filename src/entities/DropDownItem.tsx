import { colors, Icon, IconName } from "@/shared"
import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { formatISOToDate } from "@/shared/utils/formatDate"
import { memo, ReactNode } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"

interface IDropDownItem {
  title: string,
  startDate: string,
  endDate: string,
  change?: boolean,
  onPress: () => void,
  children?: ReactNode
}

const DropDownItem = ({
  title,
  startDate,
  endDate,
  children,
  change,
  onPress,
}: IDropDownItem) => {
  return <Pressable  onPress={onPress} style={styles.container}>
    <View>
      <View style={styles.wrapper} >
        <View style={styles.containerText}>
          <Text style={styles.title}>
            {title}
          </Text>
          <Text style={[styles.date]}>
            {formatISOToDate(startDate)}{" → "}
            <Text style={change && styles.change}>
              {formatISOToDate(endDate)}
            </Text>
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon width={16} height={16} name={IconName.ArrowRigth}/>
        </View>
      </View>
      {children}
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(202, 200, 218, 0.2)",
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerText: {
    paddingRight: 32,
    zIndex: 1,
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
    color: "#585757",
  },
  date: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
    color: "#A0A0A5",
    paddingTop: 2,
    paddingBottom: 6,
  },
  change: {
    color: colors.blue,
  },
  iconContainer: {
    width: 32,
    height: "100%",
    zIndex: 10,
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  }
})

export default memo(DropDownItem)