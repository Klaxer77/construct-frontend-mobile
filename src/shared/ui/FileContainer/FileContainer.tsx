import { Fonts } from "@/shared/assets/fonts/fonts-config"
import { colors } from "@/shared/config/colors"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Svg, { G, Path } from "react-native-svg"

interface IFileContainer {
  fileName: string,
  onDelete: () => void,
}

export const FileContainer = ({
  fileName,
  onDelete,
}: IFileContainer) => { 
  return <View style={styles.container}>
    <Svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      fill="none"
    >
      <G opacity={0.3} fill="#00A77F">
        <Path d="M10.886 1.411c.052 0 .104.002.156.005V5.37a2.292 2.292 0 002.291 2.292h3.125v4.496a1.667 1.667 0 00-2.292 1.546v.833h-.833a1.667 1.667 0 000 3.333h.834v.834c0 .085.006.168.018.25a3.943 3.943 0 01-1.685.375H5.833a3.958 3.958 0 01-3.958-3.958v-10A3.958 3.958 0 015.833 1.41h5.053z" />
        <Path d="M15.927 6.172c.064.077.122.156.174.24h-2.768a1.042 1.042 0 01-1.041-1.043V1.893c.129.1.248.215.354.343l3.281 3.936z" />
      </G>
      <Path
        d="M18.958 16.202c0 .345-.28.625-.625.625h-1.875v1.875a.625.625 0 11-1.25 0v-1.875h-1.875a.625.625 0 110-1.25h1.875v-1.875a.625.625 0 011.25 0v1.875h1.875c.345 0 .625.28.625.625z"
        fill="#00A77F"
      />
    </Svg>
    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{fileName}</Text>
    <Pressable onPress={onDelete}>
      <Svg
        width={20}
        height={21}
        viewBox="0 0 20 21"
        fill="none"
      >
        <Path
          opacity={0.3}
          d="M14.651 4.744c1.689 0 2.653 1.928 1.64 3.278a3.332 3.332 0 00-.666 2v5.347a3.959 3.959 0 01-3.959 3.958H8.333a3.958 3.958 0 01-3.958-3.958v-5.348c0-.72-.235-1.422-.667-1.999-1.013-1.35-.049-3.278 1.64-3.278h9.303z"
          fill="#F10F0F"
        />
        <Path
          d="M11.667 14.536v-5M8.333 14.536v-5"
          stroke="#F10F0F"
          strokeWidth={1.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.334 5.37l-.454-1.361a1.667 1.667 0 00-1.58-1.14H8.701c-.718 0-1.355.46-1.582 1.14l-.453 1.36"
          stroke="#F10F0F"
          strokeWidth={1.25}
          strokeLinecap="round"
        />
      </Svg>
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: 'row',
    paddingVertical: 16.5,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.blue,
    
    backgroundColor: "#FFF",
    alignItems: "center",
    gap: 10,
  },
  text: {
    flex: 1,
    fontFamily: Fonts[600],
    fontSize: 13,
    lineHeight: 21, 
    letterSpacing: -0.4,
  }
  
})