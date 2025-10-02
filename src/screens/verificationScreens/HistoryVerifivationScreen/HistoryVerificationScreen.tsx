import { ApiResponse, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { INfcHistroy } from '@/shared/types/nfcTypes';
import { VerificationStackParamList } from '@/shared/types/root_stack.type';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



type HistoryRouteProp = RouteProp<
  VerificationStackParamList,
  "VerificationHistory"
>;

interface IListHistory {
  title: string,
  using_id: string,
  data: INfcHistroy[]
}

const HistoryVerificationScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const { params } = useRoute<HistoryRouteProp>();
  const [listHistory, setListHistory] = useState<IListHistory[]>([])

   useEffect(() => {
    if (params?.object) {
      api.get<ApiResponse<IListHistory[]>>(endpoints.nfc.getHistory(params.object.id))
        .then((data) => {
          if (params.object)
          setListHistory(data.data.data);
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      api.get<ApiResponse<IListHistory[]>>(endpoints.nfc.getHistoryAll)
        .then((data) => {
          setListHistory(data.data.data);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [params?.object]);
  
  console.log(listHistory)
  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header onPressLeft={() => navigation.goBack()} IconLeft={<Icon name={IconName.ArrowBack}/>} title="Верификация"/>
        </SafeAreaView>
        {listHistory.length > 0 && <SectionList
          sections={listHistory}
          contentContainerStyle={styles.container}
          keyExtractor={(_, index) => String(index)}
          renderSectionHeader={({ section: { title, using_id } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <Text style={styles.sectionId} numberOfLines={1} ellipsizeMode="tail" ><Text style={styles.sectionIdSpan}>ID: </Text>{using_id}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.date}>{new Date(item.date).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "long",
              })}</Text>
              {item.scans.map((log, idx) => (
                <View key={idx} style={styles.row}>
                  <Text style={styles.logTitle}>Метка {log.label}</Text>
                  <Text style={styles.logTime}>
                    {new Date(log.scanned_at).toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              ))}
            </View>
          )}
        />}
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
    gap: 12,
    paddingTop: 10,
    paddingBottom: 100,
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontFamily: Fonts[800],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.2,
    color: '#595959',
  },
  sectionId: {
    fontFamily: Fonts[600],
    fontSize: 14,
    lineHeight: 23,
    letterSpacing: -0.2,
    color: '#9FA1A6',
    maxWidth: 109,
  },
  sectionIdSpan: {
    fontFamily: Fonts[600],
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12.5,
    paddingHorizontal: 18.8,
  },
  logTitle: {
    fontFamily: Fonts[700],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#494949',
  },
  logTime: {
    fontFamily: Fonts[700],
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#494949',
  },
  date: {
    backgroundColor: "#F6F6F6",
    fontFamily: Fonts[600],
    fontSize: 13.6,
    lineHeight: 17.79,
    letterSpacing: -0.42,
    color: '#616161',
    paddingVertical: 7.3,
    paddingHorizontal: 18.8,
  }
})

export default HistoryVerificationScreen;