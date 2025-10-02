import ActionItem from '@/entities/ActionItem';
import TimeText from '@/entities/TimeText';
import { useSetUserActive } from '@/features/auth/hooks/use-actions';
import { useGetCurrentVerification } from '@/features/auth/hooks/use-selectors';
import { useVerificationUser } from '@/features/auth/hooks/use-verification-user';
import { ApiResponse, Icon, IconName, Signal } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { VerificationStackParamList } from '@/shared/types/root_stack.type';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { NfcAnima } from '@/shared/ui/NfcAnima/NfcAnima';
import { PulseSpinner } from '@/shared/ui/PulseSpinner/PulseSpinner';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type VerificationScanRouteProp = RouteProp<
  VerificationStackParamList,
  "VerificationScan"
>;

const statusTitles = {
  idle: "Отсканируйте NFC метку",
  loading: "Найдена метка A",
  received: "Геоверификация пройдена!",
  rejected: "Геоверификация не пройдена!",
} 

const statusNfcTitles = {
  idle: "Отсканируйте NFC метку",
  loading: "Отсканируйте NFC метку",
  received: "Отсканируйте NFC метку",
  rejected: "Нажмите на pulse чтобы повторить",
} 

type Status = "idle" | "loading" | "received" | "rejected"

const VerifiacationScanScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const { params } = useRoute<VerificationScanRouteProp>();
  const [status, setStatus] = useState<Status>("loading");
  const [statusVerify, setStatusVerify] = useState<Status>("idle")
  const [nfcUid, setNfcUid] = useState("")
  const activateStatusUser = useSetUserActive()
  const currentVerification = useGetCurrentVerification()

  useVerificationUser({changeStatusVerification: (statusWrapper) => setStatus(statusWrapper), status: status, handleSaveNfc: (nfc_uid) => {
    setNfcUid(nfc_uid)
  }})

  useEffect(() => {
    if (status === "received"){
      setStatusVerify("loading")
      if (params.object){
        api.post<ApiResponse<{"access_expires_at": string}>>(endpoints.nfc.verify(params.object.id), {
          nfc_uid: nfcUid
        })
        .then((data) => {
          console.log(params.object,  data.data.data.access_expires_at + "data")
          setStatusVerify("received")
          if (params.object){
            activateStatusUser(params.object.id,params.object.title, data.data.data.access_expires_at)
          }
        })
        .catch((error) => {
          console.log(error)
          setStatusVerify("rejected")
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const clearStatus = () => {
    setStatus("loading")
    setStatusVerify("idle")
  }

  const handlePress = () => {
    if (statusVerify === "rejected"){
      clearStatus()
    } else if (status === "received") {
      navigation.navigate("Verifiacation", {screen: "VerificationMain"})
    }
  }

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header onPressLeft={() => navigation.goBack()} IconLeft={<Icon name={IconName.ArrowBack}/>} title="Верификация"/>
        </SafeAreaView>
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{params.object?.title}</Text>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardId}><Text style={styles.cardIdSpan}>ID: </Text>{params.object?.id}</Text>
            </View>
          </View>
          <View style={styles.main}>
            <Text style={[styles.mainTitle, (status === "received" && statusVerify === "loading") && styles.loading]}>{statusVerify === "idle" ? statusNfcTitles[status]: statusTitles[statusVerify]}</Text>
            {(status === "idle" || status === "rejected" || status === "loading") &&
              <Pressable onPress={() => setStatus("loading")} style={styles.nfcContainer}>
                  <NfcAnima/>
              </Pressable>
            }
            {
              status === "received" && statusVerify === "loading" &&
              <View style={styles.spinnerContainer}>
                <PulseSpinner/>
              </View>
            }
            {(statusVerify === "received" || statusVerify === "rejected") && 
              <View>
                <Signal active={statusVerify === "received"}/>
              </View>
            }
          </View>
          <View style={styles.footer}>
            {(statusVerify === "received") && <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Метка А | {params.object?.title}</Text>
              </View>
              <TimeText status={status} date={currentVerification?.access_expires_at ?? ""}/>
            </View>}
            {(statusVerify === "received" || statusVerify === "rejected") && 
              <CustomButton onPress={handlePress} text={statusVerify === "received" ? "Завершить": "Повторить"}/>
            }
            {(status === "idle" || status === "loading" || status === "rejected") && 
              <ActionItem onPress={() => navigation.navigate("Verifiacation", {screen: "VerificationHistory", params: {object: params.object}})} icon={<Icon name={IconName.History}/>} title='История' subtitle='Сведения о сканированных метках'/>
            }
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  footer: {
    gap: 15,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  main: {
    flex: 1,
    paddingTop: 64,
    alignItems: "center",
  },
  loading: {
    maxWidth: 128,
  },
  mainTitle: {
    fontFamily: Fonts[800],
    fontSize: 28,
    lineHeight: 40,
    textAlign: "center",
    maxWidth: 300,
    letterSpacing: -0.4,
  },
  nfcContainer: {
    width: 185,
    height: 185,
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerContainer: {
    width: 127,
    height: 127,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    gap: 3,
    borderRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.04, 
    shadowRadius: 16,
    elevation: 5,
    padding: 14,
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontFamily: Fonts[800],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: '#595959',
  },
  cardSubtitle: {
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 23,
    letterSpacing: -0.2,
    color: '#9FA1A6',
  },
  cardInfo: {
    fontFamily: Fonts[600],
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: -0.2,
    color: '#616161',
  },
  cardId: {
    fontFamily: Fonts[600],
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: -0.2,
    color: '#9FA1A6',
    maxWidth: 109,
  },
  cardIdSpan: {
    fontFamily: Fonts[800],
  },
})

export default VerifiacationScanScreen;