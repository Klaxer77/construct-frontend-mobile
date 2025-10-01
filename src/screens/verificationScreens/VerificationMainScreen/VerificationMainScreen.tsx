import ActionItem from '@/entities/ActionItem';
import { VerifiacationStatus } from '@/entities/VerificationStatus';
import { useSetUserActive } from '@/features/auth/hooks/use-actions';
import { useGetCurrentVerification, useUserAuth } from '@/features/auth/hooks/use-selectors';
import { colors, Icon, IconName, Signal, Status } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import Header from '@/widgets/Header/ui/Header';
import { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const data = [
  {
    id: '1',
    title: 'Выбрать объект',
    subtitle: 'Для проходения верификации',
    icon: <Icon name={IconName.File}/>,
    link: "VerificationChooseObject",
  },
  {
    id: '2',
    title: 'История',
    subtitle: 'Сканирования меток',
    icon: <Icon name={IconName.History}/>,
    link: "VerificationHistory",
  },
  {
    id: '3',
    title: 'Метки',
    subtitle: 'Список всех меток',
    icon: <Icon name={IconName.History}/>,
    link: "VerificationHistory",
  },
];

const VerificationMainScreen: React.FC = () => {
  const {left, right} = useSafeAreaInsets();
  const navigation = useTypeNavigation();
  const user = useUserAuth()
  const [status, setStatus] = useState<Status>("idle")
  const setUserActivate = useSetUserActive()
  const currentVerification = useGetCurrentVerification()
  const {bottom} = useSafeAreaInsets()
  const endSessionUser = () => {
    setStatus("loading")
    if (currentVerification){
      api.post(endpoints.nfc.falsification(currentVerification?.object_id))
      .then(() => {
        setUserActivate(currentVerification.object_id, "", "", true)
        setStatus("received")
      })
      .catch((error) => {
        console.log(error)
        setStatus("rejected")
      })

    }
  }
  
  const handlePress = (id: string) => {
    if (id === "1"){
        navigation.navigate("Verifiacation", {screen: "VerificationChooseObject"})

      } else if(id === "2") {
        navigation.navigate("Verifiacation", {screen: "VerificationHistory"})
    } else if (id === "3" && currentVerification){
      navigation.navigate("Verifiacation", {screen: 'VerificationNfcListScreen', params: {object: currentVerification}})
    }
  }
  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header title="Верификация"/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.containerScroll, {paddingBottom: bottom + 80}]}>
          <SafeAreaView edges={["left", "right"]} style={styles.container}>
            <Text style={styles.title}>Геоверификация</Text>
            <Text style={styles.subtitle}>Требуется для подтверждени вашего нахождения на объекте, и открытию доступа к журналам работ</Text>
            <View>
              <VerifiacationStatus onPress={() => endSessionUser()} statusFetch={status} subtitle='Оставшееся время: ' endISO={currentVerification?.access_expires_at} title={`${currentVerification?.name ?? ""} ID: ${currentVerification?.object_id}`} status={currentVerification?.is_active ?? false}/>
            </View>
            <View style={styles.signal}>
              <Signal active={currentVerification?.is_active ?? false}/>
            </View>
          </SafeAreaView>
          <View>
            <SafeAreaView edges={["left", "right"]} style={styles.footer}>
              <Text style={styles.footerText}>Действия</Text>
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
              renderItem={({ item, index }) => (
                <>
                {(user?.role === "construction_control" && index === 2 && currentVerification) &&  <ActionItem onPress={() => handlePress(item.id)}  {...item}/>}
                {(!(currentVerification?.is_active && index === 0) && index !== 2) &&  <ActionItem onPress={() => handlePress(item.id)}  {...item}/>}
                </>
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
    color: "#000000",
  },
  subtitle: {
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: "#808080",
    maxWidth: 318,
  },
  signal: {
    position: "absolute",
    right: 0,
    top: -20,
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
    paddingVertical: 20,
    position: "relative",
    paddingLeft: 25,
    paddingRight: 25,
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
    fontFamily: Fonts[700],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#707070',
    paddingVertical: 12,
  },  
  containerScroll: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    paddingTop: 100,
    flexGrow: 1,
  },
})

export default VerificationMainScreen;