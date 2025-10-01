import { colors, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import DropDown from '@/shared/ui/DropDown/DropDown';
import { TabWradder } from '@/shared/ui/TabWradder/ui/TabWradder';
import Header from '@/widgets/Header/ui/Header';
import PopupChooseObject from '@/widgets/PopupChooseObject/PopupChooseObject';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { workList } from '../ObjectWorkScreen/ObjectWorkScreen';
import DropDownItem from '@/entities/DropDownItem';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';

const ObjectWorkScheduleScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const [viewPopup, setViewPopup] = useState(false);
  const [filter, setFilter] = useState("Изменить");
  const {bottom} = useSafeAreaInsets();
  
  const handleNavigateVerificationOpen = (item: {title: string, subtitle: string, startDate: string, endDate: string, status: "fixed"|"check"|"active"|""}) => {
    navigation.navigate("ObjectStack", {screen: "ObjectVerificationOpen", params: {...item}})
  }

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <PopupChooseObject isVisible={viewPopup} onClose={() => setViewPopup(false)}/>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={"График работ"}/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container, {paddingBottom: bottom + 110}]}>
          <TabWradder onChange={setFilter} list={["Изменить", "Запрос на изменение"]}/>
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
                  <View style={styles.buttons}>
                    <CustomButton styleText={styles.buttonText} text={filter === "Изменить" ? "Изменить": "Принять"} styleButton={styles.button}/>
                    {filter !== "Изменить" && <CustomButton colorDefault={colors.warning} colorActive='rgba(130, 17, 26, 1)' styleText={styles.buttonText} text='Отклонить' styleButton={[styles.button, styles.error]}/>}
                  </View>
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
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  container: {
    gap: 29,
    paddingTop: 11,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  error: {
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: -0.11,
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
  },
  dropDownDate: {
    fontSize: 14,
    letterSpacing: -0.28,
    lineHeight: 12,
    fontFamily: Fonts[600],
    paddingTop: 12,
    color: "rgba(0, 0, 0, 0.5)",
  },
})

export default ObjectWorkScheduleScreen;