import { IAnswer, IPhoto } from "@/screens/ObjectStackScreens/ObjectСommentScreen/ObjectCommentScreen"
import { colors, Icon, IconName, Status } from "@/shared"
import { Fonts } from "@/shared/assets/fonts/fonts-config"
import CustomButton from "@/shared/ui/CustomButton/CustomButton"
import { PulseSpinner } from "@/shared/ui/PulseSpinner/PulseSpinner"
import { formatISOToDate } from "@/shared/utils/formatDate"
import { SendFileWidjet } from "@/widgets/SendFiles/SendFileWidjet"
import { memo, useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { Asset } from "react-native-image-picker"

export interface ICommentOpenItem {
  violation: {
    violations: string,
    nameDocument: string,
    files?: IPhoto[] | null
    date: string,
    comment: string | null,
    number: number,
  },
  fixedViolant?:IAnswer
  remark: boolean,
  id: string,
  handleUpdateData?: (id: string, files: Asset[] | null, comment: string) => void,
  onPressReject?: () => void,
  onPressAccent?: (id: string) => void,
  onPressCancel?: (id: string) => void,
  onPressSend?: (id: string) => void,
  status?: "fixed" | "reject" | "check"
  type: "prost" | "сonstructionСontrol" | "inspection",
  statusFetch?: Status
}

const statusText = {
  fixed: "Исправлено",
  reject: "Не исправленно",
  check: "На проверке"
}

const CommentOpenItem = ({
  violation,
  fixedViolant,
  type,
  status,
  handleUpdateData,
  onPressSend,
  onPressAccent,
  onPressCancel,
  statusFetch,
  id,
  remark,
}: ICommentOpenItem) => {
  const {violations, nameDocument, date, comment, number} = violation;
  const [viewForm, setViewForm] = useState(false)
  const [files, setFiles] = useState<Asset[]>([])
  const [commentValue, setCommnetValue] = useState("")

  useEffect(() => {
    if (handleUpdateData){
      handleUpdateData(id, files, commentValue)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment, files])

  return <View style={styles.container}>
    <View style={styles.wrapper}>
      <Text style={styles.number}>№{number}</Text>
      <Text style={styles.title}>Перечень выявленных нарушений</Text>
      <Text style={styles.subtitle}>{violations}</Text>
    </View>
    <View style={styles.wrapper}>
      <Text style={styles.title}>Наименование нормативного документа, требования проекта (РД)</Text>
      <Text style={styles.subtitle}>{nameDocument}</Text>
    </View>
    <View style={styles.wrapper}>
      <Text style={styles.title}>Фото</Text>
      <FlatList
      data={violation.files}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.imgs}
      renderItem={({ item }) => (
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{ uri: item.file_path }}
          />
          <Icon name={IconName.Lupa} />
        </View>
      )}
    />
    </View>
    {comment && <View style={styles.wrapper}>
      <Text style={styles.title}>Комментарий</Text>
      <Text style={styles.subtitle}>{comment}</Text>
    </View>}
    <View style={styles.wrapper}>
      <Text style={styles.title}>Дата устранения</Text>
      <Text style={styles.subtitle}>{formatISOToDate(date)}</Text>
    </View>
    {(fixedViolant && (type === "сonstructionСontrol" || (type === "inspection" && !remark)) && status === "check") &&
    <View style={styles.fixedViolantContainer}>
      <View >
        <Text style={styles.fixedViolantTitle}>Отправлено исправление замечания <View style={styles.fixedSignal}/></Text>
        <Text style={styles.fixedViolantDate}>Дата: {formatISOToDate(fixedViolant.created_at)}</Text>
      </View>
      <Text style={styles.fixedViolantSubTitle}>{fixedViolant.comment}</Text>
      <FlatList showsHorizontalScrollIndicator={false}   horizontal contentContainerStyle={styles.imgs} data={fixedViolant.files} keyExtractor={(item) => String(item.file_path)} renderItem={({item}) => 
        <View style={styles.imgContainer} >
            <Image
              style={styles.img}
              source={{ uri: item.file_path }}
            />
            <Icon name={IconName.Lupa}/>
        </View>
      }/>
      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <CustomButton
          loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>}
          onPress={() => onPressAccent? onPressAccent(id): {}} text="Принять" styleText={styles.buttonText} styleButton={styles.button}/>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
          loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>}
          loading={statusFetch === "loading"}
          onPress={() => onPressCancel?  onPressCancel(id): {}} text="Отклонить" styleText={[styles.buttonText, styles.reject]} secondary styleButton={[styles.button, styles.buttonReject]}/>
        </View>
      </View>
    </View>
    }
    {(type === "prost" && !viewForm && status === "reject") &&
      <CustomButton
      text="Отправить исправление" onPress={() => setViewForm(true)} styleButton={styles.button}/>
    }
    {(status !== "reject" && status && !(status === "check" && type === "сonstructionСontrol") && !(status === "check" && type === "inspection" && !remark))  &&
      <CustomButton secondary disable={status === "check" || status === "fixed"} text={statusText[status]} textColorDefault={status === "check" ? "black": "#08875D"} styleText={styles[status]}  styleButton={[styles.button, styles.buttonReject]}/>
    }
    {(type === "prost" && viewForm) &&
      <>
        <SendFileWidjet disable={statusFetch === "loading"} onChangeText={setCommnetValue} onChangeFiles={setFiles} limit={6} pdf={false} subtitle="исправления замечания"/>
        <View style={[styles.buttons, styles.buttonsForm]}>
          <View style={styles.buttonWrapper}>
            <CustomButton
             loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>}
              loading={statusFetch === "loading"}
             onPress={() =>  onPressSend?  onPressSend(id): {}} disable={files.length === 0} text="Отправить" styleText={styles.buttonText} styleButton={styles.button}/>
          </View>
          <View style={styles.buttonWrapper}>
            <CustomButton
            loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>}
            loading={statusFetch === "loading"}
            onPress={() => setViewForm(false)} text="Отмена" styleText={[styles.buttonText, styles.reject]} secondary styleButton={[styles.button, styles.buttonReject]}/>
          </View>
        </View>
      </>
    }
  </View>
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    gap: 6,
    borderColor: "#F7F7F8",
  },
  formSubtitle: {
    fontSize: 14,
    lineHeight: 12,
    letterSpacing: -0.28,
    color: "rgba(0, 0, 0, 0.5)",
    fontFamily: Fonts[600],
    paddingTop: 8,
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
  check: {
    color: "#4C4C4C",
  },
  fixed: {
    color: colors.success
  },
  reject: {
    color: colors.warning,
  },
  buttonReject: {
    backgroundColor: "#F6F6F6"
  },
  buttons: {
    flexDirection: "row",
    flex: 1,
    gap: 16,
  },
  buttonWrapper:{
    flex: 1,
    flexBasis: 0,
  },
  buttonsForm: {
    paddingTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: -0.2,
    fontFamily: Fonts[700]
  },
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
  imgs: {
    flexDirection: "row",
    gap: 2,
  },
  img: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  imgContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor:"rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.2,
    color: "#A9A9A9",
    fontFamily: Fonts[600]
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.4,
    color: "#000000",
    fontFamily: Fonts[600]
  },
  number: {
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: -0.2,
    color: colors.blue,
    fontFamily: Fonts[600]
  },
  wrapper: {
    gap: 2,
  }
})

export default memo(CommentOpenItem)