import { ObjectItem } from '@/entities/ObjectItem';
import { useEnterObject } from '@/features/auth/hooks/use-actions';
import { useCompanyAuth, useUserAuth } from '@/features/auth/hooks/use-selectors';
import { useAddFileToObject, useGetObjects, useRemoveFile, useSendFileActivate } from '@/features/listObjects/hook/use-actions';
import { useStatusListObjects } from '@/features/listObjects/hook/use-selectors';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { IObject } from '@/shared/types/object';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { FileContainer } from '@/shared/ui/FileContainer/FileContainer';
import { PulseSpinner } from '@/shared/ui/PulseSpinner/PulseSpinner';
import { TabWradder } from '@/shared/ui/TabWradder/ui/TabWradder';
import { EmpryList } from '@/widgets/EmptyList/EmptyList';
import Header from '@/widgets/Header/ui/Header';
import PopupSendFile from '@/widgets/SendFiles/PopupSendFile';
import { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const ObjectChooseScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const [activeTab, setActiveTab] = useState('Активные');
  const { bottom } = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [popupVisible, setPopupVisible] = useState({
    visible: false,
    currentItem: "",
  });
  const statusObjects = useStatusListObjects()
  const addFileObject = useAddFileToObject()
  const deleteFile = useRemoveFile()
  const company = useCompanyAuth()
  const user = useUserAuth()
  const sendFileAkt = useSendFileActivate()
  const [objectList, getAll] = useGetObjects()
  const {activateUser, status} = useEnterObject()
  // const currentObjectStore = useGetCurrentObject()
  const activeList = objectList?.filter((item) => item.object_type === "active")
  const unActiveList = objectList?.filter((item) => item.object_type === "not_active")
  const actOpenningList = objectList?.filter((item) => item.object_type === "act_opening")
  const agreementList = objectList?.filter((item) => item.object_type === "agreement")
  
  useEffect(() => {
    if (company){
      getAll(company?.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const enterUser = (object: IObject) => {
    activateUser(object)
  }

  useEffect(() => {
    if (status === "received"){
      navigation.navigate("ObjectStack", {screen: "ObjectAvailableObject", params: {}})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const handleChange = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (statusObjects === "received" || statusObjects === "rejected"){
      setRefreshing(false);
    }
  }, [statusObjects])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (company){
      getAll(company?.id)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePressUnactive = (object: IObject) => {

    navigation.navigate('ObjectStack', {
      screen: 'ObjectContractor',
      params: {
        object: object,
      },
    });
  };

  const handlePressAgreement = (object: IObject) => {
    navigation.navigate('ObjectStack', {
      screen: 'ObjectActivation',
      params: {
        object: object,
      },
    });
  }

  const handlePressButtonReq = (currentId: string) => {
    setPopupVisible(() => {
      return { visible: true, currentItem: currentId };
    });
  };

  const handleSelectFile = (file: Asset) => {
    addFileObject({objectId: popupVisible.currentItem, file: file})
  };

  const handleDeleteFile = (currentId: string) => {
    deleteFile(currentId)
  };

  const handleAddGeo = (object: IObject) => {
   navigation.navigate('ObjectStack', {
      screen: 'ObjectGeoTags',
      params: {
        object: object,
      },
    });
  }

  const handleSendAkt = (request: {objectId: string, updload_file: Asset}) => {
    sendFileAkt(request)
  };

  const listTabs = user?.role === "contractor" ? ['Активные']: user?.role === "inspection" ? ['Активные', 'Неактивные']: ['Активные', 'Неактивные', 'Требуются Геометки']
  
  return (
    <>
      <PopupSendFile
        onSelectFile={handleSelectFile}
        isVisible={popupVisible.visible}
        onClose={() =>
          setPopupVisible(prevState => {
            return { visible: false, currentItem: prevState.currentItem };
          })
        }
      />
      <SafeAreaView style={styles.containerMain} edges={['top', 'bottom']}>
        <SafeAreaView edges={['left', 'right']}>
          <Header title="Объекты" />
        </SafeAreaView>
        <SafeAreaView edges={['left', 'right']}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.containerScroll,
              { paddingBottom: bottom + 150 },
            ]}
          >
            <View style={styles.main}>
              <View style={styles.mainText}>
                <Text style={styles.title}>Выберите объект</Text>
                <Text style={styles.subtitle}>
                  Откройте нужный объект, с которым планируете работать
                </Text>
              </View>
              <TabWradder
                onChange={handleChange}
                initialActive="Активные"
                list={listTabs}
              />
              <View style={styles.cardsContainer}>
                {activeTab === 'Активные' && (
                  <FlatList
                    contentContainerStyle={styles.cards}
                    data={activeList}
                    scrollEnabled={false}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<EmpryList />}
                    renderItem={({ item }) => {
                      return (
                        <ObjectItem
                          loading={status === "loading"}
                          title={item.title}
                          subtitle={item.general_info}
                          onPress={() => enterUser(item)
                          }
                        />
                      );
                    }}
                  />
                )}
                {activeTab === 'Требуются Геометки' && user?.role === "construction_control" && (
                  <FlatList
                    contentContainerStyle={styles.cards}
                    data={activeList}
                    scrollEnabled={false}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<EmpryList />}
                    renderItem={({ item }) => {
                      return (
                        <ObjectItem
                          rigthElement={
                            <CustomButton
                              loadingAnima={
                                <PulseSpinner size={5} offset={7.5} />
                              }
                              loading={item.loading}
                              styleText={styles.buttonActiveText}
                              secondary
                              styleButton={styles.buttonActivate}
                              onPress={() => handleAddGeo(item)}
                              text="Добавить"
                            />
                          }
                          title={item.title}
                          subtitle={item.general_info}
                          onPress={() => {}
                          }
                        />
                      );
                    }}
                  />
                )}
                {activeTab === 'Неактивные' && (
                  <FlatList
                    contentContainerStyle={styles.cards}
                    data={unActiveList}
                    scrollEnabled={false}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<EmpryList />}
                    renderItem={({ item }) => {
                      return (
                        <ObjectItem
                          rigthElement={
                            user?.role === "construction_control" && <CustomButton
                              loadingAnima={
                                <PulseSpinner size={5} offset={7.5} />
                              }
                              styleText={styles.buttonActiveText}
                              secondary
                              styleButton={styles.buttonActivate}
                              onPress={() =>
                                handlePressUnactive(item)
                              }
                              text="Активировать"
                            />
                          }
                          title={item.title}
                          subtitle={item.general_info}
                          onPress={() => {}}
                        />
                      );
                    }}
                  />
                )}
                {activeTab === 'Неактивные' && (
                  <Text style={styles.listTitle}>На согласовании</Text>
                )}
                {activeTab === 'Неактивные' && (
                  <FlatList
                    contentContainerStyle={styles.cards}
                    data={agreementList}
                    scrollEnabled={false}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<EmpryList />}
                    renderItem={({ item }) => {
                      return <ObjectItem title={item.title}
                        rigthElement={
                            user?.role === "inspection" && <CustomButton
                              loadingAnima={
                                <PulseSpinner size={5} offset={7.5} />
                              }
                              styleText={styles.buttonActiveText}
                              secondary
                              styleButton={styles.buttonActivate}
                              onPress={() =>
                                handlePressAgreement(item)
                              }
                              text="Просмотреть"
                            />
                          }
                        subtitle={item.general_info} onPress={() => {}} />;
                    }}
                  />
                )}
                {activeTab === 'Неактивные' && (
                  <Text style={styles.listTitle}>Требуется акт открытия</Text>
                )}
                {activeTab === 'Неактивные' && (
                  <FlatList
                    contentContainerStyle={styles.cards}
                    data={actOpenningList}
                    scrollEnabled={false}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<EmpryList />}
                    renderItem={({ item }) => {
                      return (
                        <ObjectItem
                          rigthElement={
                              user?.role === "construction_control" && <CustomButton
                                loading={item.loading}
                                loadingAnima={
                                  <PulseSpinner
                                    backgroundColorMain="#98C9FF"
                                    backgroundColorSecondary="#FFFFFF"
                                    size={5}
                                    offset={7.5}
                                  />
                                }
                                styleText={styles.buttonActiveText}
                                secondary={!item.file}
                                styleButton={[
                                  styles.buttonActivate,
                                  styles.buttonSend,
                                ]}
                                onPress={() => {
                                  item.file
                                    ? handleSendAkt({objectId: item.id, updload_file: item.file})
                                    : handlePressButtonReq(item.id);
                                }}
                                text="Отправить"
                              />
                          }
                          bottomElement={
                            <>
                              {item.file?.fileName && (
                                <FileContainer
                                  fileName={item.file.fileName}
                                  onDelete={() => handleDeleteFile(item.id)}
                                />
                              )}
                            </>
                          }
                          title={item.title}
                          subtitle={item.general_info} 
                          onPress={() => {}}
                        />
                      );
                    }}
                  />
                )}
              </View>
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
  containerScroll: {
    display: 'flex',
    paddingTop: 10,
    flexGrow: 1,
  },
  listTitle: {
    fontFamily: Fonts[700],
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: '#1C1C1C',
  },
  main: {
    display: 'flex',
    gap: 20,
  },
  mainText: {
    paddingHorizontal: 25,
    display: 'flex',
    gap: 10,
    paddingTop: 20,
  },
  title: {
    fontFamily: Fonts[700],
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.4,
    color: 'black',
  },
  subtitle: {
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#808080',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 15,
    paddingHorizontal: 14,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 23,
    letterSpacing: -0.2,
  },
  buttonActivate: {
    borderRadius: 8,
    padding: 10,
    width: 113,
    height: 35,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.54,
    },
    shadowOpacity: 0.06,
    shadowRadius: 0.54,
    elevation: 1,
  },
  buttonSend: {
    width: 92,
  },
  buttonActiveText: {
    fontFamily: Fonts[700],
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: -0.4,
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 13,
  },
  cardsContainer: {
    paddingHorizontal: 25,
    gap: 20,
  },
});

export default ObjectChooseScreen;
