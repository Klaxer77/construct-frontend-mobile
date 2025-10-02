import { ActionTab } from '@/entities/ActionTab';
import { useClearCurrentObject, useSetCurrentVerification } from '@/features/auth/hooks/use-actions';
import { useGetCurrentObject, useUserAuth } from '@/features/auth/hooks/use-selectors';
import { colors, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { getCord } from '@/shared/utils/coordinates';
import Header from '@/widgets/Header/ui/Header';
import PopupChooseObject from '@/widgets/PopupChooseObject/PopupChooseObject';
import { useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import YaMap, { Polygon } from 'react-native-yamap';


type Point = { lat: number; lon: number };

export const multiPolygonToPoints = (multiPolygon: Array<Array<[number, number]>>): Point[][] => {
  return multiPolygon.map((polygon) =>
    polygon.map(([lat, lon]) => ({ lat, lon }))
  );
};

const ObjectAvailableScreen: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useTypeNavigation();
  const [viewPopup, setViewPopup] = useState(false);
  const user = useUserAuth()
  const clearCurrentObject = useClearCurrentObject()
  const currentObject = useGetCurrentObject()
  const titleObject = currentObject?.title
  const setCurrent = useSetCurrentVerification()

  const dataList = [
    { title: 'Общее', subtitle: 'Описание объекта' },
    {
      title: 'Замечания',
      subtitle: 'Все замечания по объекту',
      onPress: () =>
        navigation.navigate('ObjectStack', {
          screen: 'ObjectComments',
          params: { title: titleObject, header: 'Замечания' },
        }),
    },
    {
      title: 'Нарушения',
      subtitle: 'Все нарушения по объекту',
      onPress: () =>
        navigation.navigate('ObjectStack', {
          screen: 'ObjectComments',
          params: { title: titleObject, header: 'Нарушения' },
        }),
    },
    {
      title: 'Ход работ',
      subtitle: 'График и перечень работ',
      onPress: () =>
        navigation.navigate('ObjectStack', {
          screen: 'ObjectWork',
          params: { title: titleObject },
        }),
    },
    { title: 'Задачи', subtitle: 'Список задач по объекту', disable: true },
    { title: 'Материалы', subtitle: 'Требуемые запросы ' },
    { title: 'Сотрудники', subtitle: 'Список рабочих' },
    {
      title: 'Журналы',
      subtitle: 'Полная информация о работах',
      disable: true,
    },
  ].filter(
    item => !(user?.role === 'construction_control' && item.title === 'Нарушения'),
  );

  const handlePressAction = (header: "замечание"| "нарушение") => {
    const obj = user?.object_access.find((item) => item.object_id === currentObject?.id)
    
    if (obj?.is_active){
      setCurrent({...obj, name: currentObject?.title})
      navigation.navigate("ObjectStack", {screen: "ObjectTalks", params: {header: header}})
    } else {
      navigation.navigate("Verifiacation", {screen: "VerificationMain", params: {object: currentObject}})
    }
  }


  const objCoord = currentObject?  getCord(currentObject?.coords): null
 
  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={['top', 'bottom']}>
        <SafeAreaView edges={['left', 'right']}>
          <Header
            onPressLeft={() => setViewPopup(true)}
            title={titleObject ? titleObject : ''}
          />
        </SafeAreaView>
        {viewPopup && (
          <PopupChooseObject
            role={user?.role ?? ""}
            fio={user?.fio ?? ""}
            check={!!currentObject}
            title={currentObject?.title ?? ""}
            subtitle={currentObject?.city ?? ""}
            isVisible={viewPopup}
            onPress={() => {
              clearCurrentObject()
              navigation.navigate("ObjectStack", {screen: "ObjectChooseObject"})
            }}
            onClose={() => setViewPopup(false)}
          />
        )}
        <ScrollView contentContainerStyle={styles.container}>
          <Pressable onPress={() => navigation.navigate("ObjectStack", {screen: "ObjectMap"})} style={styles.wrapperMap}>
            <YaMap
              style={styles.map}
              
              initialRegion={{
                lat: objCoord?.initialCoord.lat ?? 55.7558,
                lon: objCoord?.initialCoord.lon ?? 37.6173,
                zoom: 9,
              }}
            > 
                {objCoord?.polygon && (
                  <Polygon
                    points={objCoord?.polygon}
                    strokeWidth={2}
                    strokeColor="rgba(255,0,0,0.5)"
                    fillColor="rgba(255,0,0,0.2)"
                  />
                )}
                {objCoord?.multiPolygon &&
                  objCoord?.multiPolygon.map((polygon: Point[], idx: number) => (
                    <Polygon
                      key={idx}
                      points={polygon}
                      strokeWidth={2}
                      strokeColor="rgba(0,0,255,0.5)"
                      fillColor="rgba(0,0,255,0.2)"
                    />
                  ))}
              <View style={styles.mapContainer}>
                <Text style={styles.mapText}>Карта</Text>
                <View style={styles.link}>
                  <Icon name={IconName.Link} />
                </View>
              </View>
            </YaMap>
          </Pressable>
          <View style={styles.wrapper}>
            <View style={styles.wrapperBlocks}>
              <View style={styles.infoBlocks}>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoBlockTitle}>Статус</Text>
                  <View style={styles.infoBlockWrapper}>
                    <Text style={styles.infoBlockStatus}>Опережение</Text>
                  </View>
                </View>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoBlockTitle}>Сотрудников</Text>
                  <View style={styles.infoBlockWrapper}>
                    <Text style={styles.infoBlockStatus}>126</Text>
                    <Icon name={IconName.ArrowUp} />
                  </View>
                </View>
              </View>
              <View style={[styles.infoBlock, styles.secondaryInfo]}>
                <Text style={styles.infoBlockTitle}>Активных журналов</Text>
                <View>
                  <Text style={styles.infoBlockStatus}>7</Text>
                </View>
                <Icon name={IconName.Link} />
              </View>
              <View style={[styles.infoBlock, styles.secondaryInfo]}>
                <Text style={styles.infoBlockTitle}>Запрос на материалы</Text>
                <View>
                  <Text style={styles.infoBlockStatus}>9</Text>
                </View>
                <Icon name={IconName.Link} />
              </View>
            </View>
            <View style={styles.actionBlock}>
              <Text style={styles.titleAction}>Быстрые действия</Text>
              {user?.role === 'construction_control' && (
                <ActionTab
                  icon={<Icon name={IconName.MakeComment} />}
                  onPress={() => handlePressAction("замечание")}
                  
                  title="Внести замечание"
                  subtitle="Выявлено замечание на объекте"
                />
              )}
              {user?.role === 'inspection' && (
                <ActionTab
                  icon={<Icon name={IconName.MakeComment} />}
                  onPress={() => handlePressAction("нарушение")}
                  title="Внести нарушение"
                  subtitle="Выявлено нарушение на объекте"
                />
              )}
              {(user?.role === 'contractor' || user?.role === "inspection") && (
                <ActionTab
                  icon={<Icon name={IconName.MakeComment} />}
                  onPress={() =>
                    {
                      if (currentObject){
                        navigation.navigate('ObjectStack', {
                          screen: 'ObjectControl',
                          params: { object: {
                            id: currentObject.id,
                            using_id: currentObject.using_id,
                            status: currentObject.status,
                            object_type: 'active',
                            title: '',
                            general_info: '',
                            responsible_user_id: '',
                            city: '',
                            date_delivery_verification: '',
                            responsible_user: currentObject.responsible_user,
                            act: {
                              status: "",
                              file_url: "",
                            },
                            is_nfc: false
                          } },
                        })
                      }
                    }
                  }
                  title="Контроль материалов"
                  subtitle="Поступление и отслеживание"
                />
              )}
              <ActionTab
                icon={<Icon name={IconName.VerificationWork} />}
                onPress={() =>
                  navigation.navigate('ObjectStack', {
                    screen: 'ObjectWorkVerification',
                    params: { title: titleObject },
                  })
                }
                title="Верификация работ"
                subtitle="Проверка выполнения"
              />
            </View>
          </View>
          <FlatList
            data={dataList}
            scrollEnabled={false}
            contentContainerStyle={[
              styles.list,
              { paddingBottom: bottom + 80 },
            ]}
            keyExtractor={item => item.title}
            renderItem={({ item }) => {
              return <ActionTab {...item} />;
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  line: {
    paddingBottom: 1,
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingHorizontal: 20,
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  container: {
    gap: 10,
    paddingTop: 11,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  wrapperBlocks: {
    gap: 10,
  },
  map: {
    height: 210,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  wrapperMap: {
    paddingHorizontal: 20,
  },
  mapText: {
    fontSize: 18,
    lineHeight: 28,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderRadius: 5,
    alignSelf: 'flex-start',
    fontFamily: Fonts[700],
    letterSpacing: -0.4,
    color: '#121212',
  },
  link: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignSelf: 'flex-start',
  },
  infoBlock: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    gap: 8,
    borderColor: 'rgba(236, 236, 236, 0.4)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },

    shadowOpacity: 0.03,
    shadowRadius: 9.7,
  },
  infoBlockWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBlocks: {
    flexDirection: 'row',
    gap: 10,
  },
  infoBlockTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts[700],
    maxWidth: 133,
    letterSpacing: -0.4,
    color: '#121212',
  },
  infoBlockStatus: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#D9EBFF',
    alignSelf: 'flex-start',
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 4,
    fontFamily: Fonts[600],
    letterSpacing: -0.4,
    color: '#2F7CD0',
  },
  titleAction: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts[800],
    letterSpacing: -0.1,
    color: colors.blue,
    paddingBottom: 4,
    textTransform: 'uppercase',
  },
  actionBlock: {
    paddingTop: 22,
  },
  mapContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  conversationalChat: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  conversationalChatSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts[600],
    letterSpacing: -0.2,
    color: '#A0A0A5',
  },
  conversationalChatTitle: {
    fontSize: 17,
    lineHeight: 27,
    fontFamily: Fonts[800],
    letterSpacing: -0.2,
    color: '#595959',
  },
  conversationalChatText: {},
  containerScroll: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 80,
    flexGrow: 1,
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#F7F8FB',
    borderRadius: 15,
    padding: 10,
  },
  searchText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.2,
    color: '#969696',
  },
  searchContainer: {
    paddingHorizontal: 7,
    paddingVertical: 11,
  },
  main: {
    display: 'flex',
    gap: 20,
  },
});

export default ObjectAvailableScreen;
