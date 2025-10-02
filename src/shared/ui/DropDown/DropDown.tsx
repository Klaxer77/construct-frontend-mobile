import { colors, Icon } from "@/shared"
import { IconName } from "@/shared/assets/icons/types"
import React, { useRef, useState, ReactNode } from "react"
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from "react-native"

interface DropDownProps {
  tab: ReactNode
  children: ReactNode
}

const DropDown: React.FC<DropDownProps> = ({ tab, children }) => {
  const [open, setOpen] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)

  const animatedHeight = useRef(new Animated.Value(0)).current
  const animatedOpacity = useRef(new Animated.Value(0)).current
  const rotateAnim = useRef(new Animated.Value(0)).current

  const toggleDropdown = () => {
    if (open) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setOpen(false))
    } else {
      setOpen(true)
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: contentHeight,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    if (contentHeight === 0) {
      setContentHeight(e.nativeEvent.layout.height)
    }
  }

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "-90deg"],
  })

  return (
    <View>
      <View style={styles.tabContainer}>
        {tab}
        <Pressable style={styles.button} onPress={toggleDropdown}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Icon color={colors.blue} name={IconName.ArrowRigth} />
          </Animated.View>
        </Pressable>
      </View>

      {!open && contentHeight === 0 && (
        <View style={styles.hiddenContent} onLayout={handleLayout}>
          {children}
        </View>
      )}

      {open && contentHeight > 0 && (
        <Animated.View
          style={[
            styles.dropdown,
            { height: animatedHeight, opacity: animatedOpacity },
          ]}
        >
          {children}
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    overflow: "hidden",
    gap: 12,
    marginTop: 12,
  },
  hiddenContent: {
    gap: 12,
    position: "absolute",
    opacity: 0,
    zIndex: -1,
  },
})

export default DropDown