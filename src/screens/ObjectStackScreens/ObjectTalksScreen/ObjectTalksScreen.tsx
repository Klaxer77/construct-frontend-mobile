import BotMessage from '@/entities/BotMessage';
import ReceiverMessage from '@/entities/ReceiverMessage';
import { useGetCurrentObject } from '@/features/auth/hooks/use-selectors';
import { Icon, IconName, Status } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import useLocation from '@/shared/hooks/useLocation';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import { buildFormData } from '@/shared/utils/buildForm';
import { isValidDateAllDate } from '@/shared/utils/formatDate';
import { MessageComposer } from '@/widgets';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IMessage {
  time?: string;
  title: string;
  id?: string;
  files? :Asset[];
  subtitle?: string;
  type: string;
  img?: string;
  check?: boolean;
  step?: string;
  numberComment?: number | null;
  buttonMainText?: string;
  buttonSecondaryText?: string;
  buttonMainCallback?: () => void;
  buttonSecondCallback?: () => void;
  status?: 'initial' | 'main' | 'create' | "error";
}

export interface IForm {
  violations: string;
  nameDocument: string;
  files: Asset[] | null;
  date: string;
  comment: string | null;
}

const initialForm: IForm = {
  violations: '',
  nameDocument: '',
  files: null,
  date: '',
  comment: null,
};

type ObjectRouteProp = RouteProp<ObjectStackParamList, 'ObjectTalks'>;


const ObjectTalksScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const { params } = useRoute<ObjectRouteProp>();
  const {location, error} = useLocation()

  const handleStartViolent = () => {
    setMessages(prev => [
      ...prev,
      {
        time: getCurrentTime(),
        title: 'Создать новый документ',
        id: nanoid(),
        type: 'recieved',
        read: true,
      },
    ]);
    setTimeout(() => {
      setStep('violations');
    }, 400);
  };

  const handleStepNoPhoto = () => {
    setMessages(prev => [
      ...prev,
      {
        time: getCurrentTime(),
        title: 'Без фото',
        id: nanoid(),
        type: 'recieved',
        read: true,
      },
    ]);
    setTimeout(() => {
      setStep('date');
    }, 400);
  };

  const handleCreateForm = () => {
    setForms(prevState => {
      return [...prevState, form];
    });
    setStep('violations');
  };

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [form, setForm] = useState(initialForm);
  const [forms, setForms] = useState<IForm[]>([]);
  const [step, setStep] = useState<typeStep>('start');
  const [status, setStatus] = useState<Status>("idle")
  const currentObject = useGetCurrentObject()
  type typeStep = keyof typeof steps;


  const handleSendForm = () => {
    const formData = buildFormData([...forms, form]);
    setStatus("loading")

    const endpoint = params.header === "замечание" ? endpoints.remarks.create(currentObject?.id ?? ""): endpoints.violations.create(currentObject?.id ?? "")

    api.post(
      endpoint,
      formData,
      {
        headers: {
          latitude: location?.coords.latitude.toString(),
          longitude: location?.coords.longitude.toString(),
          Accept: "application/json",
        },
      }
    ).then(() => {
      setStep('success');
      setStatus("received")
      setForms([]);
      setTimeout(() => {
        setStep('start');
      }, 400);
      
    }).catch((errorFetch) => {
      console.log(errorFetch)
      setStatus("rejected")
      setMessages(prev => [...prev, { id: nanoid(), ...steps.errorDateFetch }]);
    })
  };

  const handleStepComment = () => {
    setMessages(prev => [
      ...prev,
      {
        time: getCurrentTime(),
        title: 'Не требуется',
        id: nanoid(),
        type: 'recieved',
        read: true,
      },
    ]);
    setTimeout(() => {
      setStep('end');
    }, 400);
  };

  useEffect(() => {
    if (error){
      setMessages(prev => [...prev, { id: nanoid(), ...steps.errorGeo }]);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: nanoid(), ...steps[step] }]);
      }, 400);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, error]);


  const steps: { [key in string]: IMessage } = {
    start: {
      title: 'Отправить отчет',
      type: 'bot',
      subtitle: 'Выберите действие',
      status: 'initial',
      step: 'start',
      buttonMainText: 'Создать новый документ',
      buttonMainCallback: handleStartViolent,
    },
    violations: {
      numberComment: forms.length + 1,
      title: currentObject?.title ?? "",
      type: 'bot',
      step: 'violations',
      subtitle: 'Введите перечень выявленных нарушений',
      buttonMainText: 'Отмена',
      buttonMainCallback: () => setStep('start'),
      status: 'main',
    },
    nameDocument: {
      numberComment: forms.length + 1,
      title: currentObject?.title ?? "",
      type: 'bot',
      step: 'nameDocument',
      subtitle: 'Наименование нормативного документа, требования проекта (РД)',
      status: 'main',
    },
    files: {
      numberComment: forms.length + 1,
      title: currentObject?.title ?? "",
      type: 'bot',
      subtitle: 'Фотоматериал (Отправьте до 6 файлов)',
      status: 'main',
      step: 'files',
      buttonMainText: 'Без фото',
      buttonMainCallback: handleStepNoPhoto,
    },
    date: {
      numberComment: forms.length + 1,
      title: currentObject?.title ?? "",
      type: 'bot',
      step: 'date',
      subtitle: 'Введите срок устранения (дн.мс.гд)',
      status: 'main',
    },
    comment: {
      numberComment: forms.length + 1,
      title: currentObject?.title ?? "",
      type: 'bot',
      step: 'comment',
      subtitle: 'Введите комментарий',
      buttonMainText: 'Не требуется',
      buttonMainCallback: handleStepComment,
      status: 'main',
    },
    end: {
      numberComment: forms.length + 1,
      title: currentObject?.title ?? "",
      type: 'bot',
      step: 'end',
      subtitle: 'Запись сохраненна',
      status: 'main',
      buttonMainText: 'Завершить',
      buttonSecondaryText: 'Добавить ещё',
      buttonMainCallback: handleSendForm,
      buttonSecondCallback: handleCreateForm,
    },
    success: {
      numberComment: null,
      title: currentObject?.title ?? "",
      type: 'bot',
      step: 'success',
      subtitle: 'Спасибо, мы получили ваши данные',
      status: 'create',
    },
    errorGeo: {
      title: "Дайте разрешение на получение gps",
      type: 'bot',
      step: 'error',
      subtitle: 'Ошибка при получение gps',
      status: 'error',
    },
    errorDate: {
      title: "Введите коррекнтую дату",
      type: 'bot',
      step: 'error',
      subtitle: 'Не валидная дата',
      status: 'error',
    },
    errorDateFetch: {
      title: "Убедитесь что вы находитесь на обьекте",
      type: 'bot',
      step: 'error',
      subtitle: 'Вы не подходите по геолокации',
      status: 'error',
    },
  };

  const sendMessageFile = (files: Asset[]) => {
    setForm((prevState) => {
      return {
        ...prevState,
        files: files
      }
    })

    setMessages(prev => [
        ...prev,
      {
        time: getCurrentTime(),
        title: "Фотографии",
        files: files,
        id: nanoid(),
        type: 'recieved',
        read: true,
      },
    ]);
    setStep("date")
    
  }

  const sendMessage = (value: string) => {
    if (value.trim() === '') return;
    const nextStep = {
      violations: 'nameDocument',
      nameDocument: 'files',
      date: 'comment',
      comment: 'end',
    };
   
      if (step in nextStep) {
        if ((step === "date" && isValidDateAllDate(value)) || step !== "date"){
          setForm(prevState => {
            return {
              ...prevState,
              [step]: value,
            };
          });
        }
        setMessages(prev => [
          ...prev,
          {
            time: getCurrentTime(),
            title: value,
            id: nanoid(),
            type: 'recieved',
            read: true,
          },
        ]);
        
        if (step === "date" && !isValidDateAllDate(value)){
          setMessages(prev => [...prev, { id: nanoid(), ...steps.errorDate }]);
        } else {
          setStep(nextStep[step as keyof typeof nextStep]);
        }
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <>
      <ImageBackground
        source={require('@/shared/assets/images/BackImg.png')}
        style={styles.containerMain}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          style={styles.containerSecondary}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.containerMain}>
            <SafeAreaView
              style={styles.safeContainer}
              edges={['left', 'right', 'top']}
            >
              <Header
                style={styles.header}
                IconRigth={<Icon name={IconName.Settings} />}
                IconLeft={<Icon name={IconName.ArrowBack} />}
                onPressLeft={() => navigation.goBack()}
                title="Чат"
              >
                <View style={styles.headerContainer}>
                  <View style={styles.headerText}>
                    <Text style={styles.headerTitle}>
                      Внести {params.header}
                    </Text>
                    <Text style={styles.headerSubtitle}>{error ? "Не доступен" :"Доступен"}</Text>
                  </View>
                </View>
              </Header>
            </SafeAreaView>
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
              <View style={styles.containerSecondary}>
                <FlatList
                  data={[...messages].reverse()}
                  inverted
                  keyExtractor={(item, index) =>
                    item.id ? item.id : String(index)
                  }
                  renderItem={({ item }) => {
                    return item.type === 'bot' ? (
                      <BotMessage loading={status === "loading" && item.step === step} disable={(item.step !== step || !!error)} {...item} />
                    ) : (
                      <ReceiverMessage {...item} />
                    );
                  }}
                  contentContainerStyle={styles.containerListMessage}
                />
                <SafeAreaView style={styles.safeContainer} edges={['bottom']}>
                  <View style={styles.containerInput}>
                    <MessageComposer activeSendFile={step === "files"} sendFile={sendMessageFile} sendMessage={sendMessage} />
                  </View>
                </SafeAreaView>
              </View>
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },

  containerSecondary: {
    flex: 1,
    position: 'relative',
  },
  backContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingLeft: 10,
  },
  safeContainer: {
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.01,
    shadowRadius: 28,
    elevation: 3,
  },
  headerText: {},
  headerTitle: {
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.2,
    fontFamily: Fonts[800],
    color: '#595959',
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
    color: '#A0A0A5',
  },
  container: {
    flex: 1,
  },
  backImg: {
    position: 'absolute',
    top: -20,
    left: -20,
    width: 500,
    zIndex: -1,
    height: 800,
  },
  containerListMessage: {
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 46,
  },
  containerInput: {
    paddingVertical: 16,
    paddingTop: 14,
    paddingBottom: 4,
    height: 52,
    paddingHorizontal: 14,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default ObjectTalksScreen;
