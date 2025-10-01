import { colors } from "@/shared"
import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { memo } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
import { Asset } from "react-native-image-picker"
import Svg, { Path } from "react-native-svg"

interface IReceiverMessage {
  title: string,
  time?: string,
  files?: Asset[],
  read?: boolean,
}

const ReceiverMessage = ({
  title,
  time,
  read,
  files,
}: IReceiverMessage) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.main}>
          <Text style={styles.title}>{title}</Text>

          {files && files.length > 0 && (
            <View style={styles.filesContainer}>
              {files.map((file, index) => (
                <Image
                  key={index}
                  source={{ uri: file.uri }}
                  style={[
                    styles.fileImage,
                    index !== files.length - 1 && { marginRight: 5 },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.infoMessage}>
          <Text style={styles.time}>{time}</Text>
          <Svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            fill="none"
          >
            <Path
              d="M4.188 13.498l3.041 2.8a.972.972 0 001.35-.033l7.53-7.626M19.811 8.639l-7.33 7.33"
              stroke={read ? "white": "#006BE0"}
              strokeWidth={1.45833}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </View>
      <Svg
        width={10}
        height={13}
        viewBox="0 0 10 13"
        fill="none"
      >
        <Path d="M8 13h2L5.75 7.5 0 0v9a10 10 0 008 4z" fill="#007AFF" />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  wrapper: {
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    height: "100%",
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
  },
  main: {
    paddingRight: 73,
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts[600],
    lineHeight: 22,
    letterSpacing: -0.4,
    color: "#F9FAFB", 
  },
  filesContainer: {
    flexDirection: "row",
    marginTop: 6,
  },
  fileImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: "#ccc",
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
    color: "#F9FAFB", 
  },
})

export default memo(ReceiverMessage)