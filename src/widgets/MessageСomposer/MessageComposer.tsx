import { colors, Icon, IconName } from "@/shared";
import { useState } from "react"
import { Pressable, StyleSheet, TextInput, View } from "react-native"
import PopupSendFile from "../SendFiles/PopupSendFile";
import { Asset } from "react-native-image-picker";

interface IMessageComposer{
  sendMessage: (value: string) => void,
  sendFile: (files: Asset[]) => void,
  activeSendFile?: boolean,
}

export const MessageComposer = ({
  sendMessage,
  sendFile,
  activeSendFile
}: IMessageComposer) => {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false)
  
  const handleSubmit = () => {
    sendMessage(value)
    setValue("")
  }

  return <View style={styles.container}>
    <PopupSendFile pdf={false} limit={6}  onSelectFiles={(files) => sendFile(files)} onClose={() => setVisible(false)} isVisible={visible}/>
    <Pressable disabled={!activeSendFile} onPress={() => setVisible(true)} style={[styles.button, activeSendFile && styles.activeButton]}>
      <Icon color={activeSendFile ? "white": "#B0B0B0"} name={IconName.Plus}/>
    </Pressable>
    <View style={styles.containerInput}>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholderTextColor={"#B0B0B0"}
        value={value}
        style={[styles.input, focus && styles.activeInput]}
        onChangeText={setValue}
        placeholder="Введите сообщение"
        onSubmitEditing={handleSubmit}
      />
      <View style={styles.icon}>
        <Icon name={IconName.Smile}/>
      </View>
    </View>
    <Pressable onPress={handleSubmit} style={[styles.button, value.length > 0 && styles.active]}>
      {value.length === 0 && <Icon name={IconName.Microphone}/>}
      {value.length > 0 && <Icon name={IconName.SendArrow}/>}
    </Pressable>
  </View>
}

const styles = StyleSheet.create({
  button: {
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#F9FAFB",
    borderRadius: 50,
  },
  activeButton: {
    backgroundColor: colors.blue
  },
  containerInput: {
    flex: 1,
    position: "relative",
  },
  icon: {
    position: 'absolute',
    right: 14,
    top: 12,
  },
  input: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 14,
    paddingRight: 34,
    fontSize: 16,
    height: 44,
    
    borderRadius: 30,
    letterSpacing: -0.2,
    borderWidth: 0.5,
    borderColor: "white",
  },
  activeInput: {
    borderColor: colors.blue,
  },
  active: {
    backgroundColor: colors.blue,
  },
  container: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "white",
    justifyContent: "space-between"
  }
})