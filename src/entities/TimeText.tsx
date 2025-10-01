import { Status } from "@/shared"
import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { useCountdown } from "@/shared/hooks/useEndIso";
import { memo } from "react";
import { StyleSheet, Text } from "react-native"

const TimeText = ({date, status}: {date: string, status: Status}) => {
  const { formatted } = useCountdown(date);

  return <Text style={styles.cardInfo}>{status === "received" ? `Время действия: ${formatted}`: "Метка не соответствует выбраному объекту "}</Text>
}


const styles = StyleSheet.create({
  cardInfo: {
    fontFamily: Fonts[600],
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: -0.2,
    color: '#616161',
  },
  
})

export default memo(TimeText)