import { useUserAuth } from '@/features/auth/hooks/use-selectors';
import { ApiResponse, colors, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import { Status } from '@/shared/types/status';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { PulseSpinner } from '@/shared/ui/PulseSpinner/PulseSpinner';
import { TabWradder } from '@/shared/ui/TabWradder/ui/TabWradder';
import { formatDateIso, formatISOToDate } from '@/shared/utils/formatDate';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Asset, launchCamera } from 'react-native-image-picker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectControlEntry"
>;

export interface MaterialResponse {
  id: string;
  sender: string;
  date: string;         
  request_number: string;
  receiver: string;
  item_name: string;
  size: string;
  quantity: string;
  net_weight: string;
  gross_weight: string;
  volume: string;
  carrier: string;
  vehicle: string;
  created_at: string;
}

export interface LlmResult {
  sender: string;
  date: string;
  request_number: string;
  receiver: string;
  item_name: string;
  size: string;
  quantity: string;
  net_weight: string;
  gross_weight: string;
  volume: string;
  carrier: string;
  vehicle: string;
}

interface LlmResponse {
  "llmResult": LlmResult
}

const ObjectControlEntryScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const { params } = useRoute<ObjectRouteProp>();
  const {bottom} = useSafeAreaInsets()
  const [filter, setFilter] = useState("Внесенные")
  const [file, setFile] = useState<Asset | null>();
  const [status, setStatus] = useState<Status>("idle")
  const [list, setList] = useState<MaterialResponse[]>([])
  const user = useUserAuth()
  
  useEffect(() => {
    api.get<ApiResponse<MaterialResponse[]>>(endpoints.materials.detail(params.object?.id ?? "", params.secondaryTask.id))
    .then((data) => {
      setList(data.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCamera = async () => {
    setStatus("loading")
    try {
      const result = await launchCamera({ mediaType: 'photo', quality: 1 });
      if (result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      } else {
        setStatus("rejected")
      }
      
    } catch (error) {
      setStatus("rejected")
    }
  };

  const handleManually = () => {
    navigation.navigate("ObjectStack", {screen: "ObjectControlForm", params: {object: params.object, mainTask: {...params.mainTask}, form: null, categoryId: params.secondaryTask.id}})
  }

  useEffect(() => {
    if (file){
      const formData = new FormData();
      console.log(file.type, file.uri, file.fileName)
      formData.append("upload_file", {
        uri: file.uri,
        name: file.fileName ?? `upload_${Date.now()}.jpg`,
        type: file.type ?? "image/jpeg",
      } as any);
      
      api.post<ApiResponse<LlmResponse>>(endpoints.materials.llm, formData, {
      headers: {
        Accept: "application/json",
      },
      })
      .then((data) => {
        console.log(data.data)
        if (data.data.code === 501){
          setStatus("rejected")
        } else {
          setStatus("received")
          navigation.navigate("ObjectStack", {screen: "ObjectControlForm", params: {object: params.object, mainTask: {...params.mainTask}, form: data.data.data.llmResult, categoryId: params.secondaryTask.id}})
        }
      })
      .catch((error) => {
        console.log(error)
        setStatus("rejected")
      })
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={"Контроль материалов"}/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container, {paddingBottom: bottom + 110}]}>
            <View style={styles.main}>
              <Text style={styles.title}>
                {params.mainTask.title}
              </Text>
              <Text style={styles.subtitle}>
                {params.mainTask.startDate +" - " + params.mainTask.endDate}
              </Text>
            </View>
            <View style={styles.wrapperSecondary}>
              <View style={styles.containerSecondary}>
                <View style={styles.wrapper} >
                  <View style={styles.containerText}>
                    <Text style={styles.titleSecondary}>
                      {params.secondaryTask.title}
                    </Text>
                    <Text style={[styles.date]}>
                      {formatISOToDate(params.secondaryTask.startDate)}
                      {" → "}
                      {formatISOToDate(params.secondaryTask.endDate)}
                    </Text>
                  </View>
              </View>
              </View>
            </View>
          <View style={styles.buttonContainer}>
            {user?.role === "contractor" && <CustomButton 
            loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>} 
            styleButton={styles.buttonSend} 
            loading={status === "loading"} 
            onPress={handleCamera} 
            text='Внести материалы'
            iconRigth={<Icon name={IconName.Material}/>}/>}
          </View>
          {status === "rejected" && <View style={styles.buttonContainerError}>
            <Text style={styles.errorText}>
              Произошла ошибка
            </Text>
            <CustomButton 
            loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>} 
            styleButton={styles.buttonSend} 
            onPress={handleManually} 
            text='Внести материалы вручную'
            iconRigth={<Icon name={IconName.Material}/>}/>
          </View>}
          <View>
            <Text style={[styles.title, styles.wrapperSecondary]}>
              История
            </Text>
            <View style={styles.containerWradder}>
              <TabWradder onChange={setFilter} styleWradder={styles.wradder} list={["Внесенные", "Требуется"]}/>
            </View>
            {filter === "Внесенные" && <FlatList scrollEnabled={false} keyExtractor={(item) => String(item.id)} contentContainerStyle={styles.historyList} data={list} renderItem={({item}) => <Pressable
            onPress={() => navigation.navigate("ObjectStack", {screen: "ObjectControlOpen", params:{ form: item}})}
            style={styles.historyItem}>
              <View>
                <Text style={styles.historyItemTitle}>
                  {item.item_name}
                </Text>
                <Text style={styles.historyItemInfo}>
                  {item.size}
                </Text>
                <Text style={styles.historyItemInfo}>
                  {item.quantity}
                </Text>
                <Text style={styles.historyItemInfo}>
                  {formatDateIso(item.created_at)}
                </Text>
              </View>
              <Icon width={16} height={16} name={IconName.ArrowRigth}/>
            </Pressable>}/>}
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
  historyList: {
    gap: 24,
    paddingHorizontal: 18,
  },
  historyItem: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: 'center',
  },
  historyItemInfo: {
    fontSize: 14,
    letterSpacing: -0.28,
    lineHeight: 12,
    fontFamily: Fonts[600],
    paddingTop: 12,
    color: "rgba(0, 0, 0, 0.5)",
  },
  historyItemTitle: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: Fonts[700],
    color: "#3D3D3D",
  },
  containerSecondary: {
    paddingTop: 34,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(202, 200, 218, 0.2)",
  },
  wrapperSecondary: {
    paddingHorizontal: 18,
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerText: {
    paddingRight: 32,
    zIndex: 1,
  },
  date: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
    color: "#A0A0A5",
    paddingTop: 2,
    paddingBottom: 6,
  },
  buttonContainer: {
    paddingTop: 15,
    paddingHorizontal: 18,
    paddingBottom: 25,
  },
  buttonContainerError: {
    gap: 15,
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  errorText: {
    fontSize: 14,
    letterSpacing: -0.4,
    lineHeight: 14,
    fontFamily: Fonts[600],
    color: colors.warning,
  },
  buttonSend: {
    height: 58,
  },
  container: {
    gap: 10,
    paddingTop: 11,
  },
  titleSecondary: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
    color: "#585757",
  },
  main: {
    paddingTop: 30,
    paddingHorizontal: 18,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: -0.28,
    lineHeight: 12,
    fontFamily: Fonts[600],
    paddingTop: 12,
    color: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 16,
    fontFamily: Fonts[700],
    color: "#3D3D3D",
  },
  wradder: {
    paddingLeft: 18,
  },
  containerWradder: {
    paddingTop: 14,
    paddingBottom: 26,
  },
})

export default ObjectControlEntryScreen;