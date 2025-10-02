import { Asset } from "react-native-image-picker";
import PopupSendFile from "./PopupSendFile";
import { useEffect, useState } from "react";
import { StyleProp, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { colors } from "@/shared";
import { FileContainer } from "@/shared/ui/FileContainer/FileContainer";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import { Fonts } from "@/shared/assets/fonts/fonts-config";

interface ISendFileWidjet {
  pdf?: boolean;
  limit?: number, 
  subtitle: string,
  commentView?: boolean,
  disable?: boolean,
  styleView?: StyleProp<ViewStyle>,
  onChangeText?: (text: string) => void;
  onChangeFiles?: (files: Asset[]) => void;
}

export const SendFileWidjet = ({
  pdf,
  onChangeFiles,
  disable,
  limit,
  subtitle,
  styleView,
  commentView = true,
  onChangeText,
}: ISendFileWidjet) => {
  const [view, setView] = useState(false)
  const [files, setFiles] = useState<Asset[]>([])
  const [value, setValiue] = useState("")

  useEffect(() => {
    if (onChangeText){
      onChangeText(value)
    }
  }, [value, onChangeText])

  useEffect(() => {
    if (onChangeFiles)
    onChangeFiles(files)
  }, [files, onChangeFiles])

  return <>
  {view && <PopupSendFile 
  onSelectFile={(file) => setFiles((prevState) => [...prevState, file])} 
  limit={limit? limit - files.length: 1} pdf={pdf} 
  onSelectFiles={(popupFiles) => setFiles((prevState) => [...prevState, ...popupFiles])} 
  isVisible={view}
  onClose={() => setView(false)}/>}
  <View style={[styles.fixedViolantContainer, styleView]}>
    <View style={styles.formWrapper}>
      <View>
        <Text style={styles.fixedViolantTitle}>
          Прикрепите фото{"   "}
          <View style={styles.fixedSignal}/>
        </Text>
        <Text style={styles.fixedViolantTitle}>
          {subtitle}
        </Text>
        <Text style={styles.formSubtitle}>
          Вы можете добавить 
          {limit === 1 ? " 1 файл": "до "+ limit + " файлов"}
        </Text>
      </View>
      {files.length !== limit && <CustomButton disable={disable} onPress={() => setView(true)} text="Выбрать" styleButton={styles.button}/>}
    </View>
    {commentView && <TextInput value={value} onChangeText={(text) => setValiue(text)}  placeholder="Введите комментарий (По требованию)" placeholderTextColor={"#818C99"} style={styles.inputForm}/>}
    {files.map((item) => {
      return <FileContainer key={item.fileName} fileName={item.fileName ? item.fileName: "Файл"} onDelete={() => {
        setFiles(files.filter((itemInner) => itemInner.fileName !== item.fileName))
      }}/>
    })}
  </View>
  </>
}


const styles = StyleSheet.create({
  fixedViolantContainer: {
    paddingTop: 14,
    borderTopWidth: 1,
    gap: 16,
    borderTopColor: colors.blue
  },
  formWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fixedViolantTitle: {
      position: "relative",
      fontSize: 15,
      lineHeight: 23,
      letterSpacing: -0.4,
      color: "#3D3D3D",
      fontFamily: Fonts[700]
    },
    fixedViolantSubTitle: {
      fontSize: 13,
      lineHeight: 21,
      letterSpacing: -0.4,
      color: "#818C99",
      fontFamily: Fonts[700]
    },
    fixedSignal: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.warning,
    },
    fixedViolantDate: {
      paddingTop: 8,
      fontSize: 14,
      lineHeight: 12,
      letterSpacing: -0.28,
      color: "#818C99",
      fontFamily: Fonts[600]
    },
    formSubtitle: {
    fontSize: 14,
    lineHeight: 12,
    letterSpacing: -0.28,
    color: "rgba(0, 0, 0, 0.5)",
    fontFamily: Fonts[600],
    paddingTop: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  inputForm: {
    padding: 16,
    fontSize: 13,
    lineHeight: 13,
    letterSpacing: -0.4,
    color: "black",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#A0A0A5',
    fontFamily: Fonts[600],
  },
})