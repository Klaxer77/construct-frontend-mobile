import { useClearCurrentObject } from '@/features/auth/hooks/use-actions';
import { useUserAuth } from '@/features/auth/hooks/use-selectors';
import { ChatStackParamList, colors, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import Header from '@/widgets/Header/ui/Header';
import PopupChooseObject from '@/widgets/PopupChooseObject/PopupChooseObject';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ObjectRouteProp = RouteProp<ChatStackParamList, "ChatAvailableObject">;

const ChatAvailableScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const [viewPopup, setViewPopup] = useState(false)
  const user = useUserAuth()
  const { params } = useRoute<ObjectRouteProp>();

  const clearCurrentObject = useClearCurrentObject()
  
  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <PopupChooseObject check onPress={() => {
          clearCurrentObject() 
          navigation.navigate("ObjectStack", {screen: "ObjectChooseObject"})
        }} title={params?.title ?? ""} subtitle={""} fio={user?.fio ?? ""} role={user?.role ?? ""}  isVisible={viewPopup} onClose={() => setViewPopup(false)}/>
        <SafeAreaView edges={["left", "right"]}>
          <Header onPressLeft={() => setViewPopup(true)} title={params?.title ?? ""}/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchContainer}>
              <View style={styles.search}>
                <Icon name={IconName.Search}/>
                <Text style={styles.searchText}>Поиск</Text>
              </View>
            </View>
            <Pressable onPress={() => navigation.navigate("ChatStack", {screen: "ChatTalks"})} style={styles.conversationalChat}>
              <Icon width={40} height={40} name={IconName.Logo}/>
              <View style={styles.conversationalChatText}>
                <Text style={styles.conversationalChatTitle}>Разговорный чат</Text>
                <Text style={styles.conversationalChatSubtitle}>Мастер (В. Липин): Когда приедет бетон?</Text>
              </View>
            </Pressable>
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
    borderTopColor: "#E8E8E8",
    paddingHorizontal: 20,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
  },
  container: {
    paddingHorizontal: 18,
    gap: 10,
    paddingTop: 11,
  },
  wrapper: {
    paddingHorizontal: 20,
  },
  map: {
    height: 210,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  wrapperMap: {
    paddingHorizontal: 20,
  },
  mapText: {
    fontSize: 18,
    lineHeight: 28,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FFF",
    borderRadius: 5,
    alignSelf: "flex-start",
    fontFamily: Fonts[700],
    letterSpacing: -0.4,
    color: "#121212",
  },
  link: {
    backgroundColor: '#FFF',
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    right: 20,
    alignSelf: "flex-start",
  },
  infoBlock: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    flex: 1,
    gap: 8,
    borderColor: "rgba(236, 236, 236, 0.4)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    
    shadowOpacity: 0.03,
    shadowRadius: 9.7,
    elevation: 3,
  },
  infoBlockWrapper: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  secondaryInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoBlocks: { 
    flexDirection: "row",
    gap: 10,
  },
  infoBlockTitle: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts[700],
    maxWidth: 133,
    letterSpacing: -0.4,
    color: "#121212",
  },
  infoBlockStatus: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#D9EBFF",
    alignSelf: "flex-start",
    fontSize: 16,
    lineHeight: 24,
    borderRadius: 4,
    fontFamily: Fonts[600],
    letterSpacing: -0.4,
    color: "#2F7CD0",
  },
  titleAction: { 
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts[800],
    letterSpacing: -0.1,
    color: colors.blue,
    paddingBottom: 4,
    textTransform: "uppercase",
  },
  actionBlock: {
    paddingTop: 22,
  },
  mapContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  },
  conversationalChat: {
    display: 'flex',
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    paddingVertical: 12,
    
  },
  conversationalChatSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts[600],
    letterSpacing: -0.2,
    color: "#A0A0A5",
  },
  conversationalChatTitle: {
    fontSize: 17,
    lineHeight: 27,
    fontFamily: Fonts[800],
    letterSpacing: -0.2,
    color: "#595959",
  },
  conversationalChatText: {
    
  },
  containerScroll: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    paddingTop: 10,
    paddingBottom: 80,
    flexGrow: 1,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F7F8FB",
    borderRadius: 15,
    padding: 10,
  },
  searchText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.2,
    color: "#969696",
  },
  searchContainer: {
    paddingHorizontal: 7,
    paddingVertical: 11,
  },
  main: {
    display: "flex",
    gap: 20,
  },  
})

export default ChatAvailableScreen;