import { colors, Icon, IconName } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import Header from '@/widgets/Header/ui/Header';
import PopupChooseObject from '@/widgets/PopupChooseObject/PopupChooseObject';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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

type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectControlOpen"
>;

const ObjectWorkOpenScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const { params } = useRoute<ObjectRouteProp>();
  const [viewPopup, setViewPopup] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const form = params.form

  const labels: Record<keyof LlmResult, string> = {
    sender: "Грузоотправитель",
    date: "Дата",
    request_number: "Заявка №",
    receiver: "Грузополучатель",
    item_name: "Название груза",
    size: "Размер",
    quantity: "Количество",
    net_weight: "Нетто",
    gross_weight: "Брутто",
    volume: "Объем",
    carrier: "Перевозчик",
    vehicle: "Транспортное средство",
  };

  const order: (keyof LlmResult)[] = [
    "request_number",
    "sender",
    "date",
    "receiver",
    "item_name",
    "size",
    "quantity",
    "net_weight",
    "gross_weight",
    "volume",
    "carrier",
    "vehicle",
  ];

  const formatDate = (isoDate: string) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <PopupChooseObject isVisible={viewPopup} onClose={() => setViewPopup(false)} />
        <SafeAreaView edges={["left", "right"]}>
          <Header
            IconLeft={<Icon name={IconName.ArrowBack} />}
            onPressLeft={() => navigation.goBack()}
            title={"Контроль материалов"}
          />
        </SafeAreaView>
        <ScrollView contentContainerStyle={[styles.container, { paddingBottom: bottom + 100 }]}>
        {order.map(key => (
          form?.[key as keyof typeof form] && (
            <View style={styles.field} key={key}>
              {key === "date" ? (
                <>
                  <Text style={styles.titleField}>{labels[key]}</Text>
                  <Text style={styles.subtitleField}>
                    {formatDate(form.date)}
                  </Text>
                </>
              ) : key === "request_number" ? (
                <Text style={styles.title}>{form[key as keyof typeof form]}</Text>
              ) : (
                <>
                  <Text style={styles.titleField}>{labels[key]}</Text>
                  <Text style={styles.subtitleField}>{form[key as keyof typeof form]}</Text>
                </>
              )}
            </View>
          )
        ))}
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
    paddingHorizontal: 18,
    gap: 10,
    paddingTop: 11,
  },
  field: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
    fontFamily: Fonts[800],
    color: colors.blue,
  },
  titleField: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.2,
    fontFamily: Fonts[600],
    color: "#A0A0A5",
  },
  subtitleField: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
    fontFamily: Fonts[800],
    color: "#3D3D3D",
  }
});

export default ObjectWorkOpenScreen;