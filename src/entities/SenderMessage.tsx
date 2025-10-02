import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { memo } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import Svg, { Path } from "react-native-svg"

interface IReceiverMessage {
  title: string,
  time: string,
}

const SenderMessage = ({
  title,
  time,
}: IReceiverMessage) => {
  return <View style={styles.container}>
    <Image style={styles.img} source={require("@/shared/assets/images/Photo.jpg")}/>
    <Svg
      width={10}
      height={13}
      viewBox="0 0 10 13"
      fill="none"
    >
      <Path d="M2 13H0l4.25-5.5L10 0v9a10 10 0 01-8 4z" fill="#fff" />
    </Svg>
    <View style={styles.wrapper}>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.infoMessage}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  </View>
  
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 8,
  },
  img: {
    width: 30,
    height:30,
    borderRadius: 10,
  },
  wrapper: {
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    height: "100%",
    borderBottomLeftRadius: 4,
    alignSelf: "flex-end",
  },
  main: {
    paddingRight: 40,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts[600],
    lineHeight: 22,
    letterSpacing: -0.4,
    color: "#222222", 
  },
  infoMessage: {
    position: "absolute",
    top: 14,
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: 'center',
    bottom: 0,
    right: 14,
  },
  time: {
    fontSize: 12,
    fontFamily: Fonts[600],
    lineHeight: 18,
    color: "#B0B0B0", 
  },
  
})

export default memo(SenderMessage)