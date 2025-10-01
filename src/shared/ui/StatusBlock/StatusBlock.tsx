import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { memo } from "react"
import { StyleSheet, Text } from "react-native"

const statusText = {
  "active": "Не исправлено",
  "fixed": "Выполнено",
  "check": "На проверке",
}

const StatusBlock = ({status, text}: {status: "active" | "fixed" | "check", text?: string}) => {
  return <Text style={[styles.statusBlock, styles[status]]}>
    {text ? text: statusText[status] }
  </Text>
}

const styles = StyleSheet.create({
  statusBlock: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontFamily: Fonts[600],
    lineHeight: 24,
    fontSize: 14,
    backgroundColor: "#D9EBFF",
    color: "#2F7CD0",
    letterSpacing: -0.4,
    alignSelf: "flex-start",
  },
  active: {
    backgroundColor: "#FAE0E2",
    color: "#AF3B45",
  },
  fixed: {
    color: "#08875D",
    backgroundColor: "rgba(8, 135, 93, 0.15)",
  },
  check: {
    backgroundColor: "#D9EBFF",
    color: "#2F7CD0",
  }
})

export default memo(StatusBlock)