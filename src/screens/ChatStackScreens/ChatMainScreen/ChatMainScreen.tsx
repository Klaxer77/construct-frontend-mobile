import { useClearCurrentObject } from '@/features/auth/hooks/use-actions';
import { useGetCurrentObject, useUserAuth } from '@/features/auth/hooks/use-selectors';
import { colors } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import Header from '@/widgets/Header/ui/Header';
import PopupChooseObject from '@/widgets/PopupChooseObject/PopupChooseObject';
import { useState } from 'react';
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const data = [
  {
    id: '1',
    title: 'Разговорный чат',
    subtitle: 'Проспект Мира, 164 | Москва',
  },
];

const ChatMainScreen: React.FC = () => {
  const {left, right} = useSafeAreaInsets();
  const navigation = useTypeNavigation();
  const [viewPopup, setViewPopup] = useState(false)
  const currentObjectStore = useGetCurrentObject()
  const clearCurrentObject = useClearCurrentObject();
  const user = useUserAuth()

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header onPressLeft={() => setViewPopup(true)} title="Чат"/>
        </SafeAreaView>
        <PopupChooseObject fio={user?.fio ?? ""} role={user?.role ?? ""} check={false} onPress={clearCurrentObject} subtitle={currentObjectStore?.city ?? ""} title={currentObjectStore?.title ?? ""} isVisible={viewPopup} onClose={() => setViewPopup(false)}/>
        <ScrollView contentContainerStyle={styles.containerScroll}>
          <SafeAreaView edges={["left", "right"]} style={styles.container}>
            <Text style={styles.title}>Действия</Text>
            <View style={styles.actions}>
              {Platform.OS === "ios" && <View style={styles.shadow}/>}
              <Pressable onPress={() => navigation.navigate('ChatStack', { screen: 'ChatChooseObject' })} style={styles.pressable}>
                <Text style={styles.pressableTitle}>Выбрать объект</Text>
                <Text style={styles.pressableSubtitle}>Для работы на новом месте</Text>
              </Pressable>
              <Pressable style={styles.pressable}>
                <Text style={styles.pressableTitle}>Запросить доступ к объекту</Text>
                <Text style={styles.pressableSubtitle}>Для работы на новом месте</Text>
              </Pressable>
            </View>
          </SafeAreaView>
          <View>
            <SafeAreaView edges={["left", "right"]} style={styles.footer}>
              <Text style={styles.footerText}>Подробнее: </Text>
            </SafeAreaView>
            <FlatList
              horizontal
              data={data}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.listJournal,
                { paddingLeft: left+16, paddingRight: right+16 },
              ]}
              renderItem={({ item }) => (
                <Pressable style={[styles.pressable, styles.pressableSecondary]}>
                  <Text style={[styles.pressableTitle, styles.pressableTitleSecondary]}>{item.title}</Text>
                  <Text style={styles.pressableSubtitle}>{item.subtitle}</Text>
                </Pressable>
              )}
            />
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
  listJournal: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    paddingBottom: 20,
  },
  actions: {
    display: "flex",
    gap: 6,
    position: "relative",
  },
  pressableSecondary: {
    backgroundColor: "#F7F7F8",
    elevation: 0,
    shadowColor: "white",
  },
  pressableTitleSecondary: {
    marginRight: 0,
  },
  pressable: {
    display: "flex",
    gap: 6,
    shadowColor: '#000',
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0 },
    padding: 14,
    borderRadius: 15,
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 4,
    alignSelf: 'flex-start'
  },
  title: {
    fontFamily: Fonts[700],
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.4,
    color: "#474747",
  },
  pressableTitle: {
    fontFamily: Fonts[800],
    fontSize: 14,
    lineHeight: 18,
    marginRight: 23,
    letterSpacing: -0.2,
    color: "#595959",
  },
  pressableSubtitle: {
    fontFamily: Fonts[600],
    fontSize: 12,
    lineHeight: 18,
    letterSpacing: -0.2,
    color: '#616161',
  },
  container: {
    display: "flex",
    gap: 15,
    paddingLeft: 25,
  },
  shadow: {
    position: "absolute",
    width: 200,
    zIndex: -1,
    height: 200,
    top: -350,
    left: 50,
    backgroundColor: "white",
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 310 },
    shadowOpacity: 0.2,
    shadowRadius: 60,
    elevation: 6,
  },
  footer: {
    paddingRight: 16,
    paddingLeft: 27,
  },
  footerText: {
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#808080',
    paddingVertical: 12,
  },  
  containerScroll: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    paddingTop: 136,
    paddingBottom: 80,
    flexGrow: 1,
  },
})

export default ChatMainScreen;