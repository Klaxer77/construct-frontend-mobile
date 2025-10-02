import CommentItem, {
  TTypeComment,
} from '@/entities/CommentItem';
import { useGetCurrentObject } from '@/features/auth/hooks/use-selectors';
import { ApiResponse, Icon, IconName } from '@/shared';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { IRemark } from '@/shared/types/remarksTypes';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import { TabWradder } from '@/shared/ui/TabWradder/ui/TabWradder';
import { formatISOToDate } from '@/shared/utils/formatDate';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type ObjectRouteProp = RouteProp<ObjectStackParamList, 'ObjectComments'>;


// если params.header === 'Замечания' - get один
// если params.header === 'Нарушения' - get другой

const ObjectCommentsScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const { params } = useRoute<ObjectRouteProp>();
  const [filter, setFilter] = useState<TTypeComment | ''>('');
  const { bottom } = useSafeAreaInsets();
  const [list, setList] = useState<IRemark[]>([])
  const currentObject = useGetCurrentObject()

  const checkType = params.header === "Замечания"

  const request = checkType ? endpoints.remarks.getAll(currentObject?.id ?? ""): endpoints.violations.getAll(currentObject?.id ?? "")
  console.log(list)
  useEffect(() => {
    api.get<ApiResponse<IRemark[]>>(request)
    .then((data) => {
      setList(data.data.data)
    })
    .catch((error) => {
      console.log(error)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (value: string) => {
    const filters = {
      Все: '',
      Активные: 'not_fixed',
      Исправленные: 'fixed',
      'На проверке': "review",
    };
    setFilter(filters[value as keyof typeof filters] as TTypeComment);
  };

  const filtersComments = list.filter(item =>
    filter ? item.status === filter : item,
  );

  return (
    <>
      <SafeAreaView
        style={styles.containerMain}
        edges={['left', 'right', 'top']}
      >
        <Header
          IconLeft={<Icon name={IconName.ArrowBack} />}
          onPressLeft={() => navigation.goBack()}
          title={params.header}
        />
        <View style={styles.containerWradder}>
          <TabWradder
            onChange={handleChange}
            list={['Все', 'Активные', 'Исправленные', 'На проверке']}
          />
        </View>
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CommentItem
              onPress={() =>
                navigation.navigate('ObjectStack', {
                  screen: 'ObjectCommentOpen',
                  params: {
                    title: params.title,
                    date: formatISOToDate(checkType ? item.date_remark ?? "" : item.date_violation ?? ""),
                    status: item.status,
                    header: params.header,
                    comment_id: item.id
                  },
                })
              }
              {...item}
              time={checkType ? item.date_remark ?? "" : item.date_violation ?? ""}
              timeFixed={item.expiration_date}
              type={item.status}
              title={params.title ? params.title : item.object_name}
            />
          )}
          data={filtersComments}
          contentContainerStyle={[
            styles.container,
            { paddingBottom: bottom + 110 },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  containerWradder: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  container: {
    paddingHorizontal: 18,
    gap: 10,
    paddingTop: 11,
  },
});

export default ObjectCommentsScreen;
