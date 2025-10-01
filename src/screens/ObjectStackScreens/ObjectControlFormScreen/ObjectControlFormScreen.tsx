import { colors, Icon, IconName, Status } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { api } from '@/shared/config/api';
import { endpoints } from '@/shared/config/endpoints';
import { useTypeNavigation } from '@/shared/hooks/useTypeNavigation';
import { ObjectStackParamList } from '@/shared/types/root_stack.type';
import CustomButton from '@/shared/ui/CustomButton/CustomButton';
import { PulseSpinner } from '@/shared/ui/PulseSpinner/PulseSpinner';
import CustomTextArea from '@/shared/ui/СustomTextArea/CustomTextArea';
import { isValidDate } from '@/shared/utils/formatDate';
import Header from '@/widgets/Header/ui/Header';
import { SendFileWidjet } from '@/widgets/SendFiles/SendFileWidjet';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type ObjectRouteProp = RouteProp<
  ObjectStackParamList,
  "ObjectControlForm"
>;

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

const ObjectControlScreen: React.FC = () => {
  const navigation = useTypeNavigation();
  const { params } = useRoute<ObjectRouteProp>();
  const [changeForm, setChangeForm] = useState(false);
  const { bottom } = useSafeAreaInsets();
  const [status, setStatus] = useState<Status>("idle")
  const [dateError, setDateError] = useState<string | null>(null);

  // форма полностью по интерфейсу LlmResult
  const [form, setForm] = useState<LlmResult>({
    sender: "",
    date: "",
    request_number: "",
    receiver: "",
    item_name: "",
    size: "",
    quantity: "",
    net_weight: "",
    gross_weight: "",
    volume: "",
    carrier: "",
    vehicle: "",
  });

  const handleSendForm = () => {
    setStatus("loading")
    let parts = form.date.split(".");
    let newDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    console.log({...form, date: newDate})
    api.post(endpoints.materials.add(params.object?.id ?? "", params.categoryId), 
      {...form, date: newDate}
    )
    .then(() => {
      navigation.navigate("ObjectStack", {
        screen: "ObjectSendWork",
        params: {
          title: params.mainTask.title,
          subtitle: form.item_name,
          text: "Накладная была отправлена",
          link: "ObjectControl",
        },
      });
    })
    .catch((error) => {
      setStatus("rejected")
      console.log(error)
    })
  }

  useEffect(() => {
    if (params.form) {
      setForm({...params.form as LlmResult, request_number: params.form.request_number ? "Транспортная накладная №" + params.form.request_number: ""});
    }
  }, [params]);

  const handleChange = (field: keyof LlmResult, value: string) => {
  let newValue = value;
    
    if (field === "date") {
      setDateError(null)
      const digits = value.replace(/\D/g, "").slice(0, 8);
      
      if (digits.length > 4) {
        newValue = `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
      } else if (digits.length > 2) {
        newValue = `${digits.slice(0, 2)}.${digits.slice(2)}`;
      } else {
        newValue = digits;
      }
    }

    setForm({ ...form, [field]: newValue });
  };

  const handleContinuePress = () => {
    if (isValidDate(form.date)){
      setChangeForm(true)
    } else {
      setDateError("Введите корректную дату")
    }
  }
  
  const isFormValid =  Object.values(form).every((v) => v.trim().length > 0);

  return (
    <>
      <SafeAreaView style={styles.containerMain} edges={["top", "bottom"]}>
        <SafeAreaView edges={["left", "right"]}>
          <Header
            style={styles.headerContainer}
            IconLeft={<Icon name={IconName.Warning} />}
            onPressLeft={() => navigation.goBack()}
            title={"Контроль материалов"}
          >
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Внесение данных</Text>
              <Text style={styles.headerSubtitle}>Проверьте корректность</Text>
            </View>
          </Header>
        </SafeAreaView>
        <ScrollView
          contentContainerStyle={[styles.container, { paddingBottom: bottom + 80 }]}
        >
          <View>
            {!changeForm && (
              <View style={styles.listForm}>
                {Object.entries({
                  request_number: "Заявка №",
                  sender: "Грузоотправитель",
                  date: "Дата",
                  receiver: "Грузополучатель",
                  item_name: "Название груза",
                  size: "Размер",
                  quantity: "Количество",
                  net_weight: "Нетто",
                  gross_weight: "Брутто",
                  volume: "Объём",
                  carrier: "Перевозчик",
                  vehicle: "Транспортное средство",
                }).map(([key, label]) => (
                  <>
                  {key === "request_number" && <CustomTextArea
                    key={key}
                    titleInput
                    placeholder="Введите название TTH"
                    value={form[key as keyof LlmResult]}
                    onChange={(text) =>
                      handleChange(key as keyof LlmResult, text)
                    }
                  />}
                  {key !== "request_number" && <CustomTextArea
                    key={key}
                    label={label}
                    keyboardType={key === "date" ? "numeric": "default"}
                    placeholder="Введите данные"
                    value={form[key as keyof LlmResult]}
                    onChange={(text) =>
                      handleChange(key as keyof LlmResult, text)
                    }
                  />}
                  </>
                ))}
              </View>
            )}

            {changeForm && (
              <SendFileWidjet
                styleView={styles.file}
                limit={1}
                commentView={false}
                subtitle="паспорт качества"
              />
            )}
          </View>
          {dateError && <Text style={styles.textError}>{dateError}</Text>}
          <View style={styles.buttons}>
            <View style={styles.buttonWrapper}>
              <CustomButton
                textColorDefault="#E02D3C"
                colorActive="#DC0012"
                colorDefault="#FFFFFF"
                textColorActive="#FFFFFF"
                loading={status === "loading"}
                loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>}
                onPress={() => {
                  !changeForm ? navigation.goBack() : setChangeForm(false);
                }}
                text={!changeForm ? "Отмена" : "Назад"}
                styleText={[styles.buttonFooterText, styles.warning]}
                secondary
              />
            </View>
            <View style={styles.buttonWrapper}>
              <CustomButton
                disable={!isFormValid || !!dateError}
                loading={status === "loading"}
                loadingAnima={<PulseSpinner backgroundColorMain='#FFFFFF' backgroundColorSecondary='#98C9FF' size={5.71} offset={8.56}/>}
                onPress={() => {
                  !changeForm
                    ? handleContinuePress()
                    : handleSendForm()
                }}
                text={!changeForm ? "Далее" : "Отправить"}
                styleText={styles.buttonFooterText}
              />
            </View>
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
  header: {
    flex: 1,
    paddingLeft: 10,
  },
  headerContainer: {
    maxWidth: "auto",
    paddingLeft: 19,
    paddingRight: 35,
  },
  headerTitle: {
    fontSize: 18,
    letterSpacing: -0.4,
    lineHeight: 28,
    fontFamily: Fonts[800],
    color: "#4C4C4C",
  },
  headerSubtitle: {
    fontSize: 16,
    letterSpacing: -0.4,
    lineHeight: 24,
    fontFamily: Fonts[600],
    color: "#A0A0A5",
  },
  container: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  listForm: {
    gap: 12,
    paddingBottom: 22,
  },
  warning: {
    color: colors.warning,
  },
  buttons: {
    paddingTop: 40,
    flexDirection: "row",
    gap: 8,
  },
  textError: {
    fontSize: 15,
    lineHeight: 21,
    letterSpacing: -0.4,
    fontFamily: Fonts[600],
    color: colors.warning
  },
  file: {
    borderTopWidth: 0,
    paddingTop: 21,
  },
  buttonWrapper: {
    flex: 1,
    flexBasis: 0,
  },
  buttonFooterText: {
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.4,
    fontFamily: Fonts[600],
  },
});

export default ObjectControlScreen;