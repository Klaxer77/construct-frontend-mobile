import { ApiResponse, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import { TabWradder } from '@/shared/ui/TabWradder/ui/TabWradder';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import MainBlock from './MainBlock';
import ParamsBlock, { ParamAnswer } from './ParamsBlock';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { formatISOToDate } from '@/shared/utils/formatDate';
import { useActivateCheckList, useChangeActStatus } from '@/features/listObjects/hook/use-actions';
import { useGetActionChangeAct, useStatusChangeAct, useStatusCheckList } from '@/features/listObjects/hook/use-selectors';
import { PulseSpinner } from '@/shared/ui/PulseSpinner/PulseSpinner';
import { useUserAuth } from '@/features/auth/hooks/use-selectors';
import { CheckListData } from '@/shared/types/checkList';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';

type ObjectContractorRouteProp = RouteProp<
  ObjectStackParamList,
  'ObjectActivation'
>;

const translate = {
  "Да": "yes",
  "Нет": "no",
  "Не требуется": "not_required",
};

const translateBack = {
  yes: "Да",
  no: "Нет",
  not_required: "Не требуется",
} as const;

interface IFormData {
  object: string,
  contractor: string,
  region: string,
  data: string,
  documents: ParamAnswer[]
}


const ObjectActivationScreen: React.FC = () => {
  const { params } = useRoute<ObjectContractorRouteProp>();
  const [paramAnswers, setParamAnswers] = useState<ParamAnswer[]>([]);
  const navigation = useTypeNavigation();
  const { bottom } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Главная');
  const activateObject = useActivateCheckList()
  const statusCheckList = useStatusCheckList();
  const statusActChange = useStatusChangeAct()
  const changeStatusObject = useChangeActStatus()
  const actiion = useGetActionChangeAct()
  const user = useUserAuth()
  const [formData, setForm] = useState<IFormData>();
  
  useEffect(() => {
    if (user?.role === "construction_control"){
      setForm({...formDataInit, documents: []})
    } else if (user?.role === "inspection"){
      api.get<ApiResponse<CheckListData>>(endpoints.objects.getCheckList(params.object?.id ?? ""))
      .then((data) => {
        setForm(() => {
          return {
            ...formDataInit,
            contractor: "Подрядчик name будет",
            documents: data.data.data.documents.map(({ code, ...item }) => {
              return {
                ...item,
                id: code,
                status: translateBack[item.status],
              };
            })
          }
        })
      })
      .catch((error) => {
        console.log(error)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formDataInit = {
    object: params.object?.title ?? '',
    contractor: params.contractor?.fio ?? '',
    region: params.object?.city ?? '',
    data: formatISOToDate(new Date().toISOString()),
  }

  useEffect(() => {
    if (statusActChange === "received"){
      navigation.navigate('ObjectStack', {
      screen: 'ObjectSendWork',
      params: {
        title: formData ? formData.object: "",
        subtitle: actiion === "accept" ? 'Чек-лист подтвержден': 'Чек-лист отклонен',
        text: 'Смотри за статусом в разделе “Требуется акт открытия',
        link: 'ObjectChooseObject',
      },
    });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusActChange])

  useEffect(() => {
    if (statusCheckList === "received"){
      navigation.navigate('ObjectStack', {
      screen: 'ObjectSendWork',
      params: {
        title: formData ? formData.object: "",
        subtitle: 'Чек - лист отправлен на согласование инспекции',
        text: 'Смотри за статусом в разделе “На согласовании”',
        link: 'ObjectChooseObject', 
      },
    });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCheckList])

  const handleNext = (action?: "accept" | "deny") => {
    if (user?.role === "construction_control"){
      activateObject({
        checkList: {
          contractor_id: params.contractor?.id ?  params.contractor?.id: "",
          date_verification: new Date().toISOString(),
          act_docx: paramAnswers.map((item) => {
            return {
              ...item,
              code: item.id,
              status: translate[item.status as keyof typeof translate] as "yes" | "no" | "not_required"
            }
          })
        },
        objectId: params.object?.id ? params.object?.id: "" 
      })
    } else if (user?.role === "inspection" && action) {
      changeStatusObject({objectId: params.object?.id ?? "", action: action})
    }
  };

  const handleCancel = () => {
    navigation.navigate('ObjectStack', { screen: 'ObjectChooseObject' });
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <SafeAreaView edges={['left', 'right']}>
        <Header
          IconLeft={<Icon name={IconName.ArrowBack} />}
          onPressLeft={() => navigation.goBack()}
          title={'Активация'}
        />
      </SafeAreaView>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={[styles.containerScroll, { paddingBottom: bottom + 120 }]}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>{params?.object?.title}</Text>
              <Text style={styles.subtitle}>
                Заполните чек лист для активации объекта
              </Text>
            </View>
            <View style={{ height: 40 }}>
              <TabWradder
                onChange={setActiveTab}
                list={['Главная', 'Параметры']}
              />
            </View>
            {activeTab === 'Главная' ? (
              <MainBlock
                object={formData?.object}
                contractor={formData?.contractor}
                region={formData?.region}
                data={formData?.data}
              />
            ) : (
              <ParamsBlock initialState={formData?.documents} readonly={user?.role === "inspection"}  onAnswersChange={setParamAnswers}/>
            )} 
          </View>
          <View style={styles.footer}>
            <CustomButton
              text="Отмена"
              styleText={[styles.buttonText, { color: '#FF3B30' }]}
              colorDefault="transparent"
              colorActive="#FF3B30"
              textColorDefault="#FF3B30"
              textColorActive="#FFFFFF"
              loading={statusCheckList === "loading" || statusActChange === "loading"}
              secondary
              styleButtonView={{ flex: 1 }}
              onPress={user?.role === "construction_control" ? () => handleCancel: () => handleNext("deny")}
            />
            <CustomButton
              text={user?.role === "construction_control" ? "Отправить": "Принять"}
              loading={statusCheckList === "loading" || statusActChange === "loading"}
              loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>}
              styleText={[styles.buttonText]}
              colorDefault={'#007AFF'}
              textColorDefault={'#fff'}
              colorActive={'#0059FF'}
              secondary
              styleButtonView={{ flex: 1 }}
              onPress={() => handleNext("accept")}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerScroll: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingTop: 10,
    gap: 40,
  },
  header: {
    paddingHorizontal: 25,
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
    maxWidth: 195,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ObjectActivationScreen;
