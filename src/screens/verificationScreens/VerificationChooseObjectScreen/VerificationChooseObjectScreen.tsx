import { ObjectItem } from '@/entities/ObjectItem';
import { useSetCurrentVerification } from '@/features/auth/hooks/use-actions';
import { useUserAuth } from '@/features/auth/hooks/use-selectors';
import { useGetObjects } from '@/features/listObjects/hook/use-actions';
import { Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { IObject } from '@/shared/types/object';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import Header from '@/widgets/Header/ui/Header';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const VerificationChooseObjectScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const [objectList] = useGetObjects()
  const user = useUserAuth()
  const filterList = objectList?.filter((item) => item.object_type === "active" && item.is_nfc);
  const setCurrent = useSetCurrentVerification()

  const handleEnterObj = (object: IObject) => {
    const obj = user?.object_access.find((item) => item.object_id === object.id)

    if (obj?.is_active){
      setCurrent({...obj, name: object.title})
      navigation.navigate("Verifiacation", {screen: "VerificationMain"})
    } else {
      navigation.navigate("Verifiacation", {screen: "VerificationScan", params: {object: object}})
    }
  }
  
  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title="Верификация"/>
        </SafeAreaView>
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
          <ScrollView contentContainerStyle={styles.containerScroll}>
            <View style={styles.main}>
              <View style={styles.mainText}>
                <Text style={styles.title}>
                  Выберите объект
                </Text>
                <Text style={styles.subtitle}>
                  Откройте нужный объект, с которым
                  планируете работать
                </Text>
              </View>
              {objectList && <FlatList
              contentContainerStyle={styles.cards}
              data={filterList}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => {
                return <ObjectItem title={item.title} subtitle={item.city} onPress={() => handleEnterObj(item)}/>
              }}/>
              }
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 25,
  },
  containerScroll: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    paddingTop: 10,
    paddingBottom: 80,
    flexGrow: 1,
  },
  main: {
    display: "flex",
    gap: 20,
  },
  mainText: {
    display: "flex",
    gap: 10,
    paddingTop: 20,
  },
  title: {
    fontFamily: Fonts[700],
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.4,
    color: "black"
  },
  subtitle: {
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: "#808080",
  },
  questionContainer: { 
    padding: 20,
    marginTop: 6,
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    marginBottom: 80,
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
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: 13,
  },
})

export default VerificationChooseObjectScreen;