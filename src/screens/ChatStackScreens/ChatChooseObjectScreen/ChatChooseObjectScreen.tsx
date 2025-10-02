import { ObjectItem } from '@/entities/ObjectItem';
import { useGetObjects } from '@/features/listObjects/hook/use-actions';
import { Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import Header from '@/widgets/Header/ui/Header';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


const ChatChooseObjectScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const { bottom } = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [objectList, _] = useGetObjects()
  
    
  const activeList = objectList?.filter((item) => item.object_type === "active")

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const enterUser = (title: string) => {
    navigation.navigate("ChatStack", {screen: "ChatAvailableObject", params: {
      title: title
    }})
  }

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title="Чат"/>
        </SafeAreaView>
        <SafeAreaView style={styles.container} edges={["left", "right"]}>
          <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false} contentContainerStyle={[styles.containerScroll, {paddingBottom: bottom + 130}]}>
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
              {<FlatList
              contentContainerStyle={styles.cards}
              data={activeList}
              scrollEnabled={false}
              keyExtractor={(item) => String(item.id)}
              renderItem={({item}) => {
                return <ObjectItem subtitle={item.city} {...item} onPress={() => enterUser(item.title)}/>
              }}/>}
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
    paddingTop: 10,
    flexGrow: 1,
  },
  listTitle: {
    fontFamily: Fonts[700],
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: "#1C1C1C"
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
  buttons: {
    flexDirection: "row",
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
    borderColor: "#FFF",
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
    display: "flex",
    flexDirection: "column",
    gap: 13,
  },
})

export default ChatChooseObjectScreen;