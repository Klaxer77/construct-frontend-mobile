import DropDownItem from '@/entities/DropDownItem';
import { Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import DropDown from '@/shared/ui/DropDown/DropDown';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { workList } from '../ObjectWorkScreen/ObjectWorkScreen';
import StatusBlock from '@/shared/ui/StatusBlock/StatusBlock';
import { TabWradder } from '@/shared/ui/TabWradder/ui/TabWradder';


type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectWorkVerification"
>;

const getStatus = (list: { type: string }[]) => {
  if (list.some(item => item.type === "active")) return "Отклонено";
  if (list.some(item => item.type === "check") && list.every(item => item.type === "check" || item.type === "fixed")) return "На проверке";
  if (list.every(item => item.type === "fixed")) return "Принято";
  return "На проверке";
};
const listFilters = ["Принято", "На проверке", "Отклонено"]

const ObjectWorkVerificationScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const { } = useRoute<ObjectRouteProp>();
  const {bottom} = useSafeAreaInsets();
  const [filter, setFilter] = useState("Принято")

  const filterList = workList.filter(item => getStatus(item.list) === filter);
  
  const handleNavigateVerificationOpen = (item: {title: string, subtitle: string, startDate: string, endDate: string, status: "fixed"|"check"|"active"|""}) => {
    navigation.navigate("ObjectStack", {screen: "ObjectVerificationOpen", params: {...item}})
  }

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={"Верефикация работ"}/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container, {paddingBottom: bottom + 110}]}>
          <TabWradder onChange={setFilter} list={listFilters}/>
          <View style={styles.containerDrop}>
          {filterList.map((item, index) => {
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
  dropDownTitle: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: Fonts[700],
    color: "#3D3D3D",
  },
  containerDrop: {
    gap: 24,
    paddingHorizontal: 18,
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
  container: {
    gap: 10,
    paddingTop: 11,
  },
})

export default ObjectWorkVerificationScreen;