import { useEffect, useState } from "react"
import { FlatList, StyleProp, StyleSheet, ViewStyle } from "react-native"
import CustomButton from "../../CustomButton/CustomButton"

interface ITabWradder{
  list: string[],
  initialActive?: string,
  onChange?: (value: string) => void,
  styleWradder?: StyleProp<ViewStyle>,
}

export const TabWradder = ({list, onChange,initialActive, styleWradder}: ITabWradder) => {
  const [active, setActive] = useState(initialActive ? initialActive: list[0])

  useEffect(() => {
    if (onChange)
    onChange(active)
  }, [active, onChange])

  return <FlatList
  data={list}
  horizontal
  keyExtractor={(item) => item}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={[styles.list, styleWradder]}
  renderItem={({item}) => {
    return <CustomButton styleText={styles.text} styleButton={styles.button} onPress={() => setActive(item)} text={item} secondary={item !== active}/>
  }}
  />
}

const styles = StyleSheet.create({
  list: {
    display: "flex",
    height: 40,
    gap: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 25,
    paddingRight: 25,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 15,
  },
  text: {
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: -0.2,
  }
})