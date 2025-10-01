import { ApiResponse, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { VerificationStackParamList } from '@/shared/types/root_stack.type';
import Header from '@/widgets/Header/ui/Header';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';


type ObjectRouteProp = RouteProp<
  VerificationStackParamList,
  "VerificationNfcListScreen"
>;

export interface INfcTag {
  id: string;
  nfc_uid: string;
  label: string;
  created_at: string; // можно Date, если парсишь ISO строку
}

const VerificationNfcListScreen: React.FC = () => {
  const navigation = useTypeNavigation()
  const { params } = useRoute<ObjectRouteProp>();
  const {bottom} = useSafeAreaInsets()
  const [list, setList] = useState<INfcTag[]>([])

  useEffect(() => {
    api.get<ApiResponse<INfcTag[]>>(endpoints.nfc.all(params.object.object_id))
    .then((data) => {
      setList(data.data.data)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteNfc = (id: string) => {
    api.delete(endpoints.nfc.delete(id))
    .then(() => {
      setList((prevState) => prevState.filter((item) => item.id !== id))
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header IconLeft={<Icon name={IconName.ArrowBack}/>} onPressLeft={() => navigation.goBack()} title={"Верификация"}/>
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container, {paddingBottom: bottom+80}]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{params.object.name}</Text>
              <Text style={styles.sectionId} numberOfLines={1} ellipsizeMode="tail" ><Text style={styles.sectionIdSpan}>ID: </Text>{params.object.object_id}</Text>
            </View>
            <View>
            <Text style={styles.date}>{"Количество меток: " + list.length}</Text>
            {list.map((log, idx) => (
              <View key={idx} style={styles.row}>
                <Text style={styles.logTitle}>Метка {log.label}</Text>
                <Text style={styles.logTime}>
                  {new Date(log.created_at).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Pressable onPress={() => handleDeleteNfc(log.id)}>
                  <Svg
                    width={21}
                    height={21}
                    viewBox="0 0 21 21"
                    fill="none"
                  >
                    <Path
                      opacity={0.3}
                      d="M14.815 5.085c1.688 0 2.652 1.927 1.64 3.278a3.332 3.332 0 00-.667 2v5.347a3.959 3.959 0 01-3.959 3.958H8.496a3.958 3.958 0 01-3.958-3.958v-5.348c0-.72-.235-1.422-.667-1.999-1.013-1.35-.049-3.278 1.64-3.278h9.303z"
                      fill="#F10F0F"
                    />
                    <Path
                      d="M11.83 14.877v-5M8.496 14.877v-5"
                      stroke="#F10F0F"
                      strokeWidth={1.25}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Path
                      d="M13.497 5.71l-.454-1.36a1.667 1.667 0 00-1.58-1.14H8.864c-.718 0-1.355.459-1.581 1.14L6.83 5.71"
                      stroke="#F10F0F"
                      strokeWidth={1.25}
                      strokeLinecap="round"
                    />
                  </Svg>
                </Pressable>
              </View>
            ))}
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
  
  container: {
    gap: 10,
    paddingTop: 11,
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

export default VerificationNfcListScreen;