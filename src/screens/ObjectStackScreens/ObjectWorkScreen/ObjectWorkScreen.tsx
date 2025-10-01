import DropDownItem from '@/entities/DropDownItem';
import { TabItem } from '@/entities/TabItem';
import { Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import DropDown from '@/shared/ui/DropDown/DropDown';
import ProgressBar from '@/shared/ui/ProgressBar/ProgressBar';
import StatusBlock from '@/shared/ui/StatusBlock/StatusBlock';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectWork"
>;

const listLinks = [
  {title: "График работ", subtitle: "Изменение и запросы", icon: () => <Icon name={IconName.Schedule}/>},
  {title: "Верификация работ", subtitle: "Проверка выполнения", icon: () => <Icon name={IconName.VerificationWork}/>},
]

export const workList = [
  {
    title: "Ремонт АБП",
    date: "Апр 14, 2024 - Апр 28, 2024",
    list: [
      {
        title: "Ремонт покрытия асфальтобетонного автопарковки в рамках благоустройства территории",
        type: "fixed",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      },
      {
        title: "Ремонт покрытия асфальтобетонного автопарковки в рамках благоустройства территории",
        type: "fixed",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      },
      {
        title: "Ремонт покрытия асфальтобетонного автопарковки в рамках благоустройства территории",
        type: "fixed",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      }
    ]
  },
  {
    title: "Замена бортового камня",
    date: "Апр 14, 2024 - Апр 29, 2024",
    list: [
      {
        title: "Замена дорожного бортового камня в рамках благоустройства территории",
        type: "",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      },
      {
        title: "Замена дорожного бортового камня в рамках благоустройства территории",
        type: "check",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      },
      {
        title: "Замена дорожного бортового камня в рамках благоустройства территории",
        type: "check",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      }
    ]
  },
  {
    title: "Устройство бортового камня",
    date: "Апр 14, 2024 - Апр 30, 2024",
    list: [
      {
        title: "Устройство садового бортового камня в рамках благоустройства территории",
        type: "check",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      },
      {
        title: "Устройство садового бортового камня в рамках благоустройства территории",
        type: "fixed",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      },
      {
        title: "Устройство садового бортового камня в рамках благоустройства территории",
        type: "active",
        startDate: "2025-04-15T00:00:00",
        endDate: "2025-04-27T00:00:00"
      }
    ]
  },
]

const ObjectWorkScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const { params } = useRoute<ObjectRouteProp>();
  const {bottom} = useSafeAreaInsets();

  const handleNavigateSchedule = () => {
    navigation.navigate("ObjectStack", {screen: "ObjectWorkSchedule", params: {title: params.title}})
  }

  const handleNavigateVerification = () => {
    navigation.navigate("ObjectStack", {screen: "ObjectWorkVerification", params: {title: params.title}})
  }

  const handleNavigateVerificationOpen = (item: {title: string, subtitle: string, startDate: string, endDate: string, status: "fixed"|"check"|"active"|""}) => {
    navigation.navigate("ObjectStack", {screen: "ObjectVerificationOpen", params: {...item}})
  }

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={"Ход работ"}/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container, {paddingBottom: bottom + 110}]}>
          <View style={styles.checkerContainer}>
            <Text style={styles.checkerTitle}>
              Ответсвенный
            </Text>
            <Text style={styles.checkerDate}>
              Назначен: 28 авг. 2025 г.
            </Text>
          </View>
          <View style={styles.checker}>
            <Image style={styles.checkerAvatar} source={require("@/shared/assets/images/avatar.png")}/>
            <View style={styles.info}>
              <Text style={styles.fio}>Феоктистов Алексей</Text>
              <Text style={styles.email}>af@toolsdev.org</Text>
            </View>
            <View>
              <StatusBlock text='Активен' status="fixed"/>
            </View>
          </View>
          {listLinks.map((item, index) => {
            return <TabItem key={item.title} subtitle={item.subtitle} wrapperStyle={styles.tabItem} icon={item.icon} title={item.title}>
              <Pressable onPress={index === 0 ? handleNavigateSchedule: handleNavigateVerification}>
                <Icon name={IconName.ArrowRigth}/>
              </Pressable>
            </TabItem>
          })}
          <ProgressBar percent={62}/>
          <Text style={styles.title}>Перечень работ</Text>
          <View style={styles.containerDrop}>
            {workList.map((item, index) => {
              return <DropDown key={index}  tab={
                <View>
                  <Text style={styles.dropDownTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.dropDownDate}>
                    {item.date}
                  </Text>
                </View>
              }>
                {item.list.map((itemWrapper, indexWrapper) => {
                return <DropDownItem onPress={() => handleNavigateVerificationOpen({
                  title: item.title,
                  subtitle: itemWrapper.title,
                  startDate: itemWrapper.startDate,
                  endDate: itemWrapper.endDate,
                  status: ((itemWrapper.type as "" | "fixed" | "check" | "active"))
                })} key={`${indexWrapper}work${index}`} {...itemWrapper}>
                  {itemWrapper.type && <StatusBlock text={itemWrapper.type === "active" ? "Отклонено": ""} status={(itemWrapper.type as "active" | "fixed" | "check")}/>}
                </DropDownItem>
                })}
                </DropDown>
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  tabItem: {
    borderBottomWidth: 0
  },
  dropDownTitle: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: Fonts[700],
    color: "#3D3D3D",
  },
  containerDrop: {
    gap: 24,
    paddingTop: 12,
  },
  dropDownDate: {
    fontSize: 14,
    letterSpacing: -0.28,
    lineHeight: 12,
    fontFamily: Fonts[600],
    paddingTop: 12,
    color: "rgba(0, 0, 0, 0.5)",
  },
  checkerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  checkerTitle: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 24,
    fontFamily: Fonts[700],
    color: "#4C4C4C",
  },
  title: {
    fontSize: 18,
    paddingTop: 10,
    letterSpacing: -0.4,
    lineHeight: 28,
    fontFamily: Fonts[800],
    color: "#4C4C4C",
  },
  checkerDate: {
    fontSize: 14,
    letterSpacing: -0.4,
    lineHeight: 22,
    fontFamily: Fonts[600],
    color: "#413F3F",
  },
  checker: {
    flexDirection: 'row',
    gap: 14.13,
    alignItems: "center",
    justifyContent: "space-between"
  },
  checkerAvatar: {
    width: 29.87,
    height: 32,
    borderRadius: 15,
    objectFit: "cover",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.08)",
  },
  info: {
    flex: 1,
  },
  fio: {
    fontSize: 16,
    letterSpacing: -0.2,
    lineHeight: 23,
    fontFamily: Fonts[600],
    color: "#585757",
    
  },
  email: {
     fontSize: 16,
    letterSpacing: -0.2,
    lineHeight: 23,
    fontFamily: Fonts[600],
    color: "#969696",
  },
  checkerImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  container: {
    paddingHorizontal: 18,
    gap: 10,
    paddingTop: 11,
  },
})

export default ObjectWorkScreen;