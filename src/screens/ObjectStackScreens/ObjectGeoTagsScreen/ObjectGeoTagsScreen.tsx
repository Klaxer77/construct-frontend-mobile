import { useSetUserActive } from '@/features/auth/hooks/use-actions';
import { useVerificationUser } from '@/features/auth/hooks/use-verification-user';
import { useEditNfcIsObject } from '@/features/listObjects/hook/use-actions';
import { ApiResponse, colors, Icon, IconName, Status } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import {
  ObjectStackParamList,
} from '@/shared/types/root_stack.type';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { NfcAnima } from '@/shared/ui/NfcAnima/NfcAnima';
import { PulseSpinner } from '@/shared/ui/PulseSpinner/PulseSpinner';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type VerificationScanRouteProp = RouteProp<
  ObjectStackParamList,
  'ObjectGeoTags'
>;

const statusTitles = {
  idle: '',
  loading: 'Отсканируйте NFC метку',
  received: 'Найдена метка A',
  rejected: 'Нажмите на pulse чтобы повторить'
};


const ObjectGeoTagsScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const { params } = useRoute<VerificationScanRouteProp>();
  const [status, setStatus] = useState<Status>("idle");
  const [statusAddVerification, setStatusAddVerificatio] = useState<Status>("idle")
  const [nfcUid, setNfcUid] = useState("")
  const editIsNfc = useEditNfcIsObject()
  const activate = useSetUserActive()

  useVerificationUser({changeStatusVerification: (statusWrapper) => setStatus(statusWrapper), status: status, handleSaveNfc: (nfc_uid) => {
    setNfcUid(nfc_uid)
  }})
  const { bottom } = useSafeAreaInsets();

  // useEffect(() => {
  //   if (status === "loading"){
  //     setTimeout(() => {
  //       setStatus("received")
  //     }, 2400)
  //   }
  // }, [status])

  const handleStart = () => {
    setStatus("loading");
  };
  console.log(status)

  const handleUpload = () => {
    setStatusAddVerificatio("loading")
    console.log(nfcUid, params.object.id)
    api.post<ApiResponse<{"access_expires_at": string}>>(endpoints.nfc.add(params.object.id), {
      nfc_uid: nfcUid
    })
    .then((data) => {
      setStatusAddVerificatio("received")
      activate(params.object.id, params.object.title, data.data.data.access_expires_at)
      editIsNfc(params.object.id, true)
      navigation.navigate('ObjectStack', {
      screen: 'ObjectSendWork',
      params: {
        title: params.object.title,
        subtitle: 'Геометки успешно созданы',
        text: 'Объект Активен',
        link: 'ObjectChooseObject',
      },
    });
    })
    .catch((error) => {
      console.log(error)
      setStatus("rejected")
      setStatusAddVerificatio("rejected")
    })
  };

  const handleCancel = () => {
    navigation.navigate('ObjectStack', {
      screen: 'ObjectChooseObject',
    });
  };

  return (
    <>
      <SafeAreaView
        style={[styles.containerMain, { paddingBottom: bottom + 50 }]}
        edges={['top', 'bottom']}
      >
        <SafeAreaView edges={['left', 'right']}>
          <Header
            onPressLeft={() => navigation.goBack()}
            IconLeft={<Icon name={IconName.ArrowBack} />}
            title="Гео метки"
          />
        </SafeAreaView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{params?.object.title}</Text>
            <Text style={styles.subtitle}>Добавление Геометок</Text>
            {(statusAddVerification === "rejected" )&& <Text style={styles.textError}>Метка уже была добавлена на другой обьект</Text>}
          </View>
          <View style={styles.main}>
            <Text
              style={[styles.mainTitle]}
            >
              {statusTitles[status]}
            </Text>
            {status === 'loading' || status === "rejected" ? (
              <Pressable
                onPress={() => {
                  setStatusAddVerificatio("idle")
                  setStatus("loading")
                }}
                style={styles.nfcContainer}
              >
                <NfcAnima />
              </Pressable>
            ) : status === 'idle' ? (
              <View style={styles.firstContainer}>
                <Icon style={styles.icon} name={IconName.PlusMap} />
                <Text style={styles.firstTitle}>Геометки</Text>
                <Text style={styles.desc}>
                  Требуются для подтверждения нахождения на объекте персонала
                  любой роли. Вы можете добавить до 100 меток для 1 объекта.
                  {'\n'}
                  Подготовьте <Text style={styles.span}>NFC</Text> метки любого
                  типа
                </Text>
                <CustomButton
                  onPress={handleStart}
                  styleButtonView={styles.button}
                  text="Начать"
                />
              </View>
            ) : (
              <View
                style={[
                  styles.spinnerContainer,
                  { paddingBottom: bottom + 110 },
                ]}
              >
                <PulseSpinner />
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <View style={styles.footer}>
                    <CustomButton
                      text="Завершить"
                      styleText={[styles.buttonText, { color: '#FF3B30' }]}
                      colorDefault="transparent"
                      colorActive="#FF3B30"
                      textColorDefault="#FF3B30"
                      textColorActive="#FFFFFF"
                      secondary
                      loadingAnima={<PulseSpinner backgroundColorMain='#98caff87' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>} 
                      loading={statusAddVerification === "loading"}
                      styleButtonView={{ flex: 1 }}
                      onPress={handleCancel}
                    />
                    <CustomButton
                      loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>} 
                      text="Добавить"
                      styleText={[styles.buttonText]}
                      loading={statusAddVerification === "loading"}
                      colorDefault="#007AFF"
                      textColorDefault={'#fff'}
                      colorActive="#0059FF"
                      secondary
                      styleButtonView={{ flex: 1 }}
                      onPress={handleUpload}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    width: '100%',
  },
  buttonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
  containerMain: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1,
  },
  main: {
    flex: 1,
    paddingTop: 64,
    alignItems: 'center',
  },
  loading: {
    maxWidth: 128,
  },
  firstContainer: {
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: Fonts[800],
    fontSize: 28,
    lineHeight: 40,
    textAlign: 'center',
    maxWidth: 237,
    letterSpacing: -0.4,
    marginBottom: 50,
  },
  nfcContainer: {
    width: 185,
    height: 185,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTitle: {
    fontFamily: Fonts[700],
    fontSize: 20,
    lineHeight: 30,
    color: '#000000',
    marginBottom: 10,
  },
  desc: {
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 24,
    color: '#A0A0A5',
    marginBottom: 25,
    textAlign: 'center',
    maxWidth: 350,
  },
  span: {
    fontFamily: Fonts[800],
  },
  icon: {
    marginBottom: 10,
  },
  button: {
    width: 170,
  },
  spinnerContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  header: {
    marginBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts[700],
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: Fonts[600],
    color: '#808080',
  },
  textError: {
    fontSize: 14,
    marginTop: 10,
    lineHeight: 18,
    fontFamily: Fonts[700],
    color: colors.warning,
  }
});

export default ObjectGeoTagsScreen;
