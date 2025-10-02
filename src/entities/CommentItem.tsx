import { colors, Icon, IconName } from "@/shared"
import { Fonts } from "@/shared/assets/fonts/fonts-config";
import { RemarkStatus } from "@/shared/types/remarksTypes";
import { formatISOToCustom, formatISOToDate } from "@/shared/utils/formatDate";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"

export type TTypeComment = "active" | "fixed" | "check"

export interface ICommentITem {
  title: string,
  time: string,
  timeFixed: string,
  type: RemarkStatus,
  onPress?: () => void, 
  id: string
}

const CommentItem = ({
  title,
  time,
  timeFixed, 
  type,
  onPress,
}: ICommentITem) => {

  const statusText = {
    not_fixed: "Не исправлен: ",
    fixed: "Исправлен: ",
    review: "На проверке: ",
  }

  return <Pressable onPress={onPress} style={styles.container}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.time}>От {formatISOToCustom(time)}</Text>
      <Text style={styles.time}>
        <Text style={styles[type as keyof typeof styles]}>
          {statusText[(type as keyof typeof statusText)]}
        </Text>
        {formatISOToDate(timeFixed)}
      </Text>
    </View>
    <View>
      <Icon name={IconName.ArrowRigth}/>
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    lineHeight: 27,
    letterSpacing: -0.2,
    color: "#595959",
    fontFamily: Fonts[800]
  },
  time: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: "#A0A0A5",
    fontFamily: Fonts[600]
  },
  fixed: {
    color: colors.success,
  },
  not_fixed: {
    color: "#E02D3C",
  },
  review: {
    color: colors.blue,
  },
})

export default memo(CommentItem)