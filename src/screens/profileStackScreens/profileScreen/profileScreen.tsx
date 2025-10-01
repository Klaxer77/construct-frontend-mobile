
import { Fonts } from "@/shared/assets/fonts/fonts-config";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ArrowRigthIcon } from "./icons";
import { TabItem } from "@/entities/TabItem";
import { TABS_DATA } from "./profileScreen.data";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/shared/ui/CustomButton/CustomButton";
import { useTypeNavigation } from "@/shared/hooks/useTypeNavigation";
import Switcher from "@/shared/ui/Switcher/Switcher";
import { colors } from "@/shared";
import Header from "@/widgets/Header/ui/Header";
import { useLogoutUser } from "@/features/auth/hooks/use-actions";
import { useEffect } from "react";
import { useStatusAuthLogout, useUserAuth } from "@/features/auth/hooks/use-selectors";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileScreen: React.FC = () => {
  const navigate = useTypeNavigation()
  const {logoutUser} = useLogoutUser()
  const status = useStatusAuthLogout()
  const user = useUserAuth()

  const handleQuit = async () => {
    await AsyncStorage.clear()
    logoutUser()
  }

  useEffect(() => {
    if (status === "received"){
      navigate.navigate("authStack", {screen: "Auth"})
    }
  }, [status, navigate])

  const tabCallbacks = [
    () => console.log("Callback 1"),
    () => console.log("Callback 2"),
    () => console.log("Callback 3"),
    () => console.log("Callback 4"),
    () => console.log("Callback 5"),
    () => console.log("Callback 6"),
    () => console.log("Callback 7"),
    handleQuit,
  ];
  
  const totalItems = TABS_DATA.reduce((total, currentBlock) => total + currentBlock.items.length, 0);
  
  return (
    <>
    <SafeAreaView style={styles.containerMain} edges={["top", "left", "right", "bottom"]}>
      <Header title="Профиль"/>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.containerScroll}>
        <View style={styles.info}>
          <View style={styles.avatar}/>
          <View>
            <Text style={styles.fio}>{user?.fio}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
          <CustomButton textColorDefault="black" onPress={() => {}} styleText={styles.buttonText} styleButton={styles.button} text="Редактировать"/>
        </View>
        <View style={styles.container}>
          {TABS_DATA.map((block, blockIndex) => (
            <View key={blockIndex} style={styles.containerTabs}>
              <Text style={styles.blockTitle}>{block.title}</Text>
              <View style={blockIndex === 0 ? styles.containerTabsItem : undefined}>
                {block.items.map((item, itemIndex) => {
                  const globalIndex = TABS_DATA.slice(0, blockIndex)
                    .reduce((total, currentBlock) => total + currentBlock.items.length, 0) + itemIndex;

                  const isLastItem = globalIndex === totalItems - 1;
                  
                  return (
                    <TabItem
                      wrapperStyle={{borderBottomWidth: isLastItem ? 0: 1}}
                      key={itemIndex}
                      icon={item.icon}
                      title={item.title}
                      subtitle={item.subtitle}
                    >
                      {globalIndex === 5 ? <Switcher/>: 
                        <Pressable style={styles.pressTab} onPress={tabCallbacks[globalIndex]}>
                          <ArrowRigthIcon/>
                        </Pressable>
                      }
                    </TabItem>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.questionContainer}>
          <View style={styles.questionText}>
            <Text style={styles.questionTitle}>Остались вопросы?</Text>
            <Text style={styles.questionSubtitle}>Сообщите нам в поддержку и мы поможем вам!</Text>
          </View>
          <CustomButton styleText={styles.buttonQuestionText} styleButton={styles.buttonQuestion} onPress={() => {}} text="Сообщить"/>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    paddingHorizontal: 16,
    flex: 1,
  },
  containerScroll: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 13,
  },
  headerTitle: {
    fontFamily: Fonts[800],
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.4,
    color: "#4C4C4C",
  },
  info: {
    gap: 10,
    width: "100%",
    marginTop: 21,
    alignItems: "center",
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 28.67,
    backgroundColor: "#F1F1F1",
  },
  fio: {
    fontFamily: Fonts[800],
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    letterSpacing: -0.4,
    color: "#000000",
  },
  email:{
    fontFamily: Fonts[400],
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
    letterSpacing: -0.3,
    color: colors.blue,
  },
  button: {
    width: 147,
    height: 38,
    padding: 7,
    alignItems: "center",
    borderWidth: 1.5,
    backgroundColor: "#FFFFFF",
    borderColor: colors.blue,
    justifyContent: "center",
    borderRadius: 22,
  },
  buttonText: {
    fontFamily: Fonts[600],
    fontSize: 13,
    lineHeight: 24,
    letterSpacing: -0.5,
    color: "#1B1D21",
  },
  containerTabs: {
    gap: 12,
    paddingLeft: 13,
    paddingRight: 14,
  },
  containerTabsItem: {
    gap: 10,
  },
  container: {
    gap: 27,
    marginTop: 36,
  },
  pressTab: {
    width: 24,
    height: 24,
    alignItems: "center", 
    justifyContent: "center",
  },
  questionContainer: { 
    padding: 20,
    marginTop: 6,
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    marginBottom: 90,
  },
  buttonQuestion: {
    maxWidth: 111,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  buttonQuestionText: {
    fontSize: 14,
  },  
  questionText: {
    gap: 5,
    paddingBottom: 10,
  },
  questionTitle: {
    fontFamily: Fonts[800],
    fontSize: 14,
    lineHeight: 24,
    color: "#3D3D3D",
  },
  questionSubtitle: {
    fontFamily: Fonts[600],
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.28,
    color: "#777777",
  },
  blockTitle: {
    fontFamily: Fonts[800],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
    textTransform: 'uppercase',
    color: colors.blue,
  },
  tabTitle: {
    fontFamily: Fonts[700],
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.4,
    color: "#3D3D3D",
  },
  tabSubtitle: {
    fontFamily: Fonts[600],
    fontSize: 14,
    lineHeight: 12,
    letterSpacing: -0.28,
    color: "rgba(0, 0, 0, 0.5)",
  },
  tabContainer: {
    flex: 1,
    width: "100%",
    gap: 16,
    paddingVertical: 16,
    flexDirection: "row",
    maxHeight: 72,
    alignItems: "center",
    justifyContent: 'space-between',
  },
  tabWrapper: {
    flexDirection: "row",
    flex: 1,
    height: 72,
    alignItems: "center",
    justifyContent: 'space-between',
    borderBottomColor: "rgb(0,0,0,0.1)",
    borderBottomWidth: 1,
  },
  tabWrapperText: {
    gap: 12,
  }
})

export default ProfileScreen;