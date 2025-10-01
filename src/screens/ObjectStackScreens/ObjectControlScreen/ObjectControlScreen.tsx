import DropDownItem from '@/entities/DropDownItem';
import { ApiResponse, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import DropDown from '@/shared/ui/DropDown/DropDown';
import StatusBlock from '@/shared/ui/StatusBlock/StatusBlock';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { formatDate } from '@/shared/utils/formatDate';


type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectControl"
>;

export interface Subcategory {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
}

export interface DataItem {
  id: string;
  title: string;
  date_from: string;
  date_to: string;
  subcategories: Subcategory[];
}

const ObjectControlScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const { params } = useRoute<ObjectRouteProp>();
  const [list, setList] = useState<DataItem[]>([]) 
  const {bottom} = useSafeAreaInsets()

  useEffect(() => {
    api.get<ApiResponse<DataItem[]>>(endpoints.materials.getList)
    .then((data) => {
      setList(data.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={"Контроль материалов"}/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container, {paddingBottom: bottom + 80}]}>
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
          <Text style={styles.title}>Состав работ</Text>
          <View style={styles.containerDrop}>
            {list.map((item) => {
              return <DropDown key={item.id}  tab={
                <View>
                  <Text style={styles.dropDownTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.dropDownDate}>
                    {formatDate(item.date_from)}{" - "}{formatDate(item.date_to)}
                  </Text>
                </View>
              }>
                {item.subcategories.map((itemWrapper) => {
                return <DropDownItem 
                onPress={() => navigation.navigate("ObjectStack", {screen: "ObjectControlEntry", params: {object: params.object ?? null, mainTask: {title: item.title, endDate: formatDate(item.date_to), startDate: formatDate(item.date_from)}, secondaryTask: {id: itemWrapper.id, title: itemWrapper.title, startDate: itemWrapper.date_from, endDate: itemWrapper.date_to}}})} 
                key={itemWrapper.id} {...itemWrapper}
                endDate={itemWrapper.date_to}
                startDate={itemWrapper.date_from}
                />
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
  dropDownDate: {
    fontSize: 14,
    letterSpacing: -0.28,
    lineHeight: 12,
    fontFamily: Fonts[600],
    paddingTop: 12,
    color: "rgba(0, 0, 0, 0.5)",
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
  container: {
    paddingHorizontal: 18,
    gap: 10,
    paddingTop: 11,
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
})

export default ObjectControlScreen;