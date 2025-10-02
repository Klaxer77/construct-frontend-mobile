import CommentOpenIten from '@/entities/CommentOpenIten';
import { ApiResponse, Icon, IconName, Status } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import StatusBlock from '@/shared/ui/StatusBlock/StatusBlock';
import { useGetCurrentObject, useUserAuth } from '@/features/auth/hooks/use-selectors';
import { useEffect, useState } from 'react';
import { endpoints } from '@/shared/config/endpoints';
import { api } from '@/shared/config/api';
import { IRemark } from '@/shared/types/remarksTypes';
import { Asset } from 'react-native-image-picker';

type ObjectRouteProp = RouteProp<ObjectStackParamList, 'ObjectCommentOpen'>;
interface IComment extends Omit<IRemark, "responsible_user_name"> {
  remarks?: IRemarkItem[]
  violations?: IRemarkItem[]
}

export interface IPhoto {
  file_path: string;
}

export interface IAnswer {
  id: string;
  comment: string;
  created_at: string;
  files: IPhoto[];
}

export interface IRemarkItem {
  id: string;
  violations: string;
  name_regulatory_docx: string;
  comment: string;
  status: "fixed" | "active" | "check";
  expiration_date: string;
  photos: IPhoto[];
  answer?: IAnswer;
  filesSend?: Asset[] | null,
  commentSend?: string
}


const ObjectCommentOpenScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const { params } = useRoute<ObjectRouteProp>();
  const { bottom } = useSafeAreaInsets();
  const user = useUserAuth()
  const checkType = params.header === 'Замечания'
  const headerTitle = checkType ? 'Замечание' : 'Нарушение';
  const [itemAnswer, setItem] = useState<IComment | null>();
  const currentObject = useGetCurrentObject()
  const [status, setStatus] = useState<Status>("idle")
  // если params.header === 'Замечания' - get один
  // если params.header === 'Нарушения' - get другой
  const requst = checkType ? endpoints.remarks.detail(params.comment_id): endpoints.violations.detail(params.comment_id)
  
  useEffect(() => {
    api.get<ApiResponse<IComment>>(requst)
    .then((data) => {
      setItem(data.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const currentUserRole = {
    construction_control: "сonstructionСontrol",
    contractor: "prost",
    inspection: "inspection"
  } as const

  const currentRole = currentUserRole[user?.role ?? "construction_control"]

  const currentStatus = {
    fixed: "fixed",
    not_fixed: "active",
    review: "check",
  } as const

  const currentStatusComment = {
    fixed: "fixed",
    not_fixed: "reject",
    review: "check",
  } as const

  const handleDataUpdate = (
    id: string,
    files: Asset[] | null,
    comment: string
  ) => {
    setItem(prevState => {
      if (!prevState) return prevState;
      console.log(itemAnswer)
      if (prevState.remarks && checkType){
        console.log(prevState.remarks + "remarks")
        return {
          ...prevState,
          remarks: prevState.remarks.map(remark =>
            remark.id === id
              ? {
                  ...remark,
                  filesSend: files ?? remark.filesSend,
                  commentSend: comment ?? remark.commentSend,
                }
              : remark
          ),
        };
      } else if (prevState.violations){
        
        return {
          ...prevState,
          violations: prevState.violations.map(remark =>
            remark.id === id
              ? {
                  ...remark,
                  filesSend: files ?? remark.filesSend,
                  commentSend: comment ?? remark.commentSend,
                }
              : remark
          ),
        };
      }

    });
  };

  const handlePressSendComment = (id: string) => {
    const findItem = checkType ? itemAnswer?.remarks?.find((item) => item.id === id): itemAnswer?.violations?.find((item) => item.id === id)
    if (!findItem) return;

    setStatus("loading")

    const formData = new FormData();

    formData.append("user_data", JSON.stringify({
      comment: findItem.commentSend ?? ""
    }));

    if (findItem.filesSend && findItem.filesSend.length > 0) {
      findItem.filesSend.forEach((file, index) => {
        formData.append("files", {
          uri: file.uri,
          type: file.type || "image/jpeg",
          name: file.fileName || `file_${index}.jpg`,
        } as any);
      });
    }
    
    const request = checkType ? endpoints.remarks.answer(currentObject?.id ?? "", id):  endpoints.violations.answer(currentObject?.id ?? "", id)
    api.post(
      request,
      formData,
      {
        headers: {
          Accept: "application/json",
        },
    })
    .then(() => {
      setStatus("received")
      navigation.navigate("ObjectStack", 
      {screen: "ObjectSendWork",
      params: {
      title: itemAnswer?.object_name ?? "Обьект", text: "Ответ успешно отправлен", 
      subtitle: "инспекционный контроль качества выполнения строительно-монтажных работ на объекте", 
      link: "ObjectAvailableObject"}})
    })
    .catch((error) => {
      setStatus("rejected")
      console.log(error)
    })
  }

  const handlePressChangeStatus = (id: string, action: "accept" | "deny") => {
    const request = checkType ? endpoints.remarks.changeStatus(id):  endpoints.violations.changeStatus(id)
    setStatus("loading")
    api.post(request, {
      "action": action
    })
    .then(() => {
      setStatus("received")
      navigation.navigate("ObjectStack", 
      {screen: "ObjectSendWork",
      params: {
      title: itemAnswer?.object_name ?? "Обьект", text: "Замечание принято", 
      subtitle: "инспекционный контроль качества выполнения строительно-монтажных работ на объекте", 
      link: "ObjectAvailableObject"}})
    })
    .catch((error) => {
      setStatus("rejected")
      console.log(error)
    })
  }

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={['top']}>
        <SafeAreaView edges={['left', 'right']}>
          <Header
            IconLeft={<Icon name={IconName.ArrowBack} />}
            onPressLeft={() => navigation.goBack()}
            title={`${headerTitle} ${params.date ? params.date : 'Объекты'}`}
          />
        </SafeAreaView>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingBottom: bottom + 113 },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{params.title}</Text>
            <Text style={styles.subtitle}>
              {
                'ИНСПЕКЦИОННЫЙ КОНТРОЛЬ КАЧЕСТВА ВЫПОЛНЕНИЯ СТРОИТЕЛЬНО-МОНТАЖНЫХ РАБОТ НА ОБЪЕКТЕ'
              }
            </Text>
            <StatusBlock
              status={currentStatus[params.status as keyof typeof currentStatus]}
            />
          </View>
          <View style={styles.main}>
            <FlatList
              contentContainerStyle={styles.list}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <CommentOpenIten
                  statusFetch={status}
                  id={item.id}
                  onPressAccent={(id) => handlePressChangeStatus(id, "accept")}
                  onPressCancel={(id) => handlePressChangeStatus(id, "deny")}
                  onPressSend={handlePressSendComment}
                  handleUpdateData={handleDataUpdate}
                  remark={params.header === 'Замечания'}
                  fixedViolant={item.answer}
                  violation={
                    {violations: item.violations,
                    nameDocument: item.name_regulatory_docx,
                    files: item.photos,
                    date: item.expiration_date,
                    comment: item.comment,
                    number: index + 1}
                  }
                  
                  status={currentStatusComment[item.status as keyof typeof currentStatusComment]}
                  type={currentRole}
                />
              )}
              data={checkType ? itemAnswer?.remarks: itemAnswer?.violations}
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
  list: {
    gap: 10,
  },
  main: {
    gap: 10,
  },
  buttons: {
    gap: 16,
    paddingTop: 6,
  },
  title: {
    fontFamily: Fonts[700],
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: Fonts[600],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#808080',
    textTransform: 'lowercase',
  },
  container: {
    paddingHorizontal: 12,
    gap: 10,
    paddingTop: 11,
  },
  header: {
    gap: 10,
    paddingHorizontal: 13,
  },
  statusBlock: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontFamily: Fonts[600],
    lineHeight: 24,
    fontSize: 14,
    backgroundColor: '#D9EBFF',
    color: '#2F7CD0',
    letterSpacing: -0.4,
    alignSelf: 'flex-start',
  },
  active: {
    backgroundColor: '#FAE0E2',
    color: '#AF3B45',
  },
  fixed: {
    color: '#08875D',
    backgroundColor: 'rgba(8, 135, 93, 0.15)',
  },
  check: {
    backgroundColor: '#D9EBFF',
    color: '#2F7CD0',
  },
});

export default ObjectCommentOpenScreen;
