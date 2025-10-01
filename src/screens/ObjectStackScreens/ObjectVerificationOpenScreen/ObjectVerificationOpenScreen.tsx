import { colors, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import StatusBlock from '@/shared/ui/StatusBlock/StatusBlock';
import { formatISOToDate } from '@/shared/utils/formatDate';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { SendFileWidjet } from '@/widgets/SendFiles/SendFileWidjet';
import { Asset } from 'react-native-image-picker';


type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectVerificationOpen"
>;


const ObjectVerificationOpenScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const { params } = useRoute<ObjectRouteProp>();
  const {bottom} = useSafeAreaInsets();
  const [viewForm, setViewForm] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<Asset[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comment, setComment] = useState("")
  //"prost" | "сonstructionСontrol"| "inspector"
  
  const statusText = {
    "fixed": "Работы приняты",
    "check" : "Работы отправлены на проверку",
    "active": "Причина" 
  }

  const handleNavigateSend = (text: string) => {
    navigation.navigate("ObjectStack", {screen: "ObjectSendWork", params: {title: params.title, subtitle: params.subtitle, text: text, link: "ObjectWork"}})
  }
  
  const typePerson = params.status !== "check" ? "prost" :"сonstructionСontrol";
  
  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={"Верефикация работ"}/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container, {paddingBottom: bottom + 110}]}>
          <View>
            <View style={styles.main}>
                <View style={styles.mainWrapper}>
                  <View style={styles.main}>
                    <Text style={styles.title}>{params.title}</Text>
                    <Text style={styles.subtitle}>{params.subtitle}</Text>
                    <Text style={styles.date}>
                      {formatISOToDate(params.startDate)}
                      {" → "}
                      {formatISOToDate(params.endDate)}
                    </Text>
                  </View>
                </View>
              <View style={styles.mainWrapper}>
                {params.status && <StatusBlock status={params.status === "active"? "active": params.status}/> }
              </View>
              {params.status &&
                <>
                  <View style={styles.mainWrapper}>
                    <View style={styles.line}/>
                  </View>
                  <View style={styles.fixedViolantContainer}>
                    <View style={styles.fixedViolanWrapper}>
                      <Text style={styles.fixedViolantTitle}>{statusText[params.status]+ "  "} <View style={[styles.fixedSignal, styles[params.status]]}/></Text>
                      <Text style={styles.fixedViolantDate}>Дата: {"24.04.25 | 14:43"}</Text>
                    </View>
                    <Text style={styles.fixedViolantSubTitle}>{"Сколы восстановили, некоторые бордюры новые, подтверждение в фото"}</Text>
                    <FlatList showsHorizontalScrollIndicator={false}   horizontal contentContainerStyle={styles.imgs} data={[0,1,2,3]} keyExtractor={(item) => String(item)} renderItem={({}) => 
                      <View style={styles.imgContainer} >
                          <Image style={styles.img} source={require("@/shared/assets/images/violant.png")}/>
                          <Icon name={IconName.Lupa}/>
                      </View>
                    }/>
                  </View>
                  <View style={styles.mainWrapper}>
                    {(params.status === "check" && typePerson === "сonstructionСontrol" && !viewForm) &&
                      <>
                        <CustomButton 
                        colorDefault={"#F6F6F6"}
                        colorActive={"#f6f6f665"}
                        text={params.status === "check" ? "Отклонить": "Отправить заново"} 
                        styleButton={[styles.buttonProst]}
                        onPress={() => setViewForm(true)}
                        styleText={[styles.buttonTextProst, params.status === "check" && styles.warning]}
                        />
                        <CustomButton
                        colorDefault={"#08875D"}
                        colorActive={params.status === "check"? "#f6f6f665": ""}
                        text={"Принять"} 
                        styleButton={[styles.buttonProst, styles.buttonAccept]}
                        onPress={() => handleNavigateSend("Работы приняты!")}
                        styleText={styles.buttonTextProst}
                        />
                      </>
                    }
                    {((params.status === "check" || params.status === "active") && typePerson === "prost" && !viewForm) &&
                      <CustomButton 
                      colorDefault={params.status === "check"? "#F6F6F6": ""}
                      colorActive={params.status === "check"? "#f6f6f665": ""}
                      text={params.status === "check" ? "Отклонить": "Отправить заново"} 
                      styleButton={[styles.buttonProst]}
                      onPress={params.status === "active"? () => setViewForm(true): () => {}}
                      styleText={[styles.buttonTextProst, params.status === "check" && styles.warning]}
                      />
                    }
                  </View>
                </>
              }
              <View style={styles.mainWrapper}>
                {!params.status && typePerson === "prost" && !viewForm &&
                  <CustomButton styleText={styles.buttonText} styleButton={styles.button} text='Сдать этап работ' onPress={() => setViewForm(true)}/>
                }
                {viewForm &&
                  <SendFileWidjet onChangeFiles={setFiles} onChangeText={setComment} pdf={false} limit={6} subtitle={typePerson === "prost"? "подтверждающие сдачу":"для аргументации отказа"}/>
                }
              </View>
            </View>
          </View>
          {viewForm && <View style={styles.buttons}>
            <View style={styles.buttonWrapper}>
              <CustomButton onPress={() => setViewForm(false)} text='Отмена' styleText={[styles.buttonFooterText, styles.warning]} secondary styleButton={styles.buttonFooter}/>
            </View>
            <View style={styles.buttonWrapper}>
              <CustomButton onPress={() => handleNavigateSend(typePerson === "prost"? "Выполнение работ было отправлено на проверку!": "Отказ отправлен")} disable={!(files.length > 0)} text='Отправить' styleText={styles.buttonFooterText} styleButton={styles.buttonFooter}/>
            </View>
          </View>}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  fixed: {
    backgroundColor: "#08875D",
  },
  check: {
    backgroundColor: "#007AFF",
  },
  active: {
    backgroundColor: "#E02D3C",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 15,
  },
  buttonFooter: {
    paddingVertical: 14,
    flex: 1,
    borderRadius: 20,
  },
  buttonFooterText: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.4,
    fontFamily: Fonts[600],
  },
  buttonTextProst: {
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: -0.2,
    fontFamily: Fonts[700],
  },
  warning: {
    color: colors.warning,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: -0.2,
    fontFamily: Fonts[700],
  },
  container: {
    gap: 10,
    paddingTop: 11,
    minHeight: "100%",
    justifyContent: "space-between",
  },
  main: {
    gap: 10,
  },
  mainWrapper: {
    paddingHorizontal: 20,
  },
  buttonProst: {
    paddingVertical: 13,
    borderRadius: 15,
  },
  buttons: {
    paddingHorizontal: 25,
    paddingBottom: 15,
    flexDirection: "row",
    gap: 8,
  },
  buttonAccept: {
    marginTop: 16,
  },
  buttonWrapper: {
    flex:1,
    flexBasis: 0,
  },
  title: {
    fontSize: 26,
    lineHeight: 34,
    letterSpacing: -0.4,
    fontFamily: Fonts[700],
    color: "#000000"
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    fontFamily: Fonts[600],
    color: "#585757"
  },
  date: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
    color: "#A0A0A5"
  },
  fixedViolantContainer: {
    gap: 16,
  },
  line: {
    height: 1,
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.blue,
  },
  fixedViolanWrapper: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
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
})

export default ObjectVerificationOpenScreen;